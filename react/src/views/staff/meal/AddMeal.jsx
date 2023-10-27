import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
const AddProduct = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [category, setCategory] = useState([]);
    const [features, setFeatures] = useState([]);

    const options = [
        { value: 'TO', label: 'Touchscreen' },
        { value: 'CF', label: 'Call Function' },
        { value: 'NO', label: 'Notifications', selected: true },
        { value: 'FI', label: 'Fitness', selected: true },
        { value: 'OU', label: 'Outdoor' },
    ];

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleFeaturesChange = (value) => {
        setFeatures(value);
    };
    const handlePreviousClick = () => {
        setActiveTab((prevTab) => prevTab - 1);
    };

    const handleNextClick = () => {
        setActiveTab((prevTab) => prevTab + 1);
    };

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
                                                    <form>
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="productname">
                                                                Meal Name
                                                            </label>
                                                            <input
                                                                id="productname"
                                                                name="productname"
                                                                type="text"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="row">
                                                           
                                                            
                                                            <div className="mb-3">
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="price">
                                                                        Price
                                                                    </label>
                                                                    <input
                                                                        id="price"
                                                                        name="price"
                                                                        type="text"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Category</label>
                                                                    <Select
                                                                        value={category}
                                                                        onChange={handleCategoryChange}
                                                                        options={options} 
                                                                        isMulti 
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Ingredient</label>

                                                                    <Select
                                                                        value={features}
                                                                        onChange={handleFeaturesChange}
                                                                        options={options} 
                                                                        isMulti 
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="productdesc">
                                                                Product Description
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="productdesc"
                                                                rows={5}
                                                                defaultValue={''}
                                                            />
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`}>
                                                    <h4 className="card-title">Product Images</h4>
                                                    <p className="card-title-desc">Upload product image</p>
                                                    <form
                                                        action="https://themesdesign.in/"
                                                        method="post"
                                                        className="dropzone"
                                                    >
                                                        <div className="fallback">
                                                            <input name="file" type="file" multiple="" />
                                                        </div>
                                                        <div className="dz-message needsclick">
                                                            <div className="mb-3">
                                                                <i className="display-4 text-muted ri-upload-cloud-2-line" />
                                                            </div>
                                                            <h4>Drop files here or click to upload.</h4>
                                                        </div>
                                                    </form>
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
                                                    onClick={handleNextClick}
                                                    disabled={activeTab === 2}
                                                >
                                                    Next
                                                </button>
                                            </div>
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
};

export default AddProduct;
