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
                                                <h4 className="mb-sm-0">Products</h4>
                                                <div className="page-title-right">
                                                    <ol className="breadcrumb m-0">
                                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Ecommerce</a></li>
                                                        <li className="breadcrumb-item active">Products</li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end page title */}
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-4">
                                            <div className="card">
                                                <div className="card-header bg-transparent border-bottom">
                                                    <h5 className="mb-0">Filters</h5>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="font-size-14 mb-3">Categories</h5>
                                                    <div className="accordion ecommerce" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingOne">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    <i className="mdi mdi-desktop-classic font-size-16 align-middle me-2" /> Electronic
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <ul className="list-unstyled categories-list mb-0">
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Mobile</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Mobile accessories</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Computers</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Laptops</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Speakers</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingTwo">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    <i className="mdi mdi-hanger font-size-16 align-middle me-2" /> Fashion
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <ul className="list-unstyled categories-list mb-0">
                                                                        <li className="active"><a href="#"><i className="mdi mdi-circle-medium me-1" /> Clothing</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Footwear</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Watches</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Sportswear</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    <i className="mdi mdi-pinwheel-outline font-size-16 align-middle me-2" /> Baby &amp; Kids
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <ul className="list-unstyled categories-list mb-0">
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Clothing</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Footwear</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Toys</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Baby care</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item mb-3">
                                                            <h2 className="accordion-header" id="headingFour">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                    <i className="mdi mdi-dumbbell font-size-16 align-middle me-2" /> Fitness
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <ul className="list-unstyled categories-list mb-0">
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Gym equipment</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Yoga mat</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Dumbbells</a></li>
                                                                        <li><a href="#"><i className="mdi mdi-circle-medium me-1" /> Protein supplements</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body border-top">
                                                    <div>
                                                        <h5 className="font-size-14 mb-4">Price</h5>
                                                        <input type="text" id="pricerange" />
                                                    </div>
                                                </div>
                                                <div className="custom-accordion">
                                                    <div className="card-body border-top">
                                                        <div>
                                                            <h5 className="font-size-14 mb-0"><a href="#collapseExample1" className="text-dark d-block" data-bs-toggle="collapse">Discount <i className="mdi mdi-minus float-end accor-plus-icon" /></a></h5>
                                                            <div className="collapse show" id="collapseExample1">
                                                                <div className="mt-4">
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productdiscountRadio6" name="productdiscountRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productdiscountRadio6">50% or more</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productdiscountRadio5" name="productdiscountRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productdiscountRadio5">40% or more</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productdiscountRadio4" name="productdiscountRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productdiscountRadio4">30% or more</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productdiscountRadio3" name="productdiscountRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productdiscountRadio3">20% or more</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productdiscountRadio2" name="productdiscountRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productdiscountRadio2">10% or more</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productdiscountRadio1" name="productdiscountRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productdiscountRadio1">Less than 10%</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body border-top">
                                                        <div>
                                                            <h5 className="font-size-14 mb-0"><a href="#collapseExample2" className="text-dark d-block" data-bs-toggle="collapse">Size <i className="mdi mdi-minus float-end accor-plus-icon" /></a></h5>
                                                            <div className="collapse show" id="collapseExample2">
                                                                <div className="mt-4">
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productsizeRadio1" name="productsizeRadio" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productsizeRadio1">X-Large</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productsizeRadio2" name="productsizeRadio" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productsizeRadio2">Large</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productsizeRadio3" name="productsizeRadio" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productsizeRadio3">Medium</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productsizeRadio4" name="productsizeRadio" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productsizeRadio4">Small</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body border-top">
                                                        <div>
                                                            <h5 className="font-size-14 mb-0"><a href="#collapseExample3" className="collapsed text-dark d-block" data-bs-toggle="collapse">Customer Rating <i className="mdi mdi-minus float-end accor-plus-icon" /></a></h5>
                                                            <div className="collapse" id="collapseExample3">
                                                                <div className="mt-4">
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productratingRadio1" name="productratingRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productratingRadio1">4 <i className="mdi mdi-star text-warning" />  &amp; Above</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productratingRadio2" name="productratingRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productratingRadio2">3 <i className="mdi mdi-star text-warning" />  &amp; Above</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productratingRadio3" name="productratingRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productratingRadio3">2 <i className="mdi mdi-star text-warning" />  &amp; Above</label>
                                                                    </div>
                                                                    <div className="form-check mt-2">
                                                                        <input type="radio" id="productratingRadio4" name="productratingRadio1" className="form-check-input" />
                                                                        <label className="form-check-label" htmlFor="productratingRadio4">1 <i className="mdi mdi-star text-warning" /></label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div>
                                                                    <h5>Clothes &amp; Accessories</h5>
                                                                    <ol className="breadcrumb p-0 bg-transparent mb-2">
                                                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Fashion</a></li>
                                                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Clothing</a></li>
                                                                        <li className="breadcrumb-item active">T-shirts</li>
                                                                    </ol>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-inline float-md-end">
                                                                    <div className="search-box ms-2">
                                                                        <div className="position-relative">
                                                                            <input type="text" className="form-control rounded" placeholder="Search..." />
                                                                            <i className="mdi mdi-magnify search-icon" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ul className="list-inline my-3 ecommerce-sortby-list">
                                                            <li className="list-inline-item"><span className="fw-medium font-family-secondary">Sort by:</span></li>
                                                            <li className="list-inline-item active"><a href="#">Popularity</a></li>
                                                            <li className="list-inline-item"><a href="#">Newest</a></li>
                                                            <li className="list-inline-item"><a href="#">Discount</a></li>
                                                        </ul>
                                                        <div className="row g-0">
                                                            <div className="col-xl-4 col-sm-6">
                                                                <div className="product-box">
                                                                    <div className="product-img">
                                                                        <div className="product-ribbon badge bg-warning">
                                                                            Trending
                                                                        </div>
                                                                        <div className="product-like">
                                                                            <a href="#">
                                                                                <i className="mdi mdi-heart-outline" />
                                                                            </a>
                                                                        </div>
                                                                        <img src="../assets/img/product/img-1.png" alt="img-1" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <p className="font-size-12 mb-1">Blue color, T-shirt</p>
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Full sleeve T-shirt</a></h5>
                                                                        <h5 className="mt-3 mb-0">$240</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-sm-6">
                                                                <div className="product-box">
                                                                    <div className="product-img">
                                                                        <div className="product-ribbon badge bg-primary">
                                                                            - 25 %
                                                                        </div>
                                                                        <div className="product-like">
                                                                            <a href="#">
                                                                                <i className="mdi mdi-heart-outline" />
                                                                            </a>
                                                                        </div>
                                                                        <img src="../assets/img/product/img-2.png" alt="img-2" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <p className="font-size-12 mb-1">Half sleeve, T-shirt</p>
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Half sleeve T-shirt </a></h5>
                                                                        <h5 className="mt-3 mb-0"><span className="text-muted me-2"><del>$240</del></span>$225</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-sm-6">
                                                                <div className="product-box">
                                                                    <div className="product-img">
                                                                        <div className="product-like">
                                                                            <a href="#">
                                                                                <i className="mdi mdi-heart text-danger" />
                                                                            </a>
                                                                        </div>
                                                                        <img src="../assets/img/product/img-3.png" alt="img-3" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <p className="font-size-12 mb-1">Green color, Hoodie</p>
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Hoodie (Green)</a></h5>
                                                                        <h5 className="mt-3 mb-0"><span className="text-muted me-2"><del>$290</del></span>$275</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-sm-6">
                                                                <div className="product-box">
                                                                    <div className="product-img">
                                                                        <div className="product-like">
                                                                            <a href="#">
                                                                                <i className="mdi mdi-heart-outline" />
                                                                            </a>
                                                                        </div>
                                                                        <img src="../assets/img/product/img-4.png" alt="img-4" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <p className="font-size-12 mb-1">Gray color, Hoodie</p>
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Hoodie (Green)</a></h5>
                                                                        <h5 className="mt-3 mb-0"><span className="text-muted me-2"><del>$290</del></span>$275</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-sm-6">
                                                                <div className="product-box">
                                                                    <div className="product-img">
                                                                        <div className="product-like">
                                                                            <a href="#">
                                                                                <i className="mdi mdi-heart text-danger" />
                                                                            </a>
                                                                        </div>
                                                                        <img src="../assets/img/product/img-5.png" alt="img-5" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <p className="font-size-12 mb-1">Blue color, T-shirt</p>
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Full sleeve T-shirt</a></h5>
                                                                        <h5 className="mt-3 mb-0">$242</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-sm-6">
                                                                <div className="product-box">
                                                                    <div className="product-img">
                                                                        <div className="product-ribbon badge bg-primary">
                                                                            - 22 %
                                                                        </div>
                                                                        <div className="product-like">
                                                                            <a href="#">
                                                                                <i className="mdi mdi-heart-outline" />
                                                                            </a>
                                                                        </div>
                                                                        <img src="../assets/img/product/img-6.png" alt="img-6" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <p className="font-size-12 mb-1">Black color, T-shirt</p>
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Half sleeve T-shirt </a></h5>
                                                                        <h5 className="mt-3 mb-0"><span className="text-muted me-2"><del>$240</del></span>$225</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-4">
                                                            <div className="col-sm-6">
                                                                <div>
                                                                    <p className="mb-sm-0 mt-2">Page <span className="fw-bold">2</span> Of <span className="fw-bold">113</span></p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="float-sm-end">
                                                                    <ul className="pagination pagination-rounded mb-sm-0">
                                                                        <li className="page-item disabled">
                                                                            <a href="#" className="page-link"><i className="mdi mdi-chevron-left" /></a>
                                                                        </li>
                                                                        <li className="page-item">
                                                                            <a href="#" className="page-link">1</a>
                                                                        </li>
                                                                        <li className="page-item active">
                                                                            <a href="#" className="page-link">2</a>
                                                                        </li>
                                                                        <li className="page-item">
                                                                            <a href="#" className="page-link">3</a>
                                                                        </li>
                                                                        <li className="page-item">
                                                                            <a href="#" className="page-link">4</a>
                                                                        </li>
                                                                        <li className="page-item">
                                                                            <a href="#" className="page-link">5</a>
                                                                        </li>
                                                                        <li className="page-item">
                                                                            <a href="#" className="page-link"><i className="mdi mdi-chevron-end" /></a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end row */}
                                </div> {/* container-fluid */}
                            </div>
                            {/* End Page-content */}
                        </div>
                        {/* end main content*/}
                   
                </div>

          





    );
}
