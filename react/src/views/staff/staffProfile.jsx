import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import axiosClient from "../../axios-client.js";
import Swal from 'sweetalert2';
import { useStateContext } from "../../contexts/ContextProvider";

export default function StaffProfile() {
    const { user, token, setToken, setCartQuantity } = useStateContext();
    const [updateUser,setUpdateUser] = useState({
        name: "",
        email: "",
        phone: "",
        image: null,
    })
    const [validationErrors, setValidationErrors] = useState({});
    const validateUpdateProfile = () => {
        const errors = {};

        if (!updateUser.name.trim()) {
            errors.name = "Name is required";
        }

        if (!updateUser.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(updateUser.email)) {
            errors.email = "Invalid email format";
        }

        if (!updateUser.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!isValidPhone(updateUser.phone)) {
            errors.phone = "Invalid phone number format";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUpdateUser((prevUser) => ({
            ...prevUser,
            image: file,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateUserProfile();
    };
    const isValidEmail = (email) => {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isValidPhone = (phone) => {
        // Regular expression for a simple phone number validation
        // This regex allows for numbers with optional spaces, hyphens, or parentheses
        const phoneRegex = /^\d{11}$|^\d{3}-\d{7}$/;
        return phoneRegex.test(phone);
    };
    const updateUserProfile = () =>{

        if (validateUpdateProfile()){
            return;
        }
        const formData = new FormData();
        formData.append('name', updateUser.name);
        formData.append('email', updateUser.email);
        formData.append('phone', updateUser.phone);
        formData.append('image', updateUser.image);
    
        axiosClient.post(`/updateStaff/${id}`, formData)
        .then(res => {
            console.log(res.message);
         
            Swal.fire({
                title: "Update!",
                text: "Selected meal has been updated.",
                icon: "success"
              });
              setRedirect(true);
        })
        .catch(function (error) {
            console.log(error); // This will log the Axios request config.
        });

    }

    return(
        <div>
            <div class="main-content">
        <Helmet> <link rel="stylesheet" href="../../../assets/css/staffProfile.css" /></Helmet>
<div class="page-content">
    <div class="container-fluid">

   
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Staff</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Staff</a></li>
                            <li class="breadcrumb-item active">Profile</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>

     

  <section class="section main-section">
   <div className="GridBox">
      <div class="card">
        <header class="card-header">
          <p class="">
            <span class="icon"><i class="mdi mdi-account-circle"></i></span>
            Edit Profile
          </p>
        </header>
        <div class="card-content">
          <form className='form-screen' onSubmit={handleFormSubmit} >
            <div class="field">
              
              <div class="field-body">
                <div class="field file">
              
                  <label class="upload control">
                   
                    <input type="file" onChange={handleImageChange} name='image' value={updateUser.image}/>
                  </label>
                </div>
              </div>
            </div>
  
            <div class="field">
              <label class="label">Name</label>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input  type="text"
                        name="name"
                        value={updateUser.name}
                        onChange={handleInputChange}
                        className="input"
                        required/>
                  </div>
              
                </div>
              </div>
            </div>
     
            <div class="field">
              <label class="label">E-mail</label>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                  <input 
                    type="email"
                    name="email"
                    value={updateUser.email}
                    onChange={handleInputChange}
                    className="input"
                    required />
                  </div>
    
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Contact Number</label>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                  <input 
                    type="tel"
                    name="phone"
                    value={updateUser.phone}
                    onChange={handleInputChange}
                    className="input"
                    required />
                  </div>
    
                </div>
              </div>
            </div>
 

            <div class="field">
              <div class="control">
                <button type="submit" class="submitBtn">
                  Submit
                </button>
              </div>
            </div>
          </form>
    </div>
    </div>

      <div class="card">
        <header class="card-header">
          <p class="">
            <span class="icon"><i class="mdi mdi-account"></i></span>
            Profile
          </p>
        </header>
        <div class="card-content field">
          <div class="field fileImage">
          {user && user.image ? (

                <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                    
                />

                ) : (
                <i class="fa fa-user" aria-hidden="true"></i>
                )}
          </div>

          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input type="text" readonly value={user.name} class="input is-static"/>
            </div>
          </div>

          <div class="field">
            <label class="label">E-mail</label>
            <div class="control">
              <input type="text" readonly value={user.email} class="input is-static"/>
            </div>
          </div>
          <div class="field">
            <label class="label">Contact Number</label>
            <div class="control">
              <input type="phone" readonly value={user.phone} class="input is-static"/>
            </div>
          </div>
        </div>
      </div>
      </div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <span class="icon"><i class="mdi mdi-lock"></i></span>
          Change Password
        </p>
      </header>
      <div class="card-content">
        <form className='field'>
          <div class="field">
            <div className="pasword">
            <label class="label">Current password</label>
            </div>
            <div class="control">
              <input type="password" name="password_current" placeholder='Enter your Current password here.....' class="input" required/>
            </div>
            
          </div>
     
          <div class="field">
            <label class="label">New password</label>
            <div class="control">
              <input type="password" autocomplete="new-password" placeholder='Enter your new password here.....' name="password" class="input" required/>
            </div>
            
          </div>
          <div class="field">
            <label class="label">Confirm password</label>
            <div class="control">
              <input type="password" autocomplete="new-password" placeholder='Enter your confirm password here.....' name="password_confirmation" class="input"  required/>
            </div>
        
          </div>
    
          
            <div class="control">
              <button type="submit" class="submitBtn">
                Submit
              </button>
            </div>
      
          </form>
      </div>

    </div>

  </section>
       

        

    </div> 
</div>



</div>
        </div>
    );
}