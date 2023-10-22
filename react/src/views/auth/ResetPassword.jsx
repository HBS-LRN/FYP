import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";


import { Helmet } from 'react-helmet';




export default function ResetPassword() {

    return (

        <div class="custom-gap">
        <form method="POST" action="/users/authenticate">
            <div class="custom-container">
                <div class="row align-items-center">
                    <div class="login-content">
                        <div class="col-lg-5 col-sm-12 col-xs-12  logoBox" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="logo">
                                <img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
                            </div>

                        </div>
                        <div class="col-lg-6 col-sm-12 col-xs-12 custom-login-margin" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">

                            <div class="login-form">
                                <h3>Reset Password</h3>
                                <p>Remember Password? <a href="/login">Login Here</a></p>
                            </div>



                            <div class="text password">
                                    <label for="passwordText">New Password</label><br />

                                    <div class="custom-form">
                                        <i class="fa fa-key"></i>
                                        <input type="text" name="password" placeholder="Enter your password" />
                                    </div>
                                    <p class="error">*Password requirements: Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number</p> 
                                </div>
                                <div class="text password">
                                    <label for="passwordText">Confirm New Password</label><br />

                                    <div class="custom-form">
                                        <i class="fa fa-key"></i>
                                        <input type="text" name="password_confirmation" placeholder="Enter your confirm password" />
                                    </div>
                                    {/* <p class="error">*Password confirmation does not match.</p>  */}
                                </div>
                        


                           
<br/>
<br/>

                      
                            <button class="button-price login">
                                Submit
                            </button>

                        </div>
                    </div>
                </div>





            </div>
        </form >
        <Helmet>
            <link rel="stylesheet" href="../../../assets/css/resetPassword.css" />
        </Helmet>

    </div >





    );
}
