import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { createRef, useEffect, useState } from "react";

import { Helmet } from 'react-helmet';




import CustomerSideBar from "../../components/CustomerSideBar";


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export default function ChangePassword() {



    const currentPassRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});


    //when user click on submit button
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity()) {

            const payload = {
                id: user.id,
                currentPass: currentPassRef.current.value,
                password: passwordRef.current.value,
                password_confirmation: passwordConfirmationRef.current.value,
            };


            delete payload.image_url;
            console.log(payload)
            try {
                await axiosClient
                    .post(`/changePassword`, payload)
                    .then((response) => {
                        console.log(response.data);
                        // window.location.reload();
                        setNotification("Your new password was successfully updated");
                    });
            } catch (error) {
                const response = error.response;
                console.log(response);
                if (response && response.status === 422) {
                    setError(response.data.errors);
                } else if (response && response.status === 401) {
                    setError({ currentPassword: response.data.message });
                }
            }
        }

    };

    //handle onChange state
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleCurentPasswordChange = (event) => {
        setError({ ...error, currentPassword: null });

    };

    return (
        <div>
            <form method="POST" action="#" className="needs-validation"
                noValidate

                onSubmit={handleSubmit}>

                <div class="all">
                    <div class="customerAccHeader">
                        <div class="customerAccBar"></div>
                        <span class="customerAcc">My Account</span>
                    </div>


                    <div class="container custom-auth-gap" >
                        <div class="row">
                            <CustomerSideBar />
                            <div class="col-lg-2 passwordContent" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                                <div class="accountTitle">
                                    <h3 class="profileTitle"><b>Change Password</b></h3>
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
                                    <p class="subTitle">For your account's security, do not share your password with anyone else</p>

                                </div>

                                <div class="userProfile">
                                    <div class="scroll-wrap">
                                        <div class="text">

                                            <div className={`passwordSetting label ${validated && !error.currentPassword ? 'was-validated' : ''}`}>
                                                <label for="currentPassword" class="currentPasswordLabel">Current Password</label>
                                                <input
                                                    ref={currentPassRef}
                                                    type="password"
                                                    name="current_password"
                                                    placeholder="Enter your password"
                                                    className={`form-control currentPassword ${error.currentPassword ? 'is-invalid' : ''}`}
                                                    required
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    onChange={handleCurentPasswordChange}
                                                    title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."

                                                />
                                                <div className="valid-tooltip customTooltip">Looks good!</div>
                                                {error.currentPassword ? (
                                                    <div className="invalid-tooltip customTooltip">{error.currentPassword}</div>
                                                ) : (
                                                    <div className="invalid-tooltip customTooltip">Please Enter A Valid Password</div>
                                                )}
                                            </div>

                                            <br />
                                            <div className={`passwordSetting label ${validated ? 'was-validated' : ''}`}>
                                                <label for="newPassword" class="newPasswordLabel">New Password</label>


                                                <input
                                                    ref={passwordRef}
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    className="form-control newPassword"
                                                    required
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
                                                    onChange={handlePasswordChange}
                                                />
                                                <div className="valid-tooltip customTooltip">Looks good!</div>
                                                <div className="invalid-tooltip customTooltip">
                                                    Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.
                                                </div>

                                            </div>
                                            <br />

                                            {/* 
                            @error('password')
                                <span class="error"  style="red">*{{ $message }}</span>
                            @enderror */}
                                            <div className={`confirmPasswordSetting label ${validated ? 'was-validated' : ''}`}>

                                                <label for="confirmPassword" class="confirmPasswordLabel">Confirm Password</label>

                                                <input
                                                    ref={passwordConfirmationRef}
                                                    type="password"
                                                    name="password_confirmation"
                                                    placeholder="Enter your confirm password"
                                                    className="form-control confirmPassword"
                                                    required
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    pattern={password ? `^${escapeRegExp(password)}$` : null}
                                                    title="Confirm password must match the password."
                                                    onChange={handleConfirmPasswordChange}
                                                />
                                                <div className="valid-tooltip customTooltip">Looks good!</div>
                                                <div className="invalid-tooltip customTooltip">Confirm password does not match the password.</div>

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
                </div>
            </form>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
                <link rel="stylesheet" href="../../../assets/css/customerChangePassword.css" />
            </Helmet>
        </div>
    );
}
