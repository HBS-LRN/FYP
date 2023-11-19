import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { createRef, useEffect, useState, useRef } from "react";
import { Helmet } from 'react-helmet';
import { useDropzone } from 'react-dropzone';
import React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';



import CustomerSideBar from "../../components/CustomerSideBar";


export default function UserChat() {





    //react declaration
    const chatContainerRef = useRef();
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [chats, setChats] = useState([]);
    const [error, setError] = useState({});
    const [enlargedImage, setEnlargedImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState({
        id: null,
        image: "",
        message: "",
    });


    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    // Scroll to the bottom of the chat container when component mounts
    useEffect(() => {
        scrollToBottom();
    }, [chats]);
    useEffect(() => {
        var pusher = new Pusher('2124f91a86a5182a0c5d', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('chat-channel');
        channel.bind('chat-event', function (data) {

            console.log(data.message)
            //if it is admin id
            if (data.message.user_id === user.id || data.message.admin_id === user.id) {
                setChats((prevChats) => [...prevChats, data.message]);
            }

            scrollToBottom();
        });
    }, []);

    //fetch user address data
    useEffect(() => {
        getChats();
    }, []);


    const getChats = async () => {

        console.log("getting")
        setLoading(true)
        try {

            const response = await axiosClient.get(`/chat/${user.id}`);
            console.log(response.data);

            if (Array.isArray(response.data)) {
                // Filter the data based on conditions

                const filteredChats = response.data.filter(
                    (chat) => chat.user_id === user.id || chat.admin_id === user.id
                );

                console.log(filteredChats);
                setChats(filteredChats);

                setLoading(false); // Assuming this is how you intended to complete the function


            }
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const formattedTime = currentDate.toLocaleTimeString();

    //when user click on submit button
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity()) {


            const formData = new FormData();
            formData.append('user_id', user.id);
            formData.append('message', chat.message);
            formData.append('date', formattedDate);
            formData.append('time', formattedTime);

            //delete, just show for bs
            if (user.id === 1) {
                formData.append('admin_id', 3);
            }

            if (chat.image) {
                console.log(chat.image)
                formData.append('image', chat.image);
            }

            try {
                await axiosClient.post(`/chat`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {

                    console.log(response.data)


                    setChat({
                        id: null,
                        image: "",
                        message: "",
                    });
                    if (chatContainerRef.current) {
                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                    }
                });
            } catch (error) {
                const response = error.response;
                console.log(response);
                if (response && response.status === 422) {
                    setError(response.data.errors);
                } else if (response && response.status === 400) {
                    setError({ image: response.data.error });
                }
            }
        }
    };


    //handle on change 
    const handleChange = (e) => {

        setChat({ ...chat, [e.target.name]: e.target.value })

    }

    const onDrop = (acceptedFiles) => {
        setChat({
            ...chat,
            image: acceptedFiles[0],
        });
        console.log(acceptedFiles[0].name);
    }
    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    const handleImageClick = (imageSrc) => {
        setEnlargedImage(imageSrc);
    };

    const handleCloseModal = () => {
        setEnlargedImage(null);
    };


    return (

        <div>
            <form method="PUT" action="#" className="needs-validation" enctype="multipart/form-data"
                noValidate
                onSubmit={handleSubmit}>

                <div class="all">

                    <div class="customerAccHeader">
                        <div class="customerAccBar"></div>
                        <span class="customerAcc">Chat</span>
                    </div>

                    <div class="container custom-auth-gap" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                        <div class="row">
                            <CustomerSideBar />
                            <div class="col-lg-2 accountContent">


                                <div class="userProfile">
                                    <div class="d-lg-flex mb-4">
                                        <div class="chat-leftsidebar">
                                            <div class="p-3 border-bottom">
                                                <div class="d-flex">
                                                    <div class="align-self-center me-3">

                                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`} class="avatar-xs rounded-circle" alt="avatar-2" />
                                                    </div>
                                                    <div class="flex-1">
                                                        <h5 class="font-size-15 mb-1">{user && user.name}</h5>
                                                        <p class="text-muted mb-0"><i class="mdi mdi-circle text-success align-middle me-1"></i> Active</p>

                                                    </div>
                                                    <div className="dropdown toggleicon float-end">
                                                        <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <Link to="/profile" className="dropdown-item">My Profile</Link>
                                                            <Link to="/allergic" className="dropdown-item">My Allergies</Link>
                                                            <a href="/orderStatus" className="dropdown-item">My Purchases</a>
                                                            <Link to="/myReservation" className="dropdown-item">My Reservations</Link>
                                                            <Link to="/addresses" className="dropdown-item">My Addresses</Link>
                                                            <Link to="/myOrder" className="dropdown-item">Real Time Track My Order</Link>
                                                            <Link to="/changePassword" className="dropdown-item">Change Password</Link>
                                                            <Link to="/userChat" className="dropdown-item">Chat Grand Imperial!</Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                            <div class="tab-content py-4">
                                                <div class="tab-pane show active" id="chat">
                                                    <div>

                                                        <ul class="list-unstyled chat-list" data-simplebar style={{ maxHeight: "345px" }}>
                                                            <li class="active">
                                                                <a href="#">
                                                                    <div class="d-flex">

                                                                        <div class="user-img online align-self-center me-3">
                                                                            <img src="../assets/img/GrandImperialGroupLogo.png" class="rounded-circle avatar-xs" alt="avatar-2" />
                                                                            <span class="user-status"></span>
                                                                        </div>

                                                                        <div class="flex-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-14 mb-1">Grands Imperial Group</h5>
                                                                            <p class="text-truncate mb-0">Hey! message us if you have any queries</p>
                                                                        </div>

                                                                    </div>
                                                                </a>
                                                            </li>









                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-100 user-chat mt-4 mt-sm-0">
                                            <div class="p-3 px-lg-4 user-chat-border">
                                                <div class="row">
                                                    <div class="col-md-12 col-12 col-center">

                                                        <img src="../assets/img/GrandImperialGroupLogo.png" class="rounded-circle avatar-xs" alt="avatar-2" width="135" hegith="135" />
                                                        <h5 class="font-size-15 mb-1 text-truncate">Grands Imperial</h5>

                                                    </div>

                                                </div>
                                            </div>

                                            <div class="px-lg-2">
                                                <div class="chat-conversation p-3">
                                                    {loading &&
                                                        <div class="text-center">
                                                            <div class="loaderCustom2"></div>
                                                        </div>
                                                    }
                                                    {!loading &&
                                                        <ul ref={chatContainerRef} class="list-unstyled mb-0 pe-3 chatcustom" style={{ maxHeight: "450px" }}>



                                                            {user.id !== 1 &&
                                                                <>
                                                                    <li>
                                                                        <div class="conversation-list">
                                                                            <div class="chat-avatar">
                                                                                <img src="../assets/img/GrandImperialGroupLogo.png" alt="avatar-2" />
                                                                            </div>
                                                                            <div class="ctext-wrap">
                                                                                <div class="conversation-name">Grand Imperial Groups</div>
                                                                                <div class="ctext-wrap-content">
                                                                                    <p class="mb-0">Hey What's I Can Help You?</p>
                                                                                </div>
                                                                                <p class="chat-time mb-0"><i class="mdi mdi-clock-outline me-1"></i> {formattedTime}</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div class="conversation-list">
                                                                            <div class="chat-avatar">
                                                                                <img src="../assets/img/GrandImperialGroupLogo.png" alt="avatar-2" />
                                                                            </div>
                                                                            <div class="ctext-wrap">
                                                                                <div class="conversation-name">Grand Imperial Groups</div>
                                                                                <div class="ctext-wrap-content">
                                                                                    <p class="mb-0">Please Be Patient. We May Took A Few Minutes To Reply You</p>
                                                                                </div>
                                                                                <p class="chat-time mb-0"><i class="mdi mdi-clock-outline me-1"></i> {formattedTime}</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </>
                                                            }
                                                            {!loading && chats.map((chatmessage) => (
                                                                <React.Fragment key={chatmessage.id}>
                                                                    {parseInt(chatmessage.user_id) === user.id ? (

                                                                        <li class="right">
                                                                            <div class="conversation-list">
                                                                                <div class="ctext-wrap">
                                                                                    <div class="conversation-name">{user.name}</div>
                                                                                    <div class="ctext-wrap-content">
                                                                                        <p class="mb-0 user">{chatmessage.message}</p>{chatmessage.image && (
                                                                                            <img
                                                                                                alt="food-dish"
                                                                                                src={`${import.meta.env.VITE_API_BASE_URL}/storage/${chatmessage.image}`}
                                                                                                width="135"
                                                                                                height="121"
                                                                                                onClick={() => handleImageClick(chatmessage.image)}
                                                                                                className="chat-image"
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                    <p class="chat-time mb-0"><i class="mdi mdi-clock-outline me-1"></i>{chatmessage.time}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ) : (
                                                                        <li>
                                                                            <div class="conversation-list">
                                                                                <div class="chat-avatar">
                                                                                    <img src="../assets/img/GrandImperialGroupLogo.png" alt="avatar-2" />
                                                                                </div>
                                                                                <div class="ctext-wrap">
                                                                                    <div class="conversation-name">Grand Imperial Groups</div>
                                                                                    <div class="ctext-wrap-content">
                                                                                        <p class="mb-0">{chatmessage.message}</p>{chatmessage.image && (
                                                                                            <img
                                                                                                alt="food-dish"
                                                                                                src={`${import.meta.env.VITE_API_BASE_URL}/storage/${chatmessage.image}`}
                                                                                                width="135"
                                                                                                height="121"
                                                                                                onClick={() => handleImageClick(chatmessage.image)}
                                                                                                className="chat-image"
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                    <p class="chat-time mb-0"><i class="mdi mdi-clock-outline me-1"></i> {chatmessage.time}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}







                                                        </ul>
                                                    }
                                                </div>

                                            </div>
                                            <div class="px-lg-3">
                                                <div class="p-3 chat-input-section">
                                                    <div class="row">
                                                        <div class="col">

                                                            <div class="position-relative">

                                                                <input type="text" required name="message" value={chat.message} onChange={handleChange} class="form-control chat-input" placeholder="Enter Message..." />

                                                            </div>
                                                            <div className="dropzone" {...getRootProps()}>
                                                                <div className="fallback">
                                                                    <input {...getInputProps()} />
                                                                </div>
                                                                {chat.image ? (
                                                                    <p>Selected file: {chat.image.name}</p>
                                                                ) : (
                                                                    <p>Have Any Image? Drag 'n' drop an image here, or click to select one</p>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-auto">


                                                            <button type="submit" class="btn btn-primary chat-send w-md waves-effect waves-light"><span class="d-none d-sm-inline-block me-2">Send</span> <i class="mdi mdi-send"></i></button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>


                            </div>
                        </div>
                    </div>

                    {enlargedImage && (
                        <div className="modal-container" onClick={handleCloseModal}>
                            <div className="modal-content">
                                <span className="close-button" onClick={handleCloseModal}>
                                    &times;
                                </span>
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}/storage/${enlargedImage}`}
                                    alt="enlarged-image"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </form>

            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/chat.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>



    );
}
