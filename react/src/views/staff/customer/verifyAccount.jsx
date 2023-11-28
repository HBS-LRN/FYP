import React, { createRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axiosClient from '../../../axios-client.js';
import { useStateContext } from '../../../contexts/ContextProvider.jsx';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
export default function VerifyCustomer() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  let { id } = useParams();

  useEffect(() => {
    getUser();
  }, [id]);

console.log("id",id);
  const getUser = () => {
    axiosClient.get(`/getUser/${id}`)
      .then(({ data: responseData }) => {
        console.log('API Response User:', responseData);
       
        const userData = {
          name: responseData.user.name,
          email: responseData.user.email,
          password: null,
        };
        setUser(userData);
      })
      .catch((error) => {
        setLoading(false);
        console.error('API request error User:', error);
      });
  };
  console.log("user",user);
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    const data = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    
    try {
      // Use axiosClient.post for sending data
      const response = axiosClient.post(`/varifyAccount/${id}`, data);
      console.log('API Response Verify:', response.data);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Account has been actived",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/login');
    } catch (error) {
      setLoading(false);
      console.error('API request error Verify:', error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {};

    if (!/^[a-zA-Z\s]{1,10}$/.test(user.name)) {
      newError.name = 'must contain between 1 and 10 characters.';
      user.name='';
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(user.email)) {
    newError.email = 'Enter a valid email address.';
    user.email='';
    isValid = false;
  }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(user.password)) {
      newError.password = '8 characters,with 1 upper & lowercase letter & 1 number.';
      user.password='';
      isValid = false;
    }

    if (user.password !== user.confirmPassword) {
      newError.confirmPassword = 'Confirm password does not match the password.';
      user.confirmPassword='';
      isValid = false;
    }

    console.log("error:",newError);
    setError(newError);
    return isValid;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
        ...user,
        [name]: value
    });
}
  

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
                    Has an account? <a href="/login">Login Here</a>
                  </p>
                </div>

                <div className={`text username ${validated ? 'was-validated' : ''}`}>
                  <label htmlFor="username">Username</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required
                      style={error.name ? { boxShadow: '0px 0px 5px red', fontSize: '15px' } : {}}
                      value={user.name}
                      onChange={handleInput}
                      placeholder={error.name ? error.name : "Enter Account Name..."}
                    />
                    
                  </div>
                </div>

                <div className={`text email ${validated && !error.email ? 'was-validated' : ''}`}>
                  <label htmlFor="email">User Email</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                       type="email"
                       name="email"
                      className="form-control"
                      required
                      style={error.email ? { boxShadow: '0px 0px 5px red', fontSize: '15px' } : {}}
                      value={user.email}
                      onChange={handleInput}
                      placeholder={error.email ? error.email : "Enter Your Email..."}
                    />

                  </div>
                </div>

                <div className={`text password ${validated ? 'was-validated' : ''}`}>
                  <label htmlFor="passwordText">Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key"></i>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required
                      style={error.password ? { boxShadow: '0px 0px 5px red', fontSize: '12px' } : {}}
                      value={user.password}
                      onChange={handleInput}
                      placeholder={error.password ? error.password : "Enter your password..."}
                    />

                   
                  </div>
                </div>

                <div className={`text password ${validated ? 'was-validated' : ''}`}>
                  <label htmlFor="passwordText">Confirm Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      required
                      style={error.confirmPassword ? { boxShadow: '0px 0px 5px red', fontSize: '12px' } : {}}
                      value={user.confirmPassword}
                      onChange={handleInput}
                      placeholder={error.confirmPassword ? error.confirmPassword : "Enter your password..."}
                    />
                    
                   
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
