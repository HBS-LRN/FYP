import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { PayPalButton } from "react-paypal-button-v2";





export default function CheckOut() {
    const product = {
        id: 1,
        description: "Kiwi",
        price: 100.0, // Set the price directly
    };
    return (

        <div>


            <section className="hero-section about checkout gap" style={{ backgroundImage: 'url(../assets/img/background-3.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12">
                            <div class="about-text pricing-table">
                                <ul class="crumbs d-flex" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                                    <li><a href="index.html">Home</a></li>

                                    <li><a href="index.html"><i class="fa-solid fa-right-long"></i>My Cart</a></li>
                                    <li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i>Checkout</a></li>
                                </ul>
                                <h2 data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">Checkout</h2>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="gap">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-5 col-lg-12" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                            <div class="checkout-order">
                                <div class="title-checkout">
                                    <h2>Your order:</h2>
                                    <h6>3</h6>
                                </div>

                                <ul>
                                    <li class="price-list">
                                        <i class="closeButton fa-solid fa-xmark"></i>
                                        <div class="counter-container">
                                            <div class="counter-food">
                                                <img alt="food" src="../assets/img/order-1.png" />
                                                <h4>Pasta, kiwi and sauce chilli</h4>
                                            </div>
                                            <h3>RM39</h3>
                                        </div>
                                        <div class="price">
                                            <div>
                                                <h2>RM39</h2>
                                                <span>Sum</span>
                                            </div>
                                            <div>
                                                <div class="qty-input">
                                                    <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                    <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                    <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                </div>
                                                <span>Quantity</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="price-list">
                                        <i class="closeButton fa-solid fa-xmark"></i>
                                        <div class="counter-container">
                                            <div class="counter-food">
                                                <img alt="food" src="assets/img/order-2.png" />
                                                <h4>Rice with shrimps and kiwi</h4>
                                            </div>
                                            <h3>RM49</h3>
                                        </div>
                                        <div class="price">
                                            <div>
                                                <h2>RM49</h2>
                                                <span>Sum</span>
                                            </div>
                                            <div>
                                                <div class="qty-input">
                                                    <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                                    <input class="product-qty" type="number" name="product-qty" min="0" value="1" />
                                                    <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
                                                </div>
                                                <span>Quantity</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="totel-price">
                                    <span>Total order:</span>
                                    <h5>RM137</h5>
                                </div>
                                <div class="totel-price">
                                    <span>To pay:</span>
                                    <h2>RM137</h2>
                                </div>

                            </div>
                        </div>
                        <div class="offset-xl-1 col-xl-6 col-lg-12" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                            <form class="checkout-form">
                                <h4>Buyer information</h4>

                                <p>Full Name:</p>
                                <input type="text" name="Name" placeholder="Full Name" class="checkout-name" />

                                <div class="row">

                                    <div class="col-lg-6">
                                        <p>Email:</p>
                                        <input type="text" name="email" placeholder="E-mail" />
                                    </div>

                                    <div class="col-lg-6">
                                        <p>Phone:</p>
                                        <input type="text" name="telephone" placeholder="Phone" />
                                    </div>
                                </div>
                                <h4 class="two">Delivery addresses</h4>


                                <p>Address Username:</p>
                                <input type="text" name="address_username" placeholder="Address Username" />

                                <p>Address Userphone:</p>
                                <input type="text" name="address_userphone" placeholder="Address Userphone" />


                                <p>Street:</p>
                                <input type="text" name="street" placeholder="Street" class="checkout-name" />
                                <div class="row">

                                    <div class="col-lg-6">
                                        <p>City:</p>
                                        <input type="text" name="city" placeholder="City" />
                                    </div>

                                    <div class="col-lg-6">
                                        <p>Postcode:</p>
                                        <input type="number" name="city" placeholder="Postcode" />
                                    </div>
                                </div>

                                <p>State</p>
                                <select class="nice-select Advice">
                                    <option>Kuala Lumpur</option>
                                    <option>California 1</option>
                                    <option>California 2</option>
                                    <option>California 3</option>
                                    <option>California 4</option>
                                </select>



                                <h4 class="two">Payment method</h4>
                                <div class="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Card</button>
                                    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Cash</button>
                                </div>
                                <div class="tab-content" id="v-pills-tabContent">

                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        {/* Keep only one instance of the PayPal button */}
                                        <PayPalButton
                                            options={{
                                                clientId: "AXAKXQa-OkxM7F8T0DWTN1e4KqlTCRP3z7YaMfJb8RjxE4sDY3jTYfekcc_eQO--u7ElQXcVzbAru60K",
                                                currency: "USD",
                                            }}
                                            amount={product.price}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            description: product.description,
                                                            amount: {
                                                                currency_code: "USD",
                                                                value: product.price,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onSuccess={(details, data) => {
                                                alert("Transaction completed by " + details.payer.name.given_name);
                                                console.log({ details, data });
                                            }}
                                        />
                                        <label>
                                            <input type="radio" name="test" value="small" checked />
                                            <img alt="checkbox-img" src="../assets/img/checkbox-1.png" />
                                        </label>

                                        <label>
                                            <input type="radio" name="test" value="big" />
                                            <img alt="checkbox-img" src="../assets/img/checkbox-2.png" />
                                        </label>
                                        <label>
                                            <input type="radio" name="test" value="big" />
                                            <img alt="checkbox-img" src="../assets/img/checkbox-3.png" />
                                        </label>
                                        <p>Card Number:</p>
                                        <input type="number" name="Name" placeholder="Card number" />
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <p>Expiration Date:</p>
                                                <input type="text" name="E-mail" placeholder="Expiration Date" />
                                            </div>
                                            <div class="col-lg-6">
                                                <p>CVV</p>
                                                <input type="password" placeholder="CVV" />
                                            </div>
                                        </div>


                                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">

                                        </div>


                                    </div>
                                </div>
                                <button class="button-price">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>



        </div >





    );
}
