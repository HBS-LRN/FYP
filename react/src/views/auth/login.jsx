import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";




import '../../../assets/css/customerLogin.css';


export default function Login() {

    return (

        <div>
            <form method="POST" action="/users/authenticate">
            
                <div class="customer-login-container">
                    <div class="customer-login">
                        <div class="logo">
                            <img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
                        </div>
                        <div class="customer-form">
                            <div class="text-form">

                                <div class="login-form">
                                    <h1>User Login</h1>
                                    <p>New User? <a href="/register">Register Here</a></p>
                                </div>

                                <div class="text email">
                                    <label for="email">User Email</label>
                                    <input type="text" class="txtCustEmail" name="email"
                                    />


                                    {/* <p class="error">*{{$message}}</p> */}


                                </div>
                                <div class="text password">
                                    <label for="passwordText">Password</label><br />

                                    <input type="password" class="txtCustPassword" name="password"
                                    />


                                    {/* <p class="error">*{{$message}}</p> */}

                                </div>


                                <div class="forgetPassword">
                                    <a href="/password/forget">Forget Password?</a>
                                </div>

                                <button class="submit-btnLogin">
                                    Log In
                                </button>

                            </div>

                        </div>
                    </div>

                </div>

            </form>

        </div>



    );
}
