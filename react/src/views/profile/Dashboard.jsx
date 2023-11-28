import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";

import { Helmet } from 'react-helmet';
import CustomerSideBar from "../../components/CustomerSideBar";


export default function Dashboard() {
    const { user, setUser, setToken, setAuthUser } = useStateContext()

    console.log(user)


    return (
        <div class="all">
            <div class="customerDashboardHeader">
                <div class="customerDashboardBar"></div>
                <span class="customerDashboard">My Dashboard</span>
            </div>

            <div class="container custom-auth-gap">
                <div class="row">

                    <CustomerSideBar />
                    <div class="col-lg-2 dashboardContent" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">

                        <div class="dashboardTitle">
                            <h3 class="profileTitle">My Dashboard</h3>
                            <div className="dropdown toggleicon float-end">
                                <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                                    <Link to="/allergic" className="dropdown-item">My Allergies</Link>
                                    <a href="/orderStatus" className="dropdown-item">My Purchases</a>
                                    <Link to="/myReservation" className="dropdown-item">My Reservations</Link>
                                    <Link to="/addresses" className="dropdown-item">My Addresses</Link>
                                    <Link to="/myOrder" className="dropdown-item">Real Time Track My Order</Link>
                                    <Link to="/changePassword" className="dropdown-item">Change Password</Link>
                                    <Link to="/userChat" className="dropdown-item">Chat Grand Imperial!</Link>
                                </div>
                            </div>
                            <p class="subTitle">Manage your billing addresses, and edit your password and account details.</p>

                        </div>
                        <div class="dashboard-block-list">
                            <a href="/" class="dashboard-block">
                                <i class="fas fa-home"></i>
                                <p>Home Page</p>
                            </a>
                            <a href="/purchase" class="dashboard-block">
                                <i class="fas fa-clipboard-list"></i>
                                <p>Manage Purchases</p>
                            </a>
                            <a href="/address" class="dashboard-block">
                                <i class="fas fa-map-marker-alt"></i>
                                <p>Manage Address</p>
                            </a>
                            <a href="usersPass" class="dashboard-block">
                                <i class="fas fa-lock"></i>
                                <p>Manage Password</p>
                            </a>
                            <a href="/profile" class="dashboard-block">
                                <i class="fas fa-user-circle"></i>
                                <p>Account Details</p>
                            </a>

                            <a href="/logout" class="dashboard-block">
                                <i class="fas fa-sign-out-alt"></i>
                                <p>Sign Out</p>
                            </a>

                        </div>
                    </div>

                </div>


            </div>

            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/customerDashBoard.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>






    );
}
