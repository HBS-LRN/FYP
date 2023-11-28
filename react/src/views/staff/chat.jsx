
import { Helmet } from 'react-helmet';
import { useStateContext } from "../../contexts/ContextProvider";
import React from 'react';
import axiosClient from "../../axios-client.js";
import { createRef, useEffect, useState, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import Pusher from 'pusher-js';
export default function Chat() {

    //react declaration
    const chatContainerRef = useRef();
    const { user, setUser, setNotification } = useStateContext();
    const [validated, setValidated] = useState(false);
    const [chats, setChats] = useState([]);
    const [customerChats, setCustomerChats] = useState([]);
    const [error, setError] = useState({});
    const [enlargedImage, setEnlargedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [customerChatLoading, setCustomerChatLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
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


    const filteredChats = customerChats.filter((chatMessage) =>
        searchQuery === "" ||
        chatMessage.latestMessage.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    useEffect(() => {
        var pusher = new Pusher('2124f91a86a5182a0c5d', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('chat-channel');

        channel.bind('chat-event', function (data) {
            console.log(data.message)


            //if it is not admin id 
            if (data.message.user_id != 1) {
                getCustomerChats();
            }

            // Only update chats and fetch new customer chats after the initial fetch
            if (
                (data.message.user_id === user.id && data.message.admin_id === selectedUser.id) ||
                (data.message.user_id === selectedUser.id && data.message.admin_id === user.id)
            ) {
                setChats((prevChats) => [...prevChats, data.message]);
                scrollToBottom();

            }

        });

        // Clean up Pusher subscription when component unmounts
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [selectedUser, user, initialFetchCompleted]);


    //fetch user chat data
    useEffect(() => {
        getCustomerChats().then(() => {
            setInitialFetchCompleted(true);
        });
    }, []);


    const getCustomerChats = async () => {

        console.log("getting")
        setCustomerChatLoading(true)
        try {

            const response = await axiosClient.get(`/customerChats`);
            console.log(response.data);

            if (Array.isArray(response.data)) {
                // Filter the data based on conditions

                setCustomerChats(response.data);

                setCustomerChatLoading(false); // Assuming this is how you intended to complete the function


            }
        } catch (error) {
            const response = error.response;
            console.log(response);
            setCustomerChatLoading(false)
        }
    }


    const handleUserClick = async (chatMessage) => {
        setSelectedUser(chatMessage.latestMessage.user);
        getChats(chatMessage.latestMessage.user.id); // Call getChats when a user is selected


        // Reset unseenCount to 0 for the selected user
        const updatedChats = customerChats.map((message) => {
            if (message.latestMessage.user.id === chatMessage.latestMessage.user.id) {
                message.unseenCount = 0;
            }
            return message;
        });

        setCustomerChats(updatedChats);
        const payload = {

            user_id: chatMessage.latestMessage.user.id
        };
        try {
            await axiosClient.post(`/customerSeens`, payload
            ).then((response) => {
                console.log(response.data)

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
        scrollToBottom();
    };

    const handleBackgroundClick = async () => {

        // Reset unseenCount to 0 for the selected user
        const updatedChats = customerChats.map((message) => {
            if (message.latestMessage.user.id === selectedUser.id) {
                message.unseenCount = 0;
            }
            return message;
        });

        setCustomerChats(updatedChats);
        const payload = {

            user_id: selectedUser.id
        };
        try {
            await axiosClient.post(`/customerSeens`, payload
            ).then((response) => {
                console.log(response.data)

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
    };
    const getChats = async (userId) => {

        console.log("getting")
        setLoading(true)
        try {

            console.log(userId)
            const response = await axiosClient.get(`/chat/${userId}`);
            console.log(response.data);

            if (Array.isArray(response.data)) {
                // Filter the data based on conditions




                setChats(response.data);

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


            formData.append('admin_id', selectedUser.id);


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
            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">


                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0">Chat</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Nazox</a></li>
                                            <li class="breadcrumb-item active">Chat</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <form method="PUT" action="#" className="needs-validation" enctype="multipart/form-data"
                            noValidate
                            onSubmit={handleSubmit}>
                            <div class="d-lg-flex mb-4">
                                <div class="chat-leftsidebar">
                                    <div class="p-3 border-bottom">
                                        <div class="d-flex">
                                            <div class="align-self-center me-3">

                                                <img src="../assets/img/GrandImperialGroupLogo.png" class="avatar-xs rounded-circle" alt="avatar-2" />
                                            </div>
                                            <div class="flex-1">
                                                <h5 class="font-size-15 mb-1">Grands Imperial Group</h5>
                                                <p class="text-muted mb-0"><i class="mdi mdi-circle text-success align-middle me-1"></i> Active</p>

                                            </div>

                                        </div>
                                    </div>
                                    <div class="card-body border-bottom py-2">
                                        <div class="search-box chat-search-box">
                                            <div class="position-relative">
                                                <input type="text" class="form-control" placeholder="Search..." value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)} />
                                                <i class="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-content">
                                        <div class="tab-pane show active" id="chat">
                                            {customerChatLoading &&
                                                <div class="text-center">
                                                    <div class="loaderCustom2"></div>
                                                </div>
                                            }

                                            <div>


                                                <ul class="list-unstyled chat-list chatcustom" style={{ maxHeight: "845px" }}>
                                                    {!customerChatLoading && filteredChats.length > 0 ? (
                                                        filteredChats.map((chatMessage) => (
                                                            // Render each filtered chat item
                                                            <li
                                                                class={`active ${selectedUser && selectedUser.id === chatMessage.latestMessage.user.id ? 'selected' : ''}`}
                                                                key={chatMessage.latestMessage.user.id}
                                                                onClick={() => handleUserClick(chatMessage)}
                                                            >
                                                                <a href="#">
                                                                    <div class="d-flex">
                                                                        <div class="user-img online align-self-center me-3">
                                                                            <img
                                                                                src={`${import.meta.env.VITE_API_BASE_URL}/${chatMessage.latestMessage.user.image}`}
                                                                                class="rounded-circle avatar-xs"
                                                                                alt="avatar-2"
                                                                            />
                                                                            <span class="user-status"></span>
                                                                        </div>
                                                                        <div class="flex-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-14 mb-1">{chatMessage.latestMessage.user.name}</h5>
                                                                            <p class="text-truncate mb-0">{chatMessage.latestMessage.message}</p>
                                                                        </div>
                                                                        {chatMessage.unseenCount > 0 && (
                                                                            <div class="font-size-11"><b>{chatMessage.unseenCount}</b> New Chats!</div>
                                                                        )}

                                                                    </div>
                                                                </a>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        // Display a message when there are no search results
                                                        <li class="text-center">
                                                            <p>No results found</p>
                                                        </li>
                                                    )}








                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-100 user-chat mt-4 mt-sm-0">
                                    <div class="p-3 px-lg-4 user-chat-border">
                                        <div class="row">


                                            {!selectedUser ? (
                                                <div class="col-md-12 col-12 col-center">


                                                    <h5 class="font-size-15 mb-1 text-truncate">No User Selected</h5>

                                                </div>
                                            ) : (<div class="col-md-12 col-12 col-center">

                                                <img src={`${import.meta.env.VITE_API_BASE_URL}/${selectedUser.image}`} class="rounded-circle avatar-xs" alt="avatar-2" width="135" hegith="135" />
                                                <h5 class="font-size-15 mb-1 text-truncate">{selectedUser.name}</h5>

                                            </div>)}
                                        </div>
                                    </div>

                                    <div class="px-lg-2">
                                        <div class="chat-conversation p-3">
                                            {loading &&
                                                <div class="text-center">
                                                    <div class="loaderCustom2"></div>
                                                </div>
                                            }
                                            {
                                                !selectedUser &&
                                                <div class="text-center">
                                                    <br /><br /><br /><br /><br /><br />
                                                    <div style={{ fontSize: '18px' }}>

                                                        Select A User To Start Chat
                                                    </div>
                                                </div>
                                            }

                                            {!loading &&
                                                <ul ref={chatContainerRef} class="list-unstyled mb-0 pe-3 chatcustom" onClick={() => handleBackgroundClick()} style={{ maxHeight: "450px" }}>
                                                    {!loading && chats.map((chatmessage) => (
                                                        <React.Fragment key={chatmessage.id}>
                                                            {parseInt(chatmessage.user_id) !== 1 ? (

                                                                <li>
                                                                    <div class="conversation-list">
                                                                        <div class="ctext-wrap">
                                                                            <div class="conversation-name">{selectedUser.name}</div>
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
                                                                <li class="right">
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

                        </form>
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

                <Helmet>
                    <link rel="stylesheet" href="../../../assets/css/adminchat.css" />

                </Helmet>

            </div>
        </div>
    );
}