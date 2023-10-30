import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";



import CustomerSideBar from "../../components/CustomerSideBar";
import EventCalendar from "../../components/EventCalendar";


export default function MyReservation() {

    const { user } = useStateContext();
    const { setDeleteNotification, setSuccessNotification } = useNotificationContext();
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);


    //fetch reservaion data
    useEffect(() => {
        getReservations();
    }, [])

    const getReservations = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`/userReservations/${user.id}`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setReservations(data)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }

    //hanlde delete reservation
    const deleteReservation = (reservationId) => {

        //display notification using sweet alert
        setDeleteNotification().then((value) => {
            if (value) {
                axiosClient.delete(`/reservations/${reservationId}`)
                setSuccessNotification('Reservation was successfully deleted')
                getReservations()
            }
        });
    }

    return (

        <div>
            <form method="POST" action="/profile/edit" enctype="multipart/form-data">

                <div class="all">

                    <div class="customerAccHeader">
                        <div class="customerAccBar"></div>
                        <span class="customerAcc">My Reservation</span>
                    </div>

                    <div class="container custom-auth-gap" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                        <div class="row">
                            <CustomerSideBar />


                           
                                <div className="col-lg-8 accountContent">
                                    {loading ? (
                                        <div class="text-center">
                                            <div class="loaderCustom2"></div>
                                        </div>
                                    ):(
                                    

                                  
                                    <EventCalendar reservations={reservations} onDeleteReservation={deleteReservation} />
                                    )}
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
