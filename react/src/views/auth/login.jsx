import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { createRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";
import { Link } from "react-router-dom";
export default function Login() {

  const emailRef = createRef();
  const passwordRef = createRef();
  const { user, setUser, setToken, setAuthUser, setCartQuantity } = useStateContext()
  const [error, setError] = useState({ email: '', password: '' }); // Initialize error as an object with fields
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const { setFailNotification, setWarningNotification, setSuccessNotification } = useNotificationContext();
  const navigate = useNavigate();



  if (user) {
    return <Navigate to="/dashboard" />;
  }

  //handle onChange value
  const handleInputChange = () => {
    setError({ email: '', password: '' }); // Reset specific field errors
  };

  //when user click submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setError({ email: '', password: '' }); // Reset specific field errors
    setValidated(true);

    // Directly use event.currentTarget to access the form element
    const form = event.currentTarget;

    if (form.checkValidity()) {
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      //set loading to true while post to server
      setLoading(true);


      try {
        const { data } = await axiosClient.post('/login', payload);

        if (data.message) {
          setFailNotification("Account Deactivated", "Contact admin to reactivate.");
          setLoading(false);
        }
        else if (!data.user) {
          // Handle concurrent login message


          setWarningNotification(
            "Duplicated Login Detected!",
            "Please click Ok Button if you want to deactivated your account"
          ).then(async (value) => {

            console.log(data)
            if (value) {
              try {
                await axiosClient.put(`/setNonActiveMember/${data.id}`).then(() => {
                  setSuccessNotification(
                    "Account deactivated. Others will be logged out immediately. Contact admin to reactivate."
                  );
                });
              } catch (error) {
                const response = error.response;
                console.log(response);
                if (response && response.status === 422) {
                  setError(response.data.errors);
                }
              }
            }
          });
          setLoading(false);
        } else {
          // Set the data to session

          console.log(data.user.meals)
          setUser(data.user);
          setToken(data.token);
          setCartQuantity(data.cartQuantity);
          setLoading(false);

          //check if user is customer
          if (data.user.role == 0) {
            navigate("/dashboard");
          } else {
            navigate("/staffDashboard");
          }

        }
      } catch (err) {
        setLoading(false);
        const response = err.response;
        console.log(err);
        if (response && response.status === 422) {
          setError(response.data.errors);
        } else {
          setError(response.data.message);
        }
      }

    }


  };

  return (
    <div className="custom-gap">
      <form
        className="needs-validation"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="custom-container">
          <div className="row align-items-center">
            <div
              className="login-content"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="300"
            >
              <div className="col-lg-5 logoBox">
                <div className="logo">
                  <img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
                </div>
              </div>
              <div
                className="col-lg-6 custom-login-margin"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="400"
              >
                <div className="login-form">
                  <h3>User Login</h3>
                  <p>
                    New User? <a href="/register">Register Here</a>
                  </p>
                </div>
                <div className={`text email ${validated && !error.email ? 'was-validated' : ''}`}>
                  <label htmlFor="email" className="form-label">
                    User Email
                  </label>
                  <div className="custom-form">
                    <i className="fa-regular fa-envelope" />
                    <input
                      type="email"
                      className={`form-control ${error.email ? 'is-invalid' : ''}`}
                      name="email"
                      ref={emailRef}
                      placeholder="Enter your email"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      onChange={handleInputChange}
                    />

                    <div className="valid-tooltip">Looks good!</div>
                    {error.email ? (
                      <div className="invalid-tooltip">
                        {error.email}
                      </div>
                    ) : (
                      <div className="invalid-tooltip">
                        Please Enter A Valid Email
                      </div>
                    )}
                  </div>
                </div>
                <br />
                <div className={`text email ${validated && !error.email ? 'was-validated' : ''}`}>
                  <label htmlFor="passwordText">Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key" />
                    <input
                      type="password"
                      className={`form-control ${error.email ? 'is-invalid' : ''}`}
                      name="password"
                      ref={passwordRef}
                      placeholder="Enter your password"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      onChange={handleInputChange}
                    />

                    <div className="valid-tooltip">Looks good!</div>
                    {!error.email &&
                      <div className="invalid-tooltip">
                        Please Provide A Valid Password
                      </div>
                    }
                  </div>
                </div>
                <div className="forgetPassword">
                  <Link to="/forgetPassword">Forget Password?</Link>
                </div>

                {loading ? (
                  <div className="loaderCustom">

                    <p className="loaderCustom-text">Loading</p>
                    <span className="loadCustom"></span>


                  </div>
                ) : (
                  <button className="button-submit login" type="submit">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <Helmet>
        <link rel="stylesheet" href="../../../assets/css/customerLogin.css" />
      </Helmet>
    </div>
  );
}
