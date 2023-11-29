import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, createRef, useState } from "react";

import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";


//escape special character
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function ResetPassword() {

    const { token, user, setUser, setNotification } = useStateContext()
    const { setFailNotification } = useNotificationContext();

    console.log(user)
    if (!token) {
        return <Navigate to="/authRequired" />;
    }

    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();




    useEffect(() => {
        const interval = 2000; // set timer

        const timerId = setInterval(() => {
            getExpireTime();
        }, interval);

        // Clear the interval when the component unmounts to avoid memory leaks
        return () => clearInterval(timerId);
    }, []);

    const getExpireTime = () => {
        const payload = {
            token: token,
            email: user.email
        };

        console.log(payload)

        axiosClient
            .post("/checkExpire", payload)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.errors);
                } else {
                   
                    setFailNotification("Link Expired!", "Request A New Email To Reset Password!");
                    navigate("/forgetPassword");
                    setUser(null);
                    setToken(null);

                }
            });
    }

    //when user click on submit button
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();



        const form = event.currentTarget;
        if (form.checkValidity() && password === confirmPassword) {
            const payload = {
                password: passwordRef.current.value,
                password_confirmation: passwordConfirmationRef.current.value,
                email: user.email
            };
            setLoading(true);


            axiosClient
                .post("/resetPassword", payload)
                .then(({ data }) => {
                    setUser(data.user);
                    setNotification("Login With Your New Password!");
                    navigate("/login");
                    setUser(null);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                    setLoading(false);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    } else {
                        setError(response.data.message)
                    }
                });
        }




        setValidated(true);
    };


    //handle onChange state
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError(null);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    return (

        <div class="custom-gap">
            <form className="needs-validation"
                noValidate
                onSubmit={handleSubmit}>
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



                                <div className={`text password ${validated && !error ? 'was-validated' : ''}`}>
                                    <label htmlFor="passwordText">Password</label>
                                    <br />
                                    <div className="custom-form">
                                        <i className="fa fa-key"></i>
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            required
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                            title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
                                            onChange={handlePasswordChange}
                                        />
                                        <div className="valid-tooltip">Looks good!</div>
                                        {error ? (
                                            <div className="invalid-tooltip">
                                                {error}
                                            </div>
                                        ) : (
                                            <div className="invalid-tooltip">
                                                Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={`text password ${validated && !error ? 'was-validated' : ''}`}>
                                    <label htmlFor="passwordText">Confirm Password</label>
                                    <br />
                                    <div className="custom-form">
                                        <i className="fa fa-key"></i>
                                        <input
                                            ref={passwordConfirmationRef}
                                            type="password"
                                            name="password_confirmation"
                                            placeholder="Enter your confirm password"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            required
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            pattern={password ? `^${escapeRegExp(password)}$` : null}
                                            title="Confirm password must match the password."
                                            onChange={handleConfirmPasswordChange}
                                        />
                                        <div className="valid-tooltip">Looks good!</div>
                                        {!error &&
                                            <div className="invalid-tooltip">
                                                Confirm password does not match the password.
                                            </div>
                                        }

                                    </div>
                                </div>




                            

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
                <link rel="stylesheet" href="../../../assets/css/resetPassword.css" />
            </Helmet>

        </div >





    );
}
