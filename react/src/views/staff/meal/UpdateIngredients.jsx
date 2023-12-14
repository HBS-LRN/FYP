import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
import { useParams } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom';
import { useStateContext } from "../../../contexts/ContextProvider";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
export default function UpdateIngredient() {
    const [ingredient, setIngredient] = useState({
        ingredient_name: '',
        calorie:'',
        stock: ''
    })
    const { user, token, setToken, setCartQuantity } = useStateContext();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false); // Add redirect state
     // Get the ingredient ID from the URL using useParams
     let { id } = useParams(); 

     // Function to retrieve ingredient data based on ID
    const getIngredientData = async () => {
        try {
            const response = await axiosClient.get(`/ingredients/${id}`);
            const { ingredient_name, calorie,stock } = response.data;
            setIngredient({
                ingredient_name,
                calorie,
                stock
            });
        } catch (error) {
            // Handle error, e.g., display an error message or redirect
        }
    }

     // Call getIngredientData when the component mounts
     useEffect(() => {
        getIngredientData();
    }, [id]);

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

    const updateIngredient  = (e) => {
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
        Swal.fire({
            title: 'Are you sure to update?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update!'
          }).then((result) => {
            if (result.isConfirmed) {
               
                axiosClient.put(`/ingredients/${id}`, data)
                    .then(res => {
                        const activeData = {
                            user_id:user.id,
                            Action: "Updated Ingredient", 
                            ActionIcon:"fa-solid fa-pen"
                        }
                        axiosClient.post('/postStaffAtivitiFeed', activeData)
                        .then(res => {
                            Swal.fire(
                                'Update!',
                                'Your data has been updated.',
                                'success'
                            )
                            setLoading(false);
                            setRedirect(true);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            setLoading(false); 
                        });
                       
                    })
                    .catch(function () {
                        setLoading(false);
                    });
            }
          })
        
        .catch(function(){
            setLoading(false);
        });
        
    }
    if (redirect) {
        return <Navigate to="/ingredientList" />;
    }
 

    return(
        <div>
              <Helmet>
                <link rel="stylesheet" href="../../../assets/libs/twitter-bootstrap-wizard/prettify.css"/>
                <link href="../../../assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css"/>
                <link href="../../../assets/libs/dropzone/min/dropzone.min.css" rel="stylesheet" type="text/css"/>
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
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Ingredient List</a></li>
                            <li class="breadcrumb-item active">Update Ingredient</li>
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
                                        <span class="step-title">Update Information</span>
                                    </a>
                                </li>

                            </ul>
                            <div class=" twitter-bs-wizard-tab-content">
                                <div class="tab-pane" id="basic-info">
                                    <h4 class="card-title">Update Information</h4>
                                    <p class="card-title-desc">update Ingredient ID: {id}</p>

                                    <form onSubmit={updateIngredient}>
                                        <div class="mb-3">
                                            <label class="form-label" for="ingredient_name">Ingredient Name</label>
                                            <input id="ingredient_name" name="ingredient_name" value={ingredient.ingredient_name} onChange={handleInput} type="text" class="form-control"/>
                                            {errors.ingredient_name && <div className="text-danger">{errors.ingredient_name}</div>}
                                        </div>


                                        <div class="mb-3">
                                            <label class="form-label" for="calorie">Calorie</label>
                                            <input id="Calorie" name="calorie" value={ingredient.calorie} onChange={handleInput} type="Number" class="form-control"/>
                                            {errors.calorie && <div className="text-danger">{errors.calorie}</div>}
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="stock">Existing Stock (Unit/G)</label>
                                            <input id="stock" name="stock" value={ingredient.stock} onChange={handleInput} type="Number" class="form-control" />
                                            {errors.stock && <div className="text-danger">{errors.stock}</div>}
                                        </div>
                                        <ul class="pager wizard twitter-bs-wizard-pager-link">
                               
                                <li class="next"><button type='submit'>Update Ingredient</button></li>
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