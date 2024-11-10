import { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Select, Typography, Statistic } from 'antd';
import { 
    ArrowUpOutlined, 
    ArrowDownOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    LineChartOutlined,
    CreditCardOutlined
} from '@ant-design/icons';
import { fetchOrders, fetchInvoices } from '../src/config/api.jsx';

const { Title } = Typography;
const { Option } = Select;

function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [timeFrame, setTimeFrame] = useState('all');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [hoveredData, setHoveredData] = useState(null); // Track hovered data
    const dayChartRef = useRef(null);
    const monthChartRef = useRef(null);

    useEffect(() => {
        fetchOrders().then((data) => {
            setOrders(data);
            filterOrders(data, timeFrame);
        });
        fetchInvoices().then((data) => {
            setInvoices(data);
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

    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);

    const paymentRatio = () => {
        const onlinePayments = invoices.filter(invoice => invoice.method === 'online').length;
        const cashPayments = invoices.filter(invoice => invoice.method === 'cash').length;
        const totalPayments = onlinePayments + cashPayments;
        return {
            onlinePercentage: totalPayments ? ((onlinePayments / totalPayments) * 100).toFixed(2) : 0,
            cashPercentage: totalPayments ? ((cashPayments / totalPayments) * 100).toFixed(2) : 0,
        };
    };

    const completedOrdersCount = filteredOrders.filter(order => order.status === 'done').length;

    const orderCountByStatus = (status) => filteredOrders.filter(order => order.status === status).length;
    const totalOrders = filteredOrders.length;
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


    const handleMouseMove = (e, canvas, labels, data) => {
        const canvasRect = canvas.getBoundingClientRect();
        const x = e.clientX - canvasRect.left;  // Mouse X position relative to canvas
        const y = e.clientY - canvasRect.top; 

        const barWidth = (canvas.width - 40) / data.length;

        // Check if mouse is over any bar or point
        const index = Math.floor((x - 20) / barWidth);
        if (index >= 0 && index < data.length) {
            setHoveredData({ label: labels[index], value: data[index] });
        } else {
            setHoveredData(null);
        }

    };

    useEffect(() => {
        if (dayChartRef.current) {
            const canvas = dayChartRef.current;
            canvas.addEventListener('mousemove', (e) => handleMouseMove(e, canvas, Object.keys(ordersByDay), Object.values(ordersByDay)));
            drawChart(canvas, Object.keys(ordersByDay), Object.values(ordersByDay), 'line');
        }

        if (monthChartRef.current) {
            const canvas = monthChartRef.current;
            canvas.addEventListener('mousemove', (e) => handleMouseMove(e, canvas, Object.keys(ordersByMonth), Object.values(ordersByMonth)));
            drawChart(canvas, Object.keys(ordersByMonth), Object.values(ordersByMonth), 'bar');
        }
    }, [ordersByDay, ordersByMonth]);

    return (
        <div className="dashboard-container" style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2} style={{ margin: 0 }}>Thống Kê Tổng Quan</Title>
                <Select
                    value={timeFrame}
                    onChange={(value) => setTimeFrame(value)}
                    style={{ width: 200 }}
                    size="large"
                >
                    <Option value="all">Tất cả thời gian</Option>
                    <Option value="week">7 ngày qua</Option>
                    <Option value="month">30 ngày qua</Option>
                </Select>
            </div>

            <Row gutter={[24, 24]}>
                {/* Revenue Card */}
                <Col xs={24} sm={12} lg={8} xl={6}>
                    <Card 
                        hoverable 
                        className="dashboard-card"
                        style={{ 
                            borderRadius: '12px',
                            height: '100%'
                        }}
                    >
                        <Statistic
                            title={<span style={{ fontSize: '16px', color: '#8c8c8c' }}>Tổng Doanh Thu</span>}
                            value={totalRevenue}
                            prefix={<DollarOutlined />}
                            suffix="VND"
                            valueStyle={{ color: '#52c41a', fontSize: '24px' }}
                        />
                    </Card>
                </Col>

                {/* Payment Ratio Card */}
                <Col xs={24} sm={12} lg={8} xl={6}>
                    <Card 
                        hoverable 
                        className="dashboard-card"
                        style={{ borderRadius: '12px' }}
                    >
                        <Statistic
                            title={<span style={{ fontSize: '16px', color: '#8c8c8c' }}>Thanh Toán Online</span>}
                            value={paymentRatio().onlinePercentage}
                            prefix={<CreditCardOutlined />}
                            suffix="%"
                            valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                        />
                        <Statistic
                            title={<span style={{ fontSize: '16px', color: '#8c8c8c', marginTop: '16px' }}>Thanh Toán Tiền Mặt</span>}
                            value={paymentRatio().cashPercentage}
                            suffix="%"
                            valueStyle={{ color: '#faad14', fontSize: '24px' }}
                        />
                    </Card>
                </Col>

                {/* Completed Orders Card */}
                <Col xs={24} sm={12} lg={8} xl={6}>
                    <Card 
                        hoverable 
                        className="dashboard-card"
                        style={{ borderRadius: '12px' }}
                    >
                        <Statistic
                            title={<span style={{ fontSize: '16px', color: '#8c8c8c' }}>Lịch Hẹn Hoàn Thành</span>}
                            value={completedOrdersCount}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a', fontSize: '24px' }}
                        />
                    </Card>
                </Col>

                {/* Growth Rate Card */}
                <Col xs={24} sm={12} lg={8} xl={6}>
                    <Card 
                        hoverable 
                        className="dashboard-card"
                        style={{ borderRadius: '12px' }}
                    >
                        <Statistic
                            title={<span style={{ fontSize: '16px', color: '#8c8c8c' }}>Tỉ Lệ Tăng Trưởng</span>}
                            value={calculateGrowthRate()}
                            prefix={parseFloat(calculateGrowthRate()) >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="%"
                            valueStyle={{ 
                                color: parseFloat(calculateGrowthRate()) >= 0 ? '#52c41a' : '#ff4d4f',
                                fontSize: '24px'
                            }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                <Col xs={24} lg={12}>
                    <Card 
                        title={<Title level={4}>Biểu Đồ Theo Ngày</Title>}
                        style={{ borderRadius: '12px' }}
                    >
                        <canvas
                            ref={dayChartRef}
                            width="500"
                            height="300"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card 
                        title={<Title level={4}>Biểu Đồ Theo Tháng</Title>}
                        style={{ borderRadius: '12px' }}
                    >
                        <canvas
                            ref={monthChartRef}
                            width="500"
                            height="300"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Hover Tooltip */}
            {hoveredData && (
                <div style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    zIndex: 1000,
                    pointerEvents: 'none',
                }}>
                    <p style={{ margin: 0 }}><strong>{hoveredData.label}</strong>: {hoveredData.value}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
