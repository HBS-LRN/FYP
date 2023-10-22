import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';





export default function FAQ() {


    return (

        <div>


            <section class="hero-section about" style={{ backgroundImage: 'url(../assets/img/background-3.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="about-text">
                                <ul class="crumbs d-flex">
                                    <li><a href="index.html">Home</a></li>
                                    <li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i>FAQ</a></li>
                                </ul>
                                <h2>Have Some Common Questions?</h2>
                                <p>Here are some of the common questions that we commonly faced. Scroll down to have a look to get the answer!</p>
                            </div>
                        </div>
                        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400"
                        >
                            <div class="join-img-blog">
                                <img alt="join" src="../assets/img/faq.jpg" />
                                <i class="fa-solid fa-question"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section class="tabs gap no-bottom">

                <div class="container">

                    <div class="tabs-img-back">

                        <div class="row">



                            <div class="col-lg-12 gap">

                                <div class="tab-content" id="v-pills-tabContent">

                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

                                        <div class="questions">
                                            <i class="fa-solid fa-q"></i>
                                            <h6>Question 1. How do I check on an food order I have placed?</h6>
                                        </div>
                                        <div class="questions answer">
                                            <p>You can check the status of your food order online. Alternatively you may contact our Customer
                                                Service Team on <a href="tel:03 6263 5859" class="mailtoHref">03 6263 5859</a> or email us at <a
                                                    href="mailto:GrandImperialGroup@gmail.com"
                                                    class="mailtoHref">GrandImperialGroup@gmail.com</a>
                                                . Please provide your order number when making enquiries.<br /><br />

                                            </p>
                                            <i class="fa-solid fa-a"></i>
                                        </div>
                                        <div class="questions">
                                            <i class="fa-solid fa-q"></i>
                                            <h6>Question 2. What should I do when I forget password?</h6>
                                        </div>
                                        <div class="questions answer">
                                            <p> You are required to click on "Forget Password?" In the register page, then you can retrive back
                        your password by providing your email address and the code given.<br /><br />
                                                <b />
                                            </p>
                                            <i class="fa-solid fa-a"></i>
                                        </div>
                                        <div class="questions">
                                            <i class="fa-solid fa-q"></i>
                                            <h6>Question 3. Does anyone else see the information that I provide to Grand Imperial
                                                Group</h6>
                                        </div>
                                        <div class="questions answer">
                                            <p> We respect your privacy. The information you provide will not be given to any third party
                                                without your express consent.
                                                Read our Privacy Policy for additional information<br /><br />

                                            </p>
                                            <i class="fa-solid fa-a"></i>
                                        </div>
                                        <div class="questions">
                 		<i class="fa-solid fa-q"></i>
                 		<h6>Question 4. How can I make a reservation?</h6>
                 	</div>
                 	<div class="questions answer">
                 		<p>To make a reservation, you can either call our restaurant directly or use our convenient online reservation system. Simply provide the date, time, and number of guests, and we will gladly secure your table.
                 			But Please Careful That Our Operation Time Is From 11 AM - 3 PM. In the evening, we open from 6:00 PM to 11:00 PM<br/><br/>
						</p>
						<i class="fa-solid fa-a"></i>
                 	</div>
                 	
                                    </div>


                                </div>

                            </div>

                        </div>

                    </div>

                </div>
      
            </section >
           
           </div>
       


    );
}
