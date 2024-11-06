import { useEffect, useState } from 'react';
import { fetchSlots, fetchOrdersByVeterina } from '../src/config/api.jsx';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import './VeterinaSchedule.css';

const VeterinaSchedule = ({ veterinaId }) => {
    const [slots, setSlots] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        setUserRole(sessionStorage.getItem('role'));

        const loadData = async () => {
            try {
                const slotsData = await fetchSlots();
                setSlots(slotsData);

                if (veterinaId) {
                    const ordersData = await fetchOrdersByVeterina(veterinaId);
                    setOrders(ordersData);
                }
            } catch (error) {
                toast.error("Error loading data");
                console.error(error);
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

    const handleSelectSlot = (veterinaID, formattedDate, slot) => {
        console.log("Selected:", { veterinaID, formattedDate, slot });
    };

    return (
        <>
            <ToastContainer />
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

                                        return (
                                            <td key={day}>
                                                {userRole === 'C' && isDisabled ? (
                                                    <button
                                                        style={{
                                                            backgroundColor: '#3498db',
                                                            color: 'white'
                                                        }}
                                                        onClick={() => handleSelectSlot(veterinaId, formattedDate, slot.slot)}>
                                                        Chọn
                                                    </button>
                                                ) : userRole !== 'C' && slotOrder ? (
                                                    <button
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
        </>
    );
};

VeterinaSchedule.propTypes = {
    veterinaId: PropTypes.string.isRequired
};

export default VeterinaSchedule;
