import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { VectorMap } from 'react-jvectormap';
import ReactTable from 'react-table';

export default function SalesAnalyticReport() {
    const [salesAnalyticsData, setSalesAnalyticsData] = useState([]);
    const [filterSalesAnalyticsData, setFilterSalesAnalyticsData] = useState([]);

    useEffect(() => {
        getSalesAnalytics();

    }, []);
   


   
   
   

    const getSalesAnalytics = () =>{
        axiosClient.get(`/getMealTotal`)
            .then(({ data }) => {

                setSalesAnalyticsData(data);
                setFilterSalesAnalyticsData(data);
            })
            .catch((error) => {
                
                console.error('API request error:', error);
            });
    }
     const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const handleMonthFilter = (event) => {
        const selectedMonth = event;
    
        // Ensure salesAnalyticsData is an array
        if (selectedMonth === "0") {
            setFilterSalesAnalyticsData(salesAnalyticsData);
        } else {
            // Filter salesAnalyticsData based on the selectedMonth
            const filteredDataArray = salesAnalyticsData.filter(item => {
                const itemDate = new Date(item.order_date);
                const itemMonth = itemDate.getMonth() + 1; // Adding 1 because getMonth returns 0-based month
                if(itemMonth.toString() === selectedMonth.toString()){
                    return item;
                }
                return null;
            });
            setFilterSalesAnalyticsData(filteredDataArray);
        }
    };
  
    const donutChartOptions = {
        series: filterSalesAnalyticsData.map(item => item.percentage_of_sales),
        chart: {
            height: 750,
            type: "donut"
        },
        labels: filterSalesAnalyticsData.map(item => item.meal_name),
        plotOptions: {
            pie: {
                donut: {
                    size: "75%"
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        colors: Array.from({ length: filterSalesAnalyticsData.length }, () => getRandomColor())
    };


  
console.log(filterSalesAnalyticsData);






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
                                            <li className="breadcrumb-item active">Sales Analytics Report</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            
                            <div className="col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                    <div className="float-end">
                                        {/* Filter result by month */}
                                        <select
                                            className="form-select form-select-sm"
                                            
                                            onChange={(e)=>handleMonthFilter(e.target.value)}
                                        >   <option value="0">All</option>
                                            <option value="1">Jan</option>
                                            <option value="2">Feb</option>
                                            <option value="3">Mar</option>
                                            <option value="4">Apr</option>
                                            <option value="5">May</option>
                                            <option value="6">Jun</option>
                                            <option value="7">Jul</option>
                                            <option value="8">Aug</option>
                                            <option value="9">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </select>
                                    </div>
                                        <h4 className="card-title mb-4">Sales Analytics</h4>
                                        {filterSalesAnalyticsData.length > 0 ? (
                                            <ReactApexChart
                                                options={donutChartOptions}
                                                series={donutChartOptions.series}
                                                type="donut"
                                                height={285}
                                            />
                                        ) : (
                                            <div style={{ color: 'grey', fontSize: "30px", textAlign: 'center' }}>No result</div>
                                        )}

                                        
                                        <div>
                                           </div>

                                     
                                    </div>
                                </div>

                               
                            </div>
                      

                        
                            <div className="col-lg-9">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                           
                                        </div>

                                        <h4 className="card-title mb-4">Daily Customer's Order Record</h4>

                                        <div className="table-responsive" style={{ overflow: 'auto', maxHeight: '480px' }}>
                                            <table className="table table-centered datatable dt-responsive nowrap" data-bs-page-length="5" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                <thead className="table-light">
                                                    <tr>
                                                        <th style={{ width: '20px' }}>
                                                            <div className="form-check">
                                                                No.
                                                            </div>
                                                        </th>
                                                        <th>Product Name</th>
                                                        <th>Percentage of Sales</th>
                                                     
                                                
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filterSalesAnalyticsData && filterSalesAnalyticsData.length>0 ? filterSalesAnalyticsData.map((item,index)=>(
                                                         <tr key={item.id}>
                                                         <td>
                                                             <div className="form-check">
                                                                 {index+1}
                                                             </div>
                                                         </td>
 
                                                         <td><a href="javascript:void(0);" className="text-dark fw-bold">{item.meal_name}</a> </td>
                                                         <td>
                                                             {parseFloat(item.percentage_of_sales).toFixed(2)}%
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
