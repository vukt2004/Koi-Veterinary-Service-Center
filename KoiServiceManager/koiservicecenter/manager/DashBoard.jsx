import React, { useState, useEffect, useRef } from 'react';
import { fetchOrders } from '../src/config/api.jsx';

function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [timeFrame, setTimeFrame] = useState('all');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const dayChartRef = useRef(null);
    const monthChartRef = useRef(null);
    const statusChartRef = useRef(null);

    useEffect(() => {
        fetchOrders().then((data) => {
            setOrders(data);
            filterOrders(data, timeFrame);
        });
    }, []);

    const filterOrders = (orders, frame) => {
        const now = new Date();
        let filtered;
        if (frame === 'week') {
            filtered = orders.filter(order => new Date(order.orderDate) >= new Date(now.setDate(now.getDate() - 7)));
        } else if (frame === 'month') {
            filtered = orders.filter(order => new Date(order.orderDate) >= new Date(now.setMonth(now.getMonth() - 1)));
        } else {
            filtered = orders;
        }
        setFilteredOrders(filtered);
    };

    useEffect(() => {
        filterOrders(orders, timeFrame);
    }, [timeFrame, orders]);

    const orderCountByStatus = (status) => filteredOrders.filter(order => order.status === status).length;
    const totalOrders = filteredOrders.length;
    const completedOrders = orderCountByStatus('completed');
    const cancelRate = totalOrders ? ((orderCountByStatus('cancel') / totalOrders) * 100).toFixed(2) : 0;

    const ordersByDay = filteredOrders.reduce((acc, order) => {
        const date = order.orderDate.split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const ordersByMonth = filteredOrders.reduce((acc, order) => {
        const month = order.orderDate.slice(0, 7);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const calculateGrowthRate = () => {
        const previousPeriodOrders = orders.slice(0, Math.max(0, orders.length - filteredOrders.length));
        const previousTotal = previousPeriodOrders.length;
        const growthRate = previousTotal ? ((totalOrders - previousTotal) / previousTotal * 100).toFixed(2) : 0;
        return growthRate;
    };

    const orderStatusBreakdown = () => {
        const statuses = [...new Set(orders.map(order => order.status))];
        return statuses.map(status => ({
            status,
            count: orderCountByStatus(status),
            percentage: ((orderCountByStatus(status) / totalOrders) * 100).toFixed(2),
        }));
    };

    const topCustomers = () => {
        const customerOrders = filteredOrders.reduce((acc, order) => {
            acc[order.customer] = (acc[order.customer] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(customerOrders)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([customer, count]) => ({ customer, count }));
    };

    const drawChart = (canvas, labels, data, type) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const maxData = Math.max(...data);
        const chartHeight = canvas.height - 40;
        const chartWidth = canvas.width - 40;
        const barWidth = chartWidth / data.length;
        const scaleFactor = chartHeight / maxData;

        ctx.fillStyle = type === 'bar' ? 'rgba(153, 102, 255, 0.6)' : 'rgba(75, 192, 192, 1)';
        ctx.strokeStyle = type === 'line' ? 'rgba(75, 192, 192, 1)' : '';

        data.forEach((value, index) => {
            const x = 20 + index * barWidth;
            const y = canvas.height - 20 - value * scaleFactor;

            if (type === 'bar') {
                ctx.fillRect(x, y, barWidth - 10, value * scaleFactor);
            } else if (type === 'line') {
                if (index > 0) {
                    ctx.beginPath();
                    ctx.moveTo(20 + (index - 1) * barWidth + barWidth / 2, canvas.height - 20 - data[index - 1] * scaleFactor);
                    ctx.lineTo(x + barWidth / 2, y);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(x + barWidth / 2, y, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        });

        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        labels.forEach((label, index) => {
            const x = 20 + index * barWidth;
            ctx.fillText(label, x + barWidth / 2 - ctx.measureText(label).width / 2, canvas.height - 5);
        });
    };

    useEffect(() => {
        if (dayChartRef.current) drawChart(dayChartRef.current, Object.keys(ordersByDay), Object.values(ordersByDay), 'line');
        if (monthChartRef.current) drawChart(monthChartRef.current, Object.keys(ordersByMonth), Object.values(ordersByMonth), 'bar');
    }, [ordersByDay, ordersByMonth]);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h2 style={{ color: '#333' }}>Dashboard</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <h3>Total Orders</h3>
                    <p style={{ fontSize: '1.5em' }}>{totalOrders}</p>
                </div>
                <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <h3>Cancel Rate</h3>
                    <p style={{ fontSize: '1.5em', color: '#f00' }}>{cancelRate}%</p>
                </div>
                <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <h3>Order Growth Rate</h3>
                    <p style={{ fontSize: '1.5em', color: '#007bff' }}>{calculateGrowthRate()}%</p>
                </div>
                <div>
                    <label htmlFor="time-frame" style={{ fontWeight: 'bold' }}>Filter by:</label>
                    <select id="time-frame" onChange={(e) => setTimeFrame(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
                        <option value="all">All Time</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last Month</option>
                    </select>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Orders per Day</h3>
                <canvas ref={dayChartRef} width="600" height="200" style={{ border: '1px solid #ddd', borderRadius: '5px' }}></canvas>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Orders per Month</h3>
                <canvas ref={monthChartRef} width="600" height="200" style={{ border: '1px solid #ddd', borderRadius: '5px' }}></canvas>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Top 5 Customers by Orders</h3>
                <ul>
                    {topCustomers().map((customer, index) => (
                        <li key={index}>{customer.customer}: {customer.count} orders</li>
                    ))}
                </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Order Status Breakdown</h3>
                <canvas ref={statusChartRef} width="400" height="200" style={{ border: '1px solid #ddd', borderRadius: '5px' }}></canvas>
            </div>
        </div>
    );
}

export default Dashboard;
