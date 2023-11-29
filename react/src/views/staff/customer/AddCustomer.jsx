import React, { useEffect,useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2'
import axiosClient from "../../../axios-client.js";

const AddCustomer = () => {
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        birthdate: '',
        gender: null, 
      });
      const [errors, setErrors] = useState({});
      const [loading, setLoading] = useState(false);
      const validateForm = () => {
        const newErrors = {};
    
        // Basic validation, you can add more checks as needed
        if (!customer.name) {
          newErrors.name = 'Please enter a name.';
        }
    
        if (!customer.email) {
          newErrors.email = 'Please enter an email address.';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(customer.email)) {
            newErrors.email = 'Please enter a valid email address.';
          }
        }
    
        if (!customer.phone) {
            newErrors.phone = 'Please enter a phone number.';
        } else {
            // Allowing either 10 digits without dashes or 3 digits, a dash, and 7 digits
            const phoneRegex = /^\d{11}$|^\d{3}-\d{7}$/;
            if (!phoneRegex.test(customer.phone)) {
                newErrors.phone = 'Please enter a valid phone number in the format 012-3456789.';
            }
        }
    
        if (!customer.birthdate) {
          newErrors.birthdate = 'Please enter a birthdate.';
        } else {
          const currentDate = new Date();
          const selectedDate = new Date(customer.birthdate);
          if (selectedDate > currentDate) {
            newErrors.birthdate = 'Birthdate cannot be in the future.';
          }
        }
    
        if (!customer.gender) {
          newErrors.gender = 'Please select a gender.';
        }
        console.log("customer",customer);
        setErrors(newErrors);
    
        // Check if there are any errors
        return Object.keys(newErrors).length === 0;
      };
 

       const createCustomer = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        if (!validateForm()) {
            return;
        }
        console.log("Form submitted2");
        setLoading(true);
        const data = {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            birthdate: customer.birthdate,
            gender: customer.gender.value,
            password: "securepassword123?"
        };
        useEffect(() => {
            if (customer.email) {
                axiosClient.post('/checkEmailExists', { email: customer.email })
                    .then(response => {
                        setEmailExists(response.data.exists);
                    })
                    .catch(error => {
                        console.error('Error checking email existence:', error);
                    });
            }
        }, [customer.email]);
        console.log(data);

        // Move the useEffect here
        axiosClient.post('/createUser', data)
            .then(res => {
                console.log("customer Data:", data);
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New customer had been successfully added!',
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
    };

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
      ];
      console.log(errors)
    //   const handleChange = (e) => {
    //     setCustomer({ ...customer, [e.target.name]: e.target.value });
    //     setErrors({ ...errors, [e.target.name]: null });
    //   };
    const handleChange = (name, value) => {
        setCustomer(prevCustomer => ({ ...prevCustomer, [name]: value }));
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
                                    <h4 className="mb-sm-0">Add Customer</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Manage Customer</a>
                                            </li>
                                            <li className="breadcrumb-item active">Add Customer</li>
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
                                        <form onSubmit={createCustomer} method='POST'>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="productname">
                                                  Customer Name
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    value={customer.name}
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                />
                                                 {errors.name && <div className="invalid">{errors.name}</div>}
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="manufacturername">
                                                            Customer Email
                                                        </label>
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            className="form-control"
                                                            value={customer.email}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.email && <div className="invalid">{errors.email}</div>}
                                                    {emailExists && <div className="invalid">This email is already in use.</div>}
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="manufacturerbrand">
                                                           Customer Phone
                                                        </label>
                                                        <input
                                                            id="phone"
                                                            name="phone"
                                                            type="phone"
                                                            className="form-control"
                                                            value={customer.phone}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.phone && <div className="invalid">{errors.phone}</div>}
                                                </div>
                                                
                                                
                                            </div>
                                            <div className="row">
                                            <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="price">
                                                            Birth Of Date
                                                        </label>
                                                        <input
                                                            id="birthdate"
                                                            name="birthdate"
                                                            type="date"
                                                            className="form-control"
                                                            value={customer.birthdate}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                        />
                                                    </div>
                                                    {errors.birthdate && <div className="invalid">{errors.birthdate}</div>}
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="price">
                                                            Gender
                                                        </label>
                                                        <Select
                                                            id="gender"
                                                            name="gender"
                                                            options={genderOptions}
                                                            className="select"
                                                            value={customer.gender}
                                                            onChange={(selectedOption) => handleChange('gender', selectedOption)}
                                                            />
                                                    </div>
                                                    {errors.gender && <div className="invalid">{errors.gender}</div>}
                                                </div>
                                            </div>
                                            <div className="text-center mt-4 Flex">
                                        <button
                                            type="submit"
                                            className="btn btn-primary me-2 waves-effect waves-light"
                                        >
                                            Create Customer
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

export default AddCustomer;
