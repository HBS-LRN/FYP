import React, { useState, useEffect, createRef } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";
import Swal from 'sweetalert2';
import Pusher from 'pusher-js';
export default function FloorPlanMaping() {


    const { reservation } = useLocation().state || {};
    // Add a state variable to manage the input field value
    const [remark, setRemark] = useState('');
    const [reservationData, setReservationData] = useState({});
    const [reservations, setReservations] = useState([]);
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState();
    const [reservationCount, setReservationCount] = useState(0);
    const [rightPopUpVisible, setRightPopUpVisible] = useState(false);
    const [hoveredTable, setHoveredTable] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const { user, setNotification, setToken } = useStateContext();
    const selectedIcon = document.querySelectorAll('.selectedBorder');
    const RightPopUp = document.getElementById('popUpBoxRight');
    const { setWarningNotification, setFailNotification } = useNotificationContext();
    const navigate = useNavigate();




    useEffect(() => {
        if (reservation) {
            setReservationData(reservation);
            Swal.fire({
                title: 'Reservation Information',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },

                text: 'Red means Reserved, Blue means Empty Table',
                html: '<img src="../assets/img/reservation_info.png" alt="Custom image" style="width: 400px; height: 200px;">',

            })

        } else {
            navigate("/reservationForm");
        }
        // ... Rest of your code
    }, []);
    // Fetch tables data
    const getTables = async () => {
        try {
            const { data } = await axiosClient.get(`/tables`);
            console.log(data)
            setTables(data);
        } catch (error) {
            const response = error.response;
            console.log(response);
        }
    }


    useEffect(() => {
        var pusher = new Pusher('2124f91a86a5182a0c5d', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('reservation-channel');
        channel.bind('reservation-event', function (data) {

         
            console.log(data.reservation)
            //if it is same reservation date
            if (data.reservation.reservation_date === reservation.reservation_date && data.reservation.reservation_time  === reservation.reservation_time) {
                setReservations((prevReservation) => [...prevReservation, data.reservation]);
                isTableReserved(data.reservation.table_id)
            }

         
        });
    }, []);

    // Fetch tables data
    const getReservations = async () => {
        try {

            const payload = {
                reservation_date: reservation.reservation_date,
                reservation_time: reservation.reservation_time,
            };

            const { data } = await axiosClient.post("/reservation", payload)
            console.log(data)
            setReservations(data);
        } catch (error) {
            const response = error.response;
            console.log(response);
        }
    }

    useEffect(() => {
        getTables();
        getReservations();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; // Month is zero-based, so we add 1
        const year = now.getFullYear();

        // Get the "date" element by its id and update its innerHTML
        const dateElement = document.getElementById('toDayDate');
        if (dateElement) {
            dateElement.innerHTML = `${day}/${month}/${year}`;
        }
    }, []);




    // Update the table element
    const handleTableClick = (i) => {
        // Hide all selected icons for other tables
        selectedIcon.forEach((icon, index) => {
            if (index !== i) {
                icon.style.display = "none";
            }
        });
        if (RightPopUp.style.display == "none") {
            RightPopUp.style.display = "block";
            RightPopUp.style.cssText = "animation: right-popUpOpen .6s ease;";
            selectedIcon[i].style.display = "block";
            setTableId(i)
        } else {
            selectedIcon[i].style.display = "none";
            RightPopUp.style.display = "none";
        }
        // setRightPopUpVisible((prevVisible) => !prevVisible);

    };

    const handleTableMouseOver = (i) => {
        if (RightPopUp.style.display == "none") {
            selectedIcon[i].style.display = 'block';
            // setHoveredTable(i);
        }
    };

    const handleTableMouseOut = (i) => {
        if (RightPopUp.style.display == "none") {
            selectedIcon[i].style.display = 'none';
        }
        //    setHoveredTable(i); 

    };

    const handleBookNow = async () => {
        // Gather information from the state
        const selectedTableId = tables[tableId] ? tables[tableId].id : null;


        if (selectedTableId) {
            const tableSeatCapacity = tables[selectedTableId - 1].seat_capacity;
            const paxDifference = Math.abs(reservationData.pax - tableSeatCapacity);

            //handle the user where the guest count closely matches the table's seat capacity.
            if (paxDifference > 3) {
                setFailNotification(
                    "Opps, Reservation Error!",
                    "Please select a table where the guest count closely matches the table's seat capacity."
                );
                //if the pax is more than the table seat capacity
            } else if (reservationData.pax > tableSeatCapacity) {
                setFailNotification(
                    "Table Seat Capacity Exceeded!",
                    "Please ensure that the number of guests for your reservation does not exceed the table's seat capacity."
                );

                //handle room table's
            } else if (selectedTableId === 1 || selectedTableId === 2) {
                setWarningNotification("FYI, This Is A Room Table", "Minimum Spend is RM500, Do You Agree?").then((value) => {
                    if (value) {
                        if (reservationCount < 2) {
                            // User agreed, and the reservation count is below the limit, proceed with the reservation
                            makeReservation(selectedTableId, remark);
                            incrementReservationCount();
                        } else {
                            setFailNotification("Reservation Limit Exceeded", "You cannot make more than 2 reservations.");
                        }
                    }
                });

                //if the daily reservation doesn't exceed 2 
            } else {
                if (reservationCount < 2) {
                    makeReservation(selectedTableId, remark);
                    incrementReservationCount();
                } else {
                    setFailNotification("Reservation Limit Exceeded", "You cannot make more than 2 reservations.");
                }
            }
        } else {
            alert('Please select a table before booking.');
        }
    };


    const makeReservation = async (selectedTableId, remark) => {
        // Prepare the reservation data
        const newReservationData = {
            ...reservationData,
            table_id: selectedTableId,
            remark: remark,
            reservation_status: "Y"
        };

        console.log(newReservationData)
        try {
            await axiosClient.post('/reservations', newReservationData).then(({ data }) => {
                console.log("booked");
                // Update the reservations state with the new reservation data
                setReservations([...reservations, data]);
                setNotification("Your Reservation Has Been Booked");
            });
        } catch (error) {
            // Handle any errors, e.g., show an error message to the user
            console.error('Error creating reservation:', error);
        }
    };

    const isTableReserved = (tableId) => {


        // Find the table with the given ID
        const table = tables[tableId];

        if (table) {
            // Check if a table with the given ID has a reservation matching your conditions
            return reservations.some((reservation) => reservation.table_id === table.id);
        } else {
            return false; // Table doesn't exist, so it can't be reserved
        }
    }

    const handleNavigation = () => {
        // Use the navigate function to redirect to the /reservationForm page
        navigate("/reservationForm");
        window.location.reload();
    };

    const incrementReservationCount = () => {
        setReservationCount(reservationCount + 1);
    };
    return (
        <div>

            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/floorPlanReservation.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css" />

            </Helmet>
            <div className="popUpBoxLeft" id="popUpBoxLeft">
                <div className="popUp-overlay"></div>
                <div className="main-popUp">
                    <div className="popUp-content">
                        <i className="fa fa-arrow-left" aria-hidden="true" onClick={handleNavigation}></i>
                        <div className="userInforBox">
                            <div className="inforBox">

                                {user && user.image ? (

                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                                        width="100" height="100" className="round-image"
                                    />

                                ) : (
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                )}

                                <div className="name">{user.name}</div>
                            </div>
                        </div>
                        <fieldset className="genderBox">
                            <legend>Email</legend>
                            <p className="gender"><i class="fa fa-envelope" aria-hidden="true"></i>{user.email}</p>
                        </fieldset>
                        <fieldset className="contactNumbox">
                            <legend>Contact Number</legend>
                            <p className="contact"><i className="fas fa-phone"></i>{user.phone && user.phone}</p>
                        </fieldset>

                        <fieldset className="numOfReserveSeatBox">
                            <legend>Pax Number</legend>
                            <span className="title"><b>Pax : </b></span><span className="num">{reservationData && reservationData.pax}</span>
                        </fieldset>
                        <div className="dateTimeBox">
                            <fieldset className="dateBox">
                                <legend>Reservation Date</legend>
                                <input type="date" name="date" id="date" value={reservationData && reservationData.reservation_date} readOnly />
                            </fieldset>
                            <fieldset className="timeBox">
                                <legend>Reservation Time</legend>
                                <div className="sessionTime">
                                    {reservationData && reservationData.reservation_time}
                                </div>
                            </fieldset>
                        </div>


                    </div>
                </div>
            </div>
            <div className="scollBoxReservation" id="scollBox" >
                <div class="fpmbg" id="fpmbg">



                    <div className="table8Box tableBox">


                        {/* Render the table conditionally based on the reservation status */}
                        {isTableReserved(0) ? (
                            <div className={`table8a table8Reserve table ${hoveredTable === 0 ? 'hovered' : ''}`}>
                                <div className="selectedBorder"></div>
                            </div>
                        ) : (
                            <div className={`table8a table8 table ${hoveredTable === 0 ? 'hovered' : ''}`}
                                onClick={() => handleTableClick(0)}
                                onMouseOver={() => handleTableMouseOver(0)}
                                onMouseOut={() => handleTableMouseOut(0)}
                            >
                                <div className="selectedBorder"></div>
                            </div>
                        )}

                        {/* Render the table conditionally based on the reservation status */}
                        {isTableReserved(1) ? (
                            <div className={`table8b table8Reserve table ${hoveredTable === 1 ? 'hovered' : ''}`}>
                                <div className="selectedBorder"></div>
                            </div>
                        ) : (
                            <div
                                className={`table8b table8 table ${hoveredTable === 1 ? 'hovered' : ''}`}
                                onClick={() => handleTableClick(1)}
                                onMouseOver={() => handleTableMouseOver(1)}
                                onMouseOut={() => handleTableMouseOut(1)}
                            >
                                <div className="selectedBorder"></div>
                            </div>
                        )}

                    </div>

                    <div className="table4Box tableBox" >
                        <div className="table4Flex">
                            {isTableReserved(2) ? (
                                <div className={`table4a table4Reserve table4Left table ${hoveredTable === 2 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>

                            ) : (
                                <div className={`table4a table4 table4Left table ${hoveredTable === 2 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(2)}
                                    onMouseOver={() => handleTableMouseOver(2)}
                                    onMouseOut={() => handleTableMouseOut(2)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }


                            {isTableReserved(3) ? (
                                <div className={`table4b table4Reserve table4Right table ${hoveredTable === 3 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>

                            ) : (
                                <div className={`table4b table4 table4Right table ${hoveredTable === 3 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(3)}
                                    onMouseOver={() => handleTableMouseOver(3)}
                                    onMouseOut={() => handleTableMouseOut(3)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }



                        </div>
                        <div className="table4Flex">

                            {isTableReserved(4) ? (
                                <div className={`table4a table4Reserve table4Left table ${hoveredTable === 4 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>

                            ) : (
                                <div className={`table4a table4 table4Left table ${hoveredTable === 4 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(4)}
                                    onMouseOver={() => handleTableMouseOver(4)}
                                    onMouseOut={() => handleTableMouseOut(4)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }



                            {isTableReserved(5) ? (
                                <div className={`table4b table4Reserve table4Right table ${hoveredTable === 5 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>

                            ) : (
                                <div className={`table4b table4 table4Right table ${hoveredTable === 5 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(5)}
                                    onMouseOver={() => handleTableMouseOver(5)}
                                    onMouseOut={() => handleTableMouseOut(5)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }


                        </div>
                        <div className="table4Flex">



                            {isTableReserved(6) ? (
                                <div className={`table4a table4Reserve table4Left table ${hoveredTable === 6 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>

                            ) : (
                                <div className={`table4a table4 table4Left table ${hoveredTable === 6 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(6)}
                                    onMouseOver={() => handleTableMouseOver(6)}
                                    onMouseOut={() => handleTableMouseOut(6)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }



                            {isTableReserved(7) ? (
                                <div className={`table4b table4Reserve table4Right table ${hoveredTable === 7 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>

                            ) : (
                                <div className={`table4f table4 table4Right table ${hoveredTable === 7 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(7)}
                                    onMouseOver={() => handleTableMouseOver(7)}
                                    onMouseOut={() => handleTableMouseOut(7)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }



                        </div>

                    </div>

                    <div className="table12Box tableBox">
                        {isTableReserved(8) ? (
                            <div className={`table12a table12Reserved table12Left table ${hoveredTable === 8 ? 'hovered' : ''}`}

                            >
                                <div className="selectedBorder"></div>
                            </div>
                        ) : (<div className={`table12a table12 table12Left table ${hoveredTable === 8 ? 'hovered' : ''}`}
                            onClick={() => handleTableClick(8)}
                            onMouseOver={() => handleTableMouseOver(8)}
                            onMouseOut={() => handleTableMouseOut(8)}
                        >
                            <div className="selectedBorder"></div>
                        </div>)
                        }

                        {isTableReserved(9) ? (
                            <div className={`table12a table12Reserved table12Right table ${hoveredTable === 9 ? 'hovered' : ''}`}
                            >
                                <div className="selectedBorder"></div>
                            </div>
                        ) : (
                            <div className={`table12a table12 table12Right table ${hoveredTable === 9 ? 'hovered' : ''}`}
                                onClick={() => handleTableClick(9)}
                                onMouseOver={() => handleTableMouseOver(9)}
                                onMouseOut={() => handleTableMouseOut(9)}
                            >
                                <div className="selectedBorder"></div>
                            </div>
                        )
                        }
                    </div>
                    <div className="table2Box tableBox">
                        <div className="table2Flex">

                            {isTableReserved(10) ? (
                                <div className={`table2a table2Reserved table2Left table ${hoveredTable === 10 ? 'hovered' : ''}`}

                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            ) : (<div className={`table2a table2 table2Left table ${hoveredTable === 10 ? 'hovered' : ''}`}
                                onClick={() => handleTableClick(10)}
                                onMouseOver={() => handleTableMouseOver(10)}
                                onMouseOut={() => handleTableMouseOut(10)}
                            >
                                <div className="selectedBorder"></div>
                            </div>)
                            }

                            {isTableReserved(11) ? (

                                <div className={`table2b table2Reserved table2Right table ${hoveredTable === 11 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            ) : (
                                <div className={`table2b table2 table2Right table ${hoveredTable === 11 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(11)}
                                    onMouseOver={() => handleTableMouseOver(11)}
                                    onMouseOut={() => handleTableMouseOut(11)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }
                        </div>
                        <div className="table2Flex">


                            {isTableReserved(12) ? (
                                <div className={`table2a table2Reserved table2Left table ${hoveredTable === 12 ? 'hovered' : ''}`}

                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            ) : (<div className={`table2a table2 table2Left table ${hoveredTable === 12 ? 'hovered' : ''}`}
                                onClick={() => handleTableClick(12)}
                                onMouseOver={() => handleTableMouseOver(12)}
                                onMouseOut={() => handleTableMouseOut(12)}
                            >
                                <div className="selectedBorder"></div>
                            </div>)
                            }

                            {isTableReserved(13) ? (

                                <div className={`table2b table2Reserved table2Right table ${hoveredTable === 13 ? 'hovered' : ''}`}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            ) : (
                                <div className={`table2b table2 table2Right table ${hoveredTable === 13 ? 'hovered' : ''}`}
                                    onClick={() => handleTableClick(13)}
                                    onMouseOver={() => handleTableMouseOver(13)}
                                    onMouseOut={() => handleTableMouseOut(13)}
                                >
                                    <div className="selectedBorder"></div>
                                </div>
                            )
                            }


                        </div>
                    </div>

                </div>
            </div>
            <div className="popUpBoxRight" id="popUpBoxRight" style={{ display: rightPopUpVisible ? 'block' : 'none' }}>
                <div className="popUp-overlay"></div>
                <div className="main-popUp">
                    <div className="popUp-content">


                        <div className="tableInforBox">
                            <div className="inforBox">
                                <i className="fas fa-map-marker-alt"></i>
                                <p className="tableNum">Table {tables[tableId] ? tables[tableId].id : 'N/A'}</p>
                            </div>

                        </div>

                        <fieldset className="paxBox">
                            <legend>Available Table Seat</legend>
                            <span className="title"><b>Pax : </b></span>
                            <span className="number">{tables[tableId] ? tables[tableId].seat_capacity : 'N/A'}</span>
                        </fieldset>
                        <div className="dateTimeBox">
                            <fieldset className="currentDateBox">
                                <legend>Date Making Reservation</legend>

                                <p className="date" id='toDayDate'>Today</p>
                            </fieldset>
                            <fieldset className="currentTimeBox">
                                <legend>Time Making Reservation</legend>

                                <p className="time" id="time"> {currentTime.getHours()} : {currentTime.getMinutes()} {currentTime.getHours() > 12 ? 'pm' : 'am'}</p>
                            </fieldset>
                        </div>
                        <fieldset className="remarkBox">
                            <legend>Remark</legend>
                            <textarea
                                name="remark"
                                placeholder="Enter if any important for mention..."
                                id="remark"
                                cols="30"
                                rows="10"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                            ></textarea>
                        </fieldset>
                        <div className="bookBtnBox">
                            <a href="#" onClick={handleBookNow} className="reserveBtn">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
