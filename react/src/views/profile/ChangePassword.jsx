import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";

import { Helmet } from 'react-helmet';




import CustomerSideBar from "../../components/CustomerSideBar";


export default function ChangePassword() {

    return (
        <div>

            <form method="POST" action="/users/changePass">
                <div class="all">
                    <div class="customerAccHeader">
                        <div class="customerAccBar"></div>
                        <span class="customerAcc">My Account</span>
                    </div>


                    <div class="container custom-auth-gap" >
                        <div class="row">
                            <CustomerSideBar />
                            <div class="col-lg-2 passwordContent" data-aos="flip-up"  data-aos-delay="300" data-aos-duration="400">
                                <div class="accountTitle">
                                    <h3 class="profileTitle"><b>Change Password</b></h3>
                                    <p class="subTitle">For your account's security, do not share your password with anyone else</p>
                                   
                                </div>
                                <div class="userProfile">
                                    <div class="text">

                                        <div class="passwordSetting">
                                            <label for="currentPassword" class="currentPasswordLabel">Current Password</label>
                                            <input type="password" class="currentPassword" name="currentPass"
                                                 />

                                        </div>
                                        <span class="error" style={{ color: 'red' }}  >*Invalid Current Password</span>
                                        {/* @error('currentPass')
                              
                            @enderror */}

                                        <div class="passwordSetting">
                                            <label for="newPassword" class="newPasswordLabel">New Password</label>
                                            <input type="password" class="newPassword" name="password"
                                                 />

                                        </div>
                                        {/* 
                            @error('password')
                                <span class="error"  style="red">*{{ $message }}</span>
                            @enderror */}

                                        <div class="confirmPasswordSetting">
                                            <label for="confirmPassword" class="confirmPasswordLabel">Confirm Password</label>

                                            <input type="password" class="confirmPassword" name="password_confirmation"
                                                />

                                        </div>
                                        {/* @error('password_confirmation')
                                <span class="error" style="red">*{{ $message }}</span>
                            @enderror */}


                                        <div class="confirmButton">
                                            <button type="submit" class="confirm">Submit</button>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Helmet>
            <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
                <link rel="stylesheet" href="../../../assets/css/customerChangePassword.css" />
            </Helmet>
        </div>
    );
}
