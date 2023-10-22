import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

export default function CustomersList() {
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
                  <h4 className="mb-sm-0">Customers</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Ecommerce</a>
                      </li>
                      <li className="breadcrumb-item active">Customers</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <a href="javascript:void(0);" className="btn btn-success mb-2">
                        <i className="mdi mdi-plus me-2" /> Add Customer
                      </a>
                    </div>
                    <div className="table-responsive mt-3">
                      <table
                        ref={tableRef}
                        id="customerTable"
                        className="table table-centered datatable dt-responsive nowrap"
                        style={{
                          borderCollapse: 'collapse',
                          borderSpacing: 0,
                          width: '100%',
                        }}
                      >
                        <thead className="thead-light">
                          <tr>
                            <th style={{ width: 20 }}>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Wallet Balance</th>
                            <th>Joining Date</th>
                            <th style={{ width: 120 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck1"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck1"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Carolyn Harvey</td>
                            <td>CarolynHarvey@rhyta.com</td>
                            <td>580-464-4694</td>
                            <td>$ 3245</td>
                            <td>06 Apr, 2020</td>
                            <td id="tooltip-container1">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                          
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck2"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck2"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Angelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container2">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container2"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container2"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            </td>
                          </tr>
                           <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customercheck3"
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor="customercheck3"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>Andcsdcacscacgelyn Hardin</td>
                            <td>AngelynHardin@dayrep.com</td>
                            <td>913-248-2690</td>
                            <td>$ 2435</td>
                            <td>05 Apr, 2020</td>
                            <td id="tooltip-container3">
                              <a
                                href="javascript:void(0);"
                                className="me-3 text-primary"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="text-danger"
                                data-bs-container="#tooltip-container3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
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
            {/* end row */}
          </div>
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </div>
  );
}
