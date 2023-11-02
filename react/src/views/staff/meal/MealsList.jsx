import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";


import { Helmet } from 'react-helmet';




export default function MealsList() {
    const [selectCategory, setSelectCategory] = useState([]); // Initialize state as an array
    const [loading, setLoading] = useState(false);
    const categoryClick = (category) => {
    // Check if the selected category is the same as the currently selected category.
    // If it is, clear the selection (set it to an empty array), otherwise, set the selected category.
    setSelectCategory(selectCategory === category ? [] : category);
}
const [categorytList,setCategorytList] = useState([]);
    useEffect(()=>{
        getCategory();
    },[])
    const getCategory = () => {
        axiosClient.get('/category')
            .then(({ data }) => {
                console.log('API Response:', data); // Add this line
                setLoading(false);
                setCategorytList(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
    }
      var categoryDetail ="";
      categoryDetail = categorytList.map((item)=>(
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                 <button 
                    className={`accordion-button ${selectCategory === item.name ? '' : 'collapsed'}`}
                    type="button" data-bs-toggle="collapse" 
                    data-bs-target="#collapseThree" 
                    aria-expanded="false" 
                    aria-controls="collapseThree"
                    onClick={() => categoryClick(item.name)}
                    >
                <img src={"../../../assets/img/icon/"+item.image} alt="" srcset="" height="20px"width="20px"/> {item.name}
                </button>
                </h2>                                           
           </div>
      ));
    return (

        <div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/addMeal.css" />
            </Helmet>
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
                                                    <div className="AddMealButtton"><a href="">+ Add Meals</a></div>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="font-size-14 mb-3">Categories</h5>
                                                    <div className="accordion ecommerce" id="accordionExample">
                                                        
                                                        
                                                    {loading ? (
                                        <tr>
                                        <td colSpan="4">Loading...</td>
                                        </tr>
                                    ) : (
                                        categoryDetail
                                    )}
                                                       
                                                       
                                                     
                                                    </div>    
                                                </div>
                                                <div className="card-body border-top">
                                                    <div>
                                                        <h5 className="font-size-14 mb-4">Price</h5>
                                                        <div className="PriceRange">
                                                        <input type="number" id="pricerangeTop" className="pricerangeTop" placeholder="Start Prices"/> - 
                                                        <input type="number" id="pricerangeBottom" className="pricerangeBottom" placeholder="End Prices"/>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="custom-accordion">
                                                  
                                                   
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
                                                                    <h5>Meal List</h5>
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
                                                      {/* meal List Start */}
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
                                                        {/* meal List End */}
                                                        <div className="row mt-4">
                                                            <div className="col-sm-6">
                                                                <div>
                                                                    <p className="mb-sm-0 mt-2">Total Product: <span className="fw-bold">113</span></p>
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
