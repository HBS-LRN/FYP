import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { VectorMap } from 'react-jvectormap';
import ReactTable from 'react-table';

export default function DashBoard() {
    const [numberofSales, setNumberOfSales] = useState('');
    const [salesRevenue, setSalesRevenue] = useState('');
    const [averagePrice, setAveragePrice] = useState('');
    const [salesAnalyticsData, setSalesAnalyticsData] = useState([]);
    const { user, token, setToken, setCartQuantity } = useStateContext();
    const [filterSalesAnalyticsData, setFilterSalesAnalyticsData] = useState([]);
    const [revenueAnalytics, setRevenueAnalytics] = useState([]);
    const [currentYearData, setCurrentYearData] = useState([]);
    const [previousYearData, setPreviousYearData] = useState([]);
    const [dailyOrderTotal, setDailyOrderTotal] = useState([]);
    const [monthlyOrderTotal, setMonthlyOrderTotal] = useState([]);
    const [customerPurchase,setCustomerPurchase] = useState([]);
    const [totalSources, setTotalSources] = useState('');
    const [dailyStaffActivityFeed,getDailyStaffActivityFeed] = useState([]);
    const [dailyCustomerOrder,setDailyCustomerOrder] = useState([]);
    useEffect(() => {
        getSalesAnalytics();
        getTotal();
        getRevenueAnalytics();
        getDailyMonthlyData();  
        getCustomerPurchase();
        getDailyStaffActivity();
        getCustomerDailyOrder();
     
    }, []);
    const getCustomerDailyOrder = () =>{
        axiosClient.get(`/getDailyCustomerOrder`)
        .then(( {data} ) => {
            setDailyCustomerOrder(Object.values(data)[0]);
           
        })
        .catch((error) => {
            
            console.error('API request error:', error);
        });
    }
    console.log("dailyCustomerOrder",dailyCustomerOrder);
    const getDailyStaffActivity = () =>{
        axiosClient.get(`/getStaffActiveFeed`)
            .then(( {data} ) => {
            
               getDailyStaffActivityFeed(Object.values(data));
            })
            .catch((error) => {
                
                console.error('API request error:', error);
            });
    }

    const getTotal = () =>{
        axiosClient.get(`/getTotal`)
            .then(( response ) => {
                setNumberOfSales(response.data.numOfSales);
                const formattedSaleRevenue = parseFloat(response.data.salesRevenue).toFixed(2);
                setSalesRevenue(formattedSaleRevenue);
                const formattedAveragePrice = parseFloat(response.data.averagePrice).toFixed(2);
                setAveragePrice(formattedAveragePrice);
              
            })
            .catch((error) => {
                
                console.error('API request error:', error);
            });
    }
    const getRevenueAnalytics = () => {
        axiosClient.get(`/getRevenueAnalytics`)
            .then(({ data }) => {
                const { currentYearData, previousYearData } = data;
    
                // Loop through 12 months
                const months = [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];
    
                // Replace missing months with 0
                const formattedCurrentYearData = months.reduce((result, month) => {
                    result[month] = currentYearData[month] || 0;
                    return result;
                }, {});
    
                const formattedPreviousYearData = months.reduce((result, month) => {
                    result[month] = previousYearData[month] || 0;
                    return result;
                }, {});
    
                setCurrentYearData(getRevenueAnalyticsYearData(formattedCurrentYearData));
                setPreviousYearData(getRevenueAnalyticsYearData(formattedPreviousYearData));
                
                setRevenueAnalytics(data);
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    }
    const getRevenueAnalyticsYearData=(array)=>{
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var newArray=[];
      for (let index = 0; index < months.length; index++) {
        
        newArray[index]=array[months[index]];
      }
     
      return newArray;
    }
   
    const lineColumnChartOptions = {
        series: [
            {
                name: revenueAnalytics.currentYear,
                type: "column",
                data: currentYearData
            },
            {
                name: revenueAnalytics.previousYear,
                type: "line",
                data: previousYearData
            }
        ],
        chart: {
            height: 280,
            type: "line",
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: [0, 3],
            curve: "smooth"
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "20%"
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        colors: ["#5664d2", "#1cbb8c"],
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
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
    const getDailyMonthlyData = () =>{
        axiosClient.get(`/getMonthly`)
            .then(({ data }) => {
               setDailyOrderTotal(data.dailyOrderTotal);
               setMonthlyOrderTotal(data.monthlyOrderTotal);
            })
            .catch((error) => {
                
                console.error('API request error:', error);
            });
    }
    const getCustomerPurchase = () => {
        axiosClient.get(`/getTotalMealPurchase`)
            .then(({ data }) => {
                // Convert userDetails object to an array
                const userDetailsArray = Object.values(data)[0];
                console.log("getTotalMealPurchase",userDetailsArray);
                // Map over userDetailsArray and get the top 3 totalPurchase
                const top3CustomerPurchase = userDetailsArray
                    .sort((a, b) => b.total_purchase - a.total_purchase) 
                    .slice(0, 3); 
                    console.log("userDetailsArray",top3CustomerPurchase);
                const totalSources = userDetailsArray.reduce((sum, item) => sum + item.total_purchase, 0);
                setTotalSources(totalSources);
           
                setCustomerPurchase(top3CustomerPurchase);
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    };
    
    const donutChartOptions = {
        series: filterSalesAnalyticsData.map(item => item.percentage_of_sales),
        chart: {
            height: 250,
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

    const radialChartOptions = {
        series: [(dailyOrderTotal/10000)*100],
        chart: {
            type: "radialBar",
            width: 60,
            height: 60,
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#5664d2"],
        stroke: {
            lineCap: "round"
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: "70%"
                },
                track: {
                    margin: 0
                },
                dataLabels: {
                    show: false
                }
            }
        }
    };

    const radialChartOptions2 = {
        series: [(monthlyOrderTotal/100000)*100],
        chart: {
            type: "radialBar",
            width: 60,
            height: 60,
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#008000"],
        stroke: {
            lineCap: "round"
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: "70%"
                },
                track: {
                    margin: 0
                },
                dataLabels: {
                    show: false
                }
            }
        }
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
                                    <h4 className="mb-sm-0">Dashboard</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Grand Imperial</a>
                                            </li>
                                            <li className="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-8">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Number of Sales</p>
                                                        <h4 className="mb-0">{numberofSales}</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i class="ri-stack-line font-size-24"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Sales Revenue</p>
                                                        <h4 className="mb-0">RM {salesRevenue}</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-store-2-line font-size-24"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Average Price</p>
                                                        <h4 className="mb-0">RM {averagePrice}</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-briefcase-4-line font-size-24"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-end d-none d-md-inline-block">
                                            
                                        </div>
                                        <h4 className="card-title mb-4">Annual Sales Report</h4>
                                        <div>
                                            <ReactApexChart
                                                options={lineColumnChartOptions}
                                                series={lineColumnChartOptions.series}
                                                type="line"
                                                height={280}
                                            />
                                        </div>
                                    </div>

                                    <div className="card-body border-top text-center">
                                        <div className="row">
                                            

                                            <div className="col-sm-6">
                                                <div className="mt-4 mt-sm-0">
                                                    <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1"></i> This Year :</p>
                                                    <div className="d-inline-flex">
                                                        <h5 className="mb-0 me-2">RM {parseFloat(revenueAnalytics.currentYearTotal).toFixed(2)}</h5>
                                                        <div className="text-success">
                                                            {
                                                                revenueAnalytics.currentYearTotal > revenueAnalytics.previousYearTotal?
                                                                <i className="mdi mdi-menu-up font-size-14"></i>:<i className="mdi mdi-menu-down font-size-14"></i>
                                                                
                                                            }
                                                            {parseFloat((revenueAnalytics.currentYearTotal - revenueAnalytics.previousYearTotal)/(revenueAnalytics.currentYearTotal + revenueAnalytics.previousYearTotal)*100).toFixed(2)}%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mt-4 mt-sm-0">
                                                    <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-success font-size-10 me-1"></i> Previous Year :</p>
                                                    <div className="d-inline-flex">
                                                        <h5 className="mb-0">RM {parseFloat(revenueAnalytics.previousYearTotal).toFixed(2)}</h5>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
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
                                                height={250}
                                            />
                                        ) : (
                                            <div style={{ color: 'grey', fontSize: "30px", textAlign: 'center' }}>No result</div>
                                        )}

                                        
                                        <div>
                                           </div>

                                        <div className="moreDetailBox">
                                            <a className="moreDetailbtn" href="/salesReport">More Detail</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                {/* item */}
                                                <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                                                {/* item */}
                                                <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                                                {/* item */}
                                                <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                                                {/* item */}
                                                <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                            </div>
                                        </div>

                                        <h4 className="card-title mb-4">Earning Reports</h4>
                                        <div className="text-center">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div>
                                                        <div className="mb-5">
                                                            <div id="radialchart-1" className="apex-charts"><ReactApexChart
                                                                options={radialChartOptions}
                                                                series={radialChartOptions.series}
                                                                type="radialBar"
                                                                width={95}
                                                                height={95}
                                                            /></div>
                                                        </div>

                                                        <p className="text-muted text-truncate mb-2">Daily Earnings</p>
                                                        <h5 className="mb-0">RM {parseFloat(dailyOrderTotal).toFixed(2)}</h5>
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="mt-5 mt-sm-0">
                                                        <div className="mb-5">
                                                            <div id="radialchart-2" className="apex-charts"><ReactApexChart
                                                                options={radialChartOptions2}
                                                                series={radialChartOptions2.series}
                                                                type="radialBar"
                                                                width={95}
                                                                height={95}
                                                            /></div>
                                                        </div>

                                                        <p className="text-muted text-truncate mb-2">Monthly Earnings</p>
                                                        <h5 className="mb-0">RM {parseFloat(monthlyOrderTotal).toFixed(2)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                       

                                        <h4 className="card-title mb-3">Meal Sold Total Revenue Report</h4>

                                        <div>
                                            <div className="text-center">
                                                <p className="mb-2">Total Revenues</p>
                                                <h4>RM {parseFloat(totalSources).toFixed(2)}</h4>
                                                
                                            </div>

                                            <div className="table-responsive mt-4">
                                                <table className="table table-hover mb-0 table-centered table-nowrap">
                                                <tbody>
                                                    {customerPurchase.length > 0 && customerPurchase ? (
                                                        customerPurchase.map((item, index) => (
                                                            <tr key={index}>
                                                                <td style={{ width: '60px' }}>
                                                                    <div className="avatar-xs">
                                                                        <div className="avatar-title rounded-circle bg-light">
                                                                            {index === 0 && <i className="fa-solid fa-medal" style={{ color: 'gold' }}></i>}
                                                                            {index === 1 && <i className="fa-solid fa-medal" style={{ color: 'silver' }}></i>}
                                                                            {index === 2 && <i className="fa-solid fa-medal" style={{ color: 'brown' }}></i>}
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <h5 className="font-size-14 mb-0">{item.meal_name}</h5>
                                                                </td>
                                                                <td>
                                                                    <div id="spak-chart1"></div>
                                                                </td>
                                                                <td>
                                                                    <p className="text-muted mb-0">RM {parseFloat(item.total_purchase).toFixed(2)}</p>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4">No data</td>
                                                        </tr>
                                                    )}
                                                </tbody>

                                                </table>
                                            </div>

                                            <div className="moreDetailBox">
                                                {user.role===2?<a href="/mealRevenueReport" className="moreDetailbtn">View more</a>:''}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                         
                                        </div>

                                        <h4 className="card-title mb-4">Daily Staff Activity Feed</h4>

                                        <div data-simplebar style={{ maxHeight: '335px', height: '335px'}}>
                                            <ul className="list-unstyled activity-wid">
                                            {dailyStaffActivityFeed.length > 0 && dailyStaffActivityFeed ? (
                                                        dailyStaffActivityFeed[0].map((item, index) => (
                                                            <li className="activity-list" key={item.id}>
                                                            <div className="activity-icon avatar-xs">
                                                                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                                    <i className={item.actionIcon}></i>
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <h5 className="font-size-13">{item.date} <small className="text-muted">{item.time}</small></h5>
                                                                </div>
                                                                <div>
                                                                    <p className="text-muted mb-0">Sf{item.userId}#:"{item.action}"</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4">No data</td>
                                                        </tr>
                                                    )}
                                            </ul>
                                        </div>

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

                                        <h4 className="card-title mb-4">Daily Customer's Order Record</h4>

                                        <div className="table-responsive" style={{ overflow: 'auto', maxHeight: '220px', height:'180px'}}>
                                            <table className="table table-centered datatable dt-responsive nowrap" data-bs-page-length="5" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                <thead className="table-light">
                                                    <tr>
                                                        <th style={{ width: '20px' }}>
                                                            <div className="form-check">
                                                                No.
                                                            </div>
                                                        </th>
                                                        <th>Order ID</th>
                                                        <th>Date</th>
                                                        <th>Total</th>
                                                        <th>Payment Status</th>
                                                
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dailyCustomerOrder && dailyCustomerOrder.length>0 ? dailyCustomerOrder.map((item,index)=>(
                                                         <tr key={item.id}>
                                                         <td>
                                                             <div className="form-check">
                                                                 {index+1}
                                                             </div>
                                                         </td>
 
                                                         <td><a href="javascript:void(0);" className="text-dark fw-bold">OD{item.id}#</a> </td>
                                                         <td>
                                                             {item.order_date}
                                                         </td>
                                                 
 
                                                         <td>
                                                             RM{parseFloat(item.order_total).toFixed(2)}
                                                         </td>
                                                         <td>
                                                             <div className="badge badge-soft-success font-size-12">{item.payment_status}</div>
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
                                        <div className="moreDetailBox"><a className="moreDetailbtn" href="">view More</a></div>
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
