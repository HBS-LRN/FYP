import React, { useEffect, useState, useRef } from 'react';
import { useStateContext } from "../../../contexts/ContextProvider";
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
import $ from 'jquery';
import { useNotificationContext } from "../../../contexts/NotificationProvider.jsx";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import PDFFile from './PDFFile';
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function CompletedDeliveryList() {

    const tableRef = useRef(null);
    const { setWarningNotification, setFailNotification, setSuccessNotification } = useNotificationContext();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(false);
    const isDataTableInitialized = useRef(false);
    //react declaration
    const { user } = useStateContext();

    const fetchData = async () => {
        try {

            const response = await axiosClient.get(`/completeDelivery/${user.id}`)
            console.log(response.data)
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




    var deliveryDetail = "";
    deliveryDetail = deliveries.map((delivery, index) => {
        console.log(user.id)


        return (
            <tr key={delivery.order_id}>
                <td>OD{delivery.order_id}#</td>
                <td>{delivery.order.order_date}</td>
                <td style={{ width: "900px", whiteSpace: "pre-wrap" }}>{delivery.street}, {delivery.city}, {delivery.postcode} {delivery.state}.</td>
                <td>{delivery.username}</td>
                <td>{delivery.userphone}</td>
                <td id={"tooltip-container" + index}>

                    <button type="button" className="btn btn-success waves-effect waves-light">
                        <i className="ri-check-line align-middle me-2"></i> Completed Order
                    </button>

                </td>
            </tr>
        );


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
                                        <div>

                                            <PDFDownloadLink document={<PDFFile user={user} delivery={deliveries} />} filename="FORM">
                                                {({ loading }) => (
                                                    loading ?
                                                        <button className="btn btn-primary waves-effect waves-light">Loading Document...</button> : <button


                                                            className="btn btn-primary waves-effect waves-light"
                                                        >
                                                            Convert To PDF <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                        </button>
                                                )}
                                            </PDFDownloadLink>
                                        </div>
                                        <div class="table-responsive mt-3">

                                            <table ref={tableRef} class="table table-centered datatable dt-responsive nowrap" style={tableStyle}>
                                                <thead class="thead-light">
                                                    <tr>

                                                        <th>Order ID</th>
                                                        <th>Order Date</th>
                                                        <th> Delivery To</th>
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