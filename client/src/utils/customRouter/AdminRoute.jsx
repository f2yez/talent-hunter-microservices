import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const data = JSON.parse(localStorage.getItem("UserInformation"));
  const done = data && data.type === "admin";
  return done ? <Outlet /> : <Navigate to="/Redirect" />;
};

export default AdminRoute;
