import React, { createRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axiosClient from '../../../axios-client.js';
import { useStateContext } from '../../../contexts/ContextProvider.jsx';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export default function VerifyCustomer() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const [user,setNowUser] = useState({});
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
 
  let { id } = useParams();

  useEffect(() => {
    getUser();
    setUser(null);
  }, [id]);

console.log("id",id);
  const getUser = () => {
    axiosClient.get(`/getUser/${id}`)
      .then(({ data: responseData }) => {
        console.log('API Response User:', responseData);
       
        
        setNowUser(responseData.user);

        
      })
      .catch((error) => {
        setLoading(false);
        console.error('API request error User:', error);
      });
  };
  console.log("user",user);

  const handleSubmit = async (event) => {
    console.log("handleSubmit");
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    
    const form = event.currentTarget;
    console.log("invalid",password,"cp:",confirmPassword,"userName:",username.length);
    //check client side validity before send it to server
    if (form.checkValidity() && password === confirmPassword && username.length >= 1 && username.length <= 10) {
      const payload = {
        name: user.name,
        email: user.email,
        password: password,
  
      };
      
      //set loading to true while post to server
      setLoading(true);
  
    // const data = {
    //   name: user.name,
    //   email: user.email,
    //   password: user.password
    // };
    
    try {
      // Use axiosClient.post for sending data
      const response = axiosClient.post(`/varifyAccount/${id}`, payload);
      console.log('API Response Verify:', response.data);
      setLoading(false);
      setUser(null);
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
      }
  };



  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setNowUser((prevUser) => ({ ...prevUser, password: event.target.value }));
  };
  
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setNowUser((prevUser) => ({ ...prevUser, confirmPassword: event.target.value }));
  };
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setNowUser((prevUser) => ({ ...prevUser, name: event.target.value }));
  };
  
  const handleEmailChange = (event) => {
    // Clear the message when the email field value changes
    setEmail(event.target.value);
    setError((prevError) => ({ ...prevError, email: null }));
    setNowUser((prevUser) => ({ ...prevUser, email: event.target.value }));
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
                  <h3>Verify Account</h3>
                 
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
                      value={user.name}
                      pattern=".{1,10}"
                      onChange={handleUsernameChange}
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
                       type="email"
                       name="email"
                      className="form-control"
                      readOnly
                     
                      value={user.email}
                      onChange={handleEmailChange}
                      
                    />

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
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
                      value={user.password}
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
                      name="confirmPassword"
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Confirm password must match the password."
                      value={user.confirmPassword}
                      pattern={password ? `^${escapeRegExp(password)}$` : null}
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
                  <button type="submit" className="button-submit">
                    Verify
                  </button>

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
