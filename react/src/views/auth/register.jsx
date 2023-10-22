import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity() || password !== confirmPassword || username.length <= 3) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="custom-gap">
      <form
        method="POST"
        action="/users/authenticate"
        className={`needs-validation ${validated ? "was-validated" : ""}`}
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
                    Has An Account? <a href="/login">Login Here</a>
                  </p>
                </div>

                <div className="text username">
                  <label htmlFor="username">Username</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      value={username}
                      onChange={handleUsernameChange}
                      pattern=".{4,}"
                      title="Username must contain at least 4 characters."
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">
                    Username must contain at least 4 characters
                    
                    </div>
                  
                  </div>
                </div>

                <div className="text email">
                  <label htmlFor="email">User Email</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">
                      Please enter a valid email address.
                    </div>
                  </div>
                </div>

                <div className="text password">
                  <label htmlFor="passwordText">Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key"></i>
                    <input
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
                      Password must contain at least 8 characters, one uppercase letter,lowercase letter, one number.
                    </div>
                  </div>
                </div>

                <div className="text password">
                  <label htmlFor="passwordText">Confirm Password</label>
                  <br />
                  <div className="custom-form">
                    <i className="fa fa-key"></i>
                    <input
                      type="password"
                      name="password_confirmation"
                      placeholder="Enter your confirm password"
                      className="form-control"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      pattern={password ? `^${password}$` : null}
                      title="Confirm password must match the password."
                      onChange={handleConfirmPasswordChange}
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">
                      Confirm password does not match the password.
                    </div>
                  </div>
                </div>
                

               <br/>
               
                <button className="button-price login">Register</button>
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
