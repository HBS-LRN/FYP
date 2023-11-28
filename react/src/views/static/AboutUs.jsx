import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';





export default function Aboutus() {


    return (

        <div>
         
	<section class="hero-section about gap" style={{ backgroundImage: 'url(../assets/img/background-1.png)' }}>
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6 col-md-12 col-sm-12" data-aos="fade-up"  data-aos-delay="300" data-aos-duration="400">
					<div class="about-text">
						<ul class="crumbs d-flex">
							<li><a href="index.html">Home</a></li>
							<li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i> About Us</a></li>
						</ul>
						<h2>Welcome To Grand Imperial Group!</h2>
						<p>Enjoy The Personalized Nutrition-Based Food Ordering and Floor Plan Mapping Reservation Technique! </p>
					</div>
				</div>
				<div class="col-lg-6 col-md-12 col-sm-12" data-aos="fade-up"  data-aos-delay="400" data-aos-duration="500">
					<div class="about-img">
						<img alt="man" src="../assets/img/Grand-Imperial-Group.jpg" width="10" height="160"/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="our-mission-section gap">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6 col-md-12 col-sm-12" data-aos="flip-up"  data-aos-delay="300" data-aos-duration="400">
					<div class="our-mission-img">
						<img alt="Illustration" src="../assets/img/homepageBanner1.png"  width="650" height="400"/>
					</div>
				</div>
				<div class="offset-xl-1 col-lg-5 col-md-12 col-sm-12" data-aos="flip-up"  data-aos-delay="400" data-aos-duration="500">
					<div class="our-mission-text">
						<h2>Our mission is
								to provide unforgettable Eating Moments</h2>
							<p>Our mission is to go beyond simply serving delicious food. We are dedicated to crafting extraordinary experiences for our valued guests. Our passion lies in providing a seamless and exceptional dining experience that will leave a lasting impression.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="cards-section gap no-top">
		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="flip-up"  data-aos-delay="200" data-aos-duration="300">
					<div class="card-text-data">
						<img class="on" alt="icon" src="../assets/img/service-icon-2.svg"/>
						<img class="off" alt="icon" src="../assets/img/service-icon-1.svg"/>

						<h3>Best Food Service</h3>
								<p>We are dedicated to providing a dining experience that transcends the ordinary, leaving a lasting impression on your taste buds and captivating your senses.</p>
					</div>
				</div>
				<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="flip-up"  data-aos-delay="300" data-aos-duration="400">
					<div class="card-text-data two">
						<img class="on" alt="icon" src="../assets/img/service-icon-3.svg"/>
						<img class="off" alt="icon" src="../assets/img/service-icon-4.svg"/>

						<h3>Save
								Your Time</h3>
								<p>Experience the ultimate convenience and save valuable time with our hassle-free online food ordering service. </p>
					</div>
				</div>
				<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="flip-up"  data-aos-delay="400" data-aos-duration="500">
					<div class="card-text-data">
						<img class="on" alt="icon" src="../assets/img/service-icon-5.svg"/>
						<img class="off" alt="icon" src="../assets/img/service-icon-6.svg"/>

						<h3>Valuable Meal</h3>
								<p>At the heart of commitment to providing a valuable meal with the finest and freshest ingredients.</p>
					</div>
				</div>
				<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="flip-up"  data-aos-delay="500" data-aos-duration="600">
					<div class="card-text-data two">
						<img class="on" alt="icon" src="../assets/img/service-icon-7.svg"/>
						<img class="off" alt="icon" src="../assets/img/service-icon-8.svg"/>

						<h3>Variety
								Food</h3>
								<p>We have meticulously assembled a tantalizing array of flavors, textures, and aromas that harmonize to create a symphony of taste sensations. </p>
					</div>
				</div>
			</div>
		</div>
	</section>

	


	
        </div>


    );
}
