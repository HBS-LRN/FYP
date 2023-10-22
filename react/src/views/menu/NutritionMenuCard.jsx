import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

import AOS from 'aos';
import 'aos/dist/aos.css';




export default function NuritionMenuCard() {


    // $( ".info" ).click(function() {
    //     $( ".dish-info" ).show('slow');
    //      $(this).parent().parent().parent().hide('slow');
    //     $(this).parent().parent().parent().next().show('slow');


    //   });

    //   $( ".info2" ).click(function() {
    //     $(this).parent().hide('slow');
    //      $(this).parent().prev().show('slow');
    //     //$('.dish-foods').show('slow');
    //   });
    const handleShowDishInfoClick = (event) => {
        const dishContainerElement = event.target.closest('.dish-foods');
        const dishContent = event.target.closest('.dish').querySelector('.dish-info');

        // Hide dish container
        dishContainerElement.style.display = 'none';

        // Show dish info with animation
        dishContent.style.opacity = '0';
        dishContent.style.transform = 'translateY(20px)';
        dishContent.style.display = 'block';

        // Trigger animation after a short delay
        setTimeout(() => {
            dishContent.style.opacity = '1';
            dishContent.style.transform = 'translateY(0)';
            dishContent.classList.add('fade-up-animation');
        }, 10);


    };
    const handleHideDishInfoClick = (event) => {

        console.log("hideclick")

        const dishContainerElement = event.target.closest('.dish-info');
        dishContainerElement.style.display = 'none';
        const dishContent = event.target.closest('.dish').querySelector('.dish-foods');
        console.log(dishContent)
        // Show dish info with animation
        dishContent.style.opacity = '0';
        dishContent.style.transform = 'translateY(20px)';
        dishContent.style.display = 'block';

        // Trigger animation after a short delay
        setTimeout(() => {
            dishContent.style.opacity = '1';
            dishContent.style.transform = 'translateY(0)';
            dishContent.classList.add('fade-up-animation');
        }, 10);



    };



    return (



        <div>

            <section className="hero-section about checkout" style={{ backgroundImage: 'url(../assets/img/background-3.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12">
                            <div class="about-text pricing-table">
                                <ul class="crumbs d-flex" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                                    <li><a href="index.html">Home</a></li>

                                    <li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i>Healthy Meal</a></li>

                                </ul>
                                <h2 data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">Personalized Nutrition Healthy Meal Recommendation </h2>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="tabs">

                <div class="container">

                    <div class="tabs-img-back">

                        <div class="row">

                            <div class="col-lg-12">

                                <div class="Provides" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">


                                    <div class="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Breakfast</button>
                                        <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Lunch</button>
                                        <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Dinner</button>

                                    </div>
                                    <div class="like-meal">
                                        <a href="#"><i class="fa-solid fa-heart"></i>Your Like Meals</a>
                                    </div>

                                </div>

                            </div>

                            <div class="col-lg-12">

                                <div class="tab-content" id="v-pills-tabContent" >

                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-13.png" />
                                                    <div class="dish-foods">
                                                        <h3>Egg, kiwi
                                                            and sauce chilli</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <div class="recommended float">
                                                                    <div class="bold">
                                                                        <a href="#">Recommended Meal Just For You.</a>
                                                                        <a href="#">250-Calorie Diet Align Your BMI. </a>
                                                                        <a href="#">No Ingredients Cause You Allergies.</a>


                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info" onClick={handleShowDishInfoClick}></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="price">
                                                            <h2>RM39</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark" onClick={handleHideDishInfoClick}></i>
                                                        <h5>
                                                            Egg, kiwi
                                                            and sauce chilli
                                                        </h5>
                                                        <div class="cafa-button">

                                                            <div class="recommended">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Lunch</a>
                                                            </div>

                                                        </div>
                                                        <p>Savor a delightful blend of tender pork, flavorful potatoes, and sweet dried fruits in this enticing dish.
                                                            Ingredients For This Meal Shown Belows: </p>


                                                        <ul class="menu-dish">
                                                            <li>Kiwi</li>
                                                            <li>Egg</li>
                                                            <li>Dried Fruits</li>



                                                        </ul>

                                                        <h5>
                                                            Rating And Review
                                                        </h5>
                                                        <div className="dropdown float-end">
                                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">

                                                                <i class="fa-solid fa-filter"></i>
                                                                <span class="filter">Filter</span>

                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">5 Star&nbsp;(8)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">4 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">3 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">2 Star&nbsp;(80)</a>
                                                                <a href="javascript:void(0);" className="dropdown-item">1 Star&nbsp; (80)</a>
                                                            </div>
                                                        </div>
                                                        <div class="overallRating">
                                                            <h3>
                                                                5 Out Of 5
                                                                <br />
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>

                                                            </h3>
                                                            {/* <p> 50 Ratings.</p> */}

                                                        </div>

                                                        <div class="rating-scroll" >
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12  comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-2.png" />
                                                    <div class="dish-foods">
                                                        <h3>Potatoes with pork
                                                            and dried fruits</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <div class="not-recommended float">
                                                                    <div class="bold">
                                                                        <a href="#">Not Recommended Meal For You.</a>
                                                                        <a href="#">450-Calorie Not Align With Your BMI. </a>
                                                                        <a href="#">No Ingredients Cause You Allergies!</a>
                                                                    </div>



                                                                </div>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info" onClick={handleShowDishInfoClick}></i>

                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>RM 46</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark" onClick={handleHideDishInfoClick}></i>
                                                        <h5>
                                                            Potatoes with chicken
                                                            and dried fruits
                                                        </h5>
                                                        <div class="cafa-button">
                                                           
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Lunch</a>
                                                            
                                                        </div>
                                                        <p>Savor a delightful blend of tender pork, flavorful potatoes, and sweet dried fruits in this enticing dish.
                                                            Ingredients For This Meal Shown Belows: </p>


                                                        <ul class="menu-dish">
                                                            <li>Potato</li>
                                                            <li>Chicken</li>
                                                            <li>Dried Fruits</li>



                                                        </ul>

                                                        <h5>
                                                            Rating And Review
                                                        </h5>
                                                        <div className="dropdown float-end">
                                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">

                                                                <i class="fa-solid fa-filter"></i>
                                                                <span class="filter">Filter</span>

                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">5 Star&nbsp;(8)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">4 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">3 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">2 Star&nbsp;(80)</a>
                                                                <a href="javascript:void(0);" className="dropdown-item">1 Star&nbsp; (80)</a>
                                                            </div>
                                                        </div>
                                                        <div class="overallRating">
                                                            <h3>
                                                                4.9 Out Of 5
                                                                <br />
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>

                                                            </h3>
                                                            {/* <p> 50 Ratings.</p> */}

                                                        </div>

                                                        <div class="rating-scroll" >
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12  comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="400" data-aos-duration="500">
                                                <div class="dish">
                                                    <img alt="food-dish" src="assets/img/dish-3.png" />
                                                    <div class="dish-foods">
                                                        <h3>Rice with shrimps and kiwi</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                
                                                                    <div class="not-recommended float">
                                                                        <div class="allergic">

                                                                            <a href="#">Have Ingredients Cause You Allergies!</a>

                                                                        </div>

                                                                        <div class="bold">
                                                                            <a href="#">Not Recommended Meal For You.</a>
                                                                            <a href="#">450-Calorie Not Align With Your BMI. </a>
                                                                        </div>


                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info" onClick={handleShowDishInfoClick}></i>

                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>RM 49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark" onClick={handleHideDishInfoClick}></i>
                                                        <h5>
                                                            Rice with shrimps and kiwi
                                                        </h5>
                                                        <div class="cafa-button">

                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Lunch</a>

                                                        </div>
                                                        <p>Savor a delightful blend of tender pork, flavorful potatoes, and sweet dried fruits in this enticing dish.
                                                            Ingredients For This Meal Shown Belows: </p>


                                                        <ul class="menu-dish">
                                                            <li>Rice</li>
                                                            <li>Shirmps</li>
                                                            <li>Kiwi</li>
                                                           


                                                        </ul>

                                                        <h5>
                                                            Rating And Review
                                                        </h5>
                                                        <div className="dropdown float-end">
                                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">

                                                                <i class="fa-solid fa-filter"></i>
                                                                <span class="filter">Filter</span>

                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">5 Star&nbsp;(8)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">4 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">3 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">2 Star&nbsp;(80)</a>
                                                                <a href="javascript:void(0);" className="dropdown-item">1 Star&nbsp; (80)</a>
                                                            </div>
                                                        </div>
                                                        <div class="overallRating">
                                                            <h3>
                                                                5 Out Of 5
                                                                <br />
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>

                                                            </h3>
                                                            {/* <p> 50 Ratings.</p> */}

                                                        </div>

                                                        <div class="rating-scroll" >
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12  comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-4.png" />
                                                    <div class="dish-foods">
                                                        <h3>Spaghetti with mushrooms and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info" onClick={handleShowDishInfoClick}></i>

                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark" onClick={handleHideDishInfoClick}></i>
                                                        <h5>
                                                            Egg, kiwi
                                                            and sauce chilli
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <div class="recommended">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Lunch</a>
                                                            </div>
                                                        </div>
                                                        <p>Savor a delightful blend of tender pork, flavorful potatoes, and sweet dried fruits in this enticing dish.
                                                            Ingredients For This Meal Shown Belows: </p>


                                                        <ul class="menu-dish">
                                                            <li>Kiwi</li>
                                                            <li>Egg</li>
                                                            <li>Cherry</li>
                                                            <li>Ham</li>


                                                        </ul>

                                                        <h5>
                                                            Rating And Review
                                                        </h5>
                                                        <div className="dropdown float-end">
                                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">

                                                                <i class="fa-solid fa-filter"></i>
                                                                <span class="filter">Filter</span>

                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">5 Star&nbsp;(8)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">4 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">3 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">2 Star&nbsp;(80)</a>
                                                                <a href="javascript:void(0);" className="dropdown-item">1 Star&nbsp; (80)</a>
                                                            </div>
                                                        </div>
                                                        <div class="overallRating">
                                                            <h3>
                                                                4.9 Out Of 5
                                                                <br />
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>

                                                            </h3>
                                                            {/* <p> 50 Ratings.</p> */}

                                                        </div>

                                                        <div class="rating-scroll" >
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12  comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-5.png" />
                                                    <div class="dish-foods">
                                                        <h3>Sliced pork, avocado and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>

                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$39</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark" onClick={handleHideDishInfoClick}></i>
                                                        <h5>
                                                            Egg, kiwi
                                                            and sauce chilli
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <div class="recommended">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Lunch</a>
                                                            </div>
                                                        </div>
                                                        <p>Savor a delightful blend of tender pork, flavorful potatoes, and sweet dried fruits in this enticing dish.
                                                            Ingredients For This Meal Shown Belows: </p>


                                                        <ul class="menu-dish">
                                                            <li>Kiwi</li>
                                                            <li>Egg</li>
                                                            <li>Cherry</li>
                                                            <li>Ham</li>


                                                        </ul>

                                                        <h5>
                                                            Rating And Review
                                                        </h5>
                                                        <div className="dropdown float-end">
                                                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">

                                                                <i class="fa-solid fa-filter"></i>
                                                                <span class="filter">Filter</span>

                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">5 Star&nbsp;(8)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">4 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">3 Star&nbsp;(80)</a>
                                                                {/* item */}
                                                                <a href="javascript:void(0);" className="dropdown-item">2 Star&nbsp;(80)</a>
                                                                <a href="javascript:void(0);" className="dropdown-item">1 Star&nbsp; (80)</a>
                                                            </div>
                                                        </div>
                                                        <div class="overallRating">
                                                            <h3>
                                                                4.9 Out Of 5
                                                                <br />
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>
                                                                <i class="fa-solid fa-star"></i>

                                                            </h3>
                                                            {/* <p> 50 Ratings.</p> */}

                                                        </div>

                                                        <div class="rating-scroll" >
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12  comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                            <div class="row rating">
                                                                <div class="col-xl-2 rating-review">
                                                                    <img src="../assets/img/bungsenggg.jpg" />


                                                                </div>

                                                                <div class="col-xl-8 col-lg-12 comment">
                                                                    <div>
                                                                        <h6>Thomas Adamson</h6>


                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="400" data-aos-duration="500">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-6.png" />
                                                    <div class="dish-foods">
                                                        <h3>Veal meat, tomatoes and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Veal meat, tomatoes and...
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-4.png" />
                                                    <div class="dish-foods">
                                                        <h3>Spaghetti with mushrooms and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Spaghetti with mushrooms and...
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-6.png" />
                                                    <div class="dish-foods">
                                                        <h3>Veal meat, tomatoes and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Veal meat, tomatoes and...
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-5.png" />
                                                    <div class="dish-foods">
                                                        <h3>Sliced pork, avocado and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$39</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="nphumber" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Sliced pork, avocado and...
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="assets/img/dish-1.png" />
                                                    <div class="dish-foods">
                                                        <h3>Pasta, kiwi
                                                            and sauce chilli</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$39</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Potatoes with pork and dried fruits
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-2.png" />
                                                    <div class="dish-foods">
                                                        <h3>Potatoes with pork
                                                            and dried fruits</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$46</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Potatoes with pork and dried fruits
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <div class="row">

                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-1.png" />
                                                    <div class="dish-foods">
                                                        <h3>Pasta, kiwi
                                                            and sauce chilli</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$39</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Potatoes with pork and dried fruits
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-5.png" />
                                                    <div class="dish-foods">
                                                        <h3>Sliced pork, avocado and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$39</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Sliced pork, avocado and...
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-6.png" />
                                                    <div class="dish-foods">
                                                        <h3>Veal meat, tomatoes and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Veal meat, tomatoes and...
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-2.png" />
                                                    <div class="dish-foods">
                                                        <h3>Potatoes with pork
                                                            and dried fruits</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$46</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Potatoes with pork and dried fruits
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-3.png" />
                                                    <div class="dish-foods">
                                                        <h3>Rice with shrimps and kiwi</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Rice with shrimps and kiwi
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6">
                                                <div class="dish">
                                                    <img alt="food-dish" src="../assets/img/dish-4.png" />
                                                    <div class="dish-foods">
                                                        <h3>Spaghetti with mushrooms and...</h3>
                                                        <div class="dish-icon">
                                                            <div class="cafa-button">
                                                                <a href="#">Breakfast</a>
                                                                <a href="#">Brunch</a>
                                                            </div>
                                                            <div class="dish-icon end">

                                                                <i class="info fa-solid fa-circle-info"></i>
                                                                <div class="star">
                                                                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="price">
                                                            <h2>$49</h2>
                                                            <div class="qty-input">
                                                                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                                <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                            </div>
                                                        </div>
                                                        <button class="button-price">Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                    </div>
                                                    <div class="dish-info" style={{ display: 'none' }}>
                                                        <i class="info2 fa-solid fa-xmark"></i>
                                                        <h5>
                                                            Spaghetti with mushrooms and...
                                                        </h5>
                                                        <div class="cafa-button">
                                                            <a href="#">Breakfast</a>
                                                            <a href="#">Brunch</a>
                                                        </div>
                                                        <p>In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis orci a scelerisque. Diam quam nulla porttitor.</p>
                                                        <ul class="menu-dish">
                                                            <li>Nulla porttitor massa id;</li>
                                                            <li>Aliquam vestibulum morbi;</li>
                                                            <li>Blandit donec adipiscing;</li>
                                                        </ul>
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

            </section>

            <section class="service-shows gap" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-4 col-lg-12">
                            <div class="good-taste">
                                <h2>See Also Others Categories!</h2>
                                <p>This Is Our Overall Categories, Use Your Mouse To Scroll It!!! </p>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-12">
                            <div class="comment-data comment-slide owl-carousel owl-theme">
                                <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                    <div class="category">

                                        <img alt="food-dish" src="../assets/img/Taiwanese-fried-chicken-11.png" width="300" height="340" />
                                        <div class="dish-foods">
                                            <h3>Appertizer Menu </h3>


                                        </div>

                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                    <div class=" category">

                                        <img alt="food-dish" src="../assets/img/chinese-egg-tarts-dan-tat.png" width="300" height="340" />
                                        <div class="dish-foods">
                                            <h3>Dimsum Menu </h3>


                                        </div>

                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                    <div class=" category">

                                        <img alt="food-dish" src="../assets/img/hokkien-mee.png" width="300" height="340" />
                                        <div class="dish-foods">
                                            <h3>Dimsum Menu </h3>


                                        </div>

                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                    <div class=" category">

                                        <img alt="food-dish" src="../assets/img/chinese-egg-tarts-dan-tat.png" width="300" height="340" />
                                        <div class="dish-foods">
                                            <h3> Menu </h3>


                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/nutritionMenuCard.css" />

            </Helmet>
        </div>


    );
}