import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import { useStateContext } from "../../../contexts/ContextProvider";

export default function CustomerOrderList() {
   const { user, token, setToken, setCartQuantity } = useStateContext();
   const [originalCustomerOrderList, setOriginalCustomerOrderList] = useState([]);
   const [customerOrderList, setCustomerOrderList] = useState([]);
   const [filter, setFilter] = useState('all');
    useEffect(() => {
        getCustomerOrder();
    }, [filter]);
    console.log("customerOrder",customerOrderList);
    const getCustomerOrder = () => {
        console.log("Fetching customer orders...");
        axiosClient.get('/customerOrder')
            .then(({ data }) => {
                console.log('API Response:', data);
                
                setOriginalCustomerOrderList(data);
                applyFilter(data);
                
            })
            .catch((error) => {
          
                console.error('API request error:', error);
            });
            console.log("customerOrder",customerOrderList);
    }
  
    const handleSearch = (e) => {
        
        axiosClient.get('/searchCustomerOrder', { params: { order_date: e.target.value } })
            .then(response => {
                console.log("search result",response.data)
                applyFilter(response.data);
            })
            .catch(error => {
                console.error("searching error:",error);
            });
    };
    const applyFilter = (orders) => {
        if (filter === 'all') {
            setCustomerOrderList(orders);
        } else {
            setCustomerOrderList(orders.filter(item => item.order_status === filter));
        }
    }

    const deleteCustomerOrder = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/deleteCustomerOrders/${id}`)
            .then(response => {
                const activeData = {
                    user_id:user.id,
                    Action: "Deleted the customer's order", 
                    ActionIcon:"fa-solid fa-trash"
                }
                axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Customer's order has been deleted.",
                        icon: "success"
                      });
                      getCustomerOrder();
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });
              
                console.log("delete",response.data)
                
            })
            .catch(error => {
                console.error("delete error:",error);
            });
            
            }
          });
        
    }
    const handleFilterChange = (data) => {
        setFilter(data);
        applyFilter(originalCustomerOrderList);
    };
    const handlePaymentMethodChange = (orderId, newPaymentMethod) => {
        console.log("payment method", newPaymentMethod);
    
        // Assuming customerOrderList is an array of objects
        const updatedOrders = customerOrderList.map((order) =>
            order.id === orderId ? { ...order, payment_method: newPaymentMethod } : order
        );
    
        setCustomerOrderList(updatedOrders);
    };
    const updatePaymentmethod =(id) =>{
        const orderToUpdate = customerOrderList.find(order => order.id === id);
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
                axiosClient.post(`/updateOrderDetail/${id}`,orderToUpdate)
            .then(response => {
                const activeData = {
                    user_id:user.id,
                    Action: "Updated customer's Order", 
                    ActionIcon:"fa-solid fa-pen"
                }

                axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    Swal.fire({
                        title: "Updated!",
                        text: "Customer's order has been updated.",
                        icon: "success"
                      });
                      getCustomerOrder();
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
                                    <li className="nav-item">
                                                <a className={`nav-link fw-bold p-3 ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>
                                                    All Orders
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={`nav-link p-3 fw-bold ${filter === 'delivering' ? 'active' : ''}`} onClick={() => handleFilterChange('delivering')}>
                                                    Delivering
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={`nav-link p-3 fw-bold ${filter === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}>
                                                    Completed
                                                </a>
                                            </li>
                                            <li className='SearchBox'>
                                            <a href="/addCustomerOrder" className='addOrderBtn'>Add Order</a>
                                            <input type="search" placeholder='Search date here......' name="search" id="search" onChange={handleSearch}/>
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
                                                        <th>Order ID</th>
                                                        <th>Date</th>
                                                        
                                                        <th>Total</th>
                                                        <th>Payment Status</th>
                                                        <th>Order Status</th>
                                                        <th>Payment method</th>

                                                        <th style={{ width: 120 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                           
                                                    {customerOrderList && customerOrderList.length > 0 ? (
                            customerOrderList.map((item,index) => (
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
                                                        OD{item.id}# 
                                                            <a
                                                                href={`/customerOrderDetailList/${item.id}`}
                                                                className="link"
                                                            >
                                                                (View Details)
                                                            </a>
                                                        </td>
                                                        <td>{item.order_date}</td>
                                                        
                                                        <td>RM {item.order_total}</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                {item.payment_status}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {item.order_status}
                                                        </td>
                                                        
                                                        <td>
                                                        <Select
                                                           
                                                            value={item.payment_method ? { label: item.payment_method, value: item.payment_method } : null}
                                                            options={[
                                                                { label: 'Pay On Delivery', value: 'Pay On Delivery' },
                                                                { label: 'Paypal', value: 'Paypal' },
                                                                {label: 'card', value: 'card'}
                                                            ]}
                                                            onChange={(selectedOption) => handlePaymentMethodChange(item.id, selectedOption ? selectedOption.value : null)}
                                                        />
                                                        </td>
                                                        <td>
                                                            <a
                                                                onClick={() =>updatePaymentmethod(item.id)}
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
