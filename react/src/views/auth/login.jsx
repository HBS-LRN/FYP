import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="custom-gap">
      <form
        method="POST"
        action="/users/authenticate"
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
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
                <div className="text email">
                  <label htmlFor="email" className="form-label">
                    User Email
                  </label>
                  <div className="custom-form">
                    <i className="fa-regular fa-envelope" />
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">
                      Please Enter A Valid Email
                    </div>
                  </div>
                  {/* <p className="error">*Invalid User Email And /Or Password.</p> */}
                </div>
                <br/>
                <div className="text password">
                  <label htmlFor="passwordText">Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key" />
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      
                    
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">
                      Please Provide A Valid Password
                    </div>
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
