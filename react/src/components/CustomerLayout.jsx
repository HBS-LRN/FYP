import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";



import '../../assets/css/style.css';

import '../../assets/css/owl.carousel.min.css';
import '../../assets/css/owl.theme.default.min.css';
import '../../assets/css/nice-select.css';
import '../../assets/css/aos.css';
import '../../assets/css/responsive.css';
import '../../assets/css/color.css';


export default function CustomerLayout() {

    //this is to handle item cart
    const handleMenuBtnClick = () => {

        document.body.classList.add('active');

    };

    const handleMenuCloseBtnClick = () => {

        document.body.classList.remove('active');

    };




    return (


        <body class="menu-layer">
            <div class="page-loader">
                <div class="wrapper">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <span>Loading</span>
                </div>
            </div>

            <header>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-2">
                            <div class="header-style">
                                <a href="index.html" class="imgbox">
                                    <img src="../assets/img/GrandImperialGroupLogoHeader.png" alt="" srcset="" />
                                    <img src="../assets/img/GrandImperialGroupLogoWord.png" alt="" />

                                </a>
                                <div class="extras bag">
                                    <a href="javascript:void(0)" class="menu-btn">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </a>
                                    <div class="bar-menu">
                                        <i class="fa-solid fa-bars"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-7">
                            <nav class="navbar">
                                <ul class="navbar-links">
                                    <li class="navbar-dropdown active">
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li class="navbar-dropdown">
                                        <a href="about.html">About Us</a>
                                    </li>
                                    <li class="navbar-dropdown">
                                        <a href="#">Restaurants</a>
                                        <div class="dropdown">
                                            <a href="restaurants.html">Restaurants</a>
                                            <a href="restaurant-card.html">Restaurant Card</a>
                                            <a href="checkout.html">Checkout</a>
                                        </div>
                                    </li>
                                    <li class="navbar-dropdown">
                                        <a href="#">Pages</a>
                                        <div class="dropdown">
                                            <a href="blog.html">Blog</a>
                                            <a href="single-blog.html">Single Blog</a>
                                            <a href="services.html">Services</a>
                                            <a href="faq.html">FAQ</a>
                                            <a href="pricing-table.html">Pricing Table</a>
                                            <a href="become-partner.html">Become A Partner</a>
                                            <a href="404.html">404</a>
                                        </div>
                                    </li>
                                    <li class="navbar-dropdown">
                                        <a href="contacts.html">Contacts</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="col-lg-3">
                            <div class="extras bag">
                                <a href="javascript:void(0)" id="desktop-menu" class="menu-btn" onClick={handleMenuBtnClick}>

                                    <i class="fa-solid fa-bag-shopping"></i></a>
                                <a href="restaurants.html" class="button button-2"><i class="fas fa-user"></i>Login/Register</a>
                            </div>
                        </div>
                        <div class="menu-wrap">
                            <div class="menu-inner ps ps--active-x ps--active-y">
                                <span class="menu-cls-btn" onClick={handleMenuCloseBtnClick}><i class="cls-leftright"></i><i class="cls-rightleft"></i></span>
                                <div class="checkout-order">
                                    <div class="title-checkout">
                                        <h2>My Orders</h2>
                                    </div>
                                    <div class="banner-wilmington">
                                        <img alt="logo" src="../assets/img/logo-s.jpg" />
                                        <h6>Kennington Lane Cafe</h6>
                                    </div>
                                    <ul>
                                        <li class="price-list">
                                            <i class="closeButton fa-solid fa-xmark"></i>
                                            <div class="counter-container">
                                                <div class="counter-food">
                                                    <img alt="food" src="../assets/img/order-1.png" />
                                                    <h4>Pasta, kiwi and sauce chilli</h4>
                                                </div>
                                                <h3>$39</h3>
                                            </div>
                                            <div class="price">
                                                <div>
                                                    <h2>$39</h2>
                                                    <span>Sum</span>
                                                </div>
                                                <div>
                                                    <div class="qty-input">
                                                        <button class="qty-count qty-count--minus" data-action="minus"
                                                            type="button">-</button>
                                                        <input class="product-qty" type="number" name="product-qty" min="0"
                                                            value="1"></input>
                                                        <button class="qty-count qty-count--add" data-action="add"
                                                            type="button">+</button>
                                                    </div>
                                                    <span>Quantity</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="price-list">
                                            <i class="closeButton fa-solid fa-xmark"></i>
                                            <div class="counter-container">
                                                <div class="counter-food">
                                                    <img alt="food" src="../assets/img/order-2.png"></img>
                                                    <h4>Rice with shrimps and kiwi</h4>
                                                </div>
                                                <h3>$49</h3>
                                            </div>
                                            <div class="price">
                                                <div>
                                                    <h2>$49</h2>
                                                    <span>Sum</span>
                                                </div>
                                                <div>
                                                    <div class="qty-input">
                                                        <button class="qty-count qty-count--minus" data-action="minus"
                                                            type="button">-</button>
                                                        <input class="product-qty" type="number" name="product-qty" min="0"
                                                            value="1"></input>
                                                        <button class="qty-count qty-count--add" data-action="add"
                                                            type="button">+</button>
                                                    </div>
                                                    <span>Quantity</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="totel-price">
                                        <span>Total order:</span>
                                        <h5>$137</h5>
                                    </div>
                                    <div class="totel-price">
                                        <span>To pay:</span>
                                        <h2>$137</h2>
                                    </div>
                                    <button class="button-price">Checkout</button>

                                </div>
                            </div>
                        </div>
                        <div class="mobile-nav hmburger-menu" id="mobile-nav" style={{ display: 'block' }}>


                            <div class="res-log">
                                <a href="index.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="163" height="38" viewBox="0 0 163 38">
                                        <g id="Logo-m" transform="translate(-260 -51)">
                                            <g id="Logo-2-m" data-name="Logo" transform="translate(260 51)">
                                                <g id="Elements-m">
                                                    <path id="Path_3429" data-name="Path 3429"
                                                        d="M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z"
                                                        transform="translate(-270.155 -115.396)" fill="#f29f05" />
                                                    <path id="Path_3430" data-name="Path 3430"
                                                        d="M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z"
                                                        transform="translate(-264.176 -113.935)" fill="#fff" />
                                                    <path id="Path_3431" data-name="Path 3431"
                                                        d="M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z"
                                                        transform="translate(-266.247 -108.544)" fill="#363636" />
                                                    <path id="Path_3432" data-name="Path 3432"
                                                        d="M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z"
                                                        transform="translate(-264.027 -108.446)" fill="#363636" />
                                                    <path id="Path_3433" data-name="Path 3433"
                                                        d="M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z"
                                                        transform="translate(-271.815 -108.923)" fill="#f29f05" />
                                                    <path id="Path_3434" data-name="Path 3434"
                                                        d="M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z"
                                                        transform="translate(-264.154 -116.667)" fill="#f29f05" />
                                                    <path id="Path_3435" data-name="Path 3435"
                                                        d="M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z"
                                                        transform="translate(-270.84 -107.068)" fill="#363636" />
                                                    <path id="Path_3436" data-name="Path 3436"
                                                        d="M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z"
                                                        transform="translate(-269.379 -105.218)" fill="#363636" />
                                                </g>
                                            </g>
                                            <text id="Quickeat-m" transform="translate(320 77)" fill="#363636" font-size="20"
                                                font-family="Poppins" font-weight="700">
                                                <tspan x="0" y="0">QUICK</tspan>
                                                <tspan y="0" fill="#f29f05">EAT</tspan>
                                            </text>
                                        </g>
                                    </svg>
                                </a>
                            </div>

                            <ul>

                                <li><a href="index.html">Home</a>
                                </li>

                                <li><a href="about.html">About Us</a></li>

                                <li class="menu-item-has-children"><a href="JavaScript:void(0)">Restaurants</a>

                                    <ul class="sub-menu">

                                        <li><a href="restaurants.html">Restaurants</a></li>
                                        <li><a href="restaurant-card.html">Restaurant Card</a></li>
                                        <li><a href="checkout.html">Checkout</a></li>
                                    </ul>

                                </li>
                                <li class="menu-item-has-children"><a href="JavaScript:void(0)">Pages</a>

                                    <ul class="sub-menu">

                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="single-blog.html">Single Blog</a></li>
                                        <li><a href="services.html">Services</a></li>
                                        <li><a href="faq.html">FAQ</a></li>
                                        <li><a href="pricing-table.html">Pricing Table</a></li>
                                        <li><a href="become-partner.html">Become A Partner</a></li>
                                        <li><a href="404.html">404</a></li>
                                    </ul>

                                </li>

                                <li><a href="contact.html">contacts</a></li>

                            </ul>

                            <a href="JavaScript:void(0)" id="res-cross"></a>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>


            <footer class="gap no-bottom" style={{ backgroundColor: '#363636' }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5 col-md-6 col-sm-12">
                            <div class="footer-description">
                                <a href="index.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="163" height="38" viewBox="0 0 163 38">
                                        <g id="Logo-w" transform="translate(-260 -51)">
                                            <g id="Logo-2-w" data-name="Logo-w" transform="translate(260 51)">
                                                <g id="Elements-w">
                                                    <path id="Path_2429" data-name="Path 2429"
                                                        d="M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z"
                                                        transform="translate(-270.155 -115.396)" fill="#f29f05" />
                                                    <path id="Path_2430" data-name="Path 2430"
                                                        d="M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z"
                                                        transform="translate(-264.176 -113.935)" fill="#fff" />
                                                    <path id="Path_2431" data-name="Path 2431"
                                                        d="M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z"
                                                        transform="translate(-266.247 -108.544)" fill="#fff" />
                                                    <path id="Path_2432" data-name="Path 2432"
                                                        d="M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z"
                                                        transform="translate(-264.027 -108.446)" fill="#fff" />
                                                    <path id="Path_2433" data-name="Path 2433"
                                                        d="M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z"
                                                        transform="translate(-271.815 -108.923)" fill="#f29f05" />
                                                    <path id="Path_2434" data-name="Path 2434"
                                                        d="M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z"
                                                        transform="translate(-264.154 -116.667)" fill="#f29f05" />
                                                    <path id="Path_2435" data-name="Path 2435"
                                                        d="M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z"
                                                        transform="translate(-270.84 -107.068)" fill="#fff" />
                                                    <path id="Path_2436" data-name="Path 2436"
                                                        d="M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z"
                                                        transform="translate(-269.379 -105.218)" fill="#fff" />
                                                </g>
                                            </g>
                                            <text id="Quickeat-w" transform="translate(320 77)" fill="#fff" font-size="20"
                                                font-family="Poppins" font-weight="700">
                                                <tspan x="0" y="0">QUICK</tspan>
                                                <tspan y="0" fill="#f29f05">EAT</tspan>
                                            </text>
                                        </g>
                                    </svg>
                                </a>
                                <h2>The Best Restaurants
                                    in Your Home</h2>
                                <p>Vitae congue mauris rhoncus aenean. Enim nulla
                                    aliquet porttitor lacus luctus accumsan
                                    tortor posuere. Tempus egestas sed sed risus pretium quam.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="menu">
                                <h4>Menu</h4>
                                <ul class="footer-menu">
                                    <li><a href="index.html">home<i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li><a href="about.html">about us<i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li><a href="restaurants.html">Restaurants<i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li><a href="contacts.html">Contacts<i class="fa-solid fa-arrow-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="menu contacts">
                                <h4>Contacts</h4>
                                <div class="footer-location">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>1717 Harrison St, San Francisco, CA 94103,
                                        United States</p>
                                </div>
                                <a href="mailto:quickeat@mail.net"><i class="fa-solid fa-envelope"></i>quickeat@mail.net</a>
                                <a href="callto:+14253261627"><i class="fa-solid fa-phone"></i>+1 425 326 16 27</a>
                            </div>
                            <ul class="social-media">
                                <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-two gap no-bottom">
                        <p>Copyright © 2022. Quickeat. All rights reserved.</p>
                        <div class="privacy">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms & Services</a>
                        </div>
                    </div>
                </div>
            </footer>
        </body>


    );
}
