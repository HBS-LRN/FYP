import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState({});
  const [emailBlurred, setEmailBlurred] = useState(false);

  const handleChange = (inputName) => {
    const value =
      inputName === "password_confirmation"
        ? passwordConfirmationRef.current.value
        : passwordRef.current.value;
  
    if (inputName === "password_confirmation") {
      if (value !== passwordRef.current.value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password_confirmation: ["Password confirmation does not match."],
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password_confirmation: undefined,
        }));
      }
    } else if(inputName === "password") {
      
      const passwordRequirements = {
        minCharacters: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
      };
  
      const newErrors = {
        ...errors,
        ["password_requirement"]: !(
          passwordRequirements.minCharacters &&
          passwordRequirements.hasUppercase &&
          passwordRequirements.hasLowercase &&
          passwordRequirements.hasNumber
        ),
      };
      setErrors(newErrors);
    }

    if (inputName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailRef.current.value)) {
        setEmailBlurred(false);
      } else {
        setEmailBlurred(true);

      }
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }))
    }


  };

  const handleEmailBlur = () => {

    handleChange("email");
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);

        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>

          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            onChange={() => setErrors((prevErrors) => ({ ...prevErrors, name: undefined }))}
          />

          {errors.name && (
            <div className="alert">
              <p>{errors.name[0]}</p>
            </div>
          )}


          <input
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            onChange={() => setErrors((prevErrors) => ({ ...prevErrors, email: undefined }), setEmailBlurred(false))}
            onBlur={handleEmailBlur}
          />

          {errors.email && (
            <div className="alert">
              <p>{errors.email[0]}</p>
            </div>
          )}

          {emailBlurred && (

            <div className="alert">

              <p>Email format is not valid</p>
            </div>
          )}



          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            onChange={() =>setErrors((prevErrors) => ({ ...prevErrors, password: undefined }),handleChange("password"))}
          />
          {errors.password && (
            <div className="alert">
              <p>{errors.password[0]}</p>
            </div>
          )}
           {errors.password_requirement && (
            <div className="alert">
              <p>Password requirements: Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number</p>
            </div>
          )}


          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Repeat Password"
            onChange={() => handleChange("password_confirmation")}
          />
          {errors.password_confirmation && (
            <div className="alert">
              <p>Password confirmation does not match</p>
            </div>
          )}

          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}


