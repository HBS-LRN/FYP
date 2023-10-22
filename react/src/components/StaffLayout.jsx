import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, Outlet } from "react-router-dom";


import '../../assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css';


import '../../assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import '../../assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';

import '../../assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';

import '../../assets/css/icons.min.css';
import '../../assets/css/app.min.css';


export default function StaffLayout() {


    return (
        <div>
            <Helmet>

                <link rel="stylesheet" href="../assets/css/bootstrap.min.css" />
            </Helmet>

            <body data-sidebar="dark">




                <div id="layout-wrapper">

                    <div id="page-topbar">
                        <div className="navbar-header">
                            <div className="d-flex">
                                {/* LOGO */}
                                <div className="navbar-brand-box">
                                    <a href="index.html" className="logo logo-dark">
                                        <span className="logo-sm">
                                            <img src="../assets/img/GrandImperialGroupLogoHeader.png" alt="logo-sm-dark" height="22" />
                                        </span>
                                        <span className="logo-lg">
                                            <img src="../assets/img/../assets/img/GrandImperialGroupLogoHeader.png" alt="logo-dark" height="20" />
                                        </span>
                                    </a>

                                    <a href="index.html" className="logo logo-light">
                                        <span className="logo-sm">
                                            <img src="../assets/img/GrandImperialGroupLogoHeader.png" alt="logo-sm-light" height="22" />
                                        </span>
                                        <span className="logo-lg">
                                            <img src="../assets/img/GrandImperialGroupLogoHeader.png" alt="logo-light" height="70" />
                                            Grand Imperial HI
                                        </span>
                                    </a>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-sm px-3 font-size-24 header-item waves-effect"
                                    id="vertical-menu-btn"
                                >
                                    <i className="ri-menu-2-line align-middle"></i>
                                </button>

                                {/* App Search */}
                                <form className="app-search d-none d-lg-block">
                                    <div className="position-relative">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="ri-search-line"></span>
                                    </div>
                                </form>
                            </div>

                            <div className="d-flex">
                                <div className="dropdown d-none d-lg-inline-block ms-1">
                                    <button type="button" className="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                                        <i className="ri-fullscreen-line"></i>
                                    </button>
                                </div>

                                <div className="dropdown d-inline-block">
                                    <button
                                        type="button"
                                        className="btn header-item noti-icon waves-effect"
                                        id="page-header-notifications-dropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-notification-3-line"></i>
                                        <span className="noti-dot"></span>
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                        aria-labelledby="page-header-notifications-dropdown"
                                    >
                                        <div className="p-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h6 className="m-0"> Notifications </h6>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="#!" className="small">
                                                        View All
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-simplebar style={{ maxHeight: "230px" }}>
                                            <a href="#" className="text-reset notification-item">
                                                <div className="d-flex">
                                                    <div className="avatar-xs me-3">
                                                        <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                            <i className="ri-shopping-cart-line"></i>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h6 className="mb-1">Your order is placed</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">If several languages coalesce the grammar</p>
                                                            <p className="mb-0">
                                                                <i className="mdi mdi-clock-outline"></i> 3 min ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="text-reset notification-item">
                                                <div className="d-flex">
                                                    <img src="../assets/img/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <h6 className="mb-1">James Lemire</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">It will seem like simplified English.</p>
                                                            <p className="mb-0">
                                                                <i className="mdi mdi-clock-outline"></i> 1 hours ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="text-reset notification-item">
                                                <div className="d-flex">
                                                    <div className="avatar-xs me-3">
                                                        <span className="avatar-title bg-success rounded-circle font-size-16">
                                                            <i className="ri-checkbox-circle-line"></i>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h6 className="mb-1">Your item is shipped</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">If several languages coalesce the grammar</p>
                                                            <p className="mb-0">
                                                                <i className="mdi mdi-clock-outline"></i> 3 min ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="text-reset notification-item">
                                                <div className="d-flex">
                                                    <img src="../assets/img/users/avatar-4.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <h6 className="mb-1">Salena Layfield</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                                            <p className="mb-0">
                                                                <i className="mdi mdi-clock-outline"></i> 1 hours ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="p-2 border-top">
                                            <div className="d-grid">
                                                <a className="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                                    <i className="mdi mdi-arrow-right-circle me-1"></i> View More..
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="dropdown d-inline-block user-dropdown">
                                    <button
                                        type="button"
                                        className="btn header-item waves-effect"
                                        id="page-header-user-dropdown"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <img
                                            className="rounded-circle header-profile-user"
                                            src="../assets/img/users/avatar-2.jpg"
                                            alt="Header Avatar"
                                        />
                                        <span className="d-none d-xl-inline-block ms-1">Kevin</span>
                                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        {/* item */}
                                        <a className="dropdown-item" href="#">
                                            <i className="ri-user-line align-middle me-1"></i> Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="ri-wallet-2-line align-middle me-1"></i> My Wallet
                                        </a>
                                        <a className="dropdown-item d-block" href="#">
                                            <span className="badge bg-success float-end mt-1">11</span>
                                            <i className="ri-settings-2-line align-middle me-1"></i> Settings
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="ri-lock-unlock-line align-middle me-1"></i> Lock screen
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item text-danger" href="#">
                                            <i className="ri-shut-down-line align-middle me-1 text-danger"></i> Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="vertical-menu">
                        <div data-simplebar className="h-100">
                            <div id="sidebar-menu">
                                <ul className="metismenu list-unstyled" id="side-menu">
                                    <li className="menu-title">Menu</li>

                                    <li>
                                        <a href="/staffDashboard" className="waves-effect">
                                        
                                            <i className="ri-dashboard-line"></i>
                                            <span className="badge rounded-pill bg-success float-end">3</span>
                                            <span>Dashboard</span>
                                        </a>
                                    </li>


                                    <li>
                                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                                        <i class="fas fa-utensils"></i>
                                            
                                            <span>Manage Meal</span>
                                        </a>
                                        <ul className="sub-menu" aria-expanded="false">
                                            <li>
                                                <a href="/mealList">Meals</a>
                                            </li>
                                            <li>
                                                <a href="/mealDetail">Meals Detail</a>
                                            </li>
                                            <li>
                                                <a href="/addMeal">Add Meal</a>
                                            </li>
                                         
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                                        <i class="fas fa-user-edit"></i>
                                            
                                            <span> Manage Customer</span>
                                        </a>
                                        <ul className="sub-menu" aria-expanded="false">
                                            <li>
                                                <a href="/orders">Customers Orders</a>
                                            </li>
                                            <li>
                                                <a href="/orders">Add Reservation</a>
                                            </li>

                                            <li>
                                                <a href="/addCustomer">Add Customer</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                                        <i class="fas fa-user-edit"></i>
                                            
                                            <span> Manage Staff</span>
                                        </a>
                                        <ul className="sub-menu" aria-expanded="false">
                                            <li>
                                                <a href="/orders">Add Staff</a>
                                            </li>
                                            <li>
                                                <a href="/customers">Delete Staff</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/staffcalendar" className="waves-effect">
                                            <i className="ri-calendar-2-line"></i>
                                            <span>Calendar</span>
                                        </a>
                                    </li>



                                    <li>
                                        <a href="apps-chat.html" className="waves-effect">
                                            <i className="ri-chat-1-line"></i>
                                            <span>Chat</span>
                                        </a>
                                    </li>



                                    <li>
                                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                                            <i className="ri-bar-chart-line"></i>
                                            <span>Report</span>
                                        </a>
                                        <ul className="sub-menu" aria-expanded="false">
                                            <li>
                                                <a href="charts-apex.html">Annual Sale Report</a>
                                            </li>
                                            <li>
                                                <a href="/customers">Customers Report</a>
                                            </li>
                                            <li>
                                                <a href="/addCustomer">Staff Report</a>
                                            </li>
                                           
                                            <li>
                                                <a href="charts-knob.html">Menu Report</a>
                                            </li>
                                           
                                        </ul>
                                    </li>

                                  

                                   
                                </ul>
                            </div>
                        </div>
                    </div>


                    <main>
                        <Outlet />
                    </main>


                </div>
            </body>

        </div>



    );
}
