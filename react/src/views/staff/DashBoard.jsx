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
    const lineColumnChartOptions = {
        series: [
            {
                name: "2020",
                type: "column",
                data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
            },
            {
                name: "2019",
                type: "line",
                data: [23, 32, 27, 38, 27, 32, 27, 38, 22, 31, 21, 16]
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

    const donutChartOptions = {
        series: [42, 26, 15],
        chart: {
            height: 250,
            type: "donut"
        },
        labels: ["Product A", "Product B", "Product C"],
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
        colors: ["#5664d2", "#1cbb8c", "#eeb902"]
    };

    const radialChartOptions = {
        series: [72],
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
        series: [72],
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

            {/* right content */}


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
                                                <a href="javascript: void(0);">Nazox</a>
                                            </li>
                                            <li className="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>






                        {/* end page title  */}


                        <div className="row">
                            <div className="col-xl-8">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Number of Sales</p>
                                                        <h4 className="mb-0">1452</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i class="ri-stack-line font-size-24"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                    <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                    <span className="text-muted ms-2">From previous period</span>
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
                                                        <h4 className="mb-0">$ 38452</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-store-2-line font-size-24"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                    <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                    <span className="text-muted ms-2">From previous period</span>
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
                                                        <h4 className="mb-0">$ 15.4</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-briefcase-4-line font-size-24"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                    <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                    <span className="text-muted ms-2">From previous period</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-end d-none d-md-inline-block">
                                            <div className="btn-group mb-2">
                                                <button type="button" className="btn btn-sm btn-light">Today</button>
                                                <button type="button" className="btn btn-sm btn-light active">Weekly</button>
                                                <button type="button" className="btn btn-sm btn-light">Monthly</button>
                                            </div>
                                        </div>
                                        <h4 className="card-title mb-4">Revenue Analytics</h4>
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
                                            <div className="col-sm-4">
                                                <div className="d-inline-flex">
                                                    <h5 className="me-2">$12,253</h5>
                                                    <div className="text-success">
                                                        <i className="mdi mdi-menu-up font-size-14"> </i>2.2 %
                                                    </div>
                                                </div>
                                                <p className="text-muted text-truncate mb-0">This month</p>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="mt-4 mt-sm-0">
                                                    <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1"></i> This Year :</p>
                                                    <div className="d-inline-flex">
                                                        <h5 className="mb-0 me-2">$ 34,254</h5>
                                                        <div className="text-success">
                                                            <i className="mdi mdi-menu-up font-size-14"> </i>2.1 %
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="mt-4 mt-sm-0">
                                                    <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-success font-size-10 me-1"></i> Previous Year :</p>
                                                    <div className="d-inline-flex">
                                                        <h5 className="mb-0">$ 32,695</h5>
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
                                            <select className="form-select form-select-sm">
                                                <option selected>Apr</option>
                                                <option value="1">Mar</option>
                                                <option value="2">Feb</option>
                                                <option value="3">Jan</option>
                                            </select>
                                        </div>
                                        <h4 className="card-title mb-4">Sales Analytics</h4>

                                        <div>
                                            <ReactApexChart
                                                options={donutChartOptions}
                                                series={donutChartOptions.series}
                                                type="donut"
                                                height={250}
                                            /></div>

                                        <div className="row">
                                            <div className="col-4">
                                                <div className="text-center mt-4">
                                                    <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1"></i> Product A</p>
                                                    <h5>42 %</h5>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="text-center mt-4">
                                                    <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-success font-size-10 me-1"></i> Product B</p>
                                                    <h5>26 %</h5>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="text-center mt-4">
                                                    <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-warning font-size-10 me-1"></i> Product C</p>
                                                    <h5>42 %</h5>
                                                </div>
                                            </div>
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
                                                        <div className="mb-3">
                                                            <div id="radialchart-1" className="apex-charts"><ReactApexChart
                                                                options={radialChartOptions}
                                                                series={radialChartOptions.series}
                                                                type="radialBar"
                                                                width={60}
                                                                height={60}
                                                            /></div>
                                                        </div>

                                                        <p className="text-muted text-truncate mb-2">Weekly Earnings</p>
                                                        <h5 className="mb-0">$2,523</h5>
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="mt-5 mt-sm-0">
                                                        <div className="mb-3">
                                                            <div id="radialchart-2" className="apex-charts"><ReactApexChart
                                                                options={radialChartOptions2}
                                                                series={radialChartOptions2.series}
                                                                type="radialBar"
                                                                width={60}
                                                                height={60}
                                                            /></div>
                                                        </div>

                                                        <p className="text-muted text-truncate mb-2">Monthly Earnings</p>
                                                        <h5 className="mb-0">$11,235</h5>
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

                                        <h4 className="card-title mb-3">Sources</h4>

                                        <div>
                                            <div className="text-center">
                                                <p className="mb-2">Total sources</p>
                                                <h4>$ 7652</h4>
                                                <div className="text-success">
                                                    <i className="mdi mdi-menu-up font-size-14"> </i>2.2 %
                                                </div>
                                            </div>

                                            <div className="table-responsive mt-4">
                                                <table className="table table-hover mb-0 table-centered table-nowrap">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '60px' }}>
                                                                <div className="avatar-xs">
                                                                    <div className="avatar-title rounded-circle bg-light">
                                                                        <img src="../assets/img/companies/img-1.png" alt="img-1" height="20" />
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <h5 className="font-size-14 mb-0">Source 1</h5>
                                                            </td>
                                                            <td>
                                                                <div id="spak-chart1"></div>
                                                            </td>
                                                            <td>
                                                                <p className="text-muted mb-0">$ 2478</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="avatar-xs">
                                                                    <div className="avatar-title rounded-circle bg-light">
                                                                        <img src="../assets/img/companies/img-2.png" alt="img-2" height="20" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <h5 className="font-size-14 mb-0">Source 2</h5>
                                                            </td>

                                                            <td>
                                                                <div id="spak-chart2"></div>
                                                            </td>
                                                            <td>
                                                                <p className="text-muted mb-0">$ 2625</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="avatar-xs">
                                                                    <div className="avatar-title rounded-circle bg-light">
                                                                        <img src="../assets/img/companies/img-3.png" alt="img-3" height="20" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <h5 className="font-size-14 mb-0">Source 3</h5>
                                                            </td>
                                                            <td className="overflow-hidden">
                                                                <div id="spak-chart3"></div>
                                                            </td>
                                                            <td>
                                                                <p className="text-muted mb-0">$ 2856</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="text-center mt-4">
                                                <a href="#" className="btn btn-primary btn-sm">View more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
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

                                        <h4 className="card-title mb-4">Recent Activity Feed</h4>

                                        <div data-simplebar style={{ maxHeight: '330px' }}>
                                            <ul className="list-unstyled activity-wid">
                                                <li className="activity-list">
                                                    <div className="activity-icon avatar-xs">
                                                        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                            <i className="ri-edit-2-fill"></i>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <h5 className="font-size-13">28 Apr, 2020 <small className="text-muted">12:07 am</small></h5>
                                                        </div>

                                                        <div>
                                                            <p className="text-muted mb-0">Responded to need “Volunteer Activities”</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="activity-list">
                                                    <div className="activity-icon avatar-xs">
                                                        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                            <i className="ri-user-2-fill"></i>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <h5 className="font-size-13">21 Apr, 2020 <small className="text-muted">08:01 pm</small></h5>
                                                        </div>

                                                        <div>
                                                            <p className="text-muted mb-0">Added an interest “Volunteer Activities”</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="activity-list">
                                                    <div className="activity-icon avatar-xs">
                                                        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                            <i className="ri-bar-chart-fill"></i>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <h5 className="font-size-13">17 Apr, 2020 <small className="text-muted">09:23 am</small></h5>
                                                        </div>

                                                        <div>
                                                            <p className="text-muted mb-0">Joined the group “Boardsmanship Forum”</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="activity-list">
                                                    <div className="activity-icon avatar-xs">
                                                        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                            <i className="ri-mail-fill"></i>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <h5 className="font-size-13">11 Apr, 2020 <small className="text-muted">05:10 pm</small></h5>
                                                        </div>

                                                        <div>
                                                            <p className="text-muted mb-0">Responded to need “In-Kind Opportunity”</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="activity-list">
                                                    <div className="activity-icon avatar-xs">
                                                        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                            <i className="ri-calendar-2-fill"></i>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <h5 className="font-size-13">07 Apr, 2020 <small className="text-muted">12:47 pm</small></h5>
                                                        </div>

                                                        <div>
                                                            <p className="text-muted mb-0">Created need “Volunteer Activities”</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="activity-list">
                                                    <div className="activity-icon avatar-xs">
                                                        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                            <i className="ri-edit-2-fill"></i>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <h5 className="font-size-13">05 Apr, 2020 <small className="text-muted">03:09 pm</small></h5>
                                                        </div>

                                                        <div>
                                                            <p className="text-muted mb-0">Attending the event “Some New Event”</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="activity-list">
                                                    <div className="activity-icon avatar-xs">
                                                        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                            <i className="ri-user-2-fill"></i>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <h5 className="font-size-13">02 Apr, 2020 <small className="text-muted">12:07 am</small></h5>
                                                        </div>

                                                        <div>
                                                            <p className="text-muted mb-0">Responded to need “In-Kind Opportunity”</p>
                                                        </div>
                                                    </div>
                                                </li>
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

                                        <h4 className="card-title mb-4">Latest Transactions</h4>

                                        <div className="table-responsive">
                                            <table className="table table-centered datatable dt-responsive nowrap" data-bs-page-length="5" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                <thead className="table-light">
                                                    <tr>
                                                        <th style={{ width: '20px' }}>
                                                            <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" id="ordercheck" />
                                                                <label className="form-check-label mb-0" htmlFor="ordercheck">&nbsp;</label>
                                                            </div>
                                                        </th>
                                                        <th>Order ID</th>
                                                        <th>Date</th>
                                                        <th>Billing Name</th>
                                                        <th>Total</th>
                                                        <th>Payment Status</th>
                                                        <th style={{ width: '120px' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" id="ordercheck1" />
                                                                <label className="form-check-label mb-0" htmlFor="ordercheck1">&nbsp;</label>
                                                            </div>
                                                        </td>

                                                        <td><a href="javascript:void(0);" className="text-dark fw-bold">#NZ1572</a> </td>
                                                        <td>
                                                            04 Apr, 2020
                                                        </td>
                                                        <td>Walter Brown</td>

                                                        <td>
                                                            $172
                                                        </td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">Paid</div>
                                                        </td>
                                                        <td id="tooltip-container1">
                                                            <a href="javascript:void(0);" className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18"></i></a>
                                                            <a href="javascript:void(0);" className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" id="ordercheck2" />
                                                                <label className="form-check-label mb-0" htmlFor="ordercheck2">&nbsp;</label>
                                                            </div>
                                                        </td>

                                                        <td><a href="javascript:void(0);" className="text-dark fw-bold">#NZ1571</a> </td>
                                                        <td>
                                                            03 Apr, 2020
                                                        </td>
                                                        <td>Jimmy Barker</td>

                                                        <td>
                                                            $165
                                                        </td>
                                                        <td>
                                                            <div className="badge badge-soft-warning font-size-12">unpaid</div>
                                                        </td>
                                                        <td id="tooltip-container2">
                                                            <a href="javascript:void(0);" className="me-3 text-primary" data-bs-container="#tooltip-container2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18"></i></a>
                                                            <a href="javascript:void(0);" className="text-danger" data-bs-container="#tooltip-container2" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18"></i></a>
                                                        </td>
                                                    </tr>

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
