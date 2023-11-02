import React, { useState ,useEffect} from 'react';
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2'
const AddProduct = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [errors, setErrors] = useState({});
    
    const [meal, setMeal] = useState({
        meal_name: '',
        meal_image: null,
        meal_price: '',
        meal_desc: '',
        category_id: '',
        ingredient_id: [],
    });
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        getIngredient();
        getCategory();
    }, []);
    const getIngredient =()=>{
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
    const getCategory =()=>{
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
    const saveMeal = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('meal_name', meal.meal_name);
        formData.append('meal_price', meal.meal_price);
        formData.append('meal_desc', meal.meal_desc);
        formData.append('category_id', meal.category_id);
        meal.ingredient_id.map((ingredientId) => {
            formData.append('ingredient_id[]', ingredientId);
        });
        formData.append('meal_image', meal.meal_image);

    
        // Log the data before making the API call
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        axiosClient.post('/meal', formData)
        .then(res => {
            // setMeal({
            //     meal_name: '',
            //     meal_image: null,
            //     meal_price: '',
            //     meal_desc: '',
            //     category_id: '',
            //     ingredient_id: [],
            // });
            console.log(res.message);
            // Show SweetAlert success message
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New Meal Had Been Successfully Added!',
            showConfirmButton: false,
            timer: 1500
        });
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data); // This will log the response data from the server.
            console.log(error.response.status); // This will log the HTTP status code.
        } else if (error.request) {
            console.log(error.request); // This will log the request made but no response was received.
        } else {
            console.log('Error', error.message);
        }
        console.log(error); // This will log the Axios request config.
        setLoading(false);
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

    return (
        <div>
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
                                    <form onSubmit={saveMeal}>
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
                                                                        id='category_id'
                                                                        name='category_id'
                                                                        value={categoryOptions.find(option => option.value === meal.category_id)}
                                                                        onChange={(selectedOption) => handleInput({ target: { name: 'category_id', value: selectedOption.value } })} // Update this line
                                                                        options={categoryOptions}
                                                                    />
                                                                     {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Ingredient</label>
                                                                    <Select
                                                                        id='ingredient_id'
                                                                        name='ingredient_id'
                                                                        value={ingredientOptions.filter(option => meal.ingredient_id.includes(option.value))}
                                                                        onChange={(selectedOptions) => handleInput({ target: { name: 'ingredient_id', value: selectedOptions.map(option => option.value) } })} // Update this line
                                                                        options={ingredientOptions}
                                                                        isMulti
                                                                    />
                                                                      {errors.ingredient_id && <div className="text-danger">{errors.ingredient_id}</div>}
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                            <input {...getInputProps()}/>
                                                        </div>
                                                        {meal.meal_image ? (
                                                                    <p>Selected file: {meal.meal_image.name}</p>
                                                                ) : (
                                                                    <p>Drag 'n' drop an image here, or click to select one</p>
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
                                                    type={activeTab === 1 ? "submit" : "button"}
                                                    className="btn btn-primary me-2 waves-effect waves-light"
                                                    onClick={activeTab === 1 ? null : handleNextClick}          
                                                >
                                                
                                                {activeTab === 1 ? "Create Meal" : "Next"}
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

export default AddProduct;
