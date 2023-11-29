import React, { createRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Navigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider.jsx';
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
export default function ReservationForm() {



    //react declaration
    const [validated, setValidated] = useState(false);
    const { user, setUser, setNotification } = useStateContext();
    if (!user) {
        return <Navigate to="/login" />;
    }
    const navigate = useNavigate();
    const [reservation, setReservation] = useState({
        id: null,
        user_id: user.id,
        pax: 0,
        reservation_date: "",
        reservation_time: "",
    });
    const handleSubmit = (event) => {

        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            console.log(reservation)
            //pass the reservation from the state to other link
            navigate('/floorPlanMapping', { state: { reservation } });

        }

        setValidated(true);
    };

    const handleChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value })

    }

    return (
        <div className="custom-gap">
            <form
                className={`needs-validation ${validated ? 'was-validated' : ''}`}
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="custom-container">
                    <div className="row align-items-center">
                        <div
                            className="login-content"
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-duration="300"
                        >
                            <div className="col-lg-5 logoBox">
                                <div className="logo">
                                    <img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
                                </div>
                            </div>
                            <div
                                className="col-lg-6 custom-login-margin"
                                data-aos="fade-up"
                                data-aos-delay="300"
                                data-aos-duration="400"
                            >
                                <div className="login-form">
                                    <h3>Reservation Form</h3>
                                    <p>
                                        Kindly Fill In The Details Below
                                    </p>
                                </div>

                                <div className="text pax">
                                    <label htmlFor="noOfPax">Pax</label>
                                    <br />
                                    <div className="custom-form">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                        <input
                                            type="number" // Use type="number" to enforce numeric input
                                            step="any" // Allow both integers and decimal numbers
                                            min="1"
                                            className="form-control"
                                            name="pax"
                                            placeholder="Enter The Pax"
                                            required
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            onChange={handleChange} // Attach the input change handler
                                        />
                                        <div className="valid-tooltip">Looks good!</div>
                                        <div className="invalid-tooltip">
                                            Please Fill In The Pax
                                        </div>
                                    </div>
                                </div>
                                <br />

                                <div className="text date">
                                    <label htmlFor="date" className="form-label">
                                        Date
                                    </label>
                                    <div className="custom-form">
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="reservation_date"
                                            required
                                            min={getCurrentDate()} // Set the minimum date
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            onChange={handleChange} // Attach the input change handler
                                        />
                                        <div className="valid-tooltip">Looks good!</div>
                                        <div className="invalid-tooltip">
                                            Please Choose A Date (Today or After Today)
                                        </div>
                                    </div>
                                    {/* <p className="error">*Invalid User Email And /Or Password.</p> */}
                                </div>
                                <br />
                                <div className="text time">
                                    <label htmlFor="Time">Time</label>
                                    <br />
                                    <div className="custom-form">
                                        <i class="fa-solid fa-clock"></i>
                                        <select name="reservation_time" class="form-control time-dropdown" required
                                            onChange={handleChange} >
                                            <option value="">Select A Time</option>
                                            <option value="11AM - 1PM Section">11AM - 1PM Section</option>
                                            <option value="1PM - 3PM Section">1PM - 3PM Section</option>
                                            <option value="6PM - 8PM Section">6PM - 8PM Section</option>
                                            <option value="8PM - 10PM Section">8PM - 10PM Section</option>
                                        </select>
                                        <div className="valid-tooltip">Looks good!</div>
                                        <div className="invalid-tooltip">
                                            Please Choose A Time
                                        </div>
                                    </div>
                                </div>

                                <br />
                                <br />

                                <button className="button-price login" type="submit">
                                    Redirect To Floor Plan Map Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/reservationForm.css" />
            </Helmet>
        </div>
    );
}
