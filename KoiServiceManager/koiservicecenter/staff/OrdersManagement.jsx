import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { fetchOrders, fetchVeterinas, fetchUserID, addOrderVeterina, fetchServices, updateOrderStatus } from '../src/config/api.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [veterinas, setVeterinas] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [user, setUser] = useState(null);

    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(sessionStorage.getItem('currentPage')) || 1;
    });
    const [currentStatus, setCurrentStatus] = useState(() => {
        return sessionStorage.getItem('currentStatus') || 'pending';
    });
    const ordersPerPage = 10;

    useEffect(() => {
        const getUser = async () => {
            const userId = jwtDecode(sessionStorage.getItem('user')).sub;
            const userData = await fetchUserID(userId);
            if (userData.role !== 'M' && userData.role !== 'S') {
                Navigate('/');
            } else {
                setUser(userData);
            }
        };

        const fetchData = async () => {
            const ordersData = await fetchOrders();
            const veterinasData = await fetchVeterinas();
            const servicesData = await fetchServices();
            setServices(servicesData);
            setOrders(ordersData);
            setVeterinas(veterinasData.filter((vet) => vet.status === true));
            filterOrdersByStatus(currentStatus);  // Load current status on reload
        };

        getUser();
        fetchData();
    }, []);

    const filterOrdersByStatus = (status) => {
        const filtered = orders.filter((order) => order.status === status);
        setFilteredOrders(filtered);
        setCurrentStatus(status);
        setCurrentPage(1); // Reset to page 1 on status change
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        sessionStorage.setItem('currentPage', pageNumber);
    };

    const getServiceNameById = (serviceID) => {
        const service = services.find((s) => s.serviceID === serviceID);
        return service ? service.name : serviceID;
    };

    const isVeterinaAvailable = (veterinaId, orderDate, orderSlot) => {
        const veterinaOrders = orders.filter(
            (order) => order.veterinaId === veterinaId && order.orderDate === orderDate && order.slot === orderSlot
        );
        return veterinaOrders.length === 0;
    };

    const handleSelectVeterina = async (orderId, veterinaId) => {
        const response = await addOrderVeterina(orderId, veterinaId);
        if (response) {
            toast.success('Veterina added successfully!');
            setTimeout(() => window.location.reload(), 2000);
        } else {
            toast.error('Failed to add veterina');
        }
    };

    const handleCancel = async (orderID) => {
        const response = await updateOrderStatus(orderID, 'cancel');
        if (response) {
            toast.success('Order canceled successfully');
            setTimeout(() => window.location.reload(), 2000);
        } else {
            toast.error('Failed to cancel order');
        }
    };

    const sortedOrders = filteredOrders
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .sort((a, b) => (a.veterinaId === null ? -1 : 1));

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

    const renderPagination = () => {
        const pages = [];

        // Show "Prev" link if not on the first page
        if (currentPage > 1) {
            pages.push(
                <span key="prev" onClick={() => paginate(currentPage - 1)} style={{ cursor: 'pointer' }}>
                    « Prev
                </span>
            );
        }

        // Always show page 1
        pages.push(
            <span key="1" onClick={() => paginate(1)} style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}>
                1
            </span>
        );

        // Add "..." if there's a gap between page 1 and the current page when currentPage > 3
        if (currentPage > 3) {
            pages.push(<span key="start-ellipsis">...</span>);
        }

        // Show the current page if it's not the first or last page
        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(
                <span key="current" style={{ fontWeight: 'bold', cursor: 'default' }}>
                    {currentPage}
                </span>
            );
        }

        // Add "..." if there's a gap between the current page and the max page when near the end
        if (currentPage < totalPages - 2) {
            pages.push(<span key="end-ellipsis">...</span>);
        }

        // Always show the last page if there are multiple pages
        if (totalPages > 1) {
            pages.push(
                <span
                    key={totalPages}
                    onClick={() => paginate(totalPages)}
                    style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                >
                    {totalPages}
                </span>
            );
        }

        // Show "Next" link if not on the last page
        if (currentPage < totalPages) {
            pages.push(
                <span key="next" onClick={() => paginate(currentPage + 1)} style={{ cursor: 'pointer' }}>
                    Next »
                </span>
            );
        }

        return <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>{pages}</div>;
    };

    return (
        <div>
            <h1>Order Management</h1>
            <ToastContainer />
            <div>
                <button onClick={() => filterOrdersByStatus('pending')}>Pending</button>
                <button onClick={() => filterOrdersByStatus('accept')}>Accepted</button>
                <button onClick={() => filterOrdersByStatus('done')}>Completed</button>
                <button onClick={() => filterOrdersByStatus('cancel')}>Canceled</button>
            </div>

            <table border="1" style={{ margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Veterina</th>
                        <th>Date</th>
                        <th>Slot</th>
                        <th>Address</th>
                        <th>Services</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.userId}</td>
                            <td>
                                {order.veterinaId || order.status !== 'pending' ? (
                                    veterinas.find((vet) => vet.veterinaID === order.veterinaId)?.name || 'Unknown'
                                ) : (
                                    <select onChange={(e) => handleSelectVeterina(order.orderId, e.target.value)}>
                                        <option value="">Select Veterina</option>
                                        {veterinas
                                            .filter((vet) =>
                                                isVeterinaAvailable(vet.veterinaID, order.orderDate, order.slot)
                                            )
                                            .map((vet) => (
                                                <option key={vet.veterinaID} value={vet.veterinaID}>
                                                    {vet.name}
                                                </option>
                                            ))}
                                    </select>
                                )}
                            </td>
                            <td>{order.orderDate}</td>
                            <td>{order.slot}</td>
                            <td>{order.address}</td>
                            <td>
                                {order.services.map((service) => (
                                    <div key={service.serviceID}>
                                        <p>{getServiceNameById(service.serviceID)} - Qty: {service.quantity}</p>
                                    </div>
                                ))}
                            </td>
                            <td>{order.status}</td>
                            {order.status === 'pending' ? (
                                <td><button onClick={() => handleCancel(order.orderId)}>Cancel</button></td>
                            ) : (
                                <td></td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {renderPagination()}
            </div>
        </div>
    );
};

export default OrderManagement;
