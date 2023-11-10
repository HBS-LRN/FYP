import React, { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
const RatingForm = () => {
    //react declaration
    const navigate = useNavigate();
    let { id } = useParams();
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]); // Initialize as an empty array
    const [rating, setRating] = useState({});


    if (id) {
        useEffect(() => {
            setLoading(true);



            axiosClient
                .get(`/showRating/${id}`)
                .then(({ data }) => {

                    console.log(data);
                    setLoading(false);
                    setRating(data);
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
                id: rating.id,
                reply_comment: rating.reply_comment,
            };
            console.log(payload)



            try {
                await axiosClient
                    .post("/submitRating", payload)
                    .then(() => {
                        setNotification("Comment Was Successfully Posted!");
                        navigate("/ratingList");
                        // Scroll to the top of the screen window
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

    };

    //handle on change field
    const handleChange = (e) => {

        setRating({ ...rating, [e.target.name]: e.target.value })

    }

    return (
        <div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/libs/twitter-bootstrap-wizard/prettify.css" />
                <link href="../../../assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
                <link href="../../../assets/libs/dropzone/min/dropzone.min.css" rel="stylesheet" type="text/css" />
                <link href="../../../assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
                <link href="../../../assets/css/icons.min.css" rel="stylesheet" type="text/css" />
                <link href="../../../assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
                <link rel="stylesheet" href="../../../assets/css/addIngredient.css" />
            </Helmet>
            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">


                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0">Manage Rating</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Meal</a></li>
                                            <li class="breadcrumb-item active">Add Ingredient</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">

                                        <div id="addproduct-nav-pills-wizard" class="twitter-bs-wizard">
                                            <ul class="twitter-bs-wizard-nav">
                                                <li class="nav-item">
                                                    <a href="#basic-info" class="nav-link" data-toggle="tab">
                                                        <span class="step-number">01</span>
                                                        <span class="step-title">Rating Information</span>
                                                    </a>
                                                </li>

                                            </ul>
                                            <div class=" twitter-bs-wizard-tab-content">
                                                <div class="tab-pane" id="basic-info">
                                                    <h4 class="card-title">Rating Information</h4>
                                                    <p class="card-title-desc">Fill In The Rating Comment Below</p>

                                                    <form onSubmit={handleSubmit}>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="order_id">Order ID</label>
                                                            <input id="order_id" name="order_id" readOnly value={rating && rating.order_id} type="text" class="form-control" />

                                                        </div>


                                                        <div class="mb-3">
                                                            <label class="form-label" for="mealName">Meal Name</label>
                                                            <input id="mealName" name="mealName" readOnly value={rating && rating.meal ? rating.meal.meal_name : ''} class="form-control" />

                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="customerName">Customer Name</label>
                                                            <input id="customerName" name="customerName"  value={rating && rating.meal && rating.meal.orders && rating.meal.orders[0] && rating.meal.orders[0].user ? rating.meal.orders[0].user.name : ''} readOnly class="form-control" />
                                                            {/* {errors.stock && <div className="text-danger">{errors.stock}</div>} */}
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="customerName">Customer Email</label>
                                                            <input id="customerName" name="customerName" value={rating && rating.meal && rating.meal.orders && rating.meal.orders[0] && rating.meal.orders[0].user ? rating.meal.orders[0].user.email : ''}readOnly class="form-control" />
                                                            {/* {errors.stock && <div className="text-danger">{errors.stock}</div>} */}
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="customerName">Customer Rating:</label>
                                                            {[...Array(rating && rating.rating_star || 0)].map((star, starIndex) => (
                                                                <i key={starIndex} className="fa-solid fa-star"></i>
                                                            ))}
                                                            {/* {errors.stock && <div className="text-danger">{errors.stock}</div>} */}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="productdesc">
                                                                Rating Description
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="rating_comment"
                                                                name="rating_comment"
                                                                readOnly
                                                                value={rating && rating.rating_comment}
                                                                rows={5}
                                                            />

                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="productdesc">
                                                                Reply Comment
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="reply_comment"
                                                                name="reply_comment"
                                                                onChange={handleChange}
                                                                rows={5}
                                                                required
                                                            />

                                                        </div>
                                                        <ul class="pager wizard twitter-bs-wizard-pager-link">

                                                            <li class="next"><button type='submit'>Add Ingredient</button></li>
                                                        </ul>
                                                    </form>

                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>




            </div>
        </div>
    );
};

export default RatingForm;
