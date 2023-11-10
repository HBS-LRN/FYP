import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";


import { Helmet } from 'react-helmet';


export default function MealsList() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categorytList, setCategorytList] = useState([]);
    const [mealList, setMeal] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle category selection
    const categoryClick = (categoryId) => {
        // If the selected category is the same as the currently selected category, clear the selection
        // Otherwise, set the selected category.
        const newSelectedCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newSelectedCategory);
        setIsFilterActive(newSelectedCategory !== null); 
        filterMeals(newSelectedCategory);
    }
    // Function to filter meals based on the selected category
    // filteredMeals = mealList.filter((meal) => {
    //     // If no category is selected, show all meals, otherwise check if the meal belongs to the selected category
    //     return selectedCategory===null || meal.category_id===selectedCategory;
    // });
    const filterMeals = (categoryId) => {
        let filterChange;
        if (searchQuery !=null) {
            filterChange = mealList.filter((meal) =>
                meal.meal_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    
        if (categoryId !== null) {
            filterChange = mealList.filter((meal) =>
                categoryId === null || meal.category_id === categoryId
            );
        }
        setFilteredMeals(filterChange);
    };
    // const filterMeals = (categoryId) => {

    
    //     if (categoryId !== null) {
    //         filterChange = mealList.filter((meal) =>
    //             categoryId === null || meal.category_id === categoryId
    //         );
    //     }
    //     setFilteredMeals(filterChange);
    // };

    // const applyPriceFilter = () => {
    //     const filteredMeals = mealList.filter((meal) => {
    //         const mealPrice = parseFloat(meal.meal_price);
    //         return (isNaN(minPrice) || mealPrice >= parseFloat(minPrice)) && (isNaN(maxPrice) || mealPrice <= parseFloat(maxPrice));
    //     });
    //     setFilteredMeals(filteredMeals);
    //     setIsFilterActive(true);
    // }
    const applyPriceFilter = () => {
        let updatedFilteredMeals;
        if (selectedCategory !== null) {
            const filteredByCategory = filteredMeals.filter((meal) => {
                return selectedCategory === null || meal.category_id === selectedCategory;
            });
        
            updatedFilteredMeals = filteredByCategory.filter((meal) => {
                const mealPrice = parseFloat(meal.meal_price);
                return (isNaN(minPrice) || mealPrice >= parseFloat(minPrice)) && (isNaN(maxPrice) || mealPrice <= parseFloat(maxPrice));
            });
        } else {
            // When no category is selected, filter by price range only.
            updatedFilteredMeals = mealList.filter((meal) => {
                const mealPrice = parseFloat(meal.meal_price);
                return (
                    (isNaN(minPrice) || mealPrice >= parseFloat(minPrice)) &&
                    (isNaN(maxPrice) || mealPrice <= parseFloat(maxPrice))
                );
            });
        }
    
        setFilteredMeals(updatedFilteredMeals);
        setIsFilterActive(true);
    }
    // searching function
    const handleSearchChange = (e) => {
        const query = e.target.value;

        setSearchQuery(query);

        // If the query is empty, clear the filter
        if (query == null) {
            clearFilter();
            return;
        }

        axiosClient.get(`/mealSearch?searchQuery=${query}`)
            .then((response) => {
                setFilteredMeals(response.data);
            })
            .catch((error) => {
                console.error('Error searching meals:', error);
            });
    };
    const clearFilter = () => {
        setSelectedCategory(null);
        setIsFilterActive(false);
        setMinPrice('');
        setMaxPrice('');
        setFilteredMeals(mealList);
    }
    
    useEffect(() => {
        getCategory();
        getMeal();
        setIsFilterActive(false);
        
    },[])
    // get Categorylist
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
    var categoryDetail = "";
    categoryDetail = categorytList.map((item) => (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button
                    className={`accordion-button ${selectedCategory === item.id ? '' : 'collapsed'}`}
                    type="button" data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item.id}`}
                    aria-expanded={selectedCategory === item.id ? 'true' : 'false'}
                    aria-controls={`collapse${item.id}`}
                    onClick={() => categoryClick(item.id)}
                >
                    <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.iconImage}`}  alt="" srcset="" height="20px" width="20px" /> {item.name}
                </button>
            </h2>
        </div>
    ));
    // get meal List
    const getMeal = () => {
        axiosClient.get('/meal')
            .then(({ data }) => {
                console.log('API Response:', data); // Add this line
                setLoading(false);
                setMeal(data);
                setFilteredMeals(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
    }

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
                                        <div className="AddMealButtton"><a href="/addMeal">+ Add Meals</a></div>
                                   
                                    </div>
                                    <div className="card-body">
                                        <div className="flexBox">
                                        <h5 >Categories</h5> 
                                        {isFilterActive && (
                                            <button className="clearfilterBtn" onClick={() => clearFilter()}>
                                                <i className="fas fa-trash-alt"></i> Clear Filter
                                            </button>
                                        )}
                                        </div>
                                        
                                        
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
                                        <div className="flexBox">
                                            <h5>Price</h5>
                                            <button onClick={applyPriceFilter} className="pricFilterBtn"><i class="fas fa-funnel-dollar"></i> Apply Filter</button>
                                            </div>
                                            
                                            <div className="PriceRange">
                                                <input type="number" id="pricerangeTop" className="pricerangeTop" placeholder="Start Prices" 
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}/> -
                                                <input type="number" id="pricerangeBottom" className="pricerangeBottom" placeholder="End Prices" 
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                />

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
                                                                <input type="text" 
                                                                className="form-control rounded" 
                                                                placeholder="Search..."  
                                                                value={searchQuery}
                                                                onChange={handleSearchChange}/>
                                                                <i className="mdi mdi-magnify search-icon" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* meal List Start */}
                                            <div className="row g-0 mealListOverflow">
                                            {loading ? (
                                                <div>Loading...</div>
                                            ) : (filteredMeals.length > 0) ? (                   
                                                 // Render the filtered meals
                                                 filteredMeals.map((item) => (
                                                    <a className="col-xl-4 col-sm-6" href={"/mealDetail/"+item.id}>
                                                        <div className="product-box">
                                                            <div className="product-img">

                                                                {/* <div className="product-ribbon badge bg-primary">
                                                                    - 25 %
                                                                </div> */}                                                                                                    
                                                                <div className="product-like">
                                                                        <a href="#">
                                                                            <i className="mdi mdi-heart-outline" />
                                                                            </a>
                                                                            </div>
                                                                                <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.meal_image}`} alt="img-1" height="250px" width="100%"  />
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <h5 className="font-size-15"><a href="#" className="text-dark">{item.meal_name}</a></h5>
                                                                                <h5 className="mt-3 mb-0">RM {item.meal_price}</h5>
                                                                            </div>
                                                                            </div>
                                                                            </a>
                                                 ))
                                            ): (
                                                <div>No results found.</div>
                                            )}
                                             
                                            </div>
                                            {/* meal List End */}
                                            <div className="row mt-4">
                                                <div className="col-sm-6">
                                                    <div>
                                                        <p className="mb-sm-0 mt-2">Total Product: <span className="fw-bold">{filteredMeals.length}</span></p>
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