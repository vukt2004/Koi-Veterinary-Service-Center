import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchSlots, fetchVeterinas, fetchOrdersInSelectedSlot, fetchServices, createOrder, fetchUserID, fetchTravelExpense } from '../config/api.jsx';
import { ToastContainer, toast } from 'react-toastify'; // Importing react-toastify
import 'react-toastify/dist/ReactToastify.css'; // npm install react-toastify
import { useNavigate } from 'react-router-dom';

const OrdersForm = () => {
    const [slots, setSlots] = useState([]);
    const [veterinas, setVeterinas] = useState([]);
    const [services, setServices] = useState([]);
    const [user, setUser] = useState(null);
    const [travelExpenses, setTravelExpenses] = useState([]);
    const navigate = useNavigate();

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [ordersInSelectedSlot, setOrdersInSelectedSlot] = useState([]);
    const [selectedVeterina, setSelectedVeterina] = useState(null);

    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceQuantities, setServiceQuantities] = useState({});

    const [selectedAddress, setSelectedAddress] = useState('');
    const [useMyAddress, setUseMyAddress] = useState(false);
    const [addressDetails, setAddressDetails] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const userId = jwtDecode(sessionStorage.getItem('user')).sub;
            const userData = await fetchUserID(userId);
            const slotsData = await fetchSlots();
            const veterinasData = await fetchVeterinas();
            const servicesData = await fetchServices();
            const travelExpensesData = await fetchTravelExpense();

            setTravelExpenses(travelExpensesData);
            setUser(userData);
            setSlots(slotsData);
            setVeterinas(veterinasData.filter(veterina => veterina.status === true));
            setServices(servicesData);
        };

        loadData();
    }, []);

    const getNext7Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const handleSlotSelection = (date, slot) => {
        setSelectedDate(date);
        setSelectedSlot(slot);
        console.log(slot);

        const formattedDate = date.toISOString().split('T')[0];
        console.log(formattedDate);
        const loadOrder = async () => {
            setOrdersInSelectedSlot(await fetchOrdersInSelectedSlot(formattedDate, slot.slot))
        }
        loadOrder();

        setSelectedVeterina(null); // Reset the selected veterinarian

        toast.success(`Bạn đã chọn Slot: ${slot.startTime} - ${slot.endTime} vào ngày ${date.toLocaleDateString()}`);
    };

    const handleServiceSelection = (serviceID) => {
        if (selectedServices.includes(serviceID)) {
            return; // Prevent duplicate selections
        }

        setSelectedServices(prevServices => [...prevServices, serviceID]);
        setServiceQuantities(prevQuantities => ({
            ...prevQuantities,
            [serviceID]: 1, // Default quantity is 1
        }));
    };

    const handleQuantityChange = (serviceID, quantity) => {
        const service = services.find(s => s.serviceID === serviceID);
        const maxQuantity = service.maxQuantity;

        const validQuantity = quantity > maxQuantity ? maxQuantity : quantity < 1 ? 1 : quantity;

        setServiceQuantities(prevQuantities => ({
            ...prevQuantities,
            [serviceID]: validQuantity,
        }));
        calculateTotal();
    };

    const handleRemoveService = (serviceID) => {
        setSelectedServices(prevServices => prevServices.filter(id => id !== serviceID));
        setServiceQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[serviceID];
            return newQuantities;
        });
    };

    const getDistrict = (address) => {
        // Match "Quận" or "Huyện" followed by spaces and any characters until a comma or the end
        const districtMatch = address.match(/(Quận|Huyện)\s+\S+(\s+\S+)?/);
        console.log('District Match:', districtMatch); // Debug log to check the match
        return districtMatch ? districtMatch[0] : null;
    };


    const calculateTotal = () => {
        const district = getDistrict(selectedAddress);

        const travelExpense = travelExpenses.find(expense => expense.endLocation === district);

        const travelFee = travelExpense ? travelExpense.fee : 0;

        const total = selectedServices.reduce((total, serviceID) => {
            const service = services.find(s => s.serviceID === serviceID);
            const quantity = serviceQuantities[serviceID] || 1;
            return total + (service ? service.price * quantity : 0);
        }, 0) + travelFee;

        console.log("Total Cost:", total);
        return total;
    };



    const handleUseMyAddress = () => {
        setUseMyAddress(!useMyAddress);
        if (!useMyAddress && user && user.address) {
            setSelectedAddress(user.address);
            calculateTotal();
        } else {
            setSelectedAddress('');
        }
    };

    const isVeterinaAvailable = (veterinaID) => {
        return ordersInSelectedSlot.filter(order => order.veterinaId === veterinaID).length === 0;
    };


    const handleBooking = async () => {
        if (!selectedSlot) {
            alert('Vui lòng chọn Slot!');
            return;
        }

        if (selectedServices.length === 0) {
            alert('Vui lòng chọn ít nhất một dịch vụ!');
            return;
        }

        if (!selectedAddress) {
            alert('Vui lòng nhập hoặc chọn địa chỉ!');
            return;
        }

        console.log(selectedAddress);
        const completeAddress = `${addressDetails}, ${selectedAddress}`;
        const servicesWithQuantities = selectedServices.map(serviceID => ({
            serviceID,
            quantity: serviceQuantities[serviceID] || 1
        }));

        // Check if selectedAddress is 'online'
        if (selectedAddress === 'Online') {
            console.log(selectedAddress);
            // Check if all selected services are of type 'Tư vấn'
            const allConsultation = selectedServices.every(serviceID => {
                const service = services.find(s => s.serviceID === serviceID);
                console.log(service);
                return service.type === 'Tư vấn';
            });
            console.log(allConsultation);
            if (!allConsultation) {
                alert('Tất cả dịch vụ phải là Tư vấn khi chọn "Online". Vui lòng chọn lại.');
                return;
            }
        }

        const newOrder = {
            userID: user.userID,
            veterinaID: selectedVeterina || null,
            slot: selectedSlot.slot,
            date: selectedDate.toISOString().split('T')[0],
            services: servicesWithQuantities,
            address: completeAddress,
        };

        try {
            const result = await createOrder(newOrder);
            if (result) {
                const { orderId, orderDate, address, status } = result;
                
                    toast.success(`Đơn hàng của bạn đã được đặt thành công!\nMã đơn: ${orderId}\nNgày đặt: ${orderDate}\nĐịa chỉ: ${address}\nTrạng thái: ${status}`);
                setTimeout(() => {
                    if (selectedAddress === 'Online') {
                        navigate('/payment');
                    } else {
                        navigate('/');
                    }
                }, 5000);
            } else {
                toast.error('Đã có lỗi xảy ra khi đặt đơn hàng.');
            }
        } catch (error) {
            toast.error('Lỗi kết nối! Vui lòng thử lại.');
            console.error(error);
        }

        
    };

    return (
        <div>
            <h1>Quản lý đơn đặt hàng</h1>
            <ToastContainer />

            {/* Render bảng slot */}
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Slot</th>
                            {getNext7Days().map(day => (
                                <th key={day}>
                                    {day.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric' })}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map(slot => (
                            <tr key={slot.slot}>
                                <td>{slot.startTime} - {slot.endTime}</td>
                                {getNext7Days().map(day => {
                                    const slotDateTime = new Date(day);
                                    slotDateTime.setHours(slot.startTime.split(':')[0], slot.startTime.split(':')[1]);

                                    // Use the current date and time
                                    const currentDateTime = new Date();

                                    return (
                                        <td key={day}>
                                            {slotDateTime > currentDateTime && (
                                                <button onClick={() => handleSlotSelection(day, slot)}>
                                                    Chọn
                                                </button>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Hiển thị thông tin slot và ngày đã chọn */}
            {selectedSlot && selectedDate && (
                <div>
                    <p>Slot đã chọn: {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                    <p>Ngày đã chọn: {selectedDate.toLocaleDateString()}</p>
                </div>
            )}

            {/* Chọn bác sĩ */}
            {selectedSlot && (
                <div>
                    <label>Chọn Bác Sĩ:</label>
                    <select onChange={(e) => setSelectedVeterina(e.target.value)} value={selectedVeterina || ''}>
                        <option value="">Chọn bác sĩ</option>
                        {veterinas
                            .filter((vet) => isVeterinaAvailable(vet.veterinaID))
                            .map((vet) => (
                                <option key={vet.veterinaID} value={vet.veterinaID}>
                                    {vet.name} - {vet.description}
                                </option>
                            ))}
                    </select>
                </div>
            )}

            {/* Chọn dịch vụ */}
            <div>
                <label>Chọn Dịch Vụ:</label>
                <select onChange={(e) => handleServiceSelection(e.target.value)} value="">
                    <option value="">-- Chọn Dịch Vụ --</option>
                    {services.filter(service => service.type !== 'Thuốc').map(service => (
                        <option key={service.serviceID} value={service.serviceID}>
                            {service.name} - {service.price} đ
                        </option>
                    ))}
                </select>
            </div>

            {/* Hiển thị dịch vụ đã chọn */}
            {selectedServices.length > 0 && (
                <div>
                    <h3>Dịch Vụ Đã Chọn:</h3>
                    <ul>
                        {selectedServices.map(serviceID => {
                            const service = services.find(s => s.serviceID === serviceID);
                            const quantity = serviceQuantities[serviceID] || 1;
                            return (
                                <li key={serviceID}>
                                    {service.name} - Số lượng:
                                    <input
                                        type="number"
                                        min="1"
                                        max={service.maxQuantity}
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(serviceID, parseInt(e.target.value))}
                                    />
                                    <button onClick={() => handleRemoveService(serviceID)}>Xóa</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {/* Chọn địa chỉ */}
            <div>
                <h3>Chọn Địa Chỉ:</h3>
                <input
                    type="checkbox"
                    checked={useMyAddress}
                    onChange={handleUseMyAddress}
                />
                <label>Sử dụng địa chỉ của tôi: {user?.address || 'Chưa có địa chỉ'}</label>
                {!useMyAddress && (
                    <div>
                        <select onChange={(e) => setSelectedAddress(e.target.value)} value={selectedAddress}>
                            <option value="">-- Chọn Quận/Huyện --</option>
                            {travelExpenses.map(address => (
                                <option key={address.expenseID} value={address.endLocation}>{address.endLocation} - {address.fee}VND</option>
                            ))}
                        </select>
                        {(selectedAddress !== 'Online' && selectedAddress !== '') && (
                            <input
                                value={addressDetails}
                                onChange={(e) => setAddressDetails(e.target.value)}
                                placeholder="Nhập thêm chi tiết địa chỉ nếu cần"
                            />

                        )}

                    </div>
                )}

            </div>
            <p>Tổng tiền: {calculateTotal().toLocaleString('vi-VN')} đ</p>

            <button onClick={handleBooking}>Đặt Lịch</button>
        </div>
    );
};

export default OrdersForm;
