import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken,setAuthUser } = useStateContext()
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({});

  const onSubmit = ev => {
    ev.preventDefault()

    console.log(emailRef.current.value)

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      
    }
   
   
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
        setAuthUser(data.user)
       
      })
      .catch((err) => {
        const response = err.response;
        console.log(response.data.errors);
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        
        }else{
          setMessage("Password Or Email Is Invalid")
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input ref={emailRef} type="email" placeholder="Email"   onChange={() => setErrors((prevErrors) => ({ ...prevErrors, email: undefined }))}/>
          {errors.email && (
            <div className="alert">
              <p>{errors.email[0]}</p>
            </div>
          )}
          <input ref={passwordRef} type="password" placeholder="Password"  onChange={() => setErrors((prevErrors) => ({ ...prevErrors, password: undefined }))}/>
          {errors.password && (
            <div className="alert">
              <p>{errors.password[0]}</p>
            </div>
          )}
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
      
        </form>
      </div>
    </div>
  )
}