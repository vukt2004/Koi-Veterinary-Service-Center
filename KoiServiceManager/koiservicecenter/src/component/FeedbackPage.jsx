import { useEffect, useState } from 'react';
import { fetchOrderById, fetchInvoiceByOrderId, createFeedBack, fetchServices } from '../config/api.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from './StarRating.jsx';  // Import the star rating component

const FeedbackPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [services, setServices] = useState([]);
    const [invoiceId, setInvoiceId] = useState('');
    const [feedback, setFeedback] = useState({ comment: '', rating: 5 });
    const navigate = useNavigate();

    useEffect(() => {
        const getOrderAndInvoice = async () => {
            const fetchedOrder = await fetchOrderById(orderId);
            setOrder(fetchedOrder);

            const fetchedInvoice = await fetchInvoiceByOrderId(orderId);
            if (fetchedInvoice && !fetchedInvoice.error) {
                setInvoiceId(fetchedInvoice.invoiceId);
            }

            const servicesData = await fetchServices();
            setServices(servicesData);
        };
        getOrderAndInvoice();
    }, [orderId]);

    const getServiceNameById = (serviceID) => {
        const service = services.find(s => s.serviceID === serviceID);
        return service ? service.name : serviceID;
    };

    const handleSubmitFeedback = async () => {
        try {
            if (!invoiceId) {
                console.error('Invoice ID is not available');
                return;
            }
            await createFeedBack({
                comment: feedback.comment,
                rating: feedback.rating,
                invoiceId
            });
            alert('Feedback submitted successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    return (
        <div>
            {order ? (
                <>
                    <h2>Feedback for Order</h2>
                    <p>Ngày đặt dịch vụ: {order.orderDate}</p>
                    <p>Địa chỉ: {order.address}</p>
                    <p>Dịch vụ:</p>
                    <table border="1">
                        <thead>
                            <th>Tên dịch vụ</th>
                            <th>Số lượng</th>
                        </thead>
                        <tbody>
                            {order.services.map(service => (
                                <tr key={service.serviceID}>
                                    <td>{getServiceNameById(service.serviceID)}</td>
                                    <td>{service.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    

                    <h3>Leave Feedback</h3>
                    <textarea
                        name="comment"
                        value={feedback.comment}
                        placeholder="Write your comment here..."
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Rating:</label>
                    <StarRating rating={feedback.rating} setRating={(newRating) => setFeedback({ ...feedback, rating: newRating })} />
                    <br />
                    <button onClick={handleSubmitFeedback}>Submit Feedback</button>
                </>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
};

export default FeedbackPage;
