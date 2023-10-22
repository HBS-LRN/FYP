import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';






import CustomerSideBar from "../../components/CustomerSideBar";
export default function MyOrder() {

    return (

        <div class="all">
            <div class="customerAccHeader">
                <div class="customerAccBar"></div>
                <span class="customerAcc">Real Time Trackings</span>
            </div>

            <div class="container custom-auth-gap">
                <div class="row">

                    <CustomerSideBar />


                    <div class="col-lg-2 addressContent" data-aos="flip-up"  data-aos-delay="300" data-aos-duration="400">
                        <div class="addressTitle">
                            <h3 class="profileTitle">My Orders</h3>
                            <p class="subTitle">See Your Real Time Tracking Order Here</p>

                           

                        </div>

                        {/* @foreach ($addresses as $address) */}
                        <div class="row userAddress">
                            <div class="col-lg-5 userInfo">
                                <div class="name">

                                    <label for="nameLabel">Order Number</label>
                                    <span>
                                        Tee Fo Yo
                                        {/* {{ $address->address_username }} */}
                                    </span>
                                </div>
                                <div class="phone">
                                    <label for="phoneLabel">Date Placed</label>
                                    <span>
                                        011-63951578
                                        {/* {{ $address->address_userphone }} */}
                                    </span>
                                </div>
                                <div class="addressForm">
                                    <label for="addressLabel">Deliver Address</label>
                                    <div class="addressBorder">
                                        <span>
                                            sdsdsd
                                            {/* {{ $address->street }},
                                        {{ $address->postcode }},
                                        {{ $address->area }} */}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 buttonType offset-lg-3">
                                <div class="row actionLink">
                         

                                    <div class="default">
                                        {/* @if ($address->active_flag == 'T')
                                        <button type="submit" class="currentUsedAddress" disabled>Current Used
                                    @else */}
                                        {/* <form action="/address/{{ $address->id }}/update" method="POST">
                                            @csrf
                                            @method('PUT') */}
                                        <button type="submit" class="setAsDefault">See Real Time Tracking</button>
                                        {/* </form> */}
                                        {/* @endif */}

                                    </div>


                                </div>
                            </div>


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
