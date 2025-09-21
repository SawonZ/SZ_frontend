import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/login", element: <Login /> },
]);

export default router;