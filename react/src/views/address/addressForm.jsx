import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from "react-router-dom";



import CustomerSideBar from "../../components/CustomerSideBar";
export default function AddressForm() {


    //react declaration
    const navigate = useNavigate();
    let { id } = useParams();
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
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
            const payload = {
                ...address,
                user_id: user.id,
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
                        });
                } catch (error) {
                    console.log(error);
                    const response = err.response;

                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    }
                }
            }
        }

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
