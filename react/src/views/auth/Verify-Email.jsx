import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { createRef, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";





export default function VerifyEmail() {

    const emailRef = createRef();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user, setUser, setNotification,setToken } = useStateContext()
    const [loading, setLoading] = useState(false);
    //handle onChange value
    const handleInputChange = () => {
        setError(null);
    };
    //when user click submit button
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        // Directly use event.currentTarget to access the form element
        const form = event.currentTarget;

        if (form.checkValidity()) {

            setLoading(true);
            const payload = {
                email: emailRef.current.value,
            };


            axiosClient
                .post('/verifyEmail', payload)
                .then(({ data }) => {
                    console.log(data);
                    setUser(data.user);
                    setToken(data.token);
                    setNotification("Reset Your Password via Email Sent!");
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    console.log(err);
                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    } else {
                        setError(response.data.message);
                    }
                });
        }



    };
    return (
        <div class="custom-gap">
            <form
                className="needs-validation"
                noValidate
                onSubmit={handleSubmit}

            >
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



                                <div className={`text email ${validated && !error ? 'was-validated' : ''}`}>
                                    <label htmlFor="email" className="form-label">
                                        User Email
                                    </label>
                                    <div className="custom-form">
                                        <i className="fa-regular fa-envelope" />
                                        <input
                                            type="email"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            name="email"
                                            ref={emailRef}
                                            placeholder="Enter your email"
                                            required
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            onChange={handleInputChange}
                                        />

                                        <div className="valid-tooltip">Looks good!</div>
                                        {error ? (
                                            <div className="invalid-tooltip">
                                                {error}
                                            </div>
                                        ) : (
                                            <div className="invalid-tooltip">
                                                Please Enter A Valid Email
                                            </div>
                                        )}
                                    </div>
                                </div>



                                <br />
                                <br />
                                {loading ? (
                                    <div className="loaderCustom">

                                        <p className="loaderCustom-text">Loading</p>
                                        <span className="loadCustom"></span>


                                    </div>
                                ) : (
                                    <button className="button-submit" type="submit">
                                        Submit
                                    </button>
                                )}

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
