import React, { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2'
import { Navigate } from 'react-router';

const UpdateMeal = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false); 
    const [meal, setMeal] = useState({
        meal_name: '',
        meal_image: null,
        meal_price: '',
        meal_desc: '',
        category_id: '',
        ingredient_id: [],
        unit: [],
        cookMethod: [],
    });
    const [mealIngredients, setMealIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
    let { id } = useParams(); 
    useEffect(() => {
        getMeal();
        getSelectionIngredient();
        getCategory();
    }, [id]);
    const getMeal = () => {
        axiosClient.get(`/meal/${id}`)
            .then(({ data }) => {
                console.log('API Response:', data); // Add this line
                setLoading(false);
            const currentMeal = {
                meal_name: data.meal_name,
                meal_image: data.meal_image,
                meal_price: data.meal_price,
                meal_desc: data.meal_desc,
                category_id: data.category_id,
                ingredient_id: data.meal_ingredients.map(item => item.ingredient_id),
                unit: data.meal_ingredients.map(ingredient => ingredient.unit),
                cookMethod: data.meal_ingredients.map(ingredient => ingredient.cookMethod),
            } 

                setMeal(currentMeal);
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
    }
    // console.log("meal.meal_ingredients:",meal.meal_ingredients && meal.meal_ingredients[1]);
    console.log("meal",meal);
    
    // console.log("mealIngredients",mealIngredients);
    // console.log("meal.meal_ingredients.ingredient_id",meal.meal_ingredients.ingredient_id);
    const handleUnitInput = (e, index) => {
        const { value } = e.target;
        const updatedUnit = [...meal.unit];
        updatedUnit[index] = value;

        setMeal({
            ...meal,
            unit: updatedUnit,
        });
    };

    const handleCookMethodInput = (selectedOption, index) => {
        const updatedCookMethod = [...meal.cookMethod];
        updatedCookMethod[index] = selectedOption.value;

        setMeal({
            ...meal,
            cookMethod: updatedCookMethod,
        });
    };
    const handleInput = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setMeal({
                ...meal,
                [name]: value
            });
        }
    }
    const onDrop = (acceptedFiles) => {
        setMeal({
            ...meal,
            meal_image: acceptedFiles[0],
        });
        console.log(acceptedFiles[0].name);
    }

    const validateForm = () => {
        const errors = {};

        if (!meal.meal_name) {
            errors.meal_name = 'Meal Name is required.';
        }
        if (!meal.meal_price) {
            errors.meal_price = 'Price is required.';
        }
        if (!meal.category_id) {
            errors.category_id = 'Category is required.';
        }
        if (meal.ingredient_id.length === 0) {
            errors.ingredient_id = 'At least one ingredient is required.';
        }
        if (!meal.meal_desc) {
            errors.meal_desc = 'Meal Description is required.';
        }
        if (!meal.meal_image) {
            errors.meal_image = 'Image is required.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
   
    const getSelectionIngredient = () => {
        // Make the API call to get ingredient data
        axiosClient.get('/ingredients')
            .then(({ data }) => {
                // Map the data to the format required by react-select
                const options = data.map(item => ({
                    value: item.id,
                    label: item.ingredient_name,
                }));
                setIngredientOptions(options);
            })
            .catch(error => {
                console.error('API request error:', error);
            });
    }
    const getCategory = () => {
        // Make the API call to get Category data
        axiosClient.get('/category')
            .then(({ data }) => {
                // Map the data to the format required by react-select
                const options = data.map(item => ({
                    value: item.id,
                    label: item.name,
                }));
                setCategoryOptions(options);
            })
            .catch(error => {
                console.error('API request error:', error);
            });
    }
    const updateMeal = (e) => {
        e.preventDefault();
        console.log("haha");
        if (!validateForm()) {
            console.log("bukima");
            return;
        }
        
        setLoading(true);
        const formData = new FormData();
        formData.append('meal_name', meal.meal_name);
        formData.append('meal_price', meal.meal_price);
        formData.append('meal_desc', meal.meal_desc);
        formData.append('category_id', meal.category_id);
        meal.ingredient_id.map((ingredientId, index) => {
            formData.append('ingredient_id[]', ingredientId);
            formData.append('unit[]', meal.unit[index]);
            formData.append('cookMethod[]', meal.cookMethod[index]);
        });
       
        if (meal.meal_image) {
            formData.append('meal_image', meal.meal_image);
        } else {
            formData.append('meal_image', '');
        }

        // Log the data before making the API call
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        Swal.fire({
            title: "Are you sure to update?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
          }).then((result) => {

            if (result.isConfirmed) {
                axiosClient.post(`/updateMeal/${id}`, formData)
                .then(res => {
                    console.log(res.message);
                    // Show SweetAlert success message
                    Swal.fire({
                        title: "Update!",
                        text: "Your file has been Update.",
                        icon: "success"
                      });
                      setRedirect(true);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log("error:",error.response.data); // This will log the response data from the server.
                        console.log("error:",error.response.status); // This will log the HTTP status code.
                    } else if (error.request) {
                        console.log("error:",error.request); // This will log the request made but no response was received.
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error); // This will log the Axios request config.
                    setLoading(false);
                });
            }
          });
        
    }
   
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };
    const handlePreviousClick = () => {
        setActiveTab((prevTab) => prevTab - 1);
    };

    const handleNextClick = () => {
        setActiveTab((prevTab) => prevTab + 1);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const redirectComponent = redirect ? <Navigate to={`/mealDetail/${id}`} /> : null;
    return (
        <div>
            {redirectComponent}
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/addMeal.css" />

            </Helmet>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Add Meal</h4>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form>
                                            <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard nav-pills nav-justified">
                                                <Nav className="twitter-bs-wizard-nav">
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            href="#basic-info"
                                                            className={activeTab === 0 ? 'active' : ''}
                                                            onClick={() => handleTabClick(0)}
                                                        >
                                                            <span className="step-number">01</span>
                                                            <span className="step-title">Basic Info</span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            href="#product-img"
                                                            className={activeTab === 1 ? 'active' : ''}
                                                            onClick={() => handleTabClick(1)}
                                                        >
                                                            <span className="step-number">02</span>
                                                            <span className="step-title">Meal Img</span>
                                                        </Nav.Link>
                                                    </Nav.Item>

                                                </Nav>
                                                <Tab.Content className="twitter-bs-wizard-tab-content">
                                                    <div className={`tab-pane ${activeTab === 0 ? 'active' : ''}`}>
                                                        <h4 className="card-title">Basic Information</h4>
                                                        <p className="card-title-desc">Fill all information below</p>

                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="productname">
                                                                Meal Name
                                                            </label>
                                                            <input
                                                                id="meal_name"
                                                                name="meal_name"
                                                                type="text"
                                                                placeholder='Enter Meal Name Here......'
                                                                value={meal.meal_name}
                                                                className="form-control"
                                                                onChange={handleInput}
                                                            />
                                                            {errors.meal_name && <div className="text-danger">{errors.meal_name}</div>}
                                                        </div>
                                                        <div className="row">

                                                            <div className="mb-3">
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="price">
                                                                        Price
                                                                    </label>
                                                                    <input
                                                                        id="meal_price"
                                                                        name="meal_price"
                                                                        type="number"
                                                                        placeholder='Enter Meal Price Here......'
                                                                        value={meal.meal_price}
                                                                        className="form-control"
                                                                        onChange={handleInput}
                                                                    />
                                                                    {errors.meal_price && <div className="text-danger">{errors.meal_price}</div>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Category</label>
                                                                    <Select
                                                                        id="category_id"
                                                                        name="category_id"
                                                                        value={categoryOptions.find((option) => option.value === meal.category_id)}
                                                                        onChange={(selectedOption) => setMeal({ ...meal, category_id: selectedOption.value })}
                                                                        options={categoryOptions}
                                                                    />
                                                                    {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Ingredient</label>
                                                                    <Select
                                                                        id="ingredient_id"
                                                                        name="ingredient_id"
                                                                        value={ingredientOptions.filter(option => meal.ingredient_id && meal.ingredient_id.includes(option.value))}
                                                                        onChange={(selectedOptions) => handleInput({ target: { name: 'ingredient_id', value: selectedOptions.map(option => option.value) } })}
                                                                        options={ingredientOptions}
                                                                        isMulti  // Set to true for multi-selection
                                                                    />
                                                                    {errors.ingredient_id && <div className="text-danger">{errors.ingredient_id}</div>}
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {meal.ingredient_id &&
                                                            meal.ingredient_id.map((ingredientId, index) => (
                                                                <div className="row" key={index}>
                                                                    <div className="col-md-4">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Ingredient</label>
                                                                            <input
                                                                                id={`ingredient_id`}
                                                                                name={`ingredient_id`}
                                                                                type="text"
                                                                                placeholder='Enter Meal Name Here......'
                                                                                value={ingredientOptions.find((option) => option.value === ingredientId)?.label || ''}
                                                                                className="form-control"
                                                                                onChange={handleInput}
                                                                                readOnly
                                                                            />
                                                                               {errors[`ingredient_id_${index}`] && <div className="text-danger">{errors[`ingredient_id_${index}`]}</div>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Cooking Unit / Kg</label>
                                                                            <input
                                                                                id={`unit_${index}`}
                                                                                name={`unit_${index}`}
                                                                                type="number"
                                                                                placeholder='Enter Unit / Kg Here...'
                                                                                value={meal.unit[index] || ''}
                                                                                className="form-control"
                                                                                onChange={(e) => handleUnitInput(e, index)}
                                                                            />
                                                                            {errors[`unit_${index}`] && <div className="text-danger">{errors[`unit_${index}`]}</div>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Cook Method</label>
                                                                            <Select
                                                                                id={`cookMethod_${index}`}
                                                                                name={`cookMethod_${index}`}
                                                                                value={
                                                                                    meal.cookMethod[index] !== undefined
                                                                                        ? {
                                                                                            value: meal.cookMethod[index],
                                                                                            label: meal.cookMethod[index],
                                                                                        }
                                                                                        : ''
                                                                                }
                                                                                onChange={(selectedOption) => handleCookMethodInput(selectedOption, index)}
                                                                                options={[
                                                                                    { value: 'water_boiled', label: 'Water Boiled' },
                                                                                    { value: 'fried', label: 'Fried' },
                                                                                    { value: 'deep_fried', label: 'Deep Fried' },
                                                                                    { value: 'raw', label: 'Raw' },
                                                                                    { value: 'saute', label: 'Saute' },
                                                                                    { value: 'steam', label: 'Steam' },
                                                                                    { value: 'spicy', label: 'Spicy' },
                                                                                ]}

                                                                            />
                                                                            {errors[`cookMethod_${index}`] && (
                                                                                <div className="text-danger">{errors[`cookMethod_${index}`]}</div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="productdesc">
                                                                Meal Description
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="meal_desc"
                                                                name="meal_desc"
                                                                onChange={handleInput}
                                                                rows={5}
                                                                value={meal.meal_desc}
                                                            />
                                                            {errors.meal_desc && <div className="text-danger">{errors.meal_desc}</div>}
                                                        </div>

                                                    </div>

                                                    <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`}>
                                                        <h4 className="card-title">Product Images</h4>
                                                        <p className="card-title-desc">Upload product image</p>
                                                        <div className="dropzone" {...getRootProps()}>
                                                            <div className="fallback">
                                                                <input {...getInputProps()} />
                                                            </div>
                                                            {meal.meal_image && meal.meal_image.name ? (
                                                                <p>Selected file: {meal.meal_image.name}</p>
                                                            ) : (
                                                                <div className="currentImage">
                                                                <p>Drop the new Image here..........</p>
                                                             Current Image：
                                                                 <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${meal.meal_image}`} alt="img-1" height="100px" width="100px"/>
                                                             </div>
                                                            )}

                                                        </div>
                                                        {errors.meal_image && <div className="text-danger">{errors.meal_image}</div>}
                                                    </div>

                                                </Tab.Content>
                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary me-2 waves-effect waves-light"
                                                        onClick={handlePreviousClick}
                                                        disabled={activeTab === 0}
                                                    >
                                                        Previous
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-primary me-2 waves-effect waves-light"
                                                        onClick={activeTab === 1 ? updateMeal : handleNextClick}
                                                    >
                                                        {activeTab === 1 ? "Update Meal" : "Next"}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateMeal;
