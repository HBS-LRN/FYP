import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';




import CustomerSideBar from "../../components/CustomerSideBar";
export default function AddressForm() {

    return (


        <div class="all">
            <div class="customerAccHeader">
                <div class="customerAccBar"></div>
                <span class="customerAcc">My Account</span>
            </div>


            <div class="container custom-auth-gap">
                <div class="row">
                    <div class="customerAccContent">
                        <CustomerSideBar />
                        <div class="col-lg-2 addAddressContent" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                            <div class="addAddressTitle">
                                <h3 class="profileTitle">Add Address</h3>
                                <p class="subTitle">Add Your Address Here</p>
                            </div>

                            <form action="/address/{{ $address->id }}" method="POST">
                                {/* @csrf
                        @method('PUT') */}
                                <div class="userAddress">
                                    <div class="userInfo">

                                        <div class="fullNameSetting">
                                            <label for="fullNameLabel" class="fullNameLabel">Full Name</label>

                                            <input type="text" class="fullNameInput" name="address_username"
                                                value="" />


                                        </div>
                                        {/* <div class="errBox">
                            <label for=""></label>
                            @error('address_username')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                        </div> */}


                                        <br />
                                        <div class="phoneNumberSetting">
                                            <label for="phoneNumberLabel" class="phoneNumberLabel">Phone Number(-)</label>
                                            <input type="text" class="phoneNumberInput" name="address_userphone"
                                                value="" />


                                        </div>
                                        {/* <div class="errBox">
                            <label for=""></label>
                            @error('address_userphone')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                        </div> */}
                                        <br />

                                        <div class="streetAddressSetting">
                                            <label for="streetAddressLabel" class="streetAddressLabel">Street Address</label>

                                            <input type="text" class="streetAddressInput" name="street"
                                                value="" />


                                        </div>
                                        {/* <div class="errBox">
                            <label for=""></label>
                            @error('street')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                        </div> */}
                                        <br />

                                        <div class="stateSetting">
                                            <label for="txtStateLabel" class="stateLabel">City</label>


                                            <input type="text" class="streetAddressInput" name="street"
                                              />
                                        </div>
                                        <br />

                                        <div class="stateSetting">
                                            <label for="txtStateLabel" class="stateLabel">State</label>


                                            <select name="area" class="stateInput">
                                                {/* <option value=""> Select Area</option>
                                @foreach ($areas as $area)
                                    <option
                                        value="{{ $area->state_name }}"{{ $address->area == $area->state_name ? 'selected' : '' }}>
                                        {{ $area->state_name }}</option>
                                @endforeach */}
                                            </select>
                                        </div>
                                        {/* <div class="errBox">
                            <label for=""></label>
                            @error('area')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                        </div> */}



                                        <br />
                                        <div class="postalCodeSetting">
                                            <label for="postalCodeLabel" class="postalCodeLabel">PostCode </label>
                                            <input type="text" class="postalCodeInput" name="postcode"
                                                value="" />

                                        </div>
                                        {/* <div class="errBox">
                            <label for=""></label>
                            @error('postcode')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                        </div> */}




                                        <div class="submitButtonaddAddress">

                                            <button class="submitaddAddress" type="submit">Submit</button>

                                        </div>

                                    </div>



                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/addAddress.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>






    );
}
