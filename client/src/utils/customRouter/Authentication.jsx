import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function Authentication() {
  const data = JSON.parse(localStorage.getItem("UserInformation"));
  return data ? <Outlet /> : <Navigate to="/SingIn" />;
}

export default Authentication;
