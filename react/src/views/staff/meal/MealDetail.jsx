import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";


import { Helmet } from 'react-helmet';




export default function MealsList() {

    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Meal Detail</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Meal</a>
                                            </li>
                                            <li className="breadcrumb-item active">Meal Detail</li>
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
                                        <div className="row">
                                            <div className="col-xl-5">
                                                <div className="product-detail">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <div
                                                                className="nav flex-column nav-pills"
                                                                id="v-pills-tab"
                                                                role="tablist"
                                                                aria-orientation="vertical"
                                                            >
                                                                <a
                                                                    className="nav-link active"
                                                                    id="product-1-tab"
                                                                    data-bs-toggle="pill"
                                                                    href="#product-1"
                                                                    role="tab"
                                                                >
                                                                    <img
                                                                        src="../assets/img/product/img-1.png"
                                                                        alt="img-1"
                                                                        className="img-fluid mx-auto d-block tab-img rounded"
                                                                    />
                                                                </a>
                                                                <a
                                                                    className="nav-link"
                                                                    id="product-2-tab"
                                                                    data-bs-toggle="pill"
                                                                    href="#product-2"
                                                                    role="tab"
                                                                >
                                                                    <img
                                                                        src="../assets/img/product/img-5.png"
                                                                        alt="img-5"
                                                                        className="img-fluid mx-auto d-block tab-img rounded"
                                                                    />
                                                                </a>
                                                                <a
                                                                    className="nav-link"
                                                                    id="product-3-tab"
                                                                    data-bs-toggle="pill"
                                                                    href="#product-3"
                                                                    role="tab"
                                                                >
                                                                    <img
                                                                        src="../assets/img/product/img-3.png"
                                                                        alt="img-3"
                                                                        className="img-fluid mx-auto d-block tab-img rounded"
                                                                    />
                                                                </a>
                                                                <a
                                                                    className="nav-link"
                                                                    id="product-4-tab"
                                                                    data-bs-toggle="pill"
                                                                    href="#product-4"
                                                                    role="tab"
                                                                >
                                                                    <img
                                                                        src="../assets/img/product/img-4.png"
                                                                        alt="img-4"
                                                                        className="img-fluid mx-auto d-block tab-img rounded"
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8 col-9">
                                                            <div className="tab-content" id="v-pills-tabContent">
                                                                <div
                                                                    className="tab-pane fade show active"
                                                                    id="product-1"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="product-img">
                                                                        <img
                                                                            src="../assets/img/product/img-1.png"
                                                                            alt="img-1"
                                                                            className="img-fluid mx-auto d-block"
                                                                            data-zoom="../assets/img/product/img-1.png"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane fade"
                                                                    id="product-2"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="product-img">
                                                                        <img
                                                                            src="../assets/img/product/img-5.png"
                                                                            alt="img-5"
                                                                            className="img-fluid mx-auto d-block"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane fade"
                                                                    id="product-3"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="product-img">
                                                                        <img
                                                                            src="../assets/img/product/img-3.png"
                                                                            alt="img-3"
                                                                            className="img-fluid mx-auto d-block"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane fade"
                                                                    id="product-4"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="product-img">
                                                                        <img
                                                                            src="../assets/img/product/img-4.png"
                                                                            alt="img-4"
                                                                            className="img-fluid mx-auto d-block"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row text-center mt-2">
                                                                <div className="col-sm-6">
                                                                    <div className="d-grid">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary waves-effect waves-light mt-2"
                                                                        >
                                                                            <i className="mdi mdi-cart me-2" /> Add to cart
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="d-grid">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-light waves-effect  mt-2 waves-light"
                                                                        >
                                                                            <i className="mdi mdi-shopping me-2" />
                                                                            Buy now
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* end product img */}
                                            </div>
                                            <div className="col-xl-7">
                                                <div className="mt-4 mt-xl-3">
                                                    <a href="#" className="text-primary">
                                                        T-shirt
                                                    </a>
                                                    <h5 className="mt-1 mb-3">
                                                        Full sleeve Blue color t-shirt
                                                    </h5>
                                                    <div className="d-inline-flex">
                                                        <div className="text-muted me-3">
                                                            <span className="mdi mdi-star text-warning" />
                                                            <span className="mdi mdi-star text-warning" />
                                                            <span className="mdi mdi-star text-warning" />
                                                            <span className="mdi mdi-star text-warning" />
                                                            <span className="mdi mdi-star" />
                                                        </div>
                                                        <div className="text-muted">( 132 )</div>
                                                    </div>
                                                    <h5 className="mt-2">
                                                        <del className="text-muted me-2">$252</del>$240
                                                        <span className="text-danger font-size-12 ms-2">
                                                            25 % Off
                                                        </span>
                                                    </h5>
                                                    <p className="mt-3">
                                                        To achieve this, it would be necessary to have uniform
                                                        pronunciation
                                                    </p>
                                                    <hr className="my-4" />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div>
                                                                <h5 className="font-size-14">
                                                                    <i className="mdi mdi-location" /> Delivery location
                                                                </h5>
                                                                <div className="d-flex flex-wrap">
                                                                    <div className="input-group mb-3 w-auto">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter Delivery pincode"
                                                                        />
                                                                        <button className="btn btn-light" type="button">
                                                                            Check
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <h5 className="font-size-14">Specification :</h5>
                                                                <ul className="list-unstyled product-desc-list">
                                                                    <li>
                                                                        <i className="mdi mdi-circle-medium me-1 align-middle" />{" "}
                                                                        Full Sleeve
                                                                    </li>
                                                                    <li>
                                                                        <i className="mdi mdi-circle-medium me-1 align-middle" />{" "}
                                                                        Cotton
                                                                    </li>
                                                                    <li>
                                                                        <i className="mdi mdi-circle-medium me-1 align-middle" />{" "}
                                                                        All Sizes available
                                                                    </li>
                                                                    <li>
                                                                        <i className="mdi mdi-circle-medium me-1 align-middle" />{" "}
                                                                        4 Different Color
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5 className="font-size-14">Services :</h5>
                                                            <ul className="list-unstyled product-desc-list">
                                                                <li>
                                                                    <i className="mdi mdi-sync text-primary me-1 align-middle font-size-16" />{" "}
                                                                    10 Days Replacement
                                                                </li>
                                                                <li>
                                                                    <i className="mdi mdi-currency-usd-circle text-primary me-1 align-middle font-size-16" />
                                                                    Cash on Delivery available
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="product-color mt-3">
                                                                <h5 className="font-size-14">Color :</h5>
                                                                <a href="#" className="active">
                                                                    <div className="product-color-item">
                                                                        <img
                                                                            src="../assets/img/product/img-1.png"
                                                                            alt="img-1"
                                                                            className="avatar-md"
                                                                        />
                                                                    </div>
                                                                    <p>Blue</p>
                                                                </a>
                                                                <a href="#">
                                                                    <div className="product-color-item">
                                                                        <img
                                                                            src="../assets/img/product/img-5.png"
                                                                            alt="img-5"
                                                                            className="avatar-md"
                                                                        />
                                                                    </div>
                                                                    <p>Cyan</p>
                                                                </a>
                                                                <a href="#">
                                                                    <div className="product-color-item">
                                                                        <img
                                                                            src="../assets/img/product/img-3.png"
                                                                            alt="img-3"
                                                                            className="avatar-md"
                                                                        />
                                                                    </div>
                                                                    <p>Green</p>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="product-color mt-3">
                                                                <h5 className="font-size-14">Size :</h5>
                                                                <a href="#" className="active">
                                                                    <div className="product-color-item">
                                                                        <div className="avatar-xs">
                                                                            <span className="avatar-title bg-transparent text-body">
                                                                                S
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a href="#">
                                                                    <div className="product-color-item">
                                                                        <div className="avatar-xs">
                                                                            <span className="avatar-title bg-transparent text-body">
                                                                                M
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a href="#">
                                                                    <div className="product-color-item">
                                                                        <div className="avatar-xs">
                                                                            <span className="avatar-title bg-transparent text-body">
                                                                                L
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a href="#">
                                                                    <div className="product-color-item">
                                                                        <div className="avatar-xs">
                                                                            <span className="avatar-title bg-transparent text-body">
                                                                                XL
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end row */}
                                        <div className="mt-4">
                                            <h5 className="font-size-14 mb-3">Product description: </h5>
                                            <div className="product-desc">
                                                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link"
                                                            id="desc-tab"
                                                            data-bs-toggle="tab"
                                                            href="#desc"
                                                            role="tab"
                                                        >
                                                            Description
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link active"
                                                            id="specifi-tab"
                                                            data-bs-toggle="tab"
                                                            href="#specifi"
                                                            role="tab"
                                                        >
                                                            Specifications
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content border border-top-0 p-4">
                                                    <div className="tab-pane fade" id="desc" role="tabpanel">
                                                        <div>
                                                            <p>
                                                                If several languages coalesce, the grammar of the
                                                                resulting language is more simple and regular than
                                                                that of the individual{" "}
                                                            </p>
                                                            <p>
                                                                To achieve this, it would be necessary to have uniform
                                                                grammar, pronunciation and more common several
                                                                languages coalesce, the grammar of the resulting.
                                                            </p>
                                                            <p>It will be as simple as occidental in fact.</p>
                                                            <div>
                                                                <p className="mb-2">
                                                                    <i className="mdi mdi-circle-medium me-1 align-middle" />{" "}
                                                                    If several languages coalesce
                                                                </p>
                                                                <p className="mb-2">
                                                                    <i className="mdi mdi-circle-medium me-1 align-middle" />{" "}
                                                                    To an English person, it will seem like simplified
                                                                </p>
                                                                <p className="mb-0">
                                                                    <i className="mdi mdi-circle-medium me-1 align-middle" />{" "}
                                                                    These cases are perfectly simple.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="tab-pane fade show active"
                                                        id="specifi"
                                                        role="tabpanel"
                                                    >
                                                        <div className="table-responsive">
                                                            <table className="table table-nowrap mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row" style={{ width: 400 }}>
                                                                            Category
                                                                        </th>
                                                                        <td>T-Shirt</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Brand</th>
                                                                        <td>Jack &amp; Jones</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Color</th>
                                                                        <td>Blue</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Material</th>
                                                                        <td>Cotton</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Weight</th>
                                                                        <td>140 Gm</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="font-size-14">Reviews : </h5>
                                            <div className="d-inline-flex mb-3">
                                                <div className="text-muted me-3">
                                                    <span className="mdi mdi-star text-warning" />
                                                    <span className="mdi mdi-star text-warning" />
                                                    <span className="mdi mdi-star text-warning" />
                                                    <span className="mdi mdi-star text-warning" />
                                                    <span className="mdi mdi-star" />
                                                </div>
                                                <div className="text-muted">( 132 customer Review)</div>
                                            </div>
                                            <div className="border p-4 rounded">
                                                <div className="d-flex border-bottom pb-3">
                                                    <div className="flex-1">
                                                        <p className="text-muted mb-2">
                                                            To an English person, it will seem like simplified
                                                            English, as a skeptical Cambridge
                                                        </p>
                                                        <h5 className="font-size-15 mb-3">James</h5>
                                                        <ul className="list-inline product-review-link mb-0">
                                                            <li className="list-inline-item">
                                                                <a href="#">
                                                                    <i className="mdi mdi-thumb-up align-middle me-1" />{" "}
                                                                    Like
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="#">
                                                                    <i className="mdi mdi-message-text align-middle me-1" />{" "}
                                                                    Comment
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <p className="float-sm-end font-size-12">11 Feb, 2020</p>
                                                </div>
                                                <div className="d-flex border-bottom py-3">
                                                    <div className="flex-1">
                                                        <p className="text-muted mb-2">
                                                            Everyone realizes why a new common language would be
                                                            desirable
                                                        </p>
                                                        <h5 className="font-size-15 mb-3">David</h5>
                                                        <ul className="list-inline product-review-link mb-0">
                                                            <li className="list-inline-item">
                                                                <a href="#">
                                                                    <i className="mdi mdi-thumb-up align-middle me-1" />{" "}
                                                                    Like
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="#">
                                                                    <i className="mdi mdi-message-text align-middle me-1" />{" "}
                                                                    Comment
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <p className="float-sm-end font-size-12">22 Jan, 2020</p>
                                                </div>
                                                <div className="d-flex py-3">
                                                    <div className="flex-1">
                                                        <p className="text-muted mb-2">
                                                            If several languages coalesce, the grammar of the
                                                            resulting{" "}
                                                        </p>
                                                        <h5 className="font-size-15 mb-3">Scott</h5>
                                                        <ul className="list-inline product-review-link mb-0">
                                                            <li className="list-inline-item">
                                                                <a href="#">
                                                                    <i className="mdi mdi-thumb-up align-middle me-1" />{" "}
                                                                    Like
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="#">
                                                                    <i className="mdi mdi-message-text align-middle me-1" />{" "}
                                                                    Comment
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <p className="float-sm-end font-size-12">04 Jan, 2020</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                        </div>
                        
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                {/* End Page-content */}
            </div>

        </div>





    );
}
