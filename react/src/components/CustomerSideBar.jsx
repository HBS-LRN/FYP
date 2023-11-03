import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export default function CustomerSideBar() {

    const { user, setUser, setToken,setCartQuantity } = useStateContext()
    const navigate = useNavigate();
    const onLogout = ev => {
        ev.preventDefault();
        const payload = {
            user_id: user.id
           
          };
        axiosClient.post('/logout', payload)
            .then(() => {
                setUser(null);
                setToken(null);
                setCartQuantity(null);
                navigate("/login");
                window.location.reload();
            });
    };


    const handleSubMenuClick = (e) => {


        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
        arrowParent.classList.toggle("showSubMenu");

    };

    return (


        <div class="col-lg-3 side-bar-margin" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">

            <div class="row profile-gap">
                {/* @if( auth()->user()->image != null)
                    <img class="img" src="{{ auth()->user()->image ? asset('storage/' . auth()->user()->image) : asset('/images/no-image.png') }}"
                        alt="" />
                    @else */}




                <div class="col-lg-2 profile-custom-margin">

                    {user && user.image ? (

                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                            width="55" height="55"
                        />


                    )
                        : (
                            <i class="fas fa-user" style={{ fontSize: '40px', color: 'black' }}></i>
                        )}


                </div>

                <div class="col-lg-9 profile-name-custom-margin" >
                    <div class="profile_name"> <b>{user.name}</b> </div>
                    <div class="profile_email">{user.email}</div>
                </div>

            </div>


            <ul class="nav-links">
                <li><a href="/dashboard"><i class="fas fa-home"></i>&nbsp;Dashboard</a></li>
                <li>
                    <div class="iconLink">
                        <a href="/profile"><i class="fas fa-user" style={{ color: 'black' }}></i><span class="account">&nbsp;My Account</span></a>
                        <i class="fas fa-chevron-down arrow" onClick={handleSubMenuClick}></i>
                    </div>
                    <ul class="sub-menu">
                        <li><a href="/profile">
                            <p>Profile</p>
                        </a></li>
                        <li><a href="/addresses">
                            <p>Addresses</p>
                        </a></li>
                        <li><a href="/allergic">
                            <p>Allergies</p>
                        </a></li>
                        <li><a href="/changePassword">
                            <p>Change Password</p>
                        </a></li>
                       
                    </ul>
                </li>
                <li>
                    <div class="iconLink">
                        <a href="/orderStatus"><i class="fas fa-clipboard-list"></i><span class="purchase">&nbsp;My Purchases</span></a>
                    </div>

                </li>
                <li>
                    <div class="iconLink">
                        <a href="/myOrder"><i class="fa-solid fa-location-dot"></i><span class="track">&nbsp;&nbsp;Real Time Track My Order</span></a>
                    </div>

                </li>
                <li>
                    <div>
                        <a href="/myReservation">
                            <i class="fa-solid fa-calendar-days" aria-hidden="true"></i>&nbsp;My Reservation</a>
                    </div>

                </li>
                {/* <li>
                        <div class="iconLink">
                            <a href="/memberPoint"><i class="fa fa-user-plus"></i><span class="memberPoint">Member Point</span></a>
                        </div>

                    </li> */}

                <li><a onClick={onLogout} href="#"><i class="fas fa-sign-out-alt"></i>Log Out</a></li>


            </ul>
        </div>





    );
}
