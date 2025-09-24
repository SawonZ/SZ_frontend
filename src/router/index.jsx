import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Layout from "../Layout";
import Policy from "../pages/Policy";
import RequireAgreement from "../RequireAgreement";

const router = createBrowserRouter([
    { 
        path: "/",
        element: <Layout />,
        children:[
            { path: "/", element: <Home /> },
            { path: "/policy", element: <Policy /> },
            { path: "/login", element: <Login /> },
            {
                element: <RequireAgreement />,
                children: [
                    { path: 'sign-up', element: <SignUp /> }
                ]
            }
        ]
    },
]);

export default router;