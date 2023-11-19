import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import Pusher from 'pusher-js';
import { useNotificationContext } from "../contexts/NotificationProvider.jsx";
import Swal from 'sweetalert2';
export default function AdminLayout() {

    const navigate = useNavigate();
    const { user, token } = useStateContext()



    if (!user && !token) {
        return <Navigate to="/authRequired" />;
    } else if (parseInt(user.role) !== 2) {
        return <Navigate to="/accessRestricted" />;
    }
    return (<div><Outlet /></div>);
}
