import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Layout from "../Layout";
import Policy from "../pages/Policy";
import RequireAgreement from "../guards/RequireAgreement";
import WaitingToJoin from "../pages/WaitingToJoin";
import LayoutTwo from "../LayoutTwo";
import Main from "../pages/Main";
import UserLists from "../pages/UserLists";
import UserListsPortion from "../pages/UserListsPortion";
import RequireAuth from "../guards/RequireAuth";

const router = createBrowserRouter([
    { 
        path: "/",
        element: <Layout />,
        children:[
            { index: true, element: <Home /> },
            { path: "policy", element: <Policy /> },
            { path: "login", element: <Login /> },
            {
                element: <RequireAgreement />,
                children: [
                    { path: 'sign-up', element: <SignUp /> }
                ]
            },
            { path: "waiting-to-join", element: <WaitingToJoin /> },
        ]
    },
    {
        path: "/",
        element: <LayoutTwo />,
        children:[
            { 
                element: <RequireAuth />,
                children: [
                    { path: "main", element: <Main /> },
                    { path: "user-lists", element: <UserLists /> },
                    { path: "user-lists-portion", element: <UserListsPortion /> }
                ]
            },
        ]
    }
]);

export default router;