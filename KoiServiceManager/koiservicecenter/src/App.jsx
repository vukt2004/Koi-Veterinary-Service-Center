import { Route, Routes } from "react-router-dom";
import Home from "../src/Home.jsx";
import Header from "./component/Header.jsx";
import AboutUs from "./component/AboutUs.jsx";
import Faq from "./component/FAQ.jsx";
import Login from "./Login_SignUp.jsx";
import Service from "./component/Service.jsx";
import Veterina from "./component/Veterina.jsx";
import OrdersForm from "./component/OrdersForm.jsx";
import Profile from "./component/Profile.jsx";
import InvoicePage from "./component/InvoicePage.jsx";
import FeedbackPage from "./component/FeedbackPage.jsx";
import CustomerLayout from './CustomerLayout.jsx'
import Footer from './component/Footer.jsx'

import Manager from "../manager/ManagerPage.jsx";

import ServiceManagement from "../staff/ServiceManagement";
import OrderManagement from "../staff/OrdersManagement";
import Sidebar from "../staff/sidebar.jsx";
import StaffPage from "../staff/StaffPage.jsx";

import VeterinaPage from "../veterina/VeterinaPage.jsx";
import VeterinaProfile from "../veterina/VeterinaProfile.jsx"

import PrivateRoute from "../src/utils/PrivateRoute.jsx";

function App() {
    return (
        <Routes>
            <Route element={<CustomerLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/service" element={<Service />} />
                <Route path="/veterina" element={<Veterina />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/orderform"
                    element={<PrivateRoute Component={OrdersForm} role="C" />}
                />
                {/* <Route path='/orderform' element={<OrdersForm />}/> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/invoice" element={<InvoicePage />} />
                <Route path="/feedback/:orderId" element={<FeedbackPage />} />
                <Route path="/vetProfile/:veterinaID" element={<VeterinaProfile />} />
            </Route>

            <Route element={<Sidebar />}>
                <Route
                    path="/staffPage"
                    element={<PrivateRoute Component={StaffPage} role="S" />}
                />
                <Route path="/staffPage/serviceManagement" element={<ServiceManagement />} />
                <Route path="/staffPage/orderManagement" element={<OrderManagement />} />
            </Route>
            <Route
                path="/managerPage"
                element={<PrivateRoute Component={Manager} role="M" />}
            />
            <Route
                path="/veterinaPage"
                element={<PrivateRoute Component={VeterinaPage} role="V" />}
            >
                <Route path="/veterinaPage/invoice" element={<InvoicePage />} />
            </Route>

        </Routes>
    );
}

export default App;
