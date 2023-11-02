import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import axiosClient from "../../axios-client.js";

import { useStateContext } from "../../contexts/ContextProvider";

export default function ContactUs() {

	const { user, setUser, setNotification } = useStateContext();
	const [validated, setValidated] = useState(false);
	const [contactus, setContactUs] = useState({
		id: null,
		username: "",
		email: "",
		description: "",
		image: "",

	});



	

	//when user click on submit button
	const handleSubmit = async (event) => {
	
		event.preventDefault();
		event.stopPropagation();
		setValidated(true);
		const form = event.currentTarget;

		if (form.checkValidity()) {
			var payload
			if (!user) {
				payload = {
					...contactus,
				};
			} else {
				payload = {
					...contactus,
					image: user.image
				};
			}

			console.log(payload)



			try {
				await axiosClient
					.post("/contactus", payload)
					.then((data) => {
						console.log(data)
						setNotification("Your Message Has Been Succesfully Uploaded!");

					});
			} catch (error) {
				console.log(error);
			}

		}

	};

	useEffect(() => {
		if (user) {
		  setContactUs({
			...contactus,
			'username': user.name,
			'email': user.email
		  });
		}
	  }, []);

	//handle on change field
	const handleChange = (e) => {
		setContactUs({ ...contactus, [e.target.name]: e.target.value })

	}

	return (

		<div>

			<section class="hero-section about gap" style={{ backgroundImage: 'url(../assets/img/background-3.png)' }}>
				<div class="container">
					<div class="row align-items-center">
						<div class="col-xl-12 col-lg-12" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
							<div class="about-text">
								<ul class="crumbs d-flex">
									<li><a href="index.html">Home</a></li>
									<li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i>Contacts</a></li>
								</ul>
								<h2>Contact us</h2>
								<p>We value your feedback, inquiries, and the opportunity to assist you in any way we can. Please don't hesitate to reach out to us using any of the following methods: </p>
							</div>
							<div class="row">
								<div class="col-lg-4 col-md-4 col-sm-12">
									<div class="address">
										<i class="fa-solid fa-location-dot"></i>
										<h5>lot 6.39.00, 168, Jln Bukit Bintang, Bukit Bintang, 55100 Kuala Lumpur, Federal Territory of Kuala Lumpur</h5>
									</div>
								</div>
								<div class="col-lg-4 col-md-4 col-sm-12">
									<div class="address">
										<i class="fa-solid fa-envelope"></i>
										<a href="mailto:quick.info@mail.net"><h6>GrandImperial@gmail.com</h6></a>
										<span>Submit Any Request</span>
										<a href="mailto:quick.info@mail.net"><h6>GrandImperialQuick.info@gmail.net</h6></a>
										<span>Submit A Complaint Request</span>
									</div>
								</div>
								<div class="col-lg-4 col-md-4 col-sm-12">
									<div class="address">
										<i class="fa-solid fa-phone"></i>
										<a href="callto:+14253261627"><h6>+03-2110 2978</h6></a>
										<span>Tel No.</span>
										<a href="callto:+14253261627"><h6>+03-2110 2913 </h6></a>
										<span>Fax No.</span>
									</div>
								</div>
							</div>
						</div>
						{/* <div class="col-xl-6 col-lg-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">
							<div class="contact-us-img">
								<img alt="contacts-img-girl" src="../assets/img/contacts-1.png" />
							</div>

						</div> */}
					</div>
				</div>
			</section>


			<section class="gap margin-gap">
				<div class="container">
					<div class="row">
						<div class="col-lg-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">
							<div class="contact-map-data">
								<div class="join-courier content">
									<h3>Get in touch with us - Rating Form </h3>
									<p>Your feedback is invaluable to us. If you have any complaints, suggestions, or general feedback, we encourage you to submit them through our convenient Rating Form.</p>
									<form
										action="#"
										method="POST"
										className={`blog-form needs-validation ${validated ? 'was-validated' : ''}`}
										encType="multipart/form-data"
										noValidate
										onSubmit={handleSubmit}
									>
										<div class="name-form">
											<i class="fa-regular fa-user"></i>
											<input
												type="text"
												name="username"
												placeholder="Enter your name"
												className="form-control"
												required
												data-bs-toggle="tooltip"
												data-bs-placement="top"
												value={user && user.name}
												onChange={handleChange}
												pattern=".{3,}" // Enforce a minimum length of 3 characters
												title="Full Name must contain at least 3 characters."
											/>
											<div className="valid-tooltip customTooltip">Looks good!</div>
											<div className="invalid-tooltip customTooltip">Full Name must contain at least 3 characters.</div>
										</div>
										<div class="name-form">
											<i class="fa-regular fa-envelope"></i>
											<input
												type="email"
												name="email"
												placeholder="Enter your email"
												className="form-control"
												required
												value={user && user.email}
												data-bs-toggle="tooltip"
												data-bs-placement="top"
												onChange={handleChange}
											/>

											<div className="valid-tooltip customTooltip">Looks good!</div>
											<div className="invalid-tooltip customTooltip">Please Enter A Valid Email.</div>

										</div>
										<div class="name-form">
											<textarea
												name="description"
												placeholder="Enter your message"
												className="form-control"
												required
												data-bs-toggle="tooltip"
												data-bs-placement="top"
												onChange={handleChange}
											/>
										</div>
										<div className="valid-tooltip customTooltip">Looks good!</div>
										<div className="invalid-tooltip customTooltip">Please Enter Message</div>
										<button class="button-price">Submit Application</button>
									</form>

								</div>
								<div class="contact-map">
									<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15935.17027201124!2d101.7137242!3d3.1493533!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3755a1119a3d%3A0xe92e0dad93dc11d!2sGrand%20Imperial%20Restaurant%20Pavilion%20KL%20(Level%206)!5e0!3m2!1sen!2smy!4v1688841908752!5m2!1sen!2smy" width="600" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Helmet>
				<link rel="stylesheet" href="../../../assets/css/contactus.css" />
			</Helmet>
		</div>


	);
}
