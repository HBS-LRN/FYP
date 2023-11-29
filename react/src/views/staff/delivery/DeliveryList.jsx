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


export default function DeliveryList() {

    const tableRef = useRef(null);
    const { setWarningNotification, setFailNotification, setSuccessNotification } = useNotificationContext();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(false);
    const isDataTableInitialized = useRef(false);
    //react declaration
    const { user, setUser, setNotification } = useStateContext();




    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/userDelivery');

            setDeliveries(response.data);

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

    const onUpdateDeliveryClick = async (delivery, status) => {
        // Display notification using sweet alert
        setWarningNotification("Are You Sure?", "That Is Not Regret After You Click The Yes Button To Change The Delivery Status").then(async (value) => {
            if (value) {
                const payload = {
                    status: status,
                    delivery_man_id: user.id
                };

                try {
                    const response = await axiosClient.put(`/updateDeliveryStatus/${delivery.order_id}`, payload);
                    console.log(response.data.order_status)
                    setSuccessNotification("Delivery Status Updated Sucessfully");
                    if (response.data && response.data.order_status === "delivering") {
                        window.open('/realTimeDeliveryTracking/' + delivery.order_id, '_blank');
                    }
                    fetchData();
                } catch (error) {
                    setFailNotification(error);
                }

            }
        });
    };


    var deliveryDetail = "";
    deliveryDetail = deliveries.map((delivery, index) => {
        console.log(user.id)
        console.log(delivery.delivery_man_id)
        if (delivery.order.order_status === "pending") {
            return (
                <tr key={delivery.order_id}>
                    <td>OD{delivery.order_id}#</td>
                    <td style={{ whiteSpace: 'pre-line' }}>{delivery.street}, {delivery.city}, {delivery.postcode} {delivery.state}.</td>
                    <td>{delivery.username}</td>
                    <td>{delivery.userphone}</td>
                    <td id={"tooltip-container" + index}>

                        <button
                            type="button"
                            onClick={ev => onUpdateDeliveryClick(delivery, "delivering")}
                            className="btn btn-primary waves-effect waves-light"
                        >
                            Pick Up Order <i className="ri-arrow-right-line align-middle ms-2"></i>
                        </button>

                    </td>
                </tr>
            );

        } else if (user.id === delivery.delivery_man_id && delivery.order.order_status === "delivering") {

            return (

                <tr key={delivery.order_id}>
                    <td>OD{delivery.order_id}#</td>
                    <td style={{ whiteSpace: 'pre-line' }}>{delivery.street}, {delivery.city}, {delivery.postcode} {delivery.state}.</td>
                    <td>{delivery.username}</td>
                    <td>{delivery.userphone}</td>
                    <td id={"tooltip-container" + index}>
                        {delivery.order.order_status === "delivering" && (
                            <button type="button" onClick={ev => onUpdateDeliveryClick(delivery, "completed")} className="btn btn-warning waves-effect waves-light">
                                <i className="fas fa-shipping-fast"></i> In Delivering
                            </button>
                        )}
                    </td>
                    {console.log(user.id)}
                </tr>

            );
        }
        return null; // Return null if the condition is not met
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
                                    <h4 class="mb-sm-0">Deliveries</h4>

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

                                                        <th>Order ID</th>
                                                        <th style={{ whiteSpace: 'pre-line' }}>Delivery To</th>
                                                        <th>Recipient's Name</th>
                                                        <th>Recipient's Phone Number</th>
                                                        <th style={{ width: "120px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : (
                                                        deliveryDetail
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