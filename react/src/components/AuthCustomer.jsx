import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";

export default function AuthCustomer() {
  const {user, token} = useStateContext();



  if (!user && !token) {
    return <Navigate to="/authRequired" />;
  } 
  return (<div><Outlet/></div>);
}
