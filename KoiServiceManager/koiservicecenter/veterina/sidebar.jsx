import { Layout } from "antd";
import Logo from "./component/Logo";
import MenuList from "./component/MenuList";
import { Outlet } from "react-router-dom";
import "./Sidebar.css";

const { Sider } = Layout;
const VetSidebar = () => {
    return (
        <div className="page-container">
            <div className="siderbar-container">
                <Layout>
                    <Sider className="sidebar">
                        <Logo />
                        <MenuList />
                    </Sider>
                </Layout>
            </div>
            <div className="component-container">
                <Outlet />
            </div>
        </div>
    );
};

export default VetSidebar;