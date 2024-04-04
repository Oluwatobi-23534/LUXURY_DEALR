import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo ? children : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
