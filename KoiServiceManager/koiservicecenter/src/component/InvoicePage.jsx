import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchOrderById, fetchVeterinas, fetchServices } from '../config/api.jsx'; // Fetch functions for data

const InvoicePage = () => {
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(null);
    const [veterinas, setVeterinas] = useState([]);
    const [services, setServices] = useState([]);

    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const invoiceId = queryParams.get('invoiceId');
    const total = queryParams.get('total');
    const invDate = queryParams.get('invDate');
    const orderId = queryParams.get('orderId');

    // Fetch veterina and service data, along with order details
    useEffect(() => {
        const fetchData = async () => {
            const order = await fetchOrderById(orderId);  // Fetch order details
            const veterinasData = await fetchVeterinas(); // Fetch all veterinas
            const servicesData = await fetchServices();   // Fetch all services

            setOrderDetails(order);
            setVeterinas(veterinasData);
            setServices(servicesData);
        };
        fetchData();
    }, [orderId]);

    // Function to get the veterina name by ID
    const getVeterinaName = (veterinaId) => {
        const veterina = veterinas.find((vet) => vet.veterinaID === veterinaId);
        return veterina ? veterina.name : 'Unknown Veterina';
    };

    // Function to get the service name by ID
    const getServiceName = (serviceId) => {
        const service = services.find((srv) => srv.serviceID === serviceId);
        return service ? service.name : 'Unknown Service';
    };

    if (!orderDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Invoice Details</h1>
            <div>
                <p><strong>Invoice ID:</strong> {invoiceId}</p>
                <p><strong>Total Amount:</strong> {total} ð</p>
                <p><strong>Invoice Date:</strong> {invDate}</p>
            </div>

            <h2>Order Information</h2>
            <div>
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>User ID:</strong> {orderDetails.userId}</p>
                <p><strong>Veterina:</strong> {getVeterinaName(orderDetails.veterinaId)}</p>
                <p><strong>Order Date:</strong> {orderDetails.orderDate}</p>
                <p><strong>Slot:</strong> {orderDetails.slot}</p>
                <p><strong>Address:</strong> {orderDetails.address}</p>

                <h3>Services</h3>
                <ul>
                    {orderDetails.services.map((service) => (
                        <li key={service.serviceID}>
                            {getServiceName(service.serviceID)} - Quantity: {service.quantity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InvoicePage;
