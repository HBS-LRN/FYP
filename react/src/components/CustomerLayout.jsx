import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";

import '../../assets/css/style.css';
import '../../assets/css/owl.carousel.min.css';
import '../../assets/css/owl.theme.default.min.css';
import '../../assets/css/nice-select.css';
import '../../assets/css/aos.css';
import '../../assets/css/responsive.css';
import '../../assets/css/color.css';


export default function CustomerLayout() {


    const { user, setUser, setToken, setCartQuantity, cartQuantity } = useStateContext()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const onLogout = ev => {
        ev.preventDefault();

        const payload = {
            user_id: user.id

        };
        axiosClient.post('/logout', payload)
            .then(() => {
                setUser(null);
                setToken(null);
                setCartQuantity(null);

                navigate("/login");
                window.location.reload();
            });
    };

    //this is to handle item cart
    const handleMenuBtnClick = () => {
        document.body.classList.add('active');
    };

    const handleMenuCloseBtnClick = () => {
        document.body.classList.remove('active');

    }


    //fetch categories data
    useEffect(() => {
        getShoppingCarts();
    }, [])

    const getShoppingCarts = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`/shoppingCart/${user.id}`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setShoppingCarts(data)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }



    //update shopping cart quantity
    const updateQuantity = async (shoppingCartId, increment) => {
        setShoppingCarts((prevShoppingCarts) =>
            prevShoppingCarts.map((meal) => {
                if (meal.pivot.id === shoppingCartId) {
                    // Create a new object with the updated shopping_cart_qty
                    return {
                        ...meal,
                        pivot: {
                            ...meal.pivot,
                            shopping_cart_qty: meal.pivot.shopping_cart_qty + increment
                        }
                    };
                }
                return meal;
            })
        );

        const updatedQuantity = shoppingCarts.find((meal) => meal.pivot.id === shoppingCartId).pivot.shopping_cart_qty;

        const payload = {
            id: shoppingCartId,
            shopping_cart_qty: updatedQuantity + increment
        };

        try {
            await axiosClient.put(`/shoppingCart/${shoppingCartId}`, payload);
            // The API call will update the quantity in the API with the new value
        } catch (error) {
            const response = error.response;
            console.log(error);
        }
    };

    const decreaseQuantity = (shoppingCartId) => {
        updateQuantity(shoppingCartId, -1);
    };

    const increaseQuantity = (shoppingCartId) => {
        updateQuantity(shoppingCartId, 1);
    };

    //hanlde delete shopping cart
    const onDeleteClick = async shoppingCart => {

        setShoppingCarts((prevShoppingCarts) =>
            prevShoppingCarts.filter((meal) => meal.pivot.id !== shoppingCart.pivot.id)
        );
        //display notification using sweet alert
        try {
            await axiosClient.delete(`/shoppingCart/${shoppingCart.pivot.id}`)
            // The API call will update the quantity in the API with the new value


        } catch (error) {
            const response = error.response;
            console.log(error);
        }



    }


    // Calculate the total price for each item in your shopping cart
    const calculateItemTotalPrice = (meal) => {
        return meal.pivot.shopping_cart_qty * meal.meal_price;
    };

    // Calculate the overall total price for the entire shopping cart
    const calculateTotalPrice = () => {
        return shoppingCarts.reduce((total, meal) => {
            return total + calculateItemTotalPrice(meal);
        }, 0);
    };

     //hanlde navigation
     const onNavigateClick = () => {

       navigate("checkout")
        // Scroll to the top of the screen window
        window.scrollTo(0, 0);
       document.body.classList.remove('active');


    }
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
                                <a href="/" class="imgbox">
                                    <img src="../assets/img/GrandImperialGroupLogoHeader.png" alt="" srcset="" />
                                    <img src="../assets/img/GrandImperialGroupLogoWord.png" alt="" />

                                </a>
                                <div class="extras bag">
                                    <a href="#" class="menu-btn">
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
                                        <a href="/">Home</a>
                                    </li>
                                    <li class="navbar-dropdown">
                                        <a href="#">Order</a>
                                        <div class="dropdown">
                                            <a href="#">Healthy Recipe</a>
                                            <a href="#">Dimsum Recipe</a>
                                            <a href="#">Appertizer Receipt</a>
                                            <a href="#">Chicken Receipt</a>
                                            <a href="#">Noodle Receipt</a>
                                            <a href="#">Rice Receipt</a>
                                            <a href="#">Beverage Receipt</a>

                                        </div>
                                    </li>
                                    <li class="navbar-dropdown">
                                        <a href="/reservationForm">Reservation</a>
                                    </li>

                                    <li class="navbar-dropdown">
                                        <a href="/about">About Us</a>
                                    </li>

                                    <li class="navbar-dropdown">
                                        <a href="/faq">FAQ</a>

                                    </li>
                                    <li class="navbar-dropdown">
                                        <a href="/contact">Contacts</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="col-lg-3">
                            <div class="extras bag">
                                <a href="#" id="desktop-menu" class="menu-btn" onClick={handleMenuBtnClick}>


                                    <i class="fa-solid fa-bag-shopping"></i></a>
                                {cartQuantity !== undefined && cartQuantity > 0 && (
                                    <span className="MealOrderQty">{cartQuantity}</span>
                                )}<span id="cart"></span>


                                {!user ? (
                                    <div className="loginCustomButton">

                                        <a href="/login" class="button button-2"><i class="fas fa-user"></i>Login/Register</a>
                                    </div>

                                ) : (


                                    <div>
                                        {user && user.image ? (

                                            <img
                                                src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                                                width="50" height="50"
                                            />

                                        ) : (
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        )}
                                        <span class="span">
                                            HI! {user.name}
                                            <div className="dropdown profileIcon float-end">
                                                <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">



                                                </a>
                                                <br />
                                                <div className="dropdown-menu dropdown-menu-end">


                                                    <a href="/profile" className="dropdown-item">My Profile</a>

                                                    <a href="/orderStatus" className="dropdown-item">My Purchases</a>
                                                    <a href="/myReservation" className="dropdown-item">My Reservations</a>
                                                    <a href="/addresses" className="dropdown-item">My Addresses</a>

                                                    <a onClick={onLogout} href="#" className="dropdown-item">Log Out</a>

                                                </div>
                                            </div>

                                        </span>
                                    </div>

                                )}






                            </div>
                        </div>
                        <div class="menu-wrap">
                            <div class="menu-inner ps ps--active-x ps--active-y">
                                <span class="menu-cls-btn" onClick={handleMenuCloseBtnClick}><i class="cls-leftright"></i><i class="cls-rightleft"></i></span>
                                <div class="checkout-order">
                                    <div class="title-checkout">
                                        <h2>My Carts</h2>
                                    </div>
                                    {loading &&
                                        <div class="text-center">
                                            <div class="loaderCustom2"></div>
                                        </div>
                                    }
                                    <ul>

                                        <div class="scroll-wrap">
                                            {!loading && shoppingCarts.map((m) => (

                                                <li class="price-list">
                                                    <i class="closeButton fa-solid fa-xmark" onClick={ev => onDeleteClick(m)}></i>
                                                    <div class="counter-container">
                                                        <div class="counter-food">
                                                            <img alt="food-dish" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${m.meal_image}`} width="160"
                                                                height="121" />

                                                            <h4>{m.meal_name}</h4>
                                                        </div>
                                                        <h3>RM{m.meal_price * m.pivot.shopping_cart_qty}</h3>
                                                    </div>
                                                    <div class="price">
                                                        <div>
                                                            <h2>RM {m.meal_price}</h2>
                                                            <span>Sum</span>
                                                        </div>
                                                        <div>
                                                            <div class="qty-input">
                                                                <button
                                                                    className="qty-count qty-count--minus"
                                                                    data-action="minus"
                                                                    type="button"
                                                                    onClick={() => decreaseQuantity(m.pivot.id)}
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    class="product-qty"
                                                                    type="number"
                                                                    name="product-qty"
                                                                    min="0"
                                                                    value={m.pivot.shopping_cart_qty}


                                                                ></input>


                                                                <button
                                                                    className="qty-count qty-count--add"
                                                                    data-action="add"
                                                                    type="button"
                                                                    onClick={() => increaseQuantity(m.pivot.id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <span>Quantity</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}

                                            <li class="price-list">
                                                <i class="closeButton fa-solid fa-xmark"></i>
                                                <div class="counter-container">
                                                    <div class="counter-food">
                                                        <img alt="food" src="../assets/img/order-2.png"></img>
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
                                                            <button class="qty-count qty-count--minus" data-action="minus"
                                                                type="button">-</button>
                                                            <input
                                                                class="product-qty"
                                                                type="number"
                                                                name="product-qty"
                                                                min="0"
                                                                defaultValue="1" // Use defaultValue instead of value
                                                            ></input>
                                                            <button class="qty-count qty-count--add" data-action="add"
                                                                type="button">+</button>
                                                        </div>
                                                        <span>Quantity</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    </ul>
                                    <div class="totel-price">
                                        <span>Total order:</span>
                                        <h5>RM {calculateTotalPrice()}</h5>
                                    </div>
                                    <div class="totel-price">
                                        <span>Delivery Fee: </span>
                                        <h5>RM 5</h5>
                                    </div>
                                    <div class="totel-price">
                                        <span>To pay:</span>
                                        <h2>RM {calculateTotalPrice() + 5}</h2>
                                    </div>
                                    <button class="button-price" onClick={ev => onNavigateClick()}>Checkout</button>

                                </div>
                            </div>
                        </div>
                        <div class="mobile-nav hmburger-menu" id="mobile-nav" style={{ display: 'block' }}>


                            <div class="res-log">
                                <a href="index.html">
                                    <img src="../assets/img/GrandImperialGroupLogoHeader.png" alt="" srcset="" width="50" height="50" />
                                    <img src="../assets/img/GrandImperialGroupLogoWord.png" alt="" width="50" height="50" />
                                </a>
                            </div>

                            <ul>

                                <li><a href="index.html">Home</a>
                                </li>

                                <li><a href="about.html">About Us</a></li>

                                <li class="menu-item-has-children"><a href="#">Restaurants</a>

                                    <ul class="sub-menu">

                                        <li><a href="restaurants.html">Restaurants</a></li>
                                        <li><a href="restaurant-card.html">Restaurant Card</a></li>
                                        <li><a href="checkout.html">Checkout</a></li>
                                    </ul>

                                </li>
                                <li class="menu-item-has-children"><a href="#">Pages</a>

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

                            <a href="#" id="res-cross"></a>
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
                                    <img src="../assets/img/GrandImperialGroupLogoHeader.png" alt="" srcset="" width="50" height="50" />

                                </a>
                                <h2>The Best Restaurants
                                    in Your Home</h2>
                                <p>Enjoy The Personalized Nutrition-Based Food Ordering and Floor Plan Mapping Reservation Technique!</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="menu">
                                <h4>Menu</h4>
                                <ul class="footer-menu">
                                    <li><a href="/">home<i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li><a href="/about">about us<i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li><a href="/faq">FAQ<i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li><a href="/contact">Contacts<i class="fa-solid fa-arrow-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="menu contacts">
                                <h4>Contacts</h4>
                                <div class="footer-location">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>Lot 6 . 39 . 00, 168, Jln Bukit Bintang, Bukit Bintang, 55100 Kuala Lumpur, Federal Territory of Kuala Lumpur</p>
                                </div>
                                <a href="mailto:quickeat@mail.net"><i class="fa-solid fa-envelope"></i>GrandImperial@gmail.com</a>
                                <a href="callto:+14253261627"><i class="fa-solid fa-phone"></i>+03-2110 2913</a>
                            </div>
                            <ul class="social-media">
                                <li><a href="https://www.facebook.com/GrandImperialGroup/"><i class="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="https://www.instagram.com/grandimperialgroup/?hl=en"><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href="https://web.whatsapp.com/"><i class="fa-brands fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-two gap no-bottom">
                        <p>Copyright © 2023. Grand Imperial Group. All rights reserved.</p>

                    </div>
                </div>
            </footer>
        </body>



    );
}
