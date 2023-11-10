import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Tab, Nav } from 'react-bootstrap';
import { useStateContext } from "../../../contexts/ContextProvider";

import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
import Swal from 'sweetalert2';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { useNotificationContext } from "../../../contexts/NotificationProvider.jsx";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { useNavigate, useParams } from "react-router-dom";

export default function RatingList() {

    const tableRef = useRef(null);
    const { setWarningNotification, setFailNotification, setSuccessNotification } = useNotificationContext();
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);
    const isDataTableInitialized = useRef(false);
    const navigate = useNavigate();
    //react declaration
    const { user, setUser, setNotification } = useStateContext();

    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/showRating');

            console.log(response.data)
            setRatings(response.data);

            if (!isDataTableInitialized.current) {

                console.log("initialize")
                const table = $(tableRef.current).DataTable({
                    "paging": true,
                    "lengthMenu": [5, 10, 25, 50],
                    "info": true,
                });
                isDataTableInitialized.current = true; // Set the flag to true
                return () => {
                    table.destroy();
                };

            }


        } catch (error) {
            setLoading(false);
            console.error('API request error:', error);
        }
    };

    useEffect(() => {

        fetchData();


    }, []);

    const tableStyle = {
        borderCollapse: "collapse",
        borderSpacing: 0,
        width: "100%",
    };

    const onReplyClick = (rating) => {
        console.log("click")
        navigate(`/ratingForm/${rating.id}`);
    };


    var ratingDetail = "";
    ratingDetail = ratings.map((rating, index) => {


        return (
            <tr key={rating.meal.orders[0].id}>
                <td>{rating.meal.orders[0].id}</td>
                <td> <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${rating.meal.meal_image}`} alt="" width="180" height="140" /></td>
                <td>{rating.meal.meal_name},</td>
                <td>{rating.meal.orders[0].user.name}</td>
                <td>{rating.meal.orders[0].user.email}</td>
                <td>   {[...Array(rating.rating_star || 0)].map((star, starIndex) => (
                    <i key={starIndex} className="fa-solid fa-star"></i>
                ))}</td>
                <td id={"tooltip-container" + index}>

                    <button
                        type="button"
                        onClick={ev => onReplyClick(rating)}
                        className="btn btn-primary waves-effect waves-light"
                    >
                        Reply <i class="fa fa-reply" aria-hidden="true"></i>
                    </button>

                </td>
            </tr>
        );




    });

    return (
        <div>
            <div class="main-content">
                <Helmet> <link rel="stylesheet" href="../../../assets/css/addIngredient.css" /></Helmet>
                <div class="page-content">
                    <div class="container-fluid">


                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0">Rating</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Manage Rating</a></li>
                                            <li class="breadcrumb-item active">Ratings</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">

                                        <div class="table-responsive mt-3">
                                            <table ref={tableRef} class="table table-centered datatable dt-responsive nowrap" style={tableStyle}>
                                                <thead class="thead-light">
                                                    <tr>

                                                        <th>Order ID</th>
                                                        <th>Meal Image</th>
                                                        <th>Meal Name</th>
                                                        <th>Customer Name</th>
                                                        <th>Customer Email</th>
                                                        <th>Customer Ratings</th>

                                                        <th style={{ width: "120px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : (
                                                        ratingDetail
                                                    )}
                                                </tbody>
                                            </table>
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
}