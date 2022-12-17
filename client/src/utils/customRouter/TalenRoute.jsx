import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function TalenRoute() {
  const data = JSON.parse(localStorage.getItem("UserInformation"));
  const done = data && data.type === "talent";
  return done ? <Outlet /> : <Navigate to="/Redirect" />;
}

export default TalenRoute;
