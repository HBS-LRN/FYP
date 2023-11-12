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
  useEffect(() => {
    var pusher = new Pusher('2124f91a86a5182a0c5d', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('login-channel');
    channel.bind('login-event', function (data) {

      console.log(data)
      //if it is admin id
      if (data.loginUser.id === user.id) {

        const payload = {
          user_id: user.id

        };
        axiosClient.post('/logout', payload)
          .then(() => {

            let timerInterval;
            Swal.fire({
              title: "Account Deactivated,System Sign Out Forced.",
              html: "You will be redirect to login page in <b></b> milliseconds.",
              timer: 4000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              }
            }).then((result) => {
              setUser(null);
              setToken(null);
              setCartQuantity(null);
              navigate("/login");
              window.location.reload();

            });

          });
      }


    });
  }, []);


  if (!user && !token) {
    return <Navigate to="/authRequired" />;
  }
  return (<div><Outlet /></div>);
}
