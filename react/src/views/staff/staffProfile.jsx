import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import axiosClient from "../../axios-client.js";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function StaffProfile() {
    const { user, token, setToken, setCartQuantity,setUser} = useStateContext();
    const [updateUser,setUpdateUser] = useState({
        name: "",
        phone: "",
        image: null,
    })
    const [editProfilePicture, setEditProfilePicture] = useState(false);
    const [editName,setEditName] =useState(false);
    const [editPhone,setEditPhone] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [imageError, setImageError] = useState("");
    const navigate = useNavigate();
    const validateUpdateProfile = () => {
        const errors = {};

  
        if(editPhone){
            if (!isValidPhone(updateUser.phone)) {
                errors.phone = "Invalid phone number format";
            }
        }
       

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const handleEditSelection = (i) =>{
        switch (i) {
            case 0:
                editProfilePicture?setEditProfilePicture(false):setEditProfilePicture(true)
                break;
            case 1:
                editName?setEditName(false):setEditName(true)
                break;
            case 2:
                editPhone?setEditPhone(false):setEditPhone(true)
                break;
            default:
                break;
        }
    }
    console.log("error",validationErrors);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Validate the image
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif","image/jpg"];
            const maxSize = 5 * 1024 * 1024; // 5 MB

            if (!allowedTypes.includes(file.type)) {
                setImageError("Invalid file type. Please choose a valid image file.");
            } else if (file.size > maxSize) {
                setImageError("File size exceeds the limit (5 MB). Please choose a smaller file.");
            } else {
                // const reader = new FileReader();
                // reader.readAsDataURL(file);
                // reader.onload = () => {
                //     setUpdateUser((prevUser) => ({
                //         ...prevUser,
                //         image: reader.result,
                //     }));
                // };
                setUpdateUser((prevUser) => ({
                    ...prevUser,
                    image: file,
                }));
                setImageError("");
            }
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateUserProfile();
    };
 
    
    const isValidPhone = (phone) => {
        const phoneRegex = /^\d{3}-\d{7}|\d{3}-\d{8}$/;
        return phoneRegex.test(phone);
    };
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    }
    const changePassword = async (e) => {
        e.preventDefault();
    
        // Retrieve values from the form
        const currentPassword = e.target.elements.password_current.value;
        const newPassword = e.target.elements.password.value;
        const confirmPassword = e.target.elements.password_confirmation.value;
    
        // Validate input
        if (!currentPassword || !newPassword || !confirmPassword) {
            Swal.fire({
                title: "Error!",
                text: "All password fields are required.",
                icon: "error"
            });
            return;
        }
    
        try {
            const isPasswordMatch = await axiosClient.post(`/checkPassword/${user.id}`, {
            currentPassword,
            });

            if (!isPasswordMatch.data.isPasswordMatch) {
                Swal.fire({
                    title: "Error!",
                    text: "Current password is incorrect.",
                    icon: "error"
                });
                return;
            }
            if(!isValidPassword(newPassword)){
                Swal.fire({
                    title: "Error!",
                    text: "Current password is incorrect. The password must contain 8 characters,with at least 1 upper & lowercase letter & 1 number",
                    icon: "error"
                });
                return;
            }
            if(newPassword != confirmPassword){
                Swal.fire({
                    title: "Error!",
                    text: "Confirm password are no match with new password.",
                    icon: "error"
                });
                return;
            }
           // Send request to change password
            const res = await axiosClient.post(`/staffChangePassword/${user.id}`, {
                currentPassword,
                newPassword,
                confirmPassword,
            });

            Swal.fire({
              title: "Update!",
              text: "Your password has been changed.Please Login Again",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK"
            }).then((result) => {
              setUser(null);
              setToken(null);
              e.target.reset();
              navigate("/login");
            });
        
            // Reset the form
            
        } catch (error) {
            console.log(error);
    
            Swal.fire({
                title: "Error!",
                text: error.data.message,
                icon: "error"
            });
        }
    }
    const updateUserProfile = () =>{
        
        if (!validateUpdateProfile()){
            return;
        }
        console.log('image',updateUser.image);
        const formData = new FormData();
        formData.append('name', updateUser.name);
        formData.append('phone', updateUser.phone);
        formData.append('image', updateUser.image);
    
        axiosClient.post(`/updateStaff/${user.id}`, formData)
        .then(res => {
            console.log("update",res.data.user);
            setUser(res.data.user);
            Swal.fire({
                title: "Update!",
                text: "Your profile has been updated.",
                icon: "success"
              });
             
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
                <label class="label">Profile Picture<i class={editProfilePicture?"fa-solid fa-rectangle-xmark":"fa-solid fa-pen-to-square"} onClick={()=>handleEditSelection(0)}></i></label>
                  {editProfilePicture?( <label class="upload control">
                   
                   <input
                     type="file"
                     onChange={handleImageChange}
                     name='image'
                     accept="image/*"
                 />
                      {imageError && <div className='error'>{imageError}</div>}
                   </label>):''}
                 
                </div>
              </div>
            </div>
  
            <div class="field">
              <label class="label">Name <i class={editName?"fa-solid fa-rectangle-xmark":"fa-solid fa-pen-to-square"} onClick={()=>handleEditSelection(1)}></i></label>
              <div class="field-body">
                <div class="field">
                    {editName?(
                         <div class="control">
                         <input  type="text"
                             name="name"
                             value={updateUser.name}
                             onChange={handleInputChange}
                             className="input"
                             />
                             {validationErrors.name?(<div className='error'>{validationErrors.name}</div>):""}
                       </div>
                    ):''}
                 
                </div>
              </div>
            </div>
     
         
            <div class="field">
              <label class="label">Contact Number <i class={editPhone?"fa-solid fa-rectangle-xmark":"fa-solid fa-pen-to-square"} onClick={()=>handleEditSelection(2)}></i></label>
              <div class="field-body">
                <div class="field">
                    {editPhone?(
                        <div class="control">
                        <input 
                          type="tel"
                          name="phone"
                          value={updateUser.phone}
                          onChange={handleInputChange}
                          className="input"
                          />
                          {validationErrors.phone?(<div className='error'>{validationErrors.phone}</div>):""}
                        </div>
                    ):''}
                  
    
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
                    <i class="fa-solid fa-image-portrait"></i>
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
        <form className='field' onSubmit={changePassword}>
          <div class="field">
            <div className="pasword">
            <label class="label">Current password</label>
            </div>
            <div class="control">
              <input type="password" name="password_current" placeholder='Enter your Current password here.....' class="input"/>
            </div>
            
          </div>
     
          <div class="field">
            <label class="label">New password</label>
            <div class="control">
              <input type="password" autocomplete="new-password" placeholder='Enter your new password here.....' name="password" class="input"/>
            </div>
            
          </div>
          <div class="field">
            <label class="label">Confirm password</label>
            <div class="control">
              <input type="password" autocomplete="new-password" placeholder='Enter your confirm password here.....' name="password_confirmation" class="input"/>
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