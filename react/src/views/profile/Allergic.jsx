import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import { Helmet } from 'react-helmet';
import { useNotificationContext } from '../../contexts/NotificationProvider';
import CustomerSideBar from '../../components/CustomerSideBar';

export default function Allergic() {
    const { user, setNotification } = useStateContext();
    const [allergies, setAllergies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setDeleteNotification, setSuccessNotification } = useNotificationContext();

    const [editIndex, setEditIndex] = useState(null);
    const [editedAllergic, setEditedAllergic] = useState('');

    useEffect(() => {
        getAllergies();
    }, []);

    const getAllergies = async () => {
        setLoading(true);
        try {
            await axiosClient.get(`/allergic/${user.id}`)
                .then(({ data }) => {
                    console.log(data)
                    setAllergies(data);
                    setLoading(false);
                });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const onDeleteClick = (allergic) => {
        setDeleteNotification().then((value) => {
            if (value) {
                axiosClient.delete(`/allergic/${allergic.id}`);
                getAllergies();
            }
        });
    };


    const handleEditClick = (index, allergicName) => {
        setEditIndex(index);
        setEditedAllergic(allergicName);
    };

    const handleSaveClick = (index) => {

        console.log(index)
        const updatedAllergies = [...allergies];
        updatedAllergies[index].ingredient_name = editedAllergic;
        console.log(updatedAllergies[index])

        setAllergies(updatedAllergies);

        const payload = {
            id: updatedAllergies[index].id,
            user_id: user.id,
            ingredient_name: editedAllergic,
        };

        console.log(payload)
        axiosClient.put(`/allergic/${payload.id}`, payload);
        setEditIndex(null);
    };

    return (
        <div className="all">
            <div className="customerAccHeader">
                <div className="customerAccBar"></div>
                <span className="customerAcc">My Allergics</span>
            </div>

            <div className="container custom-auth-gap">
                <div className="row">
                    <CustomerSideBar />

                    <div
                        className="col-lg-2 allergic"
                        data-aos="flip-up"
                        data-aos-delay="300"
                        data-aos-duration="400"
                    >
                        <div className="addressTitle">
                            <h3 className="profileTitle">My Allergies</h3>
                            <p className="subTitle">
                                Manage Your Allergies Here!
                            </p>
                            <div className="addAddress">
                                <div className="addAddressFont">
                                    <Link to="/allergicForm">+ Add New Allergic</Link>
                                </div>
                            </div>
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
                        {loading && (
                            <div className="text-center">
                                <div className="loaderCustom2"></div>
                            </div>
                        )}
                        <div class="scroll-wrap">
                            {!loading &&
                                allergies.map((allergic, index) => (
                                    <div className="row userAddress" key={allergic.id}>
                                        <div className="col-lg-9 col-sm-6 userInfo was-validated">
                                            <div className="name">
                                                <label htmlFor="nameLabel">Allergic To:</label>

                                                {editIndex === index ? (
                                                    <>

                                                        <input
                                                            type="text"
                                                            value={editedAllergic}
                                                            required
                                                            onChange={(e) => setEditedAllergic(e.target.value)}
                                                            className="allergicname form-control "
                                                            placeholder="Update allergic name"
                                                        />

                                                        &nbsp;
                                                        <i class="fas fa-edit" onClick={() => handleSaveClick(index)}></i>

                                                    </>
                                                ) : (
                                                    <span className="editable" data-pk={allergic.id} data-type="text">
                                                        {allergic.ingredient_name}
                                                    </span>
                                                )}

                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 buttonType">
                                            <div className="row actionLink">
                                                <div className="col-lg-3 editLink">


                                                    <a className="btn-edit" onClick={() => handleEditClick(index, allergic.ingredient_name)}>
                                                        Edit
                                                    </a>
                                                </div>
                                                <div className="col-lg-3 deleteLink">
                                                    <a
                                                        className="deleteAddress"
                                                        onClick={() => onDeleteClick(allergic)}
                                                        href="#"
                                                    >
                                                        Delete
                                                    </a>
                                                </div>
                                                <div className="default">
                                                    {/* Add code for setting as default here */}
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
                <link rel="stylesheet" href="../../../assets/css/customerAllergic.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>
    );
}
