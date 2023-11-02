import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { useDropzone } from 'react-dropzone';

export default function AddCategory() {
    const [category, setCategory] = useState({
        name: '',
        iconImage: null,
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    }
    const onImageDrop = (acceptedFiles) => {
        setCategory({
            ...category,
            image: acceptedFiles[0],
        });
    }

    const onIconImageDrop = (acceptedFiles) => {
        setCategory({
            ...category,
            iconImage: acceptedFiles[0],
        });
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!category.name) {
            newErrors.name = "Category name is required";
            valid = false;
        }

        if (!category.image) {
            newErrors.image = "Image is required";
            valid = false;
        }

        if (!category.iconImage) {
            newErrors.iconImage = "Icon Image is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    const saveCategory = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('iconImage', category.iconImage);
        formData.append('image', category.image);
   

        axiosClient.post('/category', formData)
        .then(res => {
            setCategory({
                name: '',
                iconImage: null,
                image: null
            });
            // Show SweetAlert success message
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New Category Had Been Successfully Added!',
            showConfirmButton: false,
            timer: 1500
        });
    })
    .catch(function (error) {
        console.log(error.response);
        setLoading(false);
    });
    }

    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({ onDrop: onImageDrop });
    const { getRootProps: getIconRootProps, getInputProps: getIconInputProps } = useDropzone({ onDrop: onIconImageDrop });
    
   
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
                    <h4 class="mb-sm-0">Add Category</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Meal</a></li>
                            <li class="breadcrumb-item active">Add Category</li>
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

                                    <form onSubmit={saveCategory}>
                                        <div class="mb-3">
                                            <label class="form-label" for="name">Category Name</label>
                                            <input id="name" name="name" placeholder='Enter category name here.......' value={category.name} onChange={handleInput} type="text" class="form-control"/>
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </div>


                                        <div className="mb-3">
                                        <label class="form-label" for="image">Category Image</label>
                                                    <div className="dropzone" {...getImageRootProps()}>
                                                        <div className="fallback">
                                                            <input {...getImageInputProps()}/>
                                                        </div>
                                                        {category.image ? (
                                                                    <p>Selected file: {category.image.name}</p>
                                                                ) : (
                                                                    <p>Drag 'n' drop an image here, or click to select one</p>
                                                                )}
                                                                 
                                                    </div>
                                                    {errors.image && <div className="text-danger">{errors.image}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label class="form-label" for="image">Category Icon Image</label>
                                            <div className="dropzone" {...getIconRootProps()}>
                                                <div className="fallback">
                                                    <input {...getIconInputProps()}/>
                                                    </div>
                                                    {category.iconImage ? (
                                                        <p>Selected file: {category.iconImage.name}</p>
                                                    ) : (
                                                        <p>Drag 'n' drop an image here, or click to select one</p>
                                                    )}
                                                                 
                                        </div>
                                            {errors.iconImage && <div className="text-danger">{errors.iconImage}</div>}
                                        </div>
                                        <ul class="pager wizard twitter-bs-wizard-pager-link">
                               
                                <li class="next"><button type='submit'>Add Category</button></li>
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