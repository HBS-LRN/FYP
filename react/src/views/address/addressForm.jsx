import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from "react-router-dom";


import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";
import CustomerSideBar from "../../components/CustomerSideBar";
export default function AddressForm() {


    //react declaration
    const navigate = useNavigate();
    let { id } = useParams();
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const { setWarningNotification, setFailNotification } = useNotificationContext();
    const [states, setStates] = useState([]); // Initialize as an empty array
    const [address, setAddress] = useState({
        id: null,
        user_id: "",
        address_username: "",
        address_userphone: "",
        street: "",
        city: "",
        state: "",
        postcode: "",
        latitude: "",
        longitude: ""


    });

    useEffect(() => {
        getStates();
    }, [])



    const getStates = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get("/state")
                .then(({ data }) => {
                    console.log(data)
                    setStates(data)
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            const response = error.response;
            console.log(response);
        }
    }

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/addresses/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    setLoading(false);
                    setAddress(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    //when user click on submit button
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity()) {
            // Call the address validation service to check if the address is valid
            const location = await validateAddress(address);

            if (location) {
                const payload = {
                    ...address,
                    user_id: user.id,
                    latitude: location.latitude,
                    longitude: location.longitude,
                };

                console.log(payload)
                if (address.id) {
                    try {
                        await axiosClient
                            .put(`/addresses/${address.id}`, payload)
                            .then(() => {
                                setNotification("Address Was Successfully Updated!");
                                navigate("/addresses");
                            });
                    } catch (error) {
                        const response = err.response;
                        console.log(response);
                        if (response && response.status === 422) {
                            setError(response.data.errors);
                        }
                    }
                } else {
                    try {
                        await axiosClient
                            .post("/addresses", payload)
                            .then(() => {
                                setNotification("New Address Was Successfully Added!");
                                navigate("/addresses");
                                window.scrollTo(0, 0);
                            });
                    } catch (error) {
                        console.log(error);
                        const response = err.response;

                        if (response && response.status === 422) {
                            setError(response.data.errors);
                        }
                    }
                }
            } else {
                setFailNotification(
                    "Opps, Invalid address!",
                    "Please enter a valid address or address within Selangor or Kuala Lumpur only"
                );

            }
        }
    };

    const validateAddress = async (address) => {
        const apiKey = 'AIzaSyBEks4sU0u5DEF9wxLV5jeeGFVEnMaCH6g'; // Replace with your API key
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address.street)},${encodeURIComponent(address.city)},${encodeURIComponent(address.state)},${encodeURIComponent(address.postcode)}&key=${apiKey}`;
        const validStates = ["Selangor", "Kuala Lumpur"];

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("geodata", data);

            if (data.status === "OK" && data.results && data.results.length > 0) {
                const firstResult = data.results[0];

                // Check if the first result has more than 3 address components
                if (firstResult.address_components && firstResult.address_components.length > 3) {
                    const isWithinValidStates = firstResult.address_components.some((component) => {
                        return validStates.includes(component.long_name);
                    });

                    if (isWithinValidStates) {
                        return {
                            latitude: firstResult.geometry.location.lat,
                            longitude: firstResult.geometry.location.lng,
                        };
                    }
                }
            }
        } catch (error) {
            console.log("geoerror", error);
        }

        return null; // Default to null for an invalid address or when the condition is not met
    };
    //handle on change field
    const handleChange = (e) => {

        setError({ ...error, [e.target.name]: null });
        setAddress({ ...address, [e.target.name]: e.target.value })

    }
    return (


        <div class="all">
            <div class="customerAccHeader">
                <div class="customerAccBar"></div>
                <span class="customerAcc">My Account</span>
            </div>


            <div class="container custom-auth-gap">
                <div class="row">
                    <div class="customerAccContent">
                        <CustomerSideBar />
                        <div class="col-lg-2 addAddressContent" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                            <div class="addAddressTitle">
                                {address.id && <h3 class="profileTitle">Update Address</h3>}
                                {!address.id && <h3 class="profileTitle">New Address</h3>}
                                <p class="subTitle">Add Your Address Here</p>
                            </div>

                            <form action="#" method="POST" className="needs-validation" enctype="multipart/form-data"
                                noValidate
                                onSubmit={handleSubmit}>
                                {/* @csrf
                        @method('PUT') */}
                                <div class="userAddress">
                                    <div class="userInfo">

                                        {loading ? (
                                            <div class="text-center">
                                                <div class="loaderCustom2"></div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className={`fullNameSetting label ${validated ? 'was-validated' : ''}`}>
                                                    <label htmlFor="fullNameLabel" className="fullNameLabel">Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="address_username"
                                                        placeholder="Enter your name"
                                                        className="fullNameInput form-control"
                                                        required
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        value={address.address_username}
                                                        onChange={handleChange}
                                                        pattern=".{3,}" // Enforce a minimum length of 3 characters
                                                        title="Full Name must contain at least 3 characters."
                                                    />
                                                    <div className="valid-tooltip customTooltip">Looks good!</div>
                                                    <div className="invalid-tooltip customTooltip">Full Name must contain at least 3 characters.</div>
                                                </div>



                                                <br />
                                                <div class={`phoneNumberSetting label ${validated ? 'was-validated' : ''}`}>
                                                    <label for="phoneNumberLabel" class="phoneNumberLabel">Phone Number(-)</label>


                                                    <input
                                                        value={address.address_userphone}
                                                        type="text" // Use type="text" for phone numbers since you need to allow hyphens
                                                        className="phoneNumberInput form-control"
                                                        name="address_userphone"
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

                                                <br />
                                                <div class={`streetAddressSetting label ${validated ? 'was-validated' : ''}`}>
                                                    <label for="streetAddressLabel" class="streetAddressLabel">Street Address</label>


                                                    <textarea
                                                        name="street"
                                                        placeholder="Enter your Street"
                                                        className="streetAddressInput form-control"
                                                        required
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        value={address.street}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="valid-tooltip customTooltip">Looks good!</div>
                                                    <div className="invalid-tooltip customTooltip">Please Enter Street Address</div>
                                                </div>


                                                <br />

                                                <div class={`stateSetting label ${validated ? 'was-validated' : ''}`}>

                                                    <label for="txtStateLabel" class="stateLabel">City</label>




                                                    <input
                                                        type="text"
                                                        name="city"
                                                        placeholder="Enter your city"
                                                        className="streetAddressInput form-control"
                                                        required
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        value={address.city}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="valid-tooltip customTooltip">Looks good!</div>
                                                    <div className="invalid-tooltip customTooltip">Please Enter City</div>
                                                </div>
                                                <br />
                                                <div class={`stateSetting label ${validated ? 'was-validated' : ''}`}>
                                                    <label htmlFor="txtStateLabel" className="stateLabel">
                                                        State
                                                    </label>
                                                    <select
                                                        name="state"
                                                        className={`stateInput form-control ${error.state ? 'is-invalid' : ''}`}
                                                        required
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        value={address.state}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Area</option>
                                                        {states.map((area) => (
                                                            <option
                                                                key={area.state_name}
                                                                value={area.state_name}
                                                            >
                                                                {area.state_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="valid-tooltip customTooltip">Looks good!</div>
                                                    <div className="invalid-tooltip customTooltip">Please Select A State</div>

                                                </div>
                                                {/* <div class="errBox">
                            <label for=""></label>
                            @error('area')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                        </div> */}

                                                <br />

                                                <div className={`postalCodeSetting label ${validated ? 'was-validated' : ''}`}>
                                                    <label htmlFor="postalCodeLabel" className="postalCodeLabel">PostCode</label>
                                                    <input
                                                        value={address.postcode}
                                                        type="text"
                                                        className="postalCodeInput form-control"
                                                        name="postcode"
                                                        placeholder="Enter your 5-digit postal code"
                                                        required
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        maxLength="5" // Limit the input to 5 characters
                                                        pattern="^\d{5}$" // Enforce 5-digit format using a regular expression
                                                        onChange={handleChange}
                                                    />
                                                    <div className="valid-tooltip customTooltip">Looks good!</div>
                                                    <div className="invalid-tooltip customTooltip">Please enter a valid 5-digit postal code.</div>
                                                </div>
                                                {/* <div class="errBox">
                            <label for=""></label>
                            @error('postcode')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                        </div> */}




                                                <div class="submitButtonaddAddress">

                                                    <button class="submitaddAddress" type="submit">Submit</button>

                                                </div>
                                            </>
                                        )}

                                    </div>



                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/addAddress.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>






    );
}
