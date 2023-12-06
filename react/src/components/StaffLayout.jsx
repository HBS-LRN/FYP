import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useNavigate } from "react-router-dom";
import '../../assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css';


import '../../assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import '../../assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';

import '../../assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';

import '../../assets/css/icons.min.css';
import '../../assets/css/app.min.css';


export default function StaffLayout() {


    const { user, token,setToken,setUser} = useStateContext();
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchStaffNotice();

    }, []);
    //   const remind = () =>{
    //     getSetNotice(setStaffNotice);
    //   }
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
    const fetchStaffNotice = () => {

        axiosClient.get(`/getNotification`)
            .then(({ data }) => {
                console.log(data,"data")
                setNotices(data);
            })
            .catch((error) => {
                console.error('API request error:', error);
            });

    };
   
    if (!user || !token) {
        return <Navigate to="/authRequired" />;
    } else if (parseInt(user.role) !== 1 && parseInt(user.role) !== 2 && parseInt(user.role) !== 3) {
        return <Navigate to="/accessProhibited" />;
    }


    return (
        <div>
            <Helmet>

                <link rel="stylesheet" href="../assets/css/bootstrap.min.css" />
                <link rel="stylesheet" href="../assets/css/reportStyle.css" />

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
                                            Grand Imperial
                                        </span>
                                    </a>
                                </div>

                            </div>

                            <div className="d-flex">
                             

                                <div className="dropdown d-inline-block">
                                    <button
                                        type="button"
                                        className="btn header-item noti-icon waves-effect"
                                        id="page-header-notifications-dropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-notification-3-line"></i>
                                        {notices.length > 0 ? <span className="noti-dot"></span> : ''}

                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                       
                                    >
                                        <div className="p-4">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h6 className="m-0"> Notifications </h6>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='notificationBox' style={{ maxHeight: "230px" }}>
                                            {notices.length > 0 && notices ? (
                                                notices.map((item) => (
                                                    <a href="#" className="text-reset notification-item" key={item.id}>
                                                        <div className="d-flex">
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                                    {item.user.image ? (
                                                                        <img
                                                                            src={`${import.meta.env.VITE_API_BASE_URL}/${item.user.image}`}
                                                                            width="50"
                                                                            height="50"
                                                                            alt="user-avatar"
                                                                        />
                                                                    ) : (
                                                                        <i className="fa-solid fa-user"></i>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h6 className="mb-1">{item.user.name}</h6>
                                                                <div className="font-size-12 text-muted">
                                                                    <p className="mb-1">{item.message}</p>
                                                                    <p className="mb-0 font-size-12">
                                                                        <i className="mdi mdi-clock-outline"></i> {item.time}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))
                                            ) : (
                                                <div>No Notification</div>
                                            )}

                                        </div>
                                        <div className="noticeViewMoreCoverBox">
                                            <div className="noticeViewMoreBox">
                                                <a className="btn btn-sm btn-link font-size-14 text-center" href="/chat">
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
                                        {user && user.image ? (

                                            <img
                                                src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                                                width="50" height="50"
                                            />

                                        ) : (
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        )}
                                        <span className="d-none d-xl-inline-block ms-1">{user.name}</span>
                                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        {/* item */}
                                        <a className="dropdown-item" href="/staffProfile">
                                            <i className="ri-user-line align-middle me-1"></i> Profile
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item text-danger" onClick={onLogout} >
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


                                    {user.role === 3 ? (
                                        <li>
                                            <a href="javascript: void(0);" className="has-arrow waves-effect">
                                                <i class="fas fa-shipping-fast"></i>

                                                <span> Manage Delivery</span>
                                            </a>
                                            <ul className="sub-menu" aria-expanded="false">
                                                <li>
                                                    <a href="/deliveryList">Delivery List</a>
                                                </li>
                                                <li>
                                                    <a href="/completedDeliveryList">Delivery Completed</a>
                                                </li>

                                            </ul>
                                        </li>
                                    ) : (
                                        <>
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
                                                        <a href="/mealList">Meal List</a>
                                                    </li>
                                                    <li>
                                                        <a href="/categoryList">Category List</a>
                                                    </li>
                                                    <li>
                                                        <a href="/ingredientList">Ingredient List</a>
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
                                                        <a href="/customerOrderList">Customers Orders List</a>
                                                    </li>
                                                    <li>
                                                        <a href="/reservation">Add Reservation</a>
                                                    </li>

                                                    <li>
                                                        <a href="/addCustomer">Add Customer</a>
                                                    </li>
                                                    <li>
                                                        <a href="/activateCustomer">Activate Customer</a>
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
                                                        <a href="/addStaff">Add Staff</a>
                                                    </li>
                                                    <li>
                                                        <a href="/staffList">Staff List</a>
                                                    </li>


                                                </ul>
                                            </li>

                                            <li>
                                                <a href="/ratingList" className="waves-effect">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <span>Meal Rating</span>
                                                </a>
                                            </li>



                                            <li>
                                                <a href="/chat" className="waves-effect">
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
                                                        <a href="/mealRevenueReport">Meal Sale Report</a>
                                                    </li>
                                                    <li>
                                                        <a href="/salesReport">Sales Analytic Report</a>
                                                    </li>


                                                </ul>
                                            </li>

                                        </>
                                    )}

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
