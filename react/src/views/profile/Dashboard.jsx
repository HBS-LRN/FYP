import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";

import { Helmet } from 'react-helmet';
import CustomerSideBar from "../../components/CustomerSideBar";


export default function Dashboard() {


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
