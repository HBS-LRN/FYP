import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from "../../../axios-client.js";
import { useParams } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { useDropzone } from 'react-dropzone';
import { useStateContext } from "../../../contexts/ContextProvider"; 
export default function UpdateCategory() {
    const { user, token, setToken, setCartQuantity } = useStateContext();
    const [category, setCategory] = useState({
            name: '',
            iconImage:null,
            image: null,

    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false); // Add redirect state
     // Get the ingredient ID from the URL using useParams
     let { id } = useParams(); 
     const handleInput = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    }
    const onImageDrop = (acceptedFiles) => {
        const imageFile = acceptedFiles[0];
    
        // Reset the error message
        setErrors({
            ...errors,
            image: '',
        });
    
        // Validate if the file is an image
        if (imageFile && imageFile.type.startsWith('image/')) {
            setCategory({
                ...category,
                image: imageFile,
            });
        } else {
            setErrors({
                ...errors,
                image: 'Please upload a valid image file.',
            });
        }
    };

    const onIconImageDrop = (acceptedFiles) => {
        const iconImageFile = acceptedFiles[0];
    
        // Reset the error message
        setErrors({
            ...errors,
            iconImage: '',
        });
    
        // Validate if the file is an image
        if (iconImageFile && iconImageFile.type.startsWith('image/')) {
            setCategory({
                ...category,
                iconImage: iconImageFile,
            });
        } else {
            setErrors({
                ...errors,
                iconImage: 'Please upload a valid image file.',
            });
        }
    };
    
    const getCategorytData = async () => {
        try {
            const response = await axiosClient.get(`/category/${id}`);
            const { name,iconImage,image } = response.data;
            setCategory({
                name,
                iconImage,
                image,
            });
        } catch (error) {
            console.error("Error fetching category data:", error.response);
        }
    }

     // Call getIngredientData when the component mounts
     useEffect(() => {
        getCategorytData();
    }, [id]);

    
    // console.log("Category state:", category);
    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!category.name) {
            newErrors.name = "Ingredient Name is required";
            valid = false;
        }

        if (!category.iconImage) {
            newErrors.iconImage = "Icon image is required";
            valid = false;
        }
        if (!category.image) {
            newErrors.image = "Image is required";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    }

    const updateCategory  = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        console.log("Name:", category.name);
        console.log("Icon Image:", category.iconImage);
        console.log("Image:", category.image);
        setLoading(true);
        const formData = new FormData();
         
        formData.append('id', id);
        formData.append('name', category.name);
        formData.append('iconImage', category.iconImage); 
        formData.append('image', category.image); 
       
       
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
             
               
                axiosClient.post(`/updateCategory`, formData)
                    .then(res => {
                        const activeData = {
                            user_id:user.id,
                            Action: "Update Category", 
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
                            console.log('Updated Data:', res); 
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            setLoading(false); 
                        });
                       
                    })
                    .catch(function (error) {
                        console.log("Validation Errors:", error.response.data.errors);
                        console.log("Error Response:", error.response);
                        setLoading(false);
                    });
        
            }
          })
        
        .catch(function(){
            setLoading(false);
        });
        
    }
    // if (redirect) {
    //     return <Navigate to="/categoryList"/>;
    // }
    const redirectComponent = redirect ? <Navigate to="/categoryList"/> : null;
    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({ onDrop: onImageDrop });
    const { getRootProps: getIconRootProps, getInputProps: getIconInputProps } = useDropzone({ onDrop: onIconImageDrop });

    return(
        <div>
            {redirectComponent}
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
              <h4 class="mb-sm-0">Update Category</h4>

              <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item"><a href="javascript: void(0);">Meal</a></li>
                      <li class="breadcrumb-item active">Update Category</li>
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

                              <form method="POST" action="#" onSubmit={updateCategory} enctype="multipart/form-data">
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
                                                  {category.image && category.image.name ? (
                                                    <p>Selected file: {category.image.name}</p>

                                                          ) : (
                                                            <div className="currentImage">
                                                <p>Drop the new Image here..........</p>
                                             Current Image：
                                                 <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${category.image}`} alt="img-1" height="100px" width="100px"/>
                                             </div>
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
                                              {category.iconImage && category.iconImage.name ? (
                                                  <p>Selected file: {category.iconImage.name}</p>
                                              ) : (
                                                <div className="currentImage">
                                                <p>Drop the new Image here..........</p>
                                             Current Image：
                                                 <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${category.iconImage}`} alt="img-1" height="100px" width="100px"/>
                                             </div>
                                              )}          
                                  </div>
                                      {errors.iconImage && <div className="text-danger">{errors.iconImage}</div>}
                                  </div>
                                  <ul class="pager wizard twitter-bs-wizard-pager-link">
                         
                          <li class="next"><button type='submit'>Update Category</button></li>
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