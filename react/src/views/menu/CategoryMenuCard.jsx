import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

import AOS from 'aos';
import 'aos/dist/aos.css';




export default function CategoryMenuCard() {


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

                                    <li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i>Category</a></li>

                                </ul>
                                <h2 data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">Category List</h2>

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

                                <div class="tab-content" id="v-pills-tabContent" >

                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish category">

                                                    <a href="/orderMenuCard"><img alt="food-dish" src="../assets/img/Taiwanese-fried-chicken-11.png" width="300" height="340" /></a>
                                                    <div class="dish-foods">
                                                        <h3>Appetizer Menu&nbsp; </h3>


                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish category">

                                                    <img alt="food-dish" src="../assets/img/chinese-egg-tarts-dan-tat.png" width="300" height="340" />
                                                    <div class="dish-foods">
                                                        <h3>Dimsum Menu &nbsp;</h3>


                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish category">

                                                    <img alt="food-dish" src="../assets/img/hokkien-mee.png" width="300" height="340" />
                                                    <div class="dish-foods">
                                                        <h3>Noodle Menu&nbsp; </h3>


                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish category">
                                                    <img alt="food-dish" src="../assets/img/golden-fried-rice.png" width="300" height="340" />
                                                    <div class="dish-foods">
                                                        <h3>Rice Menu&nbsp;&nbsp;&nbsp; </h3>


                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish category">
                                                    <img alt="food-dish" src="../assets/img/hongshao-chicken-red-braised-chicken.png" width="300" height="340" />
                                                    <div class="dish-foods">
                                                        <h3>Chicken Menu&nbsp;&nbsp;&nbsp; </h3>


                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                <div class="dish category">
                                                    <img alt="food-dish" src="../assets/img/forzen-peach-daiquiris.png" width="300" height="340" />
                                                    <div class="dish-foods">
                                                        <h3>Beverage Menu&nbsp;&nbsp;&nbsp; </h3>


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
            <br />

            <br />


            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/itemStyle.css" />

            </Helmet>
        </div>


    );
}
