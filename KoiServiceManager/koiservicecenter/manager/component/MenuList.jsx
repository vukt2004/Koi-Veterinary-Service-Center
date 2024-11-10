import { Menu } from "antd";
import { PoweroffOutlined, DashboardOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <Menu theme="dark">
            <Menu.Item 
                    key="dashboard" 
                    icon={<DashboardOutlined />}
                    onClick={() => navigate('/manager')}
                    style={{
                        borderRadius: '6px',
                        marginBottom: '8px'
                    }}
                >
                    Dashboard
                </Menu.Item>
                
                <Menu.Item 
                    key="create-doctor" 
                    icon={<UserAddOutlined />}
                    onClick={() => navigate('/manager/create-doctor')}
                    style={{
                        borderRadius: '6px',
                        marginBottom: '8px'
                    }}
                >
                    Tạo Bác Sĩ
                </Menu.Item>
            <Menu.Item key="logout" icon={<PoweroffOutlined />}>
                <span onClick={handleLogout}>Đăng Xuất</span>
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;
