import { Route, Routes } from "react-router-dom";
import Home from "../src/Home.jsx";
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
import PaymentFail from './component/PaymentFail.jsx'

import Manager from "../manager/ManagerPage.jsx";

import Schedule from "../staff/Schedule.jsx";
import ServiceManagement from "../staff/ServiceManagement";
import OrderManagement from "../staff/OrdersManagement";
import StaffSidebar from "../staff/sidebar.jsx";

import VetSidebar from "../veterina/sidebar.jsx";
import VeterinaProfile from "../veterina/VeterinaProfile.jsx"
import VeterinaOrders from "../veterina/VeterinaOrders.jsx";
import VeterinaSchedule from "../veterina/VeterinaSchedule.jsx";

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
                <Route path="/payment-fail" element={<PaymentFail />} />
            </Route>

            <Route element={<StaffSidebar />}>
                <Route
                    path="/staffPage"
                    element={<PrivateRoute Component={Schedule} role="S" />}
                />
                <Route path="/staffPage/serviceManagement" element={<ServiceManagement />} />
                <Route path="/staffPage/orderManagement" element={<OrderManagement />} />
            </Route>
            <Route
                path="/managerPage"
                element={<PrivateRoute Component={Manager} role="M" />}
            />
            <Route element={<VetSidebar />}>
                <Route path="/veterinaPage"
                    element={<PrivateRoute Component={VeterinaSchedule} role="V" />} />
                <Route path="/veterinaPage/invoice" element={<InvoicePage />} />
                <Route path="/veterinaPage/orders" element={<VeterinaOrders />} />
                <Route path="/veterinaPage/profile/:veterinaID" element={<VeterinaProfile />} />
            </Route>

        </Routes>
    );
}

export default App;
