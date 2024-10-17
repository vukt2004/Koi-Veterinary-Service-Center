import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchSlots, fetchVeterinas, fetchOrders, fetchServices, createOrder, fetchUserID } from '../config/api.jsx';
import './OrdersForm.css'; // Importing the CSS file

const OrdersForm = () => {
    const [slots, setSlots] = useState([]);
    const [veterinas, setVeterinas] = useState([]);
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [user, setUser] = useState(null);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableVeterinas, setAvailableVeterinas] = useState([]);
    const [selectedVeterina, setSelectedVeterina] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceQuantities, setServiceQuantities] = useState({});
    const [selectedAddress, setSelectedAddress] = useState('');
    const [useMyAddress, setUseMyAddress] = useState(false);
    const [addressDetails, setAddressDetails] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const userId = jwtDecode(sessionStorage.getItem('user')).sub;
            console.log(jwtDecode(sessionStorage.getItem('user')));
            console.log(userId);
            const userData = await fetchUserID(userId);
            const slotsData = await fetchSlots();
            const veterinasData = await fetchVeterinas();
            const ordersData = await fetchOrders();
            const servicesData = await fetchServices();

            console.log(userData);
            setUser(userData);
            setSlots(slotsData);
            setVeterinas(veterinasData);
            setOrders(ordersData);
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

        const ordersInSelectedSlot = orders.filter(order => order.slot === slot.slot && order.date === date.toISOString().split('T')[0]);
        const available = veterinas.filter(veterina => {
            return !ordersInSelectedSlot.some(order => order.veterinaID === veterina.veterinaID);
        });

        setAvailableVeterinas(available);
        setSelectedVeterina(null);

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
        setServiceQuantities(prevQuantities => ({
            ...prevQuantities,
            [serviceID]: quantity,
        }));
    };

    const handleUseMyAddress = () => {
        setUseMyAddress(!useMyAddress);
        if (!useMyAddress && user && user.address) {
            setSelectedAddress(user.address);
        } else {
            setSelectedAddress('');
        }
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

        console.log(newOrder);
        const result = await createOrder(newOrder);
        if (result.success) {
            alert('Đơn hàng của bạn đã được đặt thành công!');
        } else {
            alert('Đã có lỗi xảy ra khi đặt đơn hàng.');
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
                                {getNext7Days().map(day => (
                                    <td key={day}>
                                        <button onClick={() => handleSlotSelection(day, slot)}>
                                            Chọn
                                        </button>
                                    </td>
                                ))}
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
                        <option value="">-- Chọn Bác Sĩ --</option>
                        {availableVeterinas.map(veterina => (
                            <option key={veterina.veterinaID} value={veterina.veterinaID}>
                                {veterina.userID} - {veterina.description}
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
                            {service.name} (Giá: {service.price} VND)
                        </option>
                    ))}
                </select>
            </div>

            {/* Hiển thị dịch vụ đã chọn */}
            {selectedServices.length > 0 && (
                <div className="selected-services">
                    <h2>Dịch vụ đã chọn:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên Dịch Vụ</th>
                                <th>Số Lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedServices.map(serviceID => {
                                const service = services.find(s => s.serviceID === serviceID);
                                return (
                                    <tr key={serviceID}>
                                        <td>{service.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                value={serviceQuantities[serviceID] || 1}
                                                onChange={(e) => handleQuantityChange(serviceID, parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td>{service.price * (serviceQuantities[serviceID] || 1)} VND</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Địa chỉ */}
            <div>
                <h2>Địa chỉ:</h2>
                <label>
                    <input type="checkbox" checked={useMyAddress} onChange={handleUseMyAddress} />
                    Sử dụng địa chỉ của tôi
                </label>
                {useMyAddress ? (
                    <p>{user ? user.address : 'Không có địa chỉ đã lưu'}</p>
                ) : (
                    <div>
                        <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                            <option value="">-- Chọn Quận/Huyện --</option>
                            {addresses.map((address, index) => (
                                <option key={index} value={address}>{address}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Nhập chi tiết địa chỉ"
                            value={addressDetails}
                            onChange={(e) => setAddressDetails(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Đặt hàng */}
            <button onClick={handleBooking}>Đặt lịch</button>
        </div>
    );
};

export default OrdersForm;
