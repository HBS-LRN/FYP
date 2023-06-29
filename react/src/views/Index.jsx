import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';



import '../../assets/css/style.css';
import '../../assets/css/owl.carousel.min.css';
import '../../assets/css/owl.theme.default.min.css';
import '../../assets/css/nice-select.css';
import '../../assets/css/aos.css';
import '../../assets/css/responsive.css';
import '../../assets/css/color.css';


export default function Index() {


    useEffect(() => {
        const boxButton1 = document.getElementById("foodShowBox1");
        const boxButton2 = document.getElementById("foodShowBox2");
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
    }, []);



    return (

        <div>
            <section className="hero-section gap" style={{ backgroundImage: 'url(../assets/img/background-1.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="restaurant">
                                <h1>The Best restaurants
                                    in your home</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                {/* <!-- <div class="nice-select-one">
                                        <select class="nice-select Advice">
                                            <option>Choose a Restaurant</option>
                                            <option>Choose a Restaurant 1</option>
                                            <option>Choose a Restaurant 2</option>
                                            <option>Choose a Restaurant 3</option>
                                            <option>Choose a Restaurant 4</option>
                                        </select>
                                        <a href="#" class="button button-2">Order Now</a>
                                    </div> --> */}
                                <div class="col-sc-1">
                                    <input type="search" name="search" id="search" placeholder="type here for search..."></input><i
                                        class="fa fa-search"></i>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-6 mainpageShow" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">
                            <div class="img-restaurant">
                                <a class="foodShowBox" id="foodShowBox1">
                                    <img width="120" height="120"
                                        src="https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/tasty-healthy-food-isolated-on-white-background-resize.jpg"
                                        class="attachment-large size-large" alt="" loading="lazy"
                                        srcset="https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/tasty-healthy-food-isolated-on-white-background-resize.jpg 800w, https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/tasty-healthy-food-isolated-on-white-background-resize-300x295.jpg 300w, https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/tasty-healthy-food-isolated-on-white-background-resize-768x755.jpg 768w"
                                        sizes="(max-width: 800px) 100vw, 800px" />

                                    <div class="title">Healthy Recipe</div>
                                    <div class="discription">
                                        Quisque eget metus id nunc sagittis pharetra eu sit amet magna.
                                    </div>

                                </a>
                                <a class="foodShowBox" id="foodShowBox2">
                                    <img width="120" height="120"
                                        src="https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/healthy-nutrition-accessories-isolated-on-white-ba-resize.jpg"
                                        class="attachment-large size-large" alt="" loading="lazy"
                                        srcset="https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/healthy-nutrition-accessories-isolated-on-white-ba-resize.jpg 800w, https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/healthy-nutrition-accessories-isolated-on-white-ba-resize-300x217.jpg 300w, https://templatekit.kotakkuning.com/naturfood/wp-content/uploads/sites/9/2022/08/healthy-nutrition-accessories-isolated-on-white-ba-resize-768x555.jpg 768w"
                                        sizes="(max-width: 800px) 100vw, 800px" />
                                    <div class="title">Healthy Lifestyle</div>
                                    <div class="discription">
                                        Quisque eget metus id nunc sagittis pharetra eu sit amet magna.
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section class="works-section gap no-top">
                <div class="container">
                    <div class="hading" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                        <h2>How it works</h2>
                        <p>Magna sit amet purus gravida quis blandit turpis cursus. Venenatis tellus in<br /> metus vulputate eu
                            scelerisque felis.</p>
                    </div>
                    <div class="row ">
                        <div class="col-lg-4 col-md-6 col-sm-12" data-aos="flip-up" data-aos-delay="200"
                            data-aos-duration="300">
                            <div class="work-card">
                                <img alt="img" src="../assets/img/illustration-1.png" />
                                <h4><span>01</span> Select Restaurant</h4>
                                <p>Non enim praesent elementum facilisis leo vel fringilla. Lectus proin nibh nisl condimentum
                                    id. Quis varius quam quisque id diam vel.</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12" data-aos="flip-up" data-aos-delay="300"
                            data-aos-duration="400">
                            <div class="work-card">
                                <img alt="img" src="../assets/img/illustration-2.png" />
                                <h4><span>02</span> Select menu</h4>
                                <p>Eu mi bibendum neque egestas congue quisque. Nulla facilisi morbi tempus iaculis urna id
                                    volutpat lacus. Odio ut sem nulla pharetra diam sit amet.</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12" data-aos="flip-up" data-aos-delay="400"
                            data-aos-duration="500">
                            <div class="work-card">
                                <img alt="img" src="../assets/img/illustration-3.png" />
                                <h4><span>03</span> Wait for delivery</h4>
                                <p>Nunc lobortis mattis aliquam faucibus. Nibh ipsum consequat nisl vel pretium lectus quam id
                                    leo. A scelerisque purus semper eget. Tincidunt arcu non.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="your-favorite-food gap" style={{ backgroundImage: 'url(../assets/img/background-1.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="food-photo-section">
                                <img alt="img" src="../assets/img/photo-3.png" />
                                <a href="#" class="one"><i class="fa-solid fa-burger"></i>Burgers</a>
                                <a href="#" class="two"><i class="fa-solid fa-cheese"></i>Steaks</a>
                                <a href="#" class="three"><i class="fa-solid fa-pizza-slice"></i>Pizza</a>
                            </div>
                        </div>
                        <div class="col-lg-6 offset-lg-1" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">
                            <div class="food-content-section">
                                <h2>Food from your favorite restaurants
                                    to your table</h2>
                                <p>Pretium lectus quam id leo in vitae turpis massa sed. Lorem donec massa sapien faucibus et
                                    molestie. Vitae elementum curabitur vitae nunc.</p>
                                <a href="#" class="button button-2">Order Now</a>
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
                                <img alt="photo" src="../assets/img/photo-4.png" />
                                <i class="fa-regular fa-thumbs-up"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>


    );
}
