import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';






export default function VerifyEmail() {

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
                                <h3>Forget Password</h3>
                                <p>Remember Password? <a href="/login">Login Here</a></p>
                            </div>



                            <div class="text email">
                                <label for="email">User Email</label>
                                <div class="custom-form">
                                    <i class="fa-regular fa-envelope"></i>
                                    <input type="text" name="name" placeholder="Enter your email" />
                                </div>


                                {/* <p class="error">*Sorrsdcsdcsdcsdcsdcsdcsdcsdcsdcsdsdcsdcdcy</p>  */}


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
            <link rel="stylesheet" href="../../../assets/css/verifyEmail.css" />
        </Helmet>

    </div >



    );
}
