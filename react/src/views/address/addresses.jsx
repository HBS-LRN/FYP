import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';






import CustomerSideBar from "../../components/CustomerSideBar";
export default function Addresses() {

    return (

        <div class="all">
            <div class="customerAccHeader">
                <div class="customerAccBar"></div>
                <span class="customerAcc">My Addresses</span>
            </div>

            <div class="container custom-auth-gap">
                <div class="row">

                    <CustomerSideBar />


                    <div class="col-lg-2 addressContent" data-aos="flip-up"  data-aos-delay="300" data-aos-duration="400">
                        <div class="addressTitle">
                            <h3 class="profileTitle">My Addresses</h3>
                            <p class="subTitle">Manage Your Shipping Address Here!</p>

                            <div class="addAddress">
                                <div class="addAddressFont"><a href="/address/new">+ Add New Address</a></div>
                            </div>

                        </div>

                        {/* @foreach ($addresses as $address) */}
                        <div class="row userAddress">
                            <div class="col-lg-5 userInfo">
                                <div class="name">

                                    <label for="nameLabel">Full Name</label>
                                    <span>
                                        Tee Fo Yo
                                        {/* {{ $address->address_username }} */}
                                    </span>
                                </div>
                                <div class="phone">
                                    <label for="phoneLabel">Phone</label>
                                    <span>
                                        011-63951578
                                        {/* {{ $address->address_userphone }} */}
                                    </span>
                                </div>
                                <div class="addressForm">
                                    <label for="addressLabel">Address</label>
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

                            <div class="col-lg-3 buttonType offset-lg-4">
                                <div class="row actionLink">
                                    <div class="col-lg-3 editLink  ">
                                        <a href="/addresseEdit/{{ $address->id }}">Edit</a>
                                    </div>

                                    <div class="col-lg-3 deleteLink">
                                        <a class="deleteAddress" href="/address/{{ $address->id }}/delete">Delete</a>
                                    </div>

                                    <div class="default">
                                        {/* @if ($address->active_flag == 'T')
                                        <button type="submit" class="currentUsedAddress" disabled>Current Used
                                    @else */}
                                        {/* <form action="/address/{{ $address->id }}/update" method="POST">
                                            @csrf
                                            @method('PUT') */}
                                        <button type="submit" class="currentUsedAddress">Current Used</button>
                                        {/* </form> */}
                                        {/* @endif */}

                                    </div>


                                </div>
                            </div>


                        </div>
                        <div class="row userAddress">
                            <div class="col-lg-5 userInfo">
                                <div class="name">

                                    <label for="nameLabel">Full Name</label>
                                    <span>
                                        Tee Fo Yo
                                        {/* {{ $address->address_username }} */}
                                    </span>
                                </div>
                                <div class="phone">
                                    <label for="phoneLabel">Phone</label>
                                    <span>
                                        011-63951578
                                        {/* {{ $address->address_userphone }} */}
                                    </span>
                                </div>
                                <div class="addressForm">
                                    <label for="addressLabel">Address</label>
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

                            <div class="col-lg-3 buttonType offset-lg-4">
                                <div class="row actionLink">
                                    <div class="col-lg-3 editLink  ">
                                        <a href="/addresseEdit/{{ $address->id }}">Edit</a>
                                    </div>

                                    <div class="col-lg-3 deleteLink">
                                        <a class="deleteAddress" href="/address/{{ $address->id }}/delete">Delete</a>
                                    </div>

                                    <div class="default">
                                        {/* @if ($address->active_flag == 'T')
                                        <button type="submit" class="currentUsedAddress" disabled>Current Used
                                    @else */}
                                        {/* <form action="/address/{{ $address->id }}/update" method="POST">
                                            @csrf
                                            @method('PUT') */}
                                        <button type="submit" class="setAsDefault">Set As Default</button>
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
                <link rel="stylesheet" href="../../../assets/css/customerAddress.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>





    );
}
