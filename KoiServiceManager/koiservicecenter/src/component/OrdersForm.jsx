import React, { useEffect, useState } from 'react';
import { fetchSlots, fetchVeterinas, fetchOrders, fetchServices, fetchAddresses, createOrder } from './api';

const OrdersPage = () => {
    const [slots, setSlots] = useState([]);
    const [veterinas, setVeterinas] = useState([]);
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [availableVeterinas, setAvailableVeterinas] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [useMyAddress, setUseMyAddress] = useState(false);
    const [addressDetails, setAddressDetails] = useState(''); // New state for detailed address
    const [description, setDescription] = useState('');
    const currentTime = new Date();

    useEffect(() => {
        const loadData = async () => {
            const slotsData = await fetchSlots();
            const veterinasData = await fetchVeterinas();
            const ordersData = await fetchOrders();
            const servicesData = await fetchServices();
            const addressesData = await fetchAddresses();

            setSlots(slotsData);
            setVeterinas(veterinasData);
            setOrders(ordersData);
            setServices(servicesData);
            setAddresses(addressesData);
            setUsers(JSON.parse(localStorage.getItem('user')) || {});
        };

        loadData();
    }, []);

    // Filter available slots
    const getAvailableSlots = () => {
        return slots.filter(slot => {
            const slotStartTime = new Date();
            const [hours, minutes, seconds] = slot.startTime.split(':');
            slotStartTime.setHours(hours, minutes, seconds);
            return slotStartTime > currentTime;
        });
    };

    // Handle slot selection
    const handleSlotChange = (slotId) => {
        setSelectedSlot(slotId);

        const ordersInSelectedSlot = orders.filter(order => order.slot === slotId);

        const available = veterinas.filter(veterina => {
            return !ordersInSelectedSlot.some(order => order.veterinaID === veterina.veterinaID);
        });

        setAvailableVeterinas(available);

        if (available.length === 0) {
            alert('Không có bác sĩ nào khả dụng cho slot này, vui lòng chọn slot khác.');
            setSelectedSlot(null);
        }
    };

    // Handle multi-service selection
    const handleServiceSelection = (serviceID) => {
        setSelectedServices(prevServices =>
            prevServices.includes(serviceID)
                ? prevServices.filter(id => id !== serviceID)
                : [...prevServices, serviceID]
        );
    };

    // Handle using user's saved address
    const handleUseMyAddress = () => {
        setUseMyAddress(!useMyAddress);
        if (!useMyAddress && users && users.address) {
            setSelectedAddress(users.address); // Automatically set user's address
        } else {
            setSelectedAddress('');
        }
    };

    // Handle booking (create order)
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

        const completeAddress = `${addressDetails}, ${selectedAddress}`; // Combine detailed address with selected district

        const user = users.find(u => u.userID);

        const newOrder = {
            userID: user ? user.userID : null,
            veterinaID: null,
            slot: selectedSlot,
            services: selectedServices,
            address: completeAddress, // Use the complete address here
            description: description,
            status: 'pending',
        };

        const result = await createOrder(newOrder);
        if (result.success) {
            alert('Đơn hàng của bạn đã được đặt thành công!');
        } else {
            alert('Đã có lỗi xảy ra khi đặt đơn hàng.');
        }
    };

    return (
        <div>
            <h1>Quản lý đơn đặt hàng</h1>

            {/* Slot selection */}
            <div>
                <label>Chọn Slot:</label>
                <select onChange={(e) => handleSlotChange(e.target.value)} value={selectedSlot || ''}>
                    <option value="" disabled>-- Chọn Slot --</option>
                    {getAvailableSlots().map(slot => (
                        <option key={slot.slot} value={slot.slot}>
                            {slot.startTime} - {slot.endTime}
                        </option>
                    ))}
                </select>
            </div>

            {/* Service selection */}
            <div>
                <label>Chọn Dịch Vụ:</label>
                {services.map(service => (
                    <div key={service.serviceID}>
                        <input
                            type="checkbox"
                            checked={selectedServices.includes(service.serviceID)}
                            onChange={() => handleServiceSelection(service.serviceID)}
                        />
                        <span>{service.name}</span>
                    </div>
                ))}
            </div>

            {/* Address selection */}
            <div>
                <label>Chọn Địa Chỉ:</label>
                <input
                    type="checkbox"
                    checked={useMyAddress}
                    onChange={handleUseMyAddress}
                />
                <label>Dùng địa chỉ của tôi ({users.address || 'Chưa có địa chỉ'})</label>

                {!useMyAddress && (
                    <div>
                        {/* Input for detailed address */}
                        <input
                            type="text"
                            placeholder="Số nhà, tên đường"
                            value={addressDetails}
                            onChange={(e) => setAddressDetails(e.target.value)}
                        />

                        {/* Dropdown for selecting district */}
                        <select onChange={(e) => setSelectedAddress(e.target.value)} value={selectedAddress || ''}>
                            <option value="" disabled>-- Chọn Quận/Huyện --</option>
                            {addresses.map(address => (
                                <option key={address} value={address}>
                                    {address}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Booking button */}
            <button onClick={handleBooking}>Đặt hàng</button>
        </div>
    );
};

export default OrdersPage;
