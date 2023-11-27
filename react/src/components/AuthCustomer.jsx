import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import Pusher from 'pusher-js';
import { useNotificationContext } from "../contexts/NotificationProvider.jsx";
import Swal from 'sweetalert2';
export default function AuthCustomer() {

  const navigate = useNavigate();
  const { setFailNotification } = useNotificationContext();
  const { user,token, setUser, setToken, setCartQuantity } = useStateContext()


  if (!user && !token) {
    return <Navigate to="/authRequired" />;
  }
  return (<div><Outlet /></div>);
}
