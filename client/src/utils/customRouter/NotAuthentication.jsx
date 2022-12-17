import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function NotAuthentication() {
  const data = !JSON.parse(localStorage.getItem("UserInformation"));
  return data ? <Outlet /> : <Navigate to="/Redirect" />;
}

export default NotAuthentication;
