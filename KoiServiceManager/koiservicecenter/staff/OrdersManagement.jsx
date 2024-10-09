import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchVeterinas, updateOrderStatus } from '../src/config/api.jsx';

const StaffOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [veterinas, setVeterinas] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const ordersData = await fetchOrders();
            const veterinasData = await fetchVeterinas();
            setOrders(ordersData);
            setVeterinas(veterinasData);
        };
        loadOrders();
    }, []);

    const handleChangeStatus = async (orderId, status) => {
        await updateOrderStatus(orderId, status);
        const updatedOrders = orders.map(order =>
            order.orderID === orderId ? { ...order, status } : order
        );
        setOrders(updatedOrders);
    };

    const renderNotYetOrders = () => {
        const notYetOrders = orders.filter(order => order.status === 'notYet');
        return notYetOrders.map(order => {
            const veterina = veterinas.find(v => v.veterinaID === order.veterinaID);
            return (
                <tr key={order.orderID}>
                    <td>{order.orderID}</td>
                    <td>{veterina ? veterina.name : 'Chưa có bác sĩ'}</td>
                    <td>
                        <button onClick={() => handleChangeStatus(order.orderID, 'inProcess')}>In Process</button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div>
            <h1>Quản lý đơn đặt hàng</h1>
            <h2>Đơn hàng chưa xử lý</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Bác sĩ</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>{renderNotYetOrders()}</tbody>
            </table>
        </div>
    );
};

export default StaffOrdersPage;
