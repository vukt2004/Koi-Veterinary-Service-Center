import { useEffect, useState } from 'react';
import { fetchOrdersByVeterina, updateOrderStatus, addOrderDescription, fetchServices, addServiceToOrder, fetchTravelExpense, DeleteServiceInOrder, fetchUserID, initiatePayment, fetchInvoiceByOrderId } from '../src/config/api';
import { ToastContainer, toast } from 'react-toastify';
import FishTable from '../src/component/FishTable.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './VeterinaOrders.css'


const VeterinaOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [descriptions, setDescriptions] = useState({});
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({});
    const [travelExpenses, setTravelExpenses] = useState([]);
    const [userContacts, setUserContacts] = useState({});
    const [onlinePay, setOnlinePay] = useState({});
    const [orderPayments, setOrderPayments] = useState({});
    const [viewCustomerFish, setViewCustomerFish] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const storedVeterina = JSON.parse(sessionStorage.getItem('vetedata'));

            if (storedVeterina) {
                const ordersData = await fetchOrdersByVeterina(storedVeterina.veterinaID);
                console.log(ordersData);
                setOrders(ordersData);

                const servicesData = await fetchServices();
                setServices(servicesData);

                const travelExpensesData = await fetchTravelExpense();
                setTravelExpenses(travelExpensesData);

                const contacts = {};
                const payments = {};

                for (const order of ordersData) {
                    const contact = await getUserContact(order.userId);
                    contacts[order.userId] = contact;

                    const paymentStatus = await fetchInvoiceByOrderId(order.orderId);
                    payments[order.orderId] = paymentStatus;
                }
                setUserContacts(contacts);
                setOrderPayments(payments);
            }
        };


        loadData();
    }, []);

    const pendingOrders = orders.filter(order => order.status === 'pending');
    const acceptedOrders = orders.filter(order => order.status === 'accept');
    const completedOrders = orders.filter(order => order.status === 'done');

    const getUserContact = async (userId) => {
        try {
            const response = await fetchUserID(userId);
            return response ? response.phoneNumber : '';
        } catch (error) {
            console.error('Error fetching user contact:', error);
            return '';
        }
    };

    const handleDescriptionChange = (e, orderId) => {
        setDescriptions({
            ...descriptions,
            [orderId]: e.target.value,
        });
    };

    const handleAddDescription = async (orderId) => {
        if (descriptions[orderId]) {
            await addOrderDescription(orderId, descriptions[orderId]);
            toast.success('Description added successfully!');
            setDescriptions({ ...descriptions, [orderId]: '' });
            setTimeout(() => window.location.reload(), 2000);
        }
    };

    const handleStatusChange = async (orderId, status) => {
        await updateOrderStatus(orderId, status);
        toast.success(`Order ${orderId} status updated to ${status}!`);
        setTimeout(() => window.location.reload(), 2000);
    };

    const handleDoneOrder = async (orderId) => {
        if (onlinePay[orderId]) {
            const response = await initiatePayment(orderId, 'done');
            if (response) {
                window.location.href = response;
            } else {
                toast.success('Gặp lỗi khi hoàn thành. ')
            }
        } else {
            handleStatusChange(orderId, 'done');
        }
    }

    const handleViewCustomerFish = (userId) => {
        console.log(userId)
        setSelectedUserId(userId);
        setViewCustomerFish(true);
    };

    const closeModal = () => {
        setViewCustomerFish(false);
        setSelectedUserId(null);
    };

    const isServiceAvailable = (orderServices, serviceID) => {
        return !orderServices.some(service => service.serviceID === serviceID);
    };

    const calculateTotalPrice = (order) => {
        const serviceMap = new Map(services.map(service => [service.serviceID, service]));

        const travelExpense = travelExpenses.find(expense => expense.expenseID === order.travelExpenseId);
        const travelFee = travelExpense ? travelExpense.fee : 0;

        const processedServices = new Set();

        const totalServiceCost = order.services.reduce((total, service) => {
            if (!processedServices.has(service.serviceID)) {
                const matchingService = serviceMap.get(service.serviceID);
                if (matchingService) {
                    total += matchingService.price * service.quantity;
                    processedServices.add(service.serviceID);
                }
            }
            return total;
        }, 0);

        return totalServiceCost + travelFee;
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

    const handlePaymentChange = (orderId) => {
        setOnlinePay((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    const handleAddService = async (orderId) => {
        const { serviceID, quantity } = newService[orderId] || {};
        const selectedService = services.find(s => s.serviceID === serviceID);

        if (serviceID && quantity && selectedService) {
            const maxQuantity = selectedService.maxQuantity;
            if (quantity > maxQuantity) {
                toast.warn(`Số lượng tối đa cho dịch vụ ${selectedService.name} là ${maxQuantity}.`);
            } else {
                await addServiceToOrder(orderId, serviceID, parseInt(quantity));
                toast.success('Thêm dịch vụ thành công');
                setNewService({ ...newService, [orderId]: {} });
                setTimeout(() => window.location.reload(), 2000);
            }
        }
    };

    const handleDeleteServiceInOrder = async (orderId, serviceId) => {
        console.log(serviceId);
        const response = await DeleteServiceInOrder(orderId, serviceId);
        if (response) {
            toast.success('Xóa dịch xụ ra khỏi orders thành công');
            setTimeout(() => window.location.reload(), 2000);
        } else {
            toast.error('Xóa dịch vụ thất bại');
        }
    }

    const getServiceNameById = (serviceID) => {
        const service = services.find(s => s.serviceID === serviceID);
        return service ? service.name : serviceID;
    };

    return (
        <div className="veterina-orders">

            <h1>Veterina Orders Management</h1>

            <ToastContainer />

            <h2>Lịch hẹn chờ chấp thuận</h2>
            {pendingOrders.length > 0 ? (
                <table className="order-table" border='1'>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Địa chỉ</th>
                            <th>Ngày thực hiện</th>
                            <th>Slot</th>
                            <th>Dịch vụ</th>
                            <th>Cá</th>
                            <th>Hành động</th>
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
                                    <button className="pendingorder-button" onClick={() => handleViewCustomerFish(order.userId) }>Xem</button>
                                    
                                </td>
                                <td>
                                    <button className="pendingorder-button" onClick={() => handleStatusChange(order.orderId, 'accept')}>Accept</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Không có lịch hẹn nào chờ chấp thuận.</p>
            )}

            {viewCustomerFish && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <FishTable userID={selectedUserId} role={'V'} />
                    </div>
                </div>
            )}

            <h2>Accepted Orders</h2>
            <div className="accepted-orders">
                {acceptedOrders.length > 0 ? (
                    acceptedOrders.map(order => (
                        <div key={order.orderId} className="order-card">
                            <h3>Mã đơn: {order.orderId}</h3>
                            <p>Địa chỉ: {order.address}</p>
                            <p>Ngày thực hiện: {order.orderDate}</p>
                            <p>Slot: {order.slot}</p>
                            <p>Thông tin liên lạc: {userContacts[order.userId] || 'Loading...'}</p>
                            <p>Dịch vụ:
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>Dịch vụ</th>
                                            <th>Số lượng</th>
                                            <th>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.services.map(service => (
                                            <tr key={service.serviceID}>
                                                <td>{getServiceNameById(service.serviceID)}</td>
                                                <td>{service.quantity}</td>
                                                {orderPayments[order.orderId] ? <></> : (
                                                    <td><button className="order-button" onClick={() => handleDeleteServiceInOrder(order.orderId, service.serviceID)}>Delete</button></td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </p>
                            <p>Tổng chi phí: {calculateTotalPrice(order).toLocaleString('vi-VN')}</p>
                            <label>
                                Mô tả:
                                <input
                                    value={descriptions[order.orderId] || ''}
                                    onChange={(e) => handleDescriptionChange(e, order.orderId)}
                                />
                            </label>
                            <button className="order-button" onClick={() => handleAddDescription(order.orderId)}>Thêm mô tả</button>
                            <button className="order-button" onClick={() => handleViewCustomerFish(order.userId)}>Xem danh sách cá</button>
                            {orderPayments[order.orderId] ? (
                                <p>Đã thanh toán, không thể thay đổi dịch vụ.</p>
                            ) : (
                                <>
                                    <h4>Thêm dịch vụ</h4>
                                    <select
                                        name="serviceID"
                                        value={newService[order.orderId]?.serviceID || ''}
                                        onChange={(e) => handleServiceChange(e, order.orderId)}
                                    >
                                        <option value="">Chọn dịch vụ</option>
                                        {services.map(service => (
                                            isServiceAvailable(order.services, service.serviceID) && (
                                                <option key={service.serviceID} value={service.serviceID}>
                                                    {service.name}
                                                </option>
                                            )
                                        ))}
                                    </select>
                                    <label>
                                        Quantity:
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={newService[order.orderId]?.quantity || ''}
                                            min="1"
                                            max={services.find(s => s.serviceID === newService[order.orderId]?.serviceID)?.maxQuantity || ''}
                                            onChange={(e) => handleServiceChange(e, order.orderId)}
                                        />
                                    </label>
                                    <button className="order-button" onClick={() => handleAddService(order.orderId)}>Thêm dịch vụ</button>
                                    <label>
                                        Thanh toán online<input type="checkbox" checked={onlinePay[order.orderId] | false} onChange={() => handlePaymentChange(order.orderId)} />
                                    </label>
                                </>
                            )}
                            <button className="order-button" onClick={() => handleDoneOrder(order.orderId)}>Hoàn thành</button>
                        </div>
                    ))
                ) : <p>Chưa có lịch hẹn được chấp thuận.</p>}
            </div>

            <h2>Lịch hẹn đã hoàn thành</h2>
            {completedOrders.length > 0 ? (
                <table className="order-table" border="1">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Địa chỉ</th>
                            <th>Ngày thực hiện</th>
                            <th>Slot</th>
                            <th>Dịch vụ</th>
                            <th>Mô tả</th>
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
                <p>Chưa có lịch hẹn hoàn thành.</p>
            )}
        </div>

    );
};

export default VeterinaOrdersPage;
