import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';





export default function Index() {


    useEffect(() => {
        const boxButton1 = document.getElementById("foodShowBox1");
        const boxButton2 = document.getElementById("foodShowBox2");
        const searchBar = document.getElementById("search");
        const resultBox = document.getElementById("resultBox");
        boxButton1.style.top = "0px";
        boxButton2.style.top = "80px";
        boxButton1.addEventListener("mouseover", function () {
            if (boxButton1.style.top == "0px") {
                boxButton1.style.top = "80px";
                boxButton2.style.top = "0px";
            }
        });
        boxButton2.addEventListener("mouseover", function () {
            if (boxButton2.style.top == "0px") {
                boxButton2.style.top = "80px";
                boxButton1.style.top = "0px";
            }
        });
        searchBar.addEventListener("keydown",function(){
            if(searchBar.value !=""){
                resultBox.style.display ="block";
            }else{
                resultBox.style.display ="none";
            }
        });

    }, []);



    return (

        <div>
            <section className="hero-section gap" style={{ backgroundImage: 'url(../assets/img/background-1.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="restaurant">
                                <br/>
                                <h1>The Best restaurants
                                    in your home</h1>

                                <p>Enjoy The Personalized Nutrition-Based Food Ordering In Healthy Recipe and Floor Plan Map Reservation! </p>
                                
                                <div class="col-sc-1">
                                    <input type="search" name="search" id="search" placeholder="type here for search..."></input><i
                                        class="fa fa-search"></i>
                                </div>
                                <div class="displaySearch" id='resultBox'>
                                    <div className="itemBox">
                                        <img src="../assets/img/dish-2.png" alt="" className="image" />
                                        <div className="desrp">
                                            hahdahda
                                        </div>
                                    </div>
                                    <div className="itemBox">
                                        <img src="../assets/img/dish-2.png" alt="" className="image" />
                                        <div className="desrp">
                                            hahdahda
                                        </div>
                                    </div>
                                    <div className="itemBox">
                                        <img src="../assets/img/dish-2.png" alt="" className="image" />
                                        <div className="desrp">
                                            sdasd
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-6 mainpageShow" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">
                            <div class="img-restaurant">
                                <a href="/nutritionMenuCard" class="foodShowBox" id="foodShowBox1">
                                    <img width="120" height="120"
                                        src="assets/img/healthy-food.jpg"

                                        alt=""

                                    />

                                    <div class="title">Healthy Recipe</div>
                                    <div class="discription">
                                    Personalized Nutrition Recommendation Meal Here!!
                                    </div>

                                </a>
                                <a href="/categoryMenuCard"class="foodShowBox" id="foodShowBox2">
                                    <img width="120" height="160"
                                        src="assets/img/dim-sum-spare-ribs-PhotoRoom.png-PhotoRoom.png"

                                    />
                                    <div class="title">Others&nbsp;&nbsp;   Recipe</div>
                                    <div class="discription">
                                        Enjoy Dimsum Receipt And Many More Receipt Here!!
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section class="works-section custom-margin">
                <div class="container">
                    <div class="hading" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                        <h2>How it works</h2>
                        <p>This Is A Sequence Of Works To Be Carried Out If You Wish To Proceed A Food Order</p>
                    </div>
                    <div class="row ">
                        <div class="col-lg-4 col-md-12 col-sm-12" data-aos="flip-up" data-aos-delay="200"
                            data-aos-duration="300">
                            <div class="work-card">
                                <img alt="img" src="../assets/img/illustration-2.png" />
                                <h4><span>01</span> Select Menu</h4>
                                <p>Take your time to go through the various categories of food we offer.</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12" data-aos="flip-up" data-aos-delay="300"
                            data-aos-duration="400">
                            <div class="work-card">
                                <img alt="img" src="../assets/img/illustration-5.png" width="280" height="156" />
                                <h4><span>02</span> Add To Cart</h4>
                                <p>After selecting on the desired meal, just press "Add To Cart" button to add item into the cart</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12" data-aos="flip-up" data-aos-delay="400"
                            data-aos-duration="500">
                            <div class="work-card">
                                <img alt="img" src="../assets/img/illustration-3.png" />
                                <h4><span>03</span> Wait for delivery</h4>
                                <p>Ater payment, You will receive an order confirmation and you can track your order online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="your-favorite-food gap" style={{ backgroundImage: 'url(../assets/img/background-3.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="food-photo-section">
                                <img alt="img" src="../assets/img/GI-banner-2.jpg
                                " />

                            </div>
                        </div>
                        <div class="col-lg-6 offset-lg-1" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">
                            <div class="food-content-section">
                                <h2>Reserve Your Table Today!</h2>
                                <p>Make A Table Reservation Just By Clicking The Below Button To Enjoy A Brand New Floor Plan Mapping Reservation Technique,
                                    Discover it Up!</p>
                                <a href="#" class="button button-2">Make Reservation</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="reviews-sections gap">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-6 col-lg-12" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="reviews-content">
                                <h2>What customers say about us</h2>
                                <div class="custome owl-carousel owl-theme">
                                    <div class="item">
                                        <h4>Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</h4>
                                        <div class="thomas">
                                            <img alt="girl" src="../assets/img/photo-5.jpg" />

                                            <div>
                                                <h6>Thomas Adamson</h6>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <h4>"Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Mauris a diam
                                            maecenas sed enim. Egestas diam in arcu cursus euismod quis. Quam quisque id diam
                                            vel".</h4>
                                        <div class="thomas">
                                            <img alt="girl" src="../assets/img/photo-5.jpg" />

                                            <div>
                                                <h6>Thomas Adamson</h6>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <h4>"Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Mauris a diam
                                            maecenas sed enim. Egestas diam in arcu cursus euismod quis. Quam quisque id diam
                                            vel".</h4>
                                        <div class="thomas">
                                            <img alt="girl" src="../assets/img/photo-5.jpg" />

                                            <div>
                                                <h6>Thomas Adamson</h6>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">
                            <div class="reviews-img">
                                <img alt="img" src="../assets/img/join-img.jpg 
                                " width="600" height="330" />
                                <i class="fa-regular fa-thumbs-up"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/index.css" />
            </Helmet>
        </div>


    );
}
