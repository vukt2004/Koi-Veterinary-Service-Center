import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchServices, addService, deleteService, updateService } from '../src/config/api.jsx';
import { Table, Card, Button, Input, Form, Switch, Space, Typography, Popconfirm, Modal, InputNumber, Tag, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;

const { Search } = Input;
const { Option } = Select;

const ServiceManagement = () => {
    const [dichVu, setDichVu] = useState([]);
    const [dichVuMoi, setDichVuMoi] = useState({ name: '', type: '', price: '', maxQuantity: '', service: true });
    const [dichVuDangChinhSua, setDichVuDangChinhSua] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        const loadServices = async () => {
            const services = await fetchServices();
            setDichVu(services);
        };
        loadServices();
    }, []);

    const handleThemDichVu = async () => {
        const response = await addService(dichVuMoi);
        if (response) {
            toast.success('Thêm dịch vụ thành công');
            setDichVu([...dichVu, { ...dichVuMoi, serviceID: response.serviceID }]);
        } else {
            toast.error('Lỗi khi thêm dịch vụ');
        }
        setDichVuMoi({ name: '', type: '', price: '', maxQuantity: '', service: true });
    };

    const handleCapNhatDichVu = async () => {
        const updatedService = await updateService(dichVuDangChinhSua);
        if (updatedService) {
            toast.success('Cập nhật dịch vụ thành công');
            setDichVu(dichVu.map(dv => dv.serviceID === dichVuDangChinhSua.serviceID ? dichVuDangChinhSua : dv));
        } else {
            toast.error('Lỗi khi cập nhật dịch vụ');
        }
        setDichVuDangChinhSua(null);
    };

    const handleXoaDichVu = async (serviceID) => {

            const response = await deleteService(serviceID);
            if (response) {
                toast.success('Đã xóa dịch vụ thành công');
                setDichVu(dichVu.filter(dv => dv.serviceID !== serviceID));
            } else {
                toast.error('Lỗi khi xóa dịch vụ');
            }
    };

    const getFilteredServices = () => {
        return dichVu.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                service.type.toLowerCase().includes(searchText.toLowerCase()) ||
                                service.serviceID.toString().includes(searchText);
            const matchesType = filterType === 'all' || service.type === filterType;
            return matchesSearch && matchesType;
        });
    };

    const serviceTypes = [...new Set(dichVu.map(service => service.type))];

    const columns = [
        {
            title: 'Mã Dịch Vụ',
            dataIndex: 'serviceID',
            key: 'serviceID',
            width: 120,
        },
        {
            title: 'Tên Dịch Vụ',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            render: (text) => (
                <span className="service-name">{text}</span>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 150,
            render: (text) => (
                <Tag color="blue">{text}</Tag>
            ),
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            align: 'right',
            render: (price) => (
                <span className="price-tag">
                    {price.toLocaleString('vi-VN')} ₫
                </span>
            ),
        },
        {
            title: 'Số lượng tối đa',
            dataIndex: 'maxQuantity',
            key: 'maxQuantity',
            width: 130,
            align: 'center',
        },
        {
            title: 'Được phép đặt?',
            dataIndex: 'service',
            key: 'service',
            width: 120,
            align: 'center',
            render: (service) => (
                <Tag color={service ? 'success' : 'error'}>
                    {service ? 'Có' : 'Không'}
                </Tag>
            ),
        },
        {
            title: 'Hành Động',
            key: 'action',
            width: 170,
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />}
                        onClick={() => setDichVuDangChinhSua(record)}
                        className="action-button edit-button"
                        size="small"
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa dịch vụ này?"
                        onConfirm={() => handleXoaDichVu(record.serviceID)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button 
                            type="primary" 
                            danger 
                            icon={<DeleteOutlined />}
                            className="action-button delete-button"
                            size="small"
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="service-management">
            <div className="header">
                <Title level={2}>Quản Lý Dịch Vụ Cá Koi</Title>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={() => setIsAddModalVisible(true)}
                    size="large"
                    className="add-button"
                >
                    Thêm Dịch Vụ Mới
                </Button>
            </div>

            <div className="search-filter-container">
                <div className="search-wrapper">
                    <Input
                        placeholder="Tìm kiếm theo tên, loại hoặc mã dịch vụ..."
                        allowClear
                        size="large"
                        className="search-input"
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined style={{ color: '#bfbfbf', fontSize: '18px' }} />}
                    />
                </div>
                <Select
                    defaultValue="all"
                    onChange={setFilterType}
                    size="large"
                    className="type-filter"
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="all">Tất cả loại dịch vụ</Option>
                    {serviceTypes.map(type => (
                        <Option key={type} value={type}>{type}</Option>
                    ))}
                </Select>
            </div>

            <ToastContainer />

            <Table
                columns={columns}
                dataSource={getFilteredServices()}
                rowKey="serviceID"
                pagination={{ 
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} dịch vụ`
                }}
                className="service-table"
            />

            {/* Add Service Modal */}
            <Modal
                title={<div className="modal-title">Thêm Dịch Vụ Mới</div>}
                open={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                footer={null}
                width={600}
                className="service-modal"
            >
                <Form 
                    layout="vertical"
                    onFinish={() => {
                        handleThemDichVu();
                        setIsAddModalVisible(false);
                    }}
                >
                    <Form.Item 
                        label="Tên Dịch Vụ"
                        rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
                    >
                        <Input
                            placeholder="Nhập tên dịch vụ"
                            value={dichVuMoi.name}
                            onChange={(e) => setDichVuMoi({ ...dichVuMoi, name: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Loại"
                        rules={[{ required: true, message: 'Vui lòng nhập loại dịch vụ!' }]}
                    >
                        <Input
                            placeholder="Nhập loại dịch vụ"
                            value={dichVuMoi.type}
                            onChange={(e) => setDichVuMoi({ ...dichVuMoi, type: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Giá (VND)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá dịch vụ!' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Nhập giá dịch vụ"
                            value={dichVuMoi.price}
                            onChange={(value) => setDichVuMoi({ ...dichVuMoi, price: value })}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            min={0}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Số lượng đặt tối đa"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng tối đa!' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Nhập số lượng tối đa"
                            value={dichVuMoi.maxQuantity}
                            onChange={(value) => setDichVuMoi({ ...dichVuMoi, maxQuantity: value })}
                            min={1}
                        />
                    </Form.Item>
                    <Form.Item label="Cho phép đặt lịch?">
                        <Switch
                            checked={dichVuMoi.service}
                            onChange={(checked) => setDichVuMoi({ ...dichVuMoi, service: checked })}
                        />
                    </Form.Item>
                    <Form.Item className="form-actions">
                        <Space>
                            <Button 
                                onClick={() => setIsAddModalVisible(false)}
                                className="cancel-button"
                            >
                                Hủy
                            </Button>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                className="submit-button"
                            >
                                Thêm Dịch Vụ
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Service Modal */}
            <Modal
                title="Sửa Dịch Vụ"
                open={!!dichVuDangChinhSua}
                onCancel={() => setDichVuDangChinhSua(null)}
                footer={null}
                width={600}
            >
                {dichVuDangChinhSua && (
                    <Form layout="vertical">
                        <Form.Item label="Tên dịch vụ">
                            <Input
                                value={dichVuDangChinhSua.name}
                                onChange={(e) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, name: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Loại dịch vụ">
                            <Input
                                value={dichVuDangChinhSua.type}
                                onChange={(e) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, type: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Giá dịch vụ">
                            <InputNumber
                                style={{ width: '100%' }}
                                value={dichVuDangChinhSua.price}
                                onChange={(value) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, price: value })}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                        <Form.Item label="Số lượng đặt tối đa">
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                                value={dichVuDangChinhSua.maxQuantity}
                                onChange={(value) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, maxQuantity: value })}
                            />
                        </Form.Item>
                        <Form.Item label="Cho phép đặt lịch?">
                            <Switch
                                checked={dichVuDangChinhSua.service}
                                onChange={(checked) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, service: checked })}
                            />
                        </Form.Item>
                        <Form.Item className="form-actions">
                            <Space>
                                <Button 
                                    onClick={() => setDichVuDangChinhSua(null)}
                                    className="cancel-button"
                                >
                                    Hủy
                                </Button>
                                <Button 
                                    type="primary" 
                                    onClick={handleCapNhatDichVu}
                                    className="submit-button"
                                >
                                    Cập Nhật
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                )}
            </Modal>

            <style jsx>{`
                .service-management {
                    padding: 24px;
                    background: #f5f7fa;
                    min-height: 100vh;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    background: white;
                    padding: 16px 24px;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }

                :global(.add-button) {
                    background: #1890ff;
                    border-radius: 8px;
                    height: 40px;
                    padding: 0 24px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                :global(.service-table) {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }

                :global(.ant-table-thead > tr > th) {
                    background: #fafafa;
                    font-weight: 600;
                    border-bottom: 2px solid #f0f0f0;
                }

                :global(.ant-table-tbody > tr > td) {
                    border-bottom: 1px solid #f0f0f0;
                }

                :global(.ant-table-tbody > tr:hover > td) {
                    background: #f8f9ff !important;
                }

                :global(.service-name) {
                    font-weight: 500;
                    color: #1f1f1f;
                }

                :global(.price-tag) {
                    color: #52c41a;
                    font-weight: 600;
                    font-family: 'SF Mono', monospace;
                }

                :global(.action-button) {
                    min-width: 70px !important;
                    padding: 4px 8px !important;
                    height: 28px !important;
                    font-size: 12px !important;
                    border-radius: 6px !important;
                }

                :global(.action-button .anticon) {
                    font-size: 12px !important;
                }

                :global(.edit-button) {
                    width: 70px !important;
                }

                :global(.delete-button) {
                    width: 70px !important;
                }

                :global(.ant-tag) {
                    border-radius: 4px;
                    padding: 2px 8px;
                    font-size: 12px;
                }

                :global(.ant-pagination) {
                    margin: 16px 0;
                }

                :global(.ant-table-pagination) {
                    margin: 16px 0;
                    padding: 0 24px;
                }

                .search-filter-container {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 24px;
                    background: white;
                    padding: 16px;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }

                .search-wrapper {
                    flex: 1;
                    min-width: 0;
                }

                :global(.search-input) {
                    width: 100%;
                    border-radius: 8px;
                    height: 48px;
                    font-size: 16px;
                }

                :global(.search-input .ant-input) {
                    height: 48px;
                    padding: 0 16px 0 48px;
                }

                :global(.type-filter) {
                    width: 200px;
                    min-width: 200px;
                    border-radius: 8px;
                    height: 48px;
                }

                @media (max-width: 768px) {
                    .search-filter-container {
                        flex-direction: column;
                    }
                    
                    :global(.type-filter) {
                        width: 100%;
                    }
                }

                :global(.service-modal) {
                    .ant-modal-content {
                        border-radius: 12px;
                        overflow: hidden;
                    }

                    .ant-modal-header {
                        padding: 20px 24px;
                        border-bottom: 1px solid #f0f0f0;
                        margin-bottom: 0;
                    }

                    .ant-modal-body {
                        padding: 24px;
                    }

                    .ant-form-item {
                        margin-bottom: 24px;
                    }

                    .ant-form-item-label > label {
                        font-weight: 500;
                        color: #1f1f1f;
                    }

                    .ant-input, .ant-input-number {
                        padding: 8px 12px;
                        border-radius: 8px;
                    }

                    .ant-input:focus, .ant-input-number:focus {
                        box-shadow: 0 0 0 2px rgba(24,144,255,0.1);
                    }
                }

                :global(.modal-title) {
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f1f1f;
                }

                :global(.form-actions) {
                    margin-top: 32px;
                    margin-bottom: 0;
                    padding-top: 24px;
                    border-top: 1px solid #f0f0f0;
                    text-align: right;
                }

                :global(.cancel-button) {
                    min-width: 100px;
                }

                :global(.submit-button) {
                    min-width: 120px;
                }

                :global(.ant-form-item-required::before) {
                    color: #ff4d4f !important;
                }

                :global(.ant-switch) {
                    background-color: rgba(0,0,0,0.25);
                }

                :global(.ant-switch-checked) {
                    background-color: #52c41a;
                }
            `}</style>
        </div>
    );
};

export default ServiceManagement;
