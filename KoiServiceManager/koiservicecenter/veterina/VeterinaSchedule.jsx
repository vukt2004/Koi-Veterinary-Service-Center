import { useEffect, useState } from 'react';
import { fetchSlots, fetchOrdersByVeterina, fetchVeterinas, fetchServices } from '../src/config/api.jsx';
import PropTypes from 'prop-types';
import { getUserId } from '../src/utils/utils.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './VeterinaSchedule.css';

const VeterinaSchedule = ({ veterinaId: initialVeterinaId, onSlotSelect }) => {
    const [slots, setSlots] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [veterinaId, setVeterinaId] = useState(initialVeterinaId);
    const [selected, setSelected] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        setUserRole(sessionStorage.getItem('role'));
    }, []);

    useEffect(() => {
        if (userRole === 'V') {
            const getVeterinaId = async () => {
                const userId = getUserId();
                const veterinasData = await fetchVeterinas();
                const veterinaData = veterinasData.find(vet => vet.userID === userId);
                if (veterinaData) {
                    setVeterinaId(veterinaData.veterinaID);
                }
            };
            getVeterinaId();
        }
    }, [userRole]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const slotsData = await fetchSlots();
                setSlots(slotsData);

                const servicesData = await fetchServices();
                setServices(servicesData);

                if (veterinaId) {
                    const ordersData = await fetchOrdersByVeterina(veterinaId);
                    const sortedOrders = ordersData.filter(o => o.status !== 'cancel');
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        loadData();
    }, [veterinaId]);

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
        const formattedDate = date.toISOString().split('T')[0];
        console.log(orders)
        const order = orders.find(o => o.orderDate === formattedDate && o.slot === slot.slot)
        setSelected(order);
        console.log(selected)
    };

    const handleSelectSlot = (veterinaID, date, slot) => {
        onSlotSelect(veterinaID, date, slot);
    };

    const getServiceNameById = (serviceID) => {
        const service = services.find(s => s.serviceID === serviceID);
        return service ? service.name : serviceID;
    };

    return (
        <>
            <h1><b>Lịch của bác sĩ</b></h1>
            <section className="schedule-section slot-selection">
                <div className="schedule-slot-table-container">
                    <table className="schedule-slot-table" border="1">
                        <thead>
                            <tr>
                                <th>Slot</th>
                                {getNext7Days().map((day) => (
                                    <th key={day}>
                                        {day.toLocaleDateString("vi-VN", {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "numeric",
                                        })}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {slots.map((slot) => (
                                <tr key={slot.slot}>
                                    <td>
                                        {slot.startTime} - {slot.endTime}
                                    </td>
                                    {getNext7Days().map((day) => {
                                        const formattedDate = day.toISOString().split('T')[0];
                                        const slotOrder = orders.find(o => o.slot === slot.slot && o.orderDate === formattedDate);
                                        const isDisabled = !slotOrder;

                                        const slotDateTime = new Date(day);
                                        slotDateTime.setHours(
                                            slot.startTime.split(":")[0],
                                            slot.startTime.split(":")[1]
                                        );

                                        const currentDateTime = new Date();

                                        return (
                                            <td key={day}>
                                                {userRole === 'C' && isDisabled && slotDateTime > currentDateTime ? (
                                                    <button
                                                        style={{
                                                            backgroundColor: '#3498db',
                                                            color: 'white'
                                                        }}
                                                        onClick={() => handleSelectSlot(veterinaId, day, slot)}>
                                                        Chọn
                                                    </button>
                                                ) : userRole !== 'C' && slotOrder ? (
                                                    <button
                                                        onClick={() => !isDisabled && handleSlotSelection(day, slot)}
                                                        style={{
                                                            backgroundColor: slotOrder.status === 'pending' ? 'green' :
                                                                slotOrder.status === 'accept' ? 'yellow' :
                                                                    'gray',
                                                            color: 'black'
                                                        }}
                                                    >
                                                        {slotOrder.status === 'pending' ? "Pending" : slotOrder.status === 'accept' ? "Accepted" : "Done"}
                                                    </button>
                                                ) : null}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {selected && (
                <div key={selected.orderId} className="order-card">
                    <h3>Order ID: {selected.orderId}</h3>
                    <p>Address: {selected.address}</p>
                    <p>Date: {selected.orderDate}</p>
                    <p>Slot: {selected.slot}</p>
                    <p>Services:
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selected.services.map(service => (
                                    <tr key={service.serviceID}>
                                        <td>{getServiceNameById(service.serviceID)}</td>
                                        <td>{service.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </p>
                </div>
            )}
        </>
    );
};

VeterinaSchedule.propTypes = {
    veterinaId: PropTypes.string,
    onSlotSelect: PropTypes.func,
};

export default VeterinaSchedule;
