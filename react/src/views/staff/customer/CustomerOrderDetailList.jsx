import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import { useStateContext } from "../../../contexts/ContextProvider";

export default function CustomerOrderDetailList() {
    const { user, token, setToken, setCartQuantity } = useStateContext();
   const [customerOrderDetailList, setCustomerOrderDetailList] = useState([]);
   const [mealOptions, setMealOptions] = useState([]);
   let { id } = useParams(); 
    useEffect(() => {
        getCustomerOrderDetail();
        fetchMealOptions();
    }, [id]);

    const getCustomerOrderDetail = () => {
        console.log("Fetching customer orders...");
        axiosClient.get(`/mealOrderDetails/${id}`)
            .then(({ data }) => {
                console.log('API Response:', data);
                
                setCustomerOrderDetailList(data);
         
            })
            .catch((error) => {
          
                console.error('API request error:', error);
            });
            console.log("customerOrder",customerOrderDetailList);
    }
  
    // const handleSearch = (e) => {
        
    //     axiosClient.get('/searchCustomerOrder', { params: { order_date: e.target.value } })
    //         .then(response => {
    //             console.log("search result",response.data)
    //             setCustomerOrderDetailList(response.data);
    //         })
    //         .catch(error => {
    //             console.error("searching error:",error);
    //         });
    // };
  

    const deleteCustomerOrder = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/deleteCustomerOrdersDetail/${id}`)
            .then(response => {
                const activeData = {
                    user_id:user.id,
                    Action: "Canceled the customer order", 
                    ActionIcon:"fa-solid fa-trash"
                }
                axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    Swal.fire({
                        title: "Canceled!",
                        text: "Your order has been Canceled.",
                        icon: "success"
                      });
                      getCustomerOrderDetail();
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });

                Swal.fire({
                    title: "Canceled!",
                    text: "customer meal has been Canceled.",
                    icon: "success"
                  });
                  getCustomerOrderDetail();
                console.log("delete",response.data)
                
            })
            .catch(error => {
                console.error("delete error:",error);
            });
            
            }
          });
        
    }
    const handleMealChange = (option, id) => {
        const updatedMealName = customerOrderDetailList.map((meal) =>
        meal.id === id ? { ...meal, meal_id: option.value,meal_image:option.image,meal_name: option.label } : meal
        );
     
        setCustomerOrderDetailList(updatedMealName);   
        
    }
    const handleQuantityChange = (event, id) => {
        const updatedQuantities = customerOrderDetailList.map((item) =>
            item.id === id ? { ...item, order_quantity: event.target.value } : item
        );
        setCustomerOrderDetailList(updatedQuantities);
    }
    console.log("customerOrder",customerOrderDetailList);
    const fetchMealOptions = () => {
        axiosClient.get('/meal')
            .then(({ data }) => {
                const options = data.map(meal => ({
                    label: meal.meal_name,
                    value: meal.id,
                    image: meal.meal_image
                }));
                
                setMealOptions(options);
            })
            .catch((error) => {
                console.error('Error fetching meal options:', error);
            });
    }
    const updateOrderDetail =(id) =>{
        const orderToUpdate = customerOrderDetailList.find(order => order.id === id);
        console.log("update",orderToUpdate)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post(`/updateOrderDetailList/${id}`,orderToUpdate)
            .then(response => {
                const activeData = {
                    user_id:user.id,
                    Action: "Updated customer's order", 
                    ActionIcon:"fa-solid fa-pen"
                }
                axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    Swal.fire({
                        title: "Updated!",
                        text: "Customer's order has been updated.",
                        icon: "success"
                      });
                      getCustomerOrderDetail();
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });               
                
            })
            .catch(error => {
                console.error("delete error:",error);
            });
            
            }
          });
        
    }
    return (

        <div>
              <Helmet> <link rel="stylesheet" href="../../../assets/css/addIngredient.css" /></Helmet>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Customer Orders</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Customer</a>
                                            </li>
                                            <li className="breadcrumb-item active">Customer Orders</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body  pt-0">
                                    <ul className="nav nav-tabs nav-tabs-custom mb-4 Flex">
                                        <li className="nav-item content"><b>Customer's Name: </b> {customerOrderDetailList[0]?.user_name} </li>
                                        <li className="nav-item content"><b>Order ID:</b> OD{id}#</li>
                                        <li className='SearchBox SearchBox2'>
                                            <input type="search" placeholder='Search date here......' name="search" id="search" />
                                        </li>
                                    </ul>
                                        <div className="table-responsive">
                                            <table
                                           
                                                 id="orderTable"
                                                 className="table table-centered datatable dt-responsive nowrap"
                                                 style={{
                                                     borderCollapse: "collapse",
                                                     borderSpacing: 0,
                                                     width: "100%"
                                                 }}
                                            >
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th style={{ width: 20 }}>
                                                            <div className="form-checkbox">
                                                                
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck"
                                                                >
                                                                    No
                                                                </label>
                                                            </div>
                                                        </th>
                                                        <th>Meal Name</th>
                                                        <th>Meal Image</th>
                                                        
                                                        <th>order_quantity</th>
                                                        <th>Rating_star</th>

                                                        <th style={{ width: 120 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                           
                                                    {customerOrderDetailList && customerOrderDetailList.length > 0 ? (
                            customerOrderDetailList.map((item,index) => (
                                
                                                        <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                              
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck1"
                                                                >
                                                                    {index+1}
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                        <Select
                                                            value={item.meal_name && item.meal_id ? { label: item.meal_name, value: item.meal_id } : null}
                                                            onChange={(option) => handleMealChange(option, item.id)}
                                                            options={mealOptions}
                                                        />
                                                        </td>
                                                        <td><img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.meal_image}`} alt="img-1" height="100px" width="100px"/></td>
                                                        
                                                        <td> 
                                                            <input
                                                            type="number"
                                                            className='order_qty'
                                                            value={item.order_quantity}
                                                            onChange={(e) => handleQuantityChange(e, item.id)}
                                                            />
                                                        </td>
                                                        <td>
                                                            {item.rating_star != null ? item.rating_star : "no rating"}
                                                        </td>
                                                      
                                                        <td>
                                                            <a
                                                               onClick={()=>updateOrderDetail(item.id)}
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                                onClick={() => deleteCustomerOrder(item.id)}
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                       )) ) : (
                                                        <tr>
                                                            <td colSpan="8">No orders found</td>
                                                        </tr>
                                                    )}
                                                    
                                                    
                                 
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end row */}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                {/* End Page-content */}
            </div>

        </div>
    );
}
