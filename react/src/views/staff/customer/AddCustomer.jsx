import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
const AddCustomer = () => {
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
                                    <h4 className="mb-sm-0">Add Customer</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Ecommerce</a>
                                            </li>
                                            <li className="breadcrumb-item active">Add Product</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">


                                        <h4 className="card-title">Basic Information</h4>
                                        <p className="card-title-desc">Fill all information below</p>
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="productname">
                                                  Customer Name
                                                </label>
                                                <input
                                                    id="productname"
                                                    name="productname"
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="manufacturername">
                                                            Customer Email
                                                        </label>
                                                        <input
                                                            id="manufacturername"
                                                            name="manufacturername"
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="manufacturerbrand">
                                                           Customer Phone
                                                        </label>
                                                        <input
                                                            id="manufacturerbrand"
                                                            name="manufacturerbrand"
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="price">
                                                            Birth Of Date
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
                                                        <label className="form-label">Features</label>

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



                                    <div className="text-center mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary me-2 waves-effect waves-light"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-light waves-effect"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <br/>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default AddCustomer;
