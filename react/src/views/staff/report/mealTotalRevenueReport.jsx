import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { VectorMap } from 'react-jvectormap';
import ReactTable from 'react-table';

export default function MealTotalRevenueReport() {
    const [customerPurchase,setCustomerPurchase] = useState([]);
    const [totalSources, setTotalSources] = useState('');

    useEffect(() => {
        getCustomerPurchase();
    }, []);
  
   
    const getCustomerPurchase = () => {
        axiosClient.get(`/getTotalMealPurchase`)
            .then(({ data }) => {
                // Convert userDetails object to an array
                const userDetailsArray = Object.values(data)[0];
                console.log("getTotalMealPurchase",userDetailsArray);
                // Map over userDetailsArray and get the top 3 totalPurchase
                const top3CustomerPurchase = userDetailsArray
                    .sort((a, b) => b.total_purchase - a.total_purchase) 
               
                    console.log("userDetailsArray",top3CustomerPurchase);
                const totalSources = userDetailsArray.reduce((sum, item) => sum + item.total_purchase, 0);
                setTotalSources(totalSources);
           
                setCustomerPurchase(top3CustomerPurchase);
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    };

    return (

        <div>

            <Helmet>
            <link rel="stylesheet" href="../../../assets/css/reportStyle.css" />
            </Helmet>


            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">


                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Report</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Report</a>
                                            </li>
                                            <li className="breadcrumb-item active">Meal Revenue Report</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                           
                                        </div>

                                        <h4 className="card-title mb-4">Meal Revenue Report</h4>

                                        <div className="table-responsive" style={{ overflow: 'auto', maxHeight: '520px', height:'520px'}}>
                                            <table className="table table-centered datatable dt-responsive nowrap" data-bs-page-length="5" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                <thead className="table-light">
                                                    <tr>
                                                        <th style={{ width: '20px' }}>
                                                            <div className="form-check">
                                                                No.
                                                            </div>
                                                        </th>
                                                        <th>Meal Name</th>
                                                        <th>Meal Image</th>
                                                        <th>Meal Price</th>
                                                        <th>Total Order Quanlity</th>
                                                        <th>Total Revenue</th>
                                                
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {customerPurchase && customerPurchase.length>0 ? customerPurchase.map((item,index)=>(
                                                         <tr key={item.id}>
                                                         <td>
                                                             <div className="form-check">
                                                                 {index+1}
                                                             </div>
                                                         </td>
 
                                                         <td><a href={`/mealDetail/${item.id}`} className="text-dark fw-bold">{item.meal_name}</a> </td>
                                                         <td>
                                                         <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.meal_image}`} alt="img-1" height="100px" width="100px"/>
                                                         </td>
                                                 
                                                         <td>
                                                            RM{parseFloat(item.meal_price).toFixed(2)}
                                                         </td>
                                                         <td>
                                                            {item.meal_order_details_sum_order_quantity}
                                                         </td>
                                                         <td>
                                                             <div className="font-size-20">RM{parseFloat(item.total_purchase).toFixed(2)}</div>
                                                         </td>
                                                         
                                                     </tr>
                                                    )):(
                                                        <tr>
                                                            <td colSpan="4">No data</td>
                                                        </tr>
                                                    )}
                                                   
                                                   

                                                    {/* Add more table rows here */}

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="totalRevenueShow">
                                            <div className="totalRevenue">RM{parseFloat(totalSources).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>


    );
}
