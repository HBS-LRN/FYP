import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from "react-router-dom";



import CustomerSideBar from "../../components/CustomerSideBar";
export default function AllergicForm() {


    //react declaration
    const navigate = useNavigate();
    let { id } = useParams();
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]); // Initialize as an empty array
    const [allergic, setAllergic] = useState({
        id: null,
        user_id: user.id,
        ingredient_name: "",

    });



    //when user click on submit button
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity()) {
            const payload = {
                ...allergic,
                user_id: user.id,
            };
            console.log(payload)



            try {
                await axiosClient
                    .post("/allergic", payload)
                    .then(() => {
                        setNotification("New Allergic Was Successfully Added!");
                        navigate("/allergic");
                    });
            } catch (error) {
                console.log(error);
                const response = err.response;

                if (response && response.status === 422) {
                    setError(response.data.errors);
                }
            }

        }

    };

    //handle on change field
    const handleChange = (e) => {

        setError({ ...error, [e.target.name]: null });
        setAllergic({ ...allergic, [e.target.name]: e.target.value })

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
                            <h3 class="profileTitle">New Allergic</h3>
                             
                                <p class="subTitle">Add Your Allergic Here</p>
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
                                                    <label htmlFor="fullNameLabel" className="fullNameLabel">Ingredient Name</label>
                                                    <input
                                                        type="text"
                                                        name="ingredient_name"
                                                        placeholder="Enter ingredient name"
                                                        className="fullNameInput form-control"
                                                        required
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        value={allergic.ingredient_name}
                                                        onChange={handleChange}
                                                        pattern=".{2,}" // Enforce a minimum length of 3 characters
                                                        title="Ingredient Name must contain at least 2 characters."
                                                    />
                                                    <div className="valid-tooltip customTooltip">Looks good!</div>
                                                    <div className="invalid-tooltip customTooltip">Full Name must contain at least 3 characters.</div>
                                                </div>




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
