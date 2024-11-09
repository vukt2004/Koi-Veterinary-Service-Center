import { Menu } from "antd";
import { HomeOutlined, DatabaseOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserID } from "../../src/config/api.jsx";
import { getUserId } from '../../src/utils/utils.jsx';

const MenuList = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const token = sessionStorage.getItem('user');
            if (token) {
                setUser(await fetchUserID(getUserId()));
            }
        };
        loadUser();
    }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Menu theme="dark">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/staffPage">Trang Chủ</Link>
      </Menu.Item>
      <Menu.Item key="manageKoiService" icon={<DatabaseOutlined />}>
        <Link to="/staffPage/serviceManagement">Quản Lý Dịch Vụ</Link>
      </Menu.Item>
      <Menu.Item key="manageOrder" icon={<DatabaseOutlined />}>
        <Link to="/staffPage/orderManagement">Quản Lý Đặt Lịch</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<PoweroffOutlined />}>
        <span onClick={handleLogout}>Đăng Xuất</span>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
