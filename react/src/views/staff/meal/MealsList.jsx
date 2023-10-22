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
                                                <h4 className="mb-sm-0">Meals</h4>
                                                
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
                                                                    <i className="mdi mdi-desktop-classic font-size-16 align-middle me-2" /> Appetizer
                                                                </button>
                                                            </h2>
                                                           
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingTwo">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    <i className="mdi mdi-hanger font-size-16 align-middle me-2" /> Meat
                                                                </button>
                                                            </h2>
                                                            
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    <i className="mdi mdi-pinwheel-outline font-size-16 align-middle me-2" /> Dessert
                                                                </button>
                                                            </h2>
                                                            
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    <i className="mdi mdi-pinwheel-outline font-size-16 align-middle me-2" /> Seafood
                                                                </button>
                                                            </h2>
                                                            
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    <i className="mdi mdi-pinwheel-outline font-size-16 align-middle me-2" /> Noodle
                                                                </button>
                                                            </h2>
                                                            
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    <i className="mdi mdi-pinwheel-outline font-size-16 align-middle me-2" /> Rice
                                                                </button>
                                                            </h2>
                                                            
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    <i className="mdi mdi-pinwheel-outline font-size-16 align-middle me-2" /> Beverage
                                                                </button>
                                                            </h2>
                                                            
                                                        </div>
                                                        <div className="accordion-item mb-3">
                                                            <h2 className="accordion-header" id="headingFour">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                    <i className="mdi mdi-dumbbell font-size-16 align-middle me-2" /> DimSum
                                                                </button>
                                                            </h2>
                                                           
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
                                                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Meat</a></li>
                                                                        
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
                                                                        
                                                                        <img src="../assets/img/Chinese-lemon-chicken-salad.png" alt="img-1" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                    <h5 className="font-size-15"><a href="#" className="text-dark">Chinese lemon chicken salad</a></h5>
                                                                        <h5 className="mt-3 mb-0">RM 15.90</h5>
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
                                                                        <img src="../assets/img/Chinese-lemon-chicken-salad.png" alt="img-1" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                    <h5 className="font-size-15"><a href="#" className="text-dark">Chinese lemon chicken salad</a></h5>
                                                                        <h5 className="mt-3 mb-0">RM 15.90</h5>
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
                                                                        <img src="../assets/img/Chinese-lemon-chicken-salad.png" alt="img-1" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                    <h5 className="font-size-15"><a href="#" className="text-dark">Chinese lemon chicken salad</a></h5>
                                                                        <h5 className="mt-3 mb-0">RM 15.90</h5>
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
                                                                        <img src="../assets/img/Chinese-lemon-chicken-salad.png" alt="img-1" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                    <h5 className="font-size-15"><a href="#" className="text-dark">Chinese lemon chicken salad</a></h5>
                                                                        <h5 className="mt-3 mb-0">RM 15.90</h5>
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
                                                                        <img src="../assets/img/Chinese-lemon-chicken-salad.png" alt="img-1" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Chinese lemon chicken salad</a></h5>
                                                                        <h5 className="mt-3 mb-0">RM 15.90</h5>
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
                                                                        <img src="../assets/img/Chinese-lemon-chicken-salad.png" alt="img-1" className="img-fluid mx-auto d-block" />
                                                                    </div>
                                                                    <div className="text-center">
                                                                        
                                                                        <h5 className="font-size-15"><a href="#" className="text-dark">Chinese lemon chicken salad</a></h5>
                                                                        <h5 className="mt-3 mb-0">RM 15.90</h5>
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
