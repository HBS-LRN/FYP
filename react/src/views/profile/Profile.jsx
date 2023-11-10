import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { createRef, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';





import CustomerSideBar from "../../components/CustomerSideBar";


export default function Profile() {



    //react declaration
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});
    const [genderSelected, setGenderSelected] = useState(false);
    const [updateUser, setUpdateUser] = useState({
        id: null,
        name: "",
        email: "",
        height: "",
        weight: "",
        phone: "",
        gender: "",
        birthdate: "",
       
    });

    useEffect(() => {
        if (user.image !== null) {
            setUpdateUser({
                ...user,
                image: null,
            });
           
        } else {
            setUpdateUser(user);
        }

    }, []);
    //when user click on submit button
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity()) {

            console.log(updateUser)
            const payload = updateUser;
            // if (payload.image) {
            //     payload.image = payload.image_url;
            // }
        
            if (payload.image === null) {
                delete payload.image; // Remove the 'image' property if it's null
              }
            console.log(payload)
            try {
                await axiosClient
                    .put(`/users/${user.id}`, payload)
                    .then((response) => {
                        console.log(response.data);
                        setUser(response.data);
                        setNotification("Your details were successfully updated");
                    });
            } catch (error) {
                const response = error.response;
                console.log(response);
                if (response && response.status === 422) {
                    setError(response.data.errors);
                } else if (response && response.status === 400) {
                    setError({ image: response.data.error });
                }
            }
        }

    };


    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 13);

        if (selectedDate > minDate || selectedDate >= today) {
            setError({ birthdate: 'The birthdate must be a date before -13 years.' });
        } else {
            setError({ birthdate: '' });
        }

        setUpdateUser({ ...updateUser, birthdate: e.target.value });
    };

    //handle on change 
    const handleChange = (e) => {

        if (e.target.name === "gender") {
            setGenderSelected(true);
        }
        setError({ ...error, [e.target.name]: null });
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })

    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setError({ ...error, image: null });

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUpdateUser((prevUser) => ({
                ...prevUser,
                image: reader.result,
            }));
        };
    };


    return (

        <div>
            <form method="PUT" action="#" className="needs-validation" enctype="multipart/form-data"
                noValidate
                onSubmit={handleSubmit}>

                <div class="all">

                    <div class="customerAccHeader">
                        <div class="customerAccBar"></div>
                        <span class="customerAcc">My Profile</span>
                    </div>

                    <div class="container custom-auth-gap" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                        <div class="row">
                            <CustomerSideBar />
                            <div class="col-lg-2 accountContent">
                                <div class="accountTitle">
                                    <h3 class="profileTitle">My Profile</h3>
                                    <p class="subTitle">Manage and protect your account</p>

                                </div>


                                <div class="userProfile">
                                    <div class="text">


                                        <br />
                                        <div className={`nameLabelInput label ${validated ? 'was-validated' : ''}`}>
                                            <label for="name" class="nameLabel">Name :</label>
                                            {/* <input type="text" class="name" name="name"
                                                onChange={handleUsernameChange} value={username} /> */}

                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter your name"
                                                className="name form-control "
                                                required
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                value={updateUser.name}
                                                onChange={handleChange}
                                                pattern=".{1,10}"
                                                title="Username must contain between 1 and 10 characters."
                                            />
                                            <div className="valid-tooltip customTooltip">Looks good!</div>
                                            <div className="invalid-tooltip customTooltip">Username must between 1 and 10 characters.</div>


                                        </div>
                                        {/* @error('name')
                                <span class="error" style="color:red">*{{ $message }}</span><br>
                            @enderror */}

                                        <br />
                                        <div className={`emailLabelInput label ${validated && !error.email ? 'was-validated' : ''}`}>
                                            <label for="email" class="emailLabel">Email :</label>
                                            {/* <input type="text" class="email" name="email"
                                            /> */}

                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className={`form-control email ${error.email ? 'is-invalid' : ''}`}
                                                required
                                                value={updateUser.email}
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                onChange={handleChange}
                                            />
                                            <div className="valid-tooltip customTooltip">Looks good!</div>
                                            {error.email ? (
                                                <div className="invalid-tooltip customTooltip">{error.email}</div>
                                            ) : (
                                                <div className="invalid-tooltip customTooltip">Please Enter A Valid Email</div>
                                            )}
                                        </div>



                                        <br />
                                        <div className={`heightLabelInput label ${validated ? 'was-validated' : ''}`}>

                                            <label for="height" class="heightLabel">Height (CM):</label>
                                            <input
                                                value={updateUser.height}
                                                type="number" // Use type="number" to enforce numeric input
                                                step="any" // Allow both integers and decimal numbers
                                                min="1"
                                                className="height form-control"
                                                name="height"
                                                placeholder="Enter your height"
                                                required
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                onChange={handleChange}
                                            />
                                            <div className="valid-tooltip customTooltip">Looks good!</div>
                                            <div className="invalid-tooltip customTooltip">Please enter a valid height.</div>

                                        </div>
                                        {/* @error('birthdate')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}



                                        <br />

                                        <div className={`weightLabelInput label ${validated ? 'was-validated' : ''}`}>
                                            <label for="weight" class="weightLabel"> Weight (KG):</label>
                                            <input
                                                value={updateUser.weight}
                                                type="number" // Use type="number" to enforce numeric input
                                                step="any" // Allow both integers and decimal numbers
                                                min="1"
                                                className="weight form-control"
                                                name="weight"
                                                placeholder="Enter your weight"
                                                required
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                onChange={handleChange}
                                            />
                                            <div className="valid-tooltip customTooltip">Looks good!</div>
                                            <div className="invalid-tooltip customTooltip">Please enter a valid height.</div>

                                        </div>
                                        {/* @error('birthdate')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}



                                        <br />
                                        <div className={`phoneNumberLabelInput label ${validated ? 'was-validated' : ''}`}>

                                            <label htmlFor="phoneNumber" className="phoneNumberLabel">
                                                Phone Number With(-) :
                                            </label>
                                            <input
                                                value={updateUser.phone}
                                                type="text" // Use type="text" for phone numbers since you need to allow hyphens
                                                className="phoneNumber form-control"
                                                name="phone"
                                                placeholder="Enter your phone (e.g., xxx-xxxxxxx or xxx-xxxxxxxx)"
                                                required
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                pattern="\d{3}-\d{7}|\d{3}-\d{8}" // Regular expression pattern for xxx-xxxxxxx or xxx-xxxxxxxx
                                                onChange={handleChange}
                                            />
                                            <div className="valid-tooltip customTooltip">Looks good!</div>
                                            <div className="invalid-tooltip customTooltip">
                                                (e.g., xxx-xxxxxxx or xxx-xxxxxxxx).
                                            </div>
                                        </div>
                                        {/* @error('phone')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}
                                        <br />

                                        <div className={`dateLabelInput label ${validated && !error.birthdate ? 'was-validated' : ''}`}>
                                            <label for="birthdate" class="birthLabel">
                                                Date of Birth:
                                            </label>
                                            <input
                                                type="date"
                                                name="birthdate"
                                                id="birthdate"
                                                required
                                                className={`form-control birthInput ${error.birthdate ? 'is-invalid' : ''}`}

                                                value={updateUser.birthdate}
                                                onChange={handleDateChange}
                                            />

                                            <div className="valid-tooltip customTooltip">Looks good!</div>


                                            {error.birthdate ? (
                                                <div className="invalid-tooltip customTooltip">{error.birthdate}</div>
                                            ) : (
                                                <div className="invalid-tooltip customTooltip">Please enter a valid date of birth.</div>
                                            )}


                                        </div>
                                        <br />

                                        <div className={`genderLabelInput label ${validated ? 'was-validated' : ''}`}>
                                            <label htmlFor="gender" className="genderLabel">
                                                Gender:
                                            </label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={updateUser.gender === 'Male'}
                                                onChange={handleChange}
                                            />
                                            Male
                                            &nbsp;

                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={updateUser.gender === 'Female'}
                                                onChange={handleChange}
                                            />
                                            Female
                                            {!genderSelected && !updateUser.gender ? (
                                                <div className="valid-tooltip customTooltip" style={{ backgroundColor: 'rgba(220, 53, 69, 0.9)' }}>
                                                    Please select your gender.
                                                </div>
                                            ) : (
                                                <div className="valid-tooltip customTooltip">Looks good!</div>
                                            )}

                                        </div>







                                        <div class="saveButton">

                                            <button class="save" type="submit">Save </button>
                                        </div>




                                    </div>
                                    <div class="selectImage">
                                        {/* @if (auth()->user()->image != null) */}
                                        {/* <div class="image">



                                    <img Width="180" Height="180"
                                        src="{{ auth()->user()->image ? asset('storage/' . auth()->user()->image) : asset('/images/no-image.png') }}"
                                        alt="" />
                                </div> */}
                                        {/* @endif */}

                                        {user && user.image &&

                                            <img
                                                src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                                                width="180" height="180"
                                            />

                                        }
                                        <br />

                                        <div className="file">
                                            <input
                                                type="file"
                                                name="image"
                                                accept=".png,.jpg,.jpeg,.gif"
                                                onChange={handleImageChange}
                                            />
                                            <div class="fileSize">

                                            </div>

                                            {error.image &&
                                                <div class="fileSize" style={{ color: 'red' }}>
                                                    *{error.image}
                                                </div>

                                            }



                                            <div class="fileSize">
                                                File size: maximum 5 MB
                                            </div>

                                            <div class="fileExtension">File extension: .JPEG, .PNG</div>

                                        </div>

                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>



                </div>
            </form>

            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/customerAccount.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>



    );
}
