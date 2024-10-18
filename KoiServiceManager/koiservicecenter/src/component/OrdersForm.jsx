import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchSlots, fetchVeterinas, fetchOrdersInSelectedSlot, fetchServices, createOrder, fetchUserID } from '../config/api.jsx';
import './OrdersForm.css'; // Importing the CSS file

const OrdersForm = () => {
    const [slots, setSlots] = useState([]);
    const [veterinas, setVeterinas] = useState([]);
    const [services, setServices] = useState([]);
    const [user, setUser] = useState(null);

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

            setUser(userData);
            setSlots(slotsData);
            setVeterinas(veterinasData.filter(veterina => veterina.status === true));
            setServices(servicesData);
        };

        loadData();
    }, []);

    const addresses = [
        'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8',
        'Quận 10', 'Quận 11', 'Quận 12', 'Quận Tân Bình', 'Quận Bình Tân',
        'Quận Bình Thạnh', 'Quận Tân Phú', 'Quận Gò Vấp', 'Quận Phú Nhuận',
        'Huyện Bình Chánh', 'Huyện Hóc Môn', 'Huyện Cần Giờ', 'Huyện Củ Chi',
        'Huyện Nhà Bè'
    ];

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

        alert(`Bạn đã chọn Slot: ${slot.startTime} - ${slot.endTime} vào ngày ${date.toLocaleDateString()}`);
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
    };

    const handleRemoveService = (serviceID) => {
        setSelectedServices(prevServices => prevServices.filter(id => id !== serviceID));
        setServiceQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[serviceID];
            return newQuantities;
        });
    };

    const calculateTotal = () => {
        return selectedServices.reduce((total, serviceID) => {
            const service = services.find(s => s.serviceID === serviceID);
            const quantity = serviceQuantities[serviceID] || 1;
            return total + service.price * quantity;
        }, 0);
    };

    const handleUseMyAddress = () => {
        setUseMyAddress(!useMyAddress);
        if (!useMyAddress && user && user.address) {
            setSelectedAddress(user.address);
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

        const completeAddress = `${addressDetails}, ${selectedAddress}`;
        const servicesWithQuantities = selectedServices.map(serviceID => ({
            serviceID,
            quantity: serviceQuantities[serviceID] || 1
        }));

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
                alert(`Đơn hàng của bạn đã được đặt thành công!\nMã đơn: ${orderId}\nNgày đặt: ${orderDate}\nĐịa chỉ: ${address}\nTrạng thái: ${status}`);
            } else {
                alert('Đã có lỗi xảy ra khi đặt đơn hàng.');
            }
        } catch (error) {
            alert('Lỗi kết nối! Vui lòng thử lại.');
            console.error(error);
        }
    };

    return (
        <div className="orders-form">
            <h1>Quản lý đơn đặt hàng</h1>

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
                    {services.map(service => (
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
                    <p>Tổng tiền: {calculateTotal()} đ</p>
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
                            {addresses.map(address => (
                                <option key={address} value={address}>{address}</option>
                            ))}
                        </select>
                        <input
                            value={addressDetails}
                            onChange={(e) => setAddressDetails(e.target.value)}
                            placeholder="Nhập thêm chi tiết địa chỉ nếu cần"
                        />
                    </div>
                    
                )}
                
            </div>

            <button onClick={handleBooking}>Đặt Lịch</button>
        </div>
    );
};

export default OrdersForm;
