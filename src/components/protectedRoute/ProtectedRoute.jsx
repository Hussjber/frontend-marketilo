import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../Spinner/Spinner";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, userRole, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }
  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (adminOnly && userRole !== "admin") {
    // If the route is for admins only and the user is not an admin, redirect to the home page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
