import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Layout from "../Layout";
import Policy from "../pages/Policy";
import RequireAgreement from "../RequireAgreement";
import WaitingToJoin from "../pages/WaitingToJoin";
import LayoutTwo from "../LayoutTwo";
import Main from "../pages/Main";

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
            },
            { path: "/waiting-to-join", element: <WaitingToJoin /> }
        ]
    },
    {
        path: "/main",
        element: <LayoutTwo />,
        children:[
            { path: "/main", element: <Main /> },
        ]
    }
]);

export default router;