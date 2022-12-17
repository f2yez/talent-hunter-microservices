import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function CompanyRoute() {
  const data = JSON.parse(localStorage.getItem("UserInformation"));
  const done = data && data.type === "company";
  return done ? <Outlet /> : <Navigate to="/Redirect" />;
}

export default CompanyRoute;
