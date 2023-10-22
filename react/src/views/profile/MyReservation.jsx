import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';




import CustomerSideBar from "../../components/CustomerSideBar";
import EventCalendar from "../../components/EventCalendar";


export default function MyReservation() {

    return (

        <div>
            <form method="POST" action="/profile/edit" enctype="multipart/form-data">

                <div class="all">

                    <div class="customerAccHeader">
                        <div class="customerAccBar"></div>
                        <span class="customerAcc">My Reservation</span>
                    </div>

                    <div class="container custom-auth-gap" data-aos="flip-up"  data-aos-delay="300" data-aos-duration="400">
                        <div class="row">
                            <CustomerSideBar />
                            <div class="col-lg-8 accountContent" >
                                <EventCalendar/>


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
