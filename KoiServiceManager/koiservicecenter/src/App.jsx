import Home from './page/Home.jsx';
import VeterinaPage from './page/VeterinaPage.jsx'
import StaffPage from './page/StaffPage.jsx'
import ManagerPage from './page/ManagerPage.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";



const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "veterina",
            element: <VeterinaPage />
        },
        {
            path: "staff",
            element: <StaffPage />
        },
        {
            path: "manager",
            element: <ManagerPage />
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;