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


export default function ActivateCustomer() {

    const tableRef = useRef(null);
    const { setWarningNotification, setFailNotification, setSuccessNotification } = useNotificationContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const isDataTableInitialized = useRef(false);
    //react declaration
    const { user, setUser, setNotification } = useStateContext();




    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/deactivatedCustomer');

            setUsers(response.data);

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


    //fetch data from api
    useEffect(() => {
        fetchData();
    }, []);

    const tableStyle = {
        borderCollapse: "collapse",
        borderSpacing: 0,
        width: "100%",
    };

    const onActivateUserClick = async (user) => {
        // Display notification using sweet alert

        try {
            const response = await axiosClient.put(`/setActiveMember/${user.id}`);
         
            console.log(response)
            setSuccessNotification("Customer Have Been Activated");
            fetchData();
        } catch (error) {
            setFailNotification(error);
        }



    };


    var deactivatedCustomerDetail = "";
    deactivatedCustomerDetail = users.map((deactivateUser, index) => {


        return (
            <tr key={deactivateUser.id}>
                <td>{deactivateUser.id}</td>
                <td>{deactivateUser.name}</td>
                <td>{deactivateUser.email}</td>
                <td>{deactivateUser.phone ? deactivateUser.phone : 'N/A'}</td>
                <td id={"tooltip-container" + index}>

                    <button
                        type="button"
                        onClick={ev => onActivateUserClick(deactivateUser)}
                        className="btn btn-primary waves-effect waves-light"
                    >
                        Activate User
                    </button>

                </td>
            </tr>
        );


    }

    );

    return (
        <div>
            <div class="main-content">
                <Helmet> <link rel="stylesheet" href="../../../assets/css/addIngredient.css" /></Helmet>
                <div class="page-content">
                    <div class="container-fluid">


                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0">Deactivated User</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Manage Delivery</a></li>
                                            <li class="breadcrumb-item active">Delivery</li>
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

                                                        <th>Customer ID</th>
                                                        <th>Customer Name</th>
                                                        <th>Customer Email</th>
                                                        <th>Customer's Phone Number</th>
                                                        <th style={{ width: "120px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : (
                                                        deactivatedCustomerDetail
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