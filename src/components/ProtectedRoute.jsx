import React from "react";
import { Navigate, Navigation, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};

export default ProtectedRoute;