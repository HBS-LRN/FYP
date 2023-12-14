import React, { useEffect,useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2'
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

const AddStaff = () => {
    const { user, token, setToken, setCartQuantity } = useStateContext();
    const [staff, setStaff] = useState({
        name: '',
        email: '',
        phone: '',
        birthdate: '',
        gender: null, 
        role:null,
      });
      const [errors, setErrors] = useState({});
      const [loading, setLoading] = useState(false);
      const [emailExists, setEmailExists] = useState(false);
      const validateForm = () => {
        const newErrors = {};
    
        // Basic validation, you can add more checks as needed
        if (!staff.name) {
          newErrors.name = 'Please enter a name.';
        }
        
        

        if (!staff.email) {
          newErrors.email = 'Please enter an email address.';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(staff.email)) {
            newErrors.email = 'Please enter a valid email address.';
          }
        }
    
        if (!staff.phone) {
            newErrors.phone = 'Please enter a phone number.';
        } else {
            // Allowing either 10 digits without dashes or 3 digits, a dash, and 7 digits
            const phoneRegex = /^\d{3}-\d{7}|\d{3}-\d{8}$/;
            if (!phoneRegex.test(staff.phone)) {
                newErrors.phone = 'Please enter a valid phone number in the format 012-3456789.';
            }
        }
    
        if (!staff.birthdate) {
          newErrors.birthdate = 'Please enter a birthdate.';
        } else {
          const currentDate = new Date();
          const selectedDate = new Date(staff.birthdate);
          const ageDifferenceInMilliseconds = currentDate - selectedDate;
          const ageInYears = ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);
          
          if (selectedDate > currentDate) {
            newErrors.birthdate = 'Birthdate cannot be in the future.';
          }else if (ageInYears < 18) {
            newErrors.birthdate = 'Age must be 18 or older.';
          }
          
          
           
          
        }
    
        if (!staff.gender) {
          newErrors.gender = 'Please select a gender.';
        }
        if (!staff.role) {
          newErrors.role = 'Please select a gender.';
        }
        console.log("customer",staff);
        setErrors(newErrors);
    
        // Check if there are any errors
        return Object.keys(newErrors).length === 0;
      };
 
      useEffect(() => {
      
        if (staff.email) {
            axiosClient.post('/checkEmailExists', { email: staff.email })
                .then(response => {
                    console.log(response.data.exists);
                    setEmailExists(response.data.exists);
                    
                })
                .catch(error => {
                    console.error('Error checking email existence:', error);
                });
        }
    }, [staff.email]);

       const createStaff = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        if (!validateForm()) {
            return;
        }
        console.log("Form submitted2");
        setLoading(true);
        const data = {
            name: staff.name,
            email: staff.email,
            phone: staff.phone,
            birthdate: staff.birthdate,
            gender: staff.gender.value,
            role: staff.role.value,
            password: "securepassword123?"
        };

        console.log(data);
        let timerInterval;
        Swal.fire({
        title: "Waiting process",
        html: "Left <b></b> seconds.",
        timer: 5000, // Set the timer to 5 seconds (5000 milliseconds)
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${(Swal.getTimerLeft() / 1000).toFixed(0)}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("The alert was closed by the timer");
        }
        });

        // Move the useEffect here
        axiosClient.post('/createStaff', data)
            .then(res => {
                const activeData = {
                    user_id:user.id,
                    Action: "Added new staff", 
                    ActionIcon:"fa-solid fa-upload"
                }
                axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    setStaff({
                        name: '',
                        email: '',
                        phone: '',
                        birthdate: '',
                        gender: { value: '', label: '' }, 
                        role: { value: '', label: '' }, 
                      });
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'New staff had been successfully added!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });

            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); 
            });
    };

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
      ];
      const positionOptions = [
        { value: 1, label: 'Staff' },
        { value: 3, label: 'Devery Man' },
      ];
      console.log(errors)
    //   const handleChange = (e) => {
    //     setCustomer({ ...customer, [e.target.name]: e.target.value });
    //     setErrors({ ...errors, [e.target.name]: null });
    //   };
    const handleChange = (name, value) => {
        setStaff(prevStaff => ({ ...prevStaff, [name]: value }));
        setErrors({ ...errors, [name]: null });
      };

    return (
        <div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/addMeal.css" />

            </Helmet>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Add Staff</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Manage Staff</a>
                                            </li>
                                            <li className="breadcrumb-item active">Add Staff</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Basic Information</h4>
                                        <p className="card-title-desc">Fill all information below</p>
                                        <form onSubmit={createStaff} method='POST'>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="productname">
                                                  Staff Name
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    value={staff.name}
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                />
                                                 {errors.name && <div className="invalid">{errors.name}</div>}
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="manufacturername">
                                                            Staff Email
                                                        </label>
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            className="form-control"
                                                            value={staff.email}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.email && <div className="invalid">{errors.email}</div>}
                                                    {emailExists && <div className="invalid">This email is already in use.</div>}
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="manufacturerbrand">
                                                           Staff Phone
                                                        </label>
                                                        <input
                                                            id="phone"
                                                            name="phone"
                                                            type="phone"
                                                            className="form-control"
                                                            value={staff.phone}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.phone && <div className="invalid">{errors.phone}</div>}
                                                </div>
                                                
                                                
                                            </div>
                                            <div className="row">
                                            <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="price">
                                                            Birth Of Date
                                                        </label>
                                                        <input
                                                            id="birthdate"
                                                            name="birthdate"
                                                            type="date"
                                                            className="form-control"
                                                            value={staff.birthdate}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.birthdate && <div className="invalid">{errors.birthdate}</div>}
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="price">
                                                            Gender
                                                        </label>
                                                        <Select
                                                            id="gender"
                                                            name="gender"
                                                            options={genderOptions}
                                                            className="select"
                                                            value={staff.gender}
                                                            onChange={(selectedOption) => handleChange('gender', selectedOption)}
                                                            />
                                                    </div>
                                                    {errors.gender && <div className="invalid">{errors.gender}</div>}
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="price">
                                                            Position
                                                        </label>
                                                        <Select
                                                            id="role"
                                                            name="role"
                                                            options={positionOptions}
                                                            className="select"
                                                            value={staff.role}
                                                            onChange={(selectedOption) => handleChange('role', selectedOption)}
                                                            />
                                                    </div>
                                                    {errors.role && <div className="invalid">{errors.role}</div>}
                                                </div>
                                            </div>
                                            <div className="text-center mt-4 Flex">
                                        <button
                                            type="submit"
                                            className="btn btn-primary me-2 waves-effect waves-light"
                                        >
                                            Create Staff
                                        </button>
                                      
                                    </div>
                                        </form>
                                    </div>



                                   
                                    <br/>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default AddStaff;
