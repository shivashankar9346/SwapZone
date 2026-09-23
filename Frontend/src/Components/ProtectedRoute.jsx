import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/auth.context";

const ProtectedRoute = ({children}) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    // Wait until authentication is checked
    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>Checking authentication...</h2>
            </div>
        );
    }

    // User is not logged in
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // User is logged in
    return children;
};

export default ProtectedRoute;

