import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
export default function AddIngredient() {
    const [ingredient, setIngredient] = useState({
        ingredient_name: '',
        calorie: '',
        stock: ''

    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setIngredient({
            ...ingredient,
            [name]: value
        });
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!ingredient.ingredient_name) {
            newErrors.ingredient_name = "Ingredient Name is required";
            valid = false;
        }

        if (!ingredient.calorie) {
            newErrors.calorie = "Calorie is required";
            valid = false;
        }

        if (!ingredient.stock) {
            newErrors.calorie = "Existing Stock is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    const saveIngredient = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        const data = {
            ingredient_name: ingredient.ingredient_name,
            calorie: ingredient.calorie,
            stock: ingredient.stock
        }

        console.log(data)
        axiosClient.post('/ingredients', data)
        .then(res => {
          setIngredient({
            ingredient_name: '',
            calorie: ''
          });
          // Show SweetAlert success message
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New Ingredient Had Been Successfully Added!',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          console.log(error);
        });
    }


    return (
        <div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/libs/twitter-bootstrap-wizard/prettify.css" />
                <link href="../../../assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
                <link href="../../../assets/libs/dropzone/min/dropzone.min.css" rel="stylesheet" type="text/css" />
                <link href="../../../assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
                <link href="../../../assets/css/icons.min.css" rel="stylesheet" type="text/css" />
                <link href="../../../assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
                <link rel="stylesheet" href="../../../assets/css/addIngredient.css" />
            </Helmet>
            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">


                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0">Add Ingredient</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Meal</a></li>
                                            <li class="breadcrumb-item active">Add Ingredient</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">

                                        <div id="addproduct-nav-pills-wizard" class="twitter-bs-wizard">
                                            <ul class="twitter-bs-wizard-nav">
                                                <li class="nav-item">
                                                    <a href="#basic-info" class="nav-link" data-toggle="tab">
                                                        <span class="step-number">01</span>
                                                        <span class="step-title">Basic Information</span>
                                                    </a>
                                                </li>

                                            </ul>
                                            <div class=" twitter-bs-wizard-tab-content">
                                                <div class="tab-pane" id="basic-info">
                                                    <h4 class="card-title">Basic Information</h4>
                                                    <p class="card-title-desc">Fill all information below</p>

                                                    <form onSubmit={saveIngredient}>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="ingredient_name">Ingredient Name</label>
                                                            <input id="ingredient_name" name="ingredient_name" value={ingredient.ingredient_name} onChange={handleInput} type="text" class="form-control" />
                                                            {errors.ingredient_name && <div className="text-danger">{errors.ingredient_name}</div>}
                                                        </div>


                                                        <div class="mb-3">
                                                            <label class="form-label" for="calorie">Calorie</label>
                                                            <input id="Calorie" name="calorie" value={ingredient.calorie} onChange={handleInput} type="Number" class="form-control" />
                                                            {errors.calorie && <div className="text-danger">{errors.calorie}</div>}
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="stock">Existing Stock (Unit/G)</label>
                                                            <input id="stock" name="stock" value={ingredient.stock} onChange={handleInput} type="Number" class="form-control" />
                                                            {errors.stock && <div className="text-danger">{errors.stock}</div>}
                                                        </div>
                                                        <ul class="pager wizard twitter-bs-wizard-pager-link">

                                                            <li class="next"><button type='submit'>Add Ingredient</button></li>
                                                        </ul>
                                                    </form>

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
        </div>
    );
}