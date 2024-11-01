import { Route, Routes } from 'react-router-dom';
import Home from '../src/Home.jsx';
import Header from './component/Header.jsx';
import AboutUs from './component/AboutUs.jsx';
import Faq from './component/FAQ.jsx';
import Login from './Login_SignUp.jsx';
import Service from './component/Service.jsx';
import Veterina from './component/Veterina.jsx';
import OrdersForm from './component/OrdersForm.jsx';
import Profile from './component/Profile.jsx';
import StaffPage from '../staff/StaffPage.jsx';
import Manager from '../manager/ManagerPage.jsx'
import VeterinaPage from '../veterina/VeterinaPage.jsx';
import PrivateRoute from './ultis/PrivateRoute.jsx';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Header />}>
                <Route path='/' element={<Home />}/>
                <Route path='/aboutus' element={<AboutUs />}/>
                <Route path='/faq' element={<Faq />}/>
                <Route path='/service' element={<Service />}/>
                <Route path='/veterina' element={<Veterina />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/orderform' element={<PrivateRoute Component={OrdersForm}/>}/>
                {/* <Route path='/orderform' element={<OrdersForm />}/> */}
                <Route path='/profile' element={<Profile />}/>
            </Route>

            <Route path='/staff' element={<StaffPage />}/>
            <Route path='/manager' element={<Manager />}/>
            <Route path='/veterinaPage' element={<VeterinaPage />}/>
        </Routes>
        
    );
}

export default App;
