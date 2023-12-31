import React, { createRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from '../../axios-client.js';
import { useStateContext } from '../../contexts/ContextProvider.jsx';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function Register() {
  //react declaration
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  //when user click on submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);


    const form = event.currentTarget;

    //check client side validity before send it to server
    if (form.checkValidity() && password === confirmPassword && username.length >= 1 && username.length <= 10) {
      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      };

      //set loading to true while post to server
      setLoading(true);

      try {
        //after client-side no error, send it to server side
        await axiosClient
          .post("/signup", payload)
          .then(({ data }) => {
            setUser(data.user);
            setToken(data.token);
            navigate("/registerDetail");
            // Scroll to the top of the screen window
            window.scrollTo(0, 0);
            setLoading(false);
          });
      } catch (err) {
        setLoading(false);
        console.log(err.response.data);
        const response = err.response;
        if (response && response.status === 422) {
          setError(response.data.errors);
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = () => {
    // Clear the message when the email field value changes
    setError({ ...error, email: null });
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
              <div className="col-lg-5 col-sm-12 col-xs-12 logoBox">
                <img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
              </div>
              <div
                className="col-lg-6 col-sm-12 col-xs-12 custom-login-margin"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="400"
              >
                <div className="login-form">
                  <h3>User Registration</h3>
                  <p>
                    Has an account? <Link to="/login">Login Here</Link>
                  </p>
                </div>

                <div className={`text username ${validated ? 'was-validated' : ''}`}>
                  <label htmlFor="username">Username</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-user"></i>
                    <input
                      ref={nameRef}
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      value={username}
                      onChange={handleUsernameChange}
                      pattern=".{1,10}"
                      title="Username must contain between 1 and 10 characters."
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">Username must contain between 1 and 10 characters.</div>
                  </div>
                </div>

                <div className={`text email ${validated && !error.email ? 'was-validated' : ''}`}>
                  <label htmlFor="email">User Email</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      ref={emailRef}
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`form-control ${error.email ? 'is-invalid' : ''}`}
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      onChange={handleEmailChange}
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    {error.email ? (
                      <div className="invalid-tooltip">{error.email}</div>
                    ) : (
                      <div className="invalid-tooltip">Please Enter A Valid Email</div>
                    )}
                  </div>
                </div>

                <div className={`text password ${validated ? 'was-validated' : ''}`}>
                  <label htmlFor="passwordText">Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key"></i>
                    <input
                      ref={passwordRef}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
                      onChange={handlePasswordChange}
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">
                      Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.
                    </div>
                  </div>
                </div>

                <div className={`text password ${validated ? 'was-validated' : ''}`}>
                  <label htmlFor="passwordText">Confirm Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key"></i>
                    <input
                      ref={passwordConfirmationRef}
                      type="password"
                      name="password_confirmation"
                      placeholder="Enter your confirm password"
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      pattern={password ? `^${escapeRegExp(password)}$` : null}
                      title="Confirm password must match the password."
                      onChange={handleConfirmPasswordChange}
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">Confirm password does not match the password.</div>
                  </div>
                </div>

                <br />

                {loading ? (
                  <div className="loaderCustom">

                    <p className="loaderCustom-text">Loading</p>
                    <span className="loadCustom"></span>


                  </div>
                ) : (
                  <button className="button-submit">Register</button>
                )}

              </div>
            </div>
          </div>
        </div>
      </form>
      <Helmet>
        <link rel="stylesheet" href="../../../assets/css/customerRegister.css" />
      </Helmet>
    </div>
  );
}
