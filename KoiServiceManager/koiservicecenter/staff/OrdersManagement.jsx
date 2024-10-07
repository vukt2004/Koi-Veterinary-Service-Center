import React, { useState } from 'react';

const mockOrders = [
    { orderID: 'O001', userID: 'U001', veterina: '', orderDate: '2024-10-01', slot: 3, address: '123 Street, Q1', status: 'not yet', description: '' },
    { orderID: 'O002', userID: 'U002', veterina: 'Dr. John Doe', orderDate: '2024-10-01', slot: 5, address: '456 Street, Q2', status: 'in process', description: '' },
    { orderID: 'O003', userID: 'U003', veterina: '', orderDate: '2024-10-02', slot: 2, address: '789 Street, Q3', status: 'not yet', description: '' },
    { orderID: 'O004', userID: 'U004', veterina: 'Dr. Jane Smith', orderDate: '2024-10-03', slot: 1, address: '321 Street, Q4', status: 'done', description: '' },
];

const mockVeterinas = [
    { veterinaID: 'V001', name: 'Dr. John Doe' },
    { veterinaID: 'V002', name: 'Dr. Jane Smith' },
    { veterinaID: 'V003', name: 'Dr. Albert Wong' },
];

const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState('not yet');
    const [orders, setOrders] = useState(mockOrders);
    const [selectedVeterina, setSelectedVeterina] = useState({});

    const filteredOrders = orders
        .filter((order) => order.status === activeTab)
        .sort((a, b) => (a.veterina === '' ? -1 : 1));

    const handleVeterinaSelect = (orderID, selectedVeterinaID) => {
        setSelectedVeterina({
            ...selectedVeterina,
            [orderID]: selectedVeterinaID,
        });
    };

    const handleSetVeterina = (orderID) => {
        const updatedOrders = orders.map((order) => {
            if (order.orderID === orderID && !order.veterina) {
                const selectedVeterinaID = selectedVeterina[orderID];
                const selectedVeterinaName = mockVeterinas.find((v) => v.veterinaID === selectedVeterinaID)?.name;
                return { ...order, veterina: selectedVeterinaName };
            }
            return order;
        });
        setOrders(updatedOrders);

        console.log(`Order ${orderID} updated with veterina ID: ${selectedVeterina[orderID]}`);
    };

    return (
        <div>
            <h1>Order Management</h1>

            <div>
                <button onClick={() => setActiveTab('not yet')}>Not Yet</button>
                <button onClick={() => setActiveTab('in process')}>In Process</button>
                <button onClick={() => setActiveTab('canceled')}>Canceled</button>
                <button onClick={() => setActiveTab('done')}>Done</button>
            </div>

            <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Order Date</th>
                        <th>Slot</th>
                        <th>Address</th>
                        <th>Veterina</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <tr key={order.orderID}>
                                <td>{order.orderID}</td>
                                <td>{order.userID}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.slot}</td>
                                <td>{order.address}</td>
                                <td>
                                    {order.veterina ? (
                                        order.veterina
                                    ) : (
                                        activeTab === 'not yet' && (
                                            <select
                                                onChange={(e) => handleVeterinaSelect(order.orderID, e.target.value)}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select Veterina
                                                </option>
                                                {mockVeterinas.map((veterina) => (
                                                    <option key={veterina.veterinaID} value={veterina.veterinaID}>
                                                        {veterina.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                </td>
                                <td>{order.status}</td>
                                <td>{order.description}</td>
                                <td>
                                    {!order.veterina && activeTab === 'not yet' && (
                                        <button
                                            onClick={() => handleSetVeterina(order.orderID)}
                                            disabled={!selectedVeterina[order.orderID]}
                                        >
                                            Set Veterina
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;
