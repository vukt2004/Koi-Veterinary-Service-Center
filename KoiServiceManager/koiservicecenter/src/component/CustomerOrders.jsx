import { useEffect, useState } from 'react';
import { fetchOrdersByUser, updateOrderStatus } from '../config/api.jsx';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = ({ userID }) => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrdersByUser(userID);
            const filteredOrders = fetchedOrders.filter(order => order.status !== 'cancel');
            setOrders(filteredOrders);
        };
        getOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await updateOrderStatus(orderId, 'cancel');
            const updatedOrders = await fetchOrdersByUser(userID);
            const filteredOrders = updatedOrders.filter(order => order.status !== 'cancel');
            setOrders(filteredOrders);
        } catch (error) {
            console.error('Failed to cancel order:', error);
        }
    };

    const handleGiveFeedback = (orderId) => {
        navigate(`/feedback/${orderId}`);
    };

    return (
        <div>
            <h2>Orders</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Veterina ID</th>
                        <th>Order Date</th>
                        <th>Slot</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.userId}</td>
                            <td>{order.veterinaId}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.slot}</td>
                            <td>{order.address}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status === 'pending' && (
                                    <button onClick={() => handleCancelOrder(order.orderId)}>Cancel</button>
                                )}
                                {order.status === 'done' && (
                                    <button onClick={() => handleGiveFeedback(order.orderId)}>Feedback</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerOrders;
