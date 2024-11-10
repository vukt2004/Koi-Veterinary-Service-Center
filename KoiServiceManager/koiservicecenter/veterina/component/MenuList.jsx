import { Menu } from "antd";
import { HomeOutlined, DatabaseOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserId } from '../../src/utils/utils.jsx';
import { fetchVeterinas } from '../../src/config/api.jsx'

const MenuList = () => {
    const [veterinaID, setVeterinaID] = useState('');

    useEffect(() => {
        const VeterinaData = async () => {
            const userID = getUserId();
            const veterinasData = await fetchVeterinas();
            sessionStorage.setItem('vetedata', JSON.stringify(veterinasData.find(vet => vet.userID === userID)));
            setVeterinaID(JSON.parse(JSON.stringify(veterinasData.find(vet => vet.userID === userID))).veterinaID);
        }
        VeterinaData();
    }, []);
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <Menu theme="dark">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/veterinaPage">Trang Chủ</Link>
            </Menu.Item>
            <Menu.Item key="manageKoiService" icon={<DatabaseOutlined />}>
                <Link to="/veterinaPage/orders">Quản Lý Dịch Vụ</Link>
            </Menu.Item>
            <Menu.Item key="manageOrder" icon={<DatabaseOutlined />}>
                <Link to={`/veterinaPage/profile/${veterinaID}`}>Hồ sơ</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<PoweroffOutlined />}>
                <span onClick={handleLogout}>Đăng Xuất</span>
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;
