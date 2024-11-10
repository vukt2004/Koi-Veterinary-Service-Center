import { useState } from 'react';
import { Form, Input, Select, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, FileTextOutlined } from '@ant-design/icons';
import api from '../src/config/axios';
import { createVeterina } from '../src/config/api';

const { Title } = Typography;
const { Option } = Select;

const userLocation = [
    "Online",
    "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5",
    "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10",
    "Quận 11", "Quận 12", "Quận Bình Tân", "Quận Bình Thạnh",
    "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình",
    "Quận Tân Phú", "Huyện Bình Chánh", "Huyện Củ Chi",
    "Huyện Cần Giờ", "Huyện Hóc Môn", "Huyện Nhà Bè"
];

function CreateVeterina() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleSubmitRegister = async (values) => {
        setLoading(true);
        const completeAddress = values.selectedAddress === 'Online' 
            ? 'Online' 
            : `${values.addressDetails}, ${values.selectedAddress}`;

        try {
            const user = {
                userID: values.userID,
                email: values.email,
                password: values.password,
                name: values.fullName,
                phoneNumber: values.phone,
                address: completeAddress
            };

            const registerResponse = await api.post('/register', user);
            
            if (registerResponse?.data) {
                const veterinasData = {
                    userID: registerResponse.data.userID,
                    description: values.description
                };
                
                const veterinaResponse = await createVeterina(veterinasData);
                
                if (veterinaResponse) {
                    message.success('Tạo bác sĩ thành công');
                    form.resetFields();
                } else {
                    message.error('Tạo bác sĩ thất bại');
                }
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Đăng kí thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            padding: '24px',
            maxWidth: '800px',
            margin: '0 auto',
            minHeight: '100vh',
            background: '#f0f2f5'
        }}>
            <Card
                bordered={false}
                style={{
                    borderRadius: '12px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.03), 0 4px 8px rgba(0, 0, 0, 0.03)'
                }}
            >
                <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
                    Tạo Tài Khoản Bác Sĩ
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitRegister}
                    requiredMark={false}
                >
                    <Form.Item
                        name="userID"
                        label="Tài khoản"
                        rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            size="large"
                            placeholder="Nhập tài khoản"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />}
                            size="large"
                            placeholder="Nhập mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />}
                            size="large"
                            placeholder="Nhập họ và tên"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input 
                            prefix={<MailOutlined />}
                            size="large"
                            placeholder="Nhập email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input 
                            prefix={<PhoneOutlined />}
                            size="large"
                            placeholder="Nhập số điện thoại"
                        />
                    </Form.Item>

                    <Form.Item
                        name="selectedAddress"
                        label="Khu vực làm việc"
                        rules={[{ required: true, message: 'Vui lòng chọn khu vực!' }]}
                    >
                        <Select
                            size="large"
                            placeholder="Chọn quận/huyện (Online nếu ngoài Tp.HCM)"
                            onChange={(value) => setSelectedAddress(value)}
                        >
                            {userLocation.map((location) => (
                                <Option key={location} value={location}>
                                    {location}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {selectedAddress && selectedAddress !== 'Online' && (
                        <Form.Item
                            name="addressDetails"
                            label="Địa chỉ chi tiết"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                        >
                            <Input 
                                prefix={<EnvironmentOutlined />}
                                size="large"
                                placeholder="Nhập địa chỉ chi tiết"
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea 
                            prefix={<FileTextOutlined />}
                            size="large"
                            placeholder="Nhập mô tả về bác sĩ"
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            style={{
                                width: '100%',
                                height: '45px',
                                fontSize: '16px',
                                marginTop: '16px'
                            }}
                        >
                            {loading ? 'Đang xử lý...' : 'Tạo tài khoản'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default CreateVeterina;
