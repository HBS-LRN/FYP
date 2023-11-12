import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import CustomerSideBar from "../../components/CustomerSideBar";


export default function MyOrder() {
    //react declaration
    const { user, setUser, setNotification } = useStateContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);


    //fetch user address data
    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`/userOrder/${user.id}`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setOrders(data.orders)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }

    return (

        <div class="all">
            <div class="customerAccHeader">
                <div class="customerAccBar"></div>
                <span class="customerAcc">Real Time Trackings</span>
            </div>

            <div class="container custom-auth-gap">
                <div class="row">

                    <CustomerSideBar />


                    <div class="col-lg-2 orderContent" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                        <div class="addressTitle">
                            <h3 class="profileTitle">My Orders</h3>
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
                            <p class="subTitle">See Your Real Time Tracking Order Here</p>



                        </div>

                        {loading &&
                            <div class="text-center">
                                <div class="loaderCustom2"></div>
                            </div>
                        }
                        <div class="scroll-wrap">


                            {orders.length === 0 &&
                                <div className="text-center">

                                    <br />
                                    This section appears to be empty. It's possible that your order is currently in the 'Preparing' status, or you may not have any orders yet.
                                </div>

                            }
                            {!loading && orders && orders.map((order) => (
                                <div class="row userAddress">
                                    <div class="col-lg-5 col-sm-6 userInfo">
                                        <div class="name">

                                            <label for="nameLabel">Order Number</label>
                                            <span>
                                                {order.id}
                                                {/* {{ $address->address_username }} */}
                                            </span>
                                        </div>
                                        <div class="phone">
                                            <label for="phoneLabel">Date Placed</label>
                                            <span>
                                                {order.order_date}
                                                {/* {{ $address->address_userphone }} */}
                                            </span>
                                        </div>
                                        <div class="addressForm">
                                            <label for="addressLabel">Deliver Address</label>
                                            <div class="addressBorder">
                                                <span>
                                                    {order.delivery.street}, {order.delivery.city}, {order.delivery.postcode} {order.delivery.state}.
                                                    {/* {{ $address->street }},
                                        {{ $address->postcode }},
                                        {{ $address->area }} */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-sm-6 buttonType offset-lg-3">
                                        <div class="row actionLink">


                                            <div class="default">
                                                {/* @if ($address->active_flag == 'T')
                                        <button type="submit" class="currentUsedAddress" disabled>Current Used
                                    @else */}
                                                {/* <form action="/address/{{ $address->id }}/update" method="POST">
                                            @csrf
                                            @method('PUT') */}

                                                <Link to={'/realTimeTracking/' +  order.id} className="setAsDefault" target="_blank">
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <span className="track">&nbsp;&nbsp;Real Time Track My Order</span>
                                                </Link>
                                                {/* <button type="submit" class="setAsDefault">See Real Time Tracking</button> */}
                                                {/* </form> */}
                                                {/* @endif */}

                                            </div>


                                        </div>
                                    </div>


                                </div>

                            ))}

                        </div>


                    </div>
                </div>
            </div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/myOrder.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>





    );
}
