import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { createRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {

  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken, setAuthUser } = useStateContext()
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  //handle onChange value
  const handleInputChange = () => {
    setError(null);
  };

  //when user click submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setError(null);
    setValidated(true);

    // Directly use event.currentTarget to access the form element
    const form = event.currentTarget;

    if (form.checkValidity()) {
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };


      axiosClient
        .post('/login', payload)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
          setAuthUser(data.user);
          navigate("/dashboard");
          console.log(data);
        })
        .catch((err) => {


          const response = err.response;
          console.log(err);
          if (response && response.status === 422) {
            setError(response.data.errors);
          } else {
            setError("Email Or Password Is Invalid");
          }
        });
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
                <div className={`text email ${validated && !error ? 'was-validated' : ''}`}>
                  <label htmlFor="passwordText">Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key" />
                    <input
                      type="password"
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                      name="password"
                      ref={passwordRef}
                      placeholder="Enter your password"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      onChange={handleInputChange}
                    />

                    <div className="valid-tooltip">Looks good!</div>
                    {!error &&
                      <div className="invalid-tooltip">
                        Please Provide A Valid Password
                      </div>
                    }
                  </div>
                </div>
                <div className="forgetPassword">
                  <a href="/forgetPassword">Forget Password?</a>
                </div>
                <button className="button-price login" type="submit">
                  Log In
                </button>
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
