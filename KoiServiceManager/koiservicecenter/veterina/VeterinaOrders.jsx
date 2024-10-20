import React, { useEffect, useState } from 'react';
import { fetchOrdersByVeterina, updateOrderStatus, addOrderDescription, fetchServices, addServiceToOrder } from '../src/config/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Importing react-toastify
import 'react-toastify/dist/ReactToastify.css'; // npm install react-toastify

const VeterinaOrdersPage = () => {
    const [veterina, setVeterina] = useState(null);
    const [orders, setOrders] = useState([]);
    const [descriptions, setDescriptions] = useState({});
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({});
    const [validationMessage, setValidationMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const storedVeterina = JSON.parse(sessionStorage.getItem('vetedata'));

            if (storedVeterina) {
                setVeterina(storedVeterina);
                const ordersData = await fetchOrdersByVeterina(storedVeterina.veterinaID);
                setOrders(ordersData);

                const servicesData = await fetchServices();
                setServices(servicesData);
            }
        };
        loadData();
    }, []);

    const handleDescriptionChange = (e, orderId) => {
        setDescriptions({
            ...descriptions,
            [orderId]: e.target.value,
        });
    };

    const handleAddDescription = async (orderId) => {
        if (descriptions[orderId]) {
            await addOrderDescription(orderId, descriptions[orderId]);
            toast.success('Description added successfully!'); // Success toast

            setDescriptions({ ...descriptions, [orderId]: '' });
            setTimeout(() => window.location.reload(), 2000); // Reload after a delay to show the toast
        }
    };

    const handleStatusChange = async (orderId, status) => {
        await updateOrderStatus(orderId, status);
        console.log('Updating Order:', orderId, 'to Status:', status);
        toast.success(`Order status updated to ${status}!`); 
        //setTimeout(() => window.location.reload(), 2000); // Reload after a delay
    };

    const viewCustomerFish = (userId) => {
        navigate(`/fish/${userId}`);
    };

    const isServiceAvailable = (orderServices, serviceID) => {
        return !orderServices.some(service => service.serviceID === serviceID);
    };

    const handleServiceChange = (e, orderId) => {
        const { name, value } = e.target;
        setNewService({
            ...newService,
            [orderId]: {
                ...newService[orderId],
                [name]: value,
            }
        });
    };

    const handleAddService = async (orderId) => {
        const { serviceID, quantity } = newService[orderId] || {};
        const selectedService = services.find(s => s.serviceID === serviceID);

        if (serviceID && quantity && selectedService) {
            const maxQuantity = selectedService.maxQuantity;
            if (quantity > maxQuantity) {
                setValidationMessage(`The maximum quantity for ${selectedService.name} is ${maxQuantity}.`);
                toast.warn(`The maximum quantity for ${selectedService.name} is ${maxQuantity}.`); // Warning toast
            } else {
                await addServiceToOrder(orderId, serviceID, parseInt(quantity));
                toast.success('Service added successfully!'); // Success toast

                setNewService({ ...newService, [orderId]: {} });
                setValidationMessage('');
                setTimeout(() => window.location.reload(), 2000); // Reload after a delay
            }
        }
    };

    const getServiceNameById = (serviceID) => {
        const service = services.find(s => s.serviceID === serviceID);
        return service ? service.name : serviceID;
    };

    const pendingOrders = orders.filter(order => order.status === 'pending');
    const acceptedOrders = orders.filter(order => order.status === 'accept');
    const completedOrders = orders.filter(order => order.status === 'done');

    return (
        <div>
            <h1>Veterina Orders Management</h1>

            {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}

            <ToastContainer /> {/* Toast notification container */}

            {/* Pending Orders Table */}
            <h2>Pending Orders</h2>
            {pendingOrders.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Services</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingOrders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.address}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.slot}</td>
                                <td>
                                    {order.services.map(service => (
                                        <span key={service.serviceID}>
                                            {getServiceNameById(service.serviceID)} (Qty: {service.quantity}){' '}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <button onClick={() => viewCustomerFish(order.veterinaId)}>ViewCustomer Fish</button>
                                    <button onClick={() => handleStatusChange(order.orderId, 'accept')}>Accept</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pending orders.</p>
            )}

            {/* Accepted Orders - Card Format */}
            <h2>Accepted Orders</h2>
            <div className="accepted-orders">
                {acceptedOrders.length > 0 ? (
                    acceptedOrders.map(order => (
                        <div key={order.orderId} className="order-card">
                            <h3>Order ID: {order.orderId}</h3>
                            <p>Address: {order.address}</p>
                            <p>Date: {order.orderDate}</p>
                            <p>Slot: {order.slot}</p>
                            <p>Services: {order.services.map(service => (
                                <span key={service.serviceID}>
                                    {getServiceNameById(service.serviceID)} (Qty: {service.quantity}){' '}
                                </span>
                            ))}</p>

                            <label>
                                Description:
                                <input
                                    value={descriptions[order.orderId] || ''}
                                    onChange={(e) => handleDescriptionChange(e, order.orderId)}
                                />
                            </label>
                            <button onClick={() => handleAddDescription(order.orderId)}>Add Description</button>

                            <h4>Add Service</h4>
                            <select
                                name="serviceID"
                                value={newService[order.orderId]?.serviceID || ''}
                                onChange={(e) => handleServiceChange(e, order.orderId)}
                            >
                                <option value="">Select Service</option>
                                {services
                                    .filter(service => isServiceAvailable(order.services, service.serviceID))
                                    .map(service => (
                                        <option key={service.serviceID} value={service.serviceID}>
                                            {service.name}
                                        </option>
                                    ))}
                            </select>
                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                value={newService[order.orderId]?.quantity || ''}
                                onChange={(e) => handleServiceChange(e, order.orderId)}
                            />
                            <button onClick={() => handleAddService(order.orderId)}>Add Service</button>

                            <button onClick={() => handleStatusChange(order.orderId, 'done')}>Done</button>
                        </div>
                    ))
                ) : (
                    <p>No accepted orders.</p>
                )}
            </div>

            {/* Completed Orders Table */}
            <h2>Completed Orders</h2>
            {completedOrders.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Services</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedOrders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.address}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.slot}</td>
                                <td>
                                    {order.services.map(service => (
                                        <span key={service.serviceID}>
                                            {getServiceNameById(service.serviceID)} (Qty: {service.quantity}){' '}
                                        </span>
                                    ))}
                                </td>
                                <td>{order.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No completed orders.</p>
            )}
        </div>
    );
};

export default VeterinaOrdersPage;
