import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function ReservationForm() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="custom-gap">
            <form
                method="POST"
                action="/users/authenticate"
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
                                            type="number"
                                            className="form-control"
                                            name="pax"
                                            placeholder="Enter Number Of User"
                                            required
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"


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
                                            name="date"

                                            required
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                        />
                                        <div className="valid-tooltip">Looks good!</div>
                                        <div className="invalid-tooltip">
                                            Please Choose A Date
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
                                        {/* <input
                                            type="number"
                                            className="form-control"
                                            name="pax"
                                            placeholder="Enter No Of User"
                                            required
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"


                                        /> */}

                                        <select name="section"  class="form-control time-dropdown" required>
                                        <option value="">Select A Time</option>
                                            <option value="11-1">11AM - 1PM Section</option>
                                            <option value="1-3">1PM - 3PM Section</option>
                                            <option value="6-8">6PM - 8PM Section</option>
                                            <option value="8-10">8PM - 10PM Section</option>
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
