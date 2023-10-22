import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';




export default function Orders() {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = $(tableRef.current).DataTable({
            "paging": true,
            "lengthMenu": [5, 10, 25, 50],
            "info": true,
        });

        return () => {
            table.destroy();
        };
    }, []);

    return (

        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Orders</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Ecommerce</a>
                                            </li>
                                            <li className="breadcrumb-item active">Orders</li>
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
                                        <ul className="nav nav-tabs nav-tabs-custom mb-4">
                                            <li className="nav-item">
                                                <a className="nav-link fw-bold p-3 active" href="#">
                                                    All Orders
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link p-3 fw-bold" href="#">
                                                    Active
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link p-3 fw-bold" href="#">
                                                    Unpaid
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="table-responsive">
                                            <table
                                                ref={tableRef}
                                                id="orderTable"
                                                class="table table-centered datatable dt-responsive nowrap"
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
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </th>
                                                        <th>Order ID</th>
                                                        <th>Date</th>
                                                        
                                                        <th>Total</th>
                                                        <th>Payment Status</th>
                                                        <th>Invoice</th>
                                                        <th style={{ width: 120 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck1"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck1"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1572
                                                            </a>{" "}
                                                        </td>
                                                        <td>04 Apr, 2023</td>
                                                        
                                                        <td>RM 172</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                Paid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck2"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck2"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1571
                                                            </a>{" "}
                                                        </td>
                                                        <td>03 Apr, 2023</td>
                                                        
                                                        <td>RM 165</td>
                                                        <td>
                                                            <div className="badge badge-soft-warning font-size-12">
                                                                unpaid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck3"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck3"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1570
                                                            </a>{" "}
                                                        </td>
                                                        <td>03 Apr, 2023</td>
                                                        
                                                        <td>RM 146</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                Paid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck4"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck4"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1569
                                                            </a>{" "}
                                                        </td>
                                                        <td>02 Apr, 2023</td>
                                                        
                                                        <td>RM 183</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                Paid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck5"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck5"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1568
                                                            </a>{" "}
                                                        </td>
                                                        <td>01 Apr, 2023</td>
                                                        
                                                        <td>RM 160</td>
                                                        <td>
                                                        <div className="badge badge-soft-warning font-size-12">
                                                                unpaid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck6"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck6"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1567
                                                            </a>{" "}
                                                        </td>
                                                        <td>31 Mar, 2023</td>
                                                        
                                                        <td>RM 105</td>
                                                        <td>
                                                            <div className="badge badge-soft-warning font-size-12">
                                                                unpaid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck7"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck7"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1566
                                                            </a>{" "}
                                                        </td>
                                                        <td>30 Mar, 2023</td>
                                                       
                                                        <td>RM 112</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                Paid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck8"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck8"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1565
                                                            </a>{" "}
                                                        </td>
                                                        <td>29 Mar, 2023</td>
                                                        
                                                        <td>RM 123</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                Paid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck9"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck9"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1564
                                                            </a>{" "}
                                                        </td>
                                                        <td>28 Mar, 2023</td>
                                                        
                                                        <td>RM 141</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                Paid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck10"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck10"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ1563
                                                            </a>{" "}
                                                        </td>
                                                        <td>28 Mar, 2023</td>
                                                        
                                                        <td>RM 164</td>
                                                        <td>
                                                            <div className="badge badge-soft-warning font-size-12">
                                                                unpaid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ordercheck11"
                                                                />
                                                                <label
                                                                    className="form-check-label mb-0"
                                                                    htmlFor="ordercheck11"
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript: void(0);"
                                                                className="text-dark fw-bold"
                                                            >
                                                                #NZ15632
                                                            </a>{" "}
                                                        </td>
                                                        <td>27 Mar, 2023</td>
                                                        
                                                        <td>RM 154</td>
                                                        <td>
                                                            <div className="badge badge-soft-success font-size-12">
                                                                Paid
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-light btn-rounded">
                                                                Invoice <i className="mdi mdi-download ms-2" />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="me-3 text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Edit"
                                                            >
                                                                <i className="mdi mdi-pencil font-size-18" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Delete"
                                                            >
                                                                <i className="mdi mdi-trash-can font-size-18" />
                                                            </a>
                                                        </td>
                                                    </tr>
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
