import React, { useEffect, useState } from 'react';
import { fetchSlots, fetchVeterinas, fetchOrders, fetchServices, fetchUsers } from './api';

const OrdersPage = () => {
    const [slots, setSlots] = useState([]);
    const [veterinas, setVeterinas] = useState([]);
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [availableVeterinas, setAvailableVeterinas] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const currentTime = new Date(); 

    useEffect(() => {
        const loadData = async () => {
            const slotsData = await fetchSlots();
            const veterinasData = await fetchVeterinas();
            const ordersData = await fetchOrders();
            const servicesData = await fetchServices();
            const usersData = await fetchUsers();

            setSlots(slotsData);
            setVeterinas(veterinasData);
            setOrders(ordersData);
            setServices(servicesData);
            setUsers(usersData);
        };

        loadData();
    }, []);

    const getAvailableSlots = () => {
        return slots.filter(slot => {
            const slotStartTime = new Date();
            const [hours, minutes, seconds] = slot.startTime.split(':');
            slotStartTime.setHours(hours, minutes, seconds);
            return slotStartTime > currentTime;
        });
    };

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

    const renderOrders = () => {
        return orders.map(order => {
            const user = users.find(u => u.userID === order.userID);
            const veterina = veterinas.find(v => v.veterinaID === order.veterinaID);
            return (
                <tr key={order.orderID}>
                    <td>{order.orderID}</td>
                    <td>{user ? user.name : 'N/A'}</td>
                    <td>{veterina ? veterina.name : 'Chưa có bác sĩ'}</td>
                    <td>{order.slot}</td>
                    <td>{order.status}</td>
                </tr>
            );
        });
    };

    return (
        <div>
            <h1>Quản lý đơn đặt hàng</h1>

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

            {selectedSlot && (
                <div>
                    <label>Chọn Bác Sĩ:</label>
                    <select>
                        <option value="" disabled>-- Chọn Bác Sĩ --</option>
                        {availableVeterinas.map(veterina => (
                            <option key={veterina.veterinaID} value={veterina.veterinaID}>
                                {veterina.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Bác sĩ</th>
                        <th>Slot</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>{renderOrders()}</tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
