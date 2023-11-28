import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";
import CustomerSideBar from "../../components/CustomerSideBar";


export default function Addresses() {


    //react declaration
    const { user, setUser, setNotification } = useStateContext();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setDeleteNotification, setSuccessNotification } = useNotificationContext();


    //fetch user address data
    useEffect(() => {
        getAddresses();
    }, [])

    const getAddresses = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`/userAddress/${user.id}`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setAddresses(data)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }


    //hanlde delete address
    const onDeleteClick = address => {

        //display notification using sweet alert
        setDeleteNotification().then((value) => {
            if (value) {
                axiosClient.delete(`/addresses/${address.id}`)
                getAddresses()
            }
        });
    }
    //hanlde set as current address
    const onUpdateCurrentClick = address => {

        const payload = {
            user_id: user.id,
            address_id: address.id,

        };

        setLoading(true)
        try {
            axiosClient.post("/setCurrentUseAddress", payload)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setAddresses(data)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }

    return (

        <div class="all">
            <div class="customerAccHeader">
                <div class="customerAccBar"></div>
                <span class="customerAcc">My Addresses</span>
            </div>

            <div class="container custom-auth-gap">
                <div class="row">

                    <CustomerSideBar />


                    <div class="col-lg-2 addressContent" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                        <div class="addressTitle">
                            <h3 class="profileTitle">My Addresses</h3>

                            <p class="subTitle">Manage Your Shipping Address Here!</p>

                            <div class="addAddress">
                                <div class="addAddressFont"><Link to="/addressForm">+ Add New Address</Link></div>

                            </div>

                        </div>
                        {loading &&
                            <div class="text-center">
                                <div class="loaderCustom2"></div>
                            </div>
                        }


                        <div class="scroll-wrap">
                            {!loading && addresses.map((address) => (


                                <div class="row userAddress">
                                    <div class="col-lg-9 col-sm-6 userInfo">
                                        <div class="name">

                                            <label for="nameLabel">Full Name</label>
                                            <span>
                                                {address.address_username}

                                            </span>
                                        </div>
                                        <div class="phone">
                                            <label for="phoneLabel">Phone</label>
                                            <span>
                                                {address.address_userphone}

                                            </span>
                                        </div>
                                        <div class="addressForm">
                                            <label for="addressLabel">Address</label>
                                            <div class="addressBorder">
                                                <span>
                                                    {address.street}, {address.city}, {address.postcode} {address.state}.


                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-sm-6  buttonType">
                                        <div class="row actionLink">
                                            <div class="col-lg-3 editLink">
                                                <Link className="btn-edit" to={'/addressForm/' + address.id}>Edit</Link>
                                                {/* <a href="/addresseEdit/{{ $address->id }}">Edit</a> */}
                                            </div>

                                            <div class="col-lg-3 deleteLink">
                                                <a class="deleteAddress" onClick={ev => onDeleteClick(address)} href="#">Delete</a>
                                            </div>

                                            <div class="default">

                                                <button
                                                    type="submit"
                                                    className={address.active_flag === 'T' ? "currentUsedAddress" : "setAsDefault"}
                                                    onClick={(ev) => onUpdateCurrentClick(address)}
                                                    disabled={address.active_flag === 'T'}
                                                >
                                                    {address.active_flag === 'T' ? 'Current Used' : 'Set As Default'}
                                                </button>


                                                {/* @if ($address->active_flag == 'T')
                                        <button type="submit" class="currentUsedAddress" disabled>Current Used
                                    @else */}
                                                {/* <form action="/address/{{ $address->id }}/update" method="POST">
                                            @csrf
                                            @method('PUT') */}
                                                {/* <button type="submit" onClick={ev => onUpdateCurrentClick(address)} class="setAsDefault">Set As Default</button> */}
                                                {/* </form> */}
                                                {/* @endif */}

                                            </div>


                                        </div>
                                    </div>


                                </div>

                            ))}


                        </div>



                    </div>
                </div>
            </div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/customerAddress.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div >





    );
}
