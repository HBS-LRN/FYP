import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../contexts/NotificationProvider.jsx";
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
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const { setWarningNotification } = useNotificationContext();
    const isActive = (paths) => {
        const pathArray = Array.isArray(paths) ? paths : [paths];
        return pathArray.some((path) => location.pathname.startsWith(path)) ? 'active' : '';
    };
    const isHomeActive = () => {
        // Check if the current path is not in the specified paths
        return !isActive(['/nutritionMenuCard/', '/categoryMenuCard', '/orderMenuCard/', '/reservationForm', '/about', '/faq', '/contact']) ? 'active' : '';
    };
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

        if (!user) {
            setWarningNotification('Login First', 'You Are Required To Login To See Your Cart');
            navigate('login')
        } else {
            document.body.classList.add('active');
            getShoppingCarts();
        }
    };

    const handleMenuCloseBtnClick = () => {
        document.body.classList.remove('active');

    }


    //fetch shopping cart data
    useEffect(() => {
        getShoppingCarts();
    }, [cartQuantity])

    const getShoppingCarts = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`/userShoppingCart/${user.id}`)
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

    // Decrease the quantity by 1, but ensure it doesn't go below 0
    const decreaseQuantity = (shoppingCartId) => {
        const mealToUpdate = shoppingCarts.find((meal) => meal.pivot.id === shoppingCartId);
        if (mealToUpdate && mealToUpdate.pivot.shopping_cart_qty > 1) {
            updateQuantity(shoppingCartId, -1);
        }
    };



    const increaseQuantity = async (shoppingCartId, increment) => {
        const meal = shoppingCarts.find((item) => item.pivot.id === shoppingCartId);

        console.log(meal)
        const ingredientShortages = [];

        meal.meal_ingredients.forEach((mealIngredient) => {
            if (mealIngredient.ingredient.stock < (meal.pivot.shopping_cart_qty + increment) * mealIngredient.unit) {
                ingredientShortages.push({
                    ingredientName: mealIngredient.ingredient.ingredient_name,
                    requiredStock: (meal.pivot.shopping_cart_qty + increment) * mealIngredient.unit,
                    availableStock: mealIngredient.ingredient.stock,
                });
            }
        });

        if (ingredientShortages.length === 0) {
            // No ingredient shortages, proceed to update quantity
            await updateQuantity(shoppingCartId, increment);
        } else {
            // Notify about insufficient stock for each ingredient
            for (const shortage of ingredientShortages) {
                setWarningNotification(
                    "Insufficient Stock, Cannot Add More",
                    `Meal For ${shortage.ingredientName} for ${meal.pivot.shopping_cart_qty + increment} requires ${shortage.requiredStock}g, but there are only ${shortage.availableStock}g available.`
                );
            }
        }
    };

    //hanlde delete shopping cart
    const onDeleteClick = async shoppingCart => {

        setShoppingCarts((prevShoppingCarts) =>
            prevShoppingCarts.filter((meal) => meal.pivot.id !== shoppingCart.pivot.id)
        );


        try {
            await axiosClient.delete(`/shoppingCart/${shoppingCart.pivot.id}`)
            // The API call will update the quantity in the API with the new value
            setCartQuantity(prevQuantity => prevQuantity - 1);

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
                                    <a href="#" class="menu-btn" onClick={handleMenuBtnClick}>
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
                                    <li className={`navbar-dropdown ${isHomeActive()}`}>
                                        <a href="/">Home</a>
                                    </li>
                                    <li className={`navbar-dropdown ${isActive(['/nutritionMenuCard/', '/orderMenuCard/', '/categoryMenuCard'])}`}>
                                        <a href="#">Order</a>
                                        <div class="dropdown">
                                            <Link to="/nutritionMenuCard/8">Healthy Recipe</Link>
                                            <Link to="/orderMenuCard/1">Appertize Recipe</Link>
                                            <Link to="/orderMenuCard/2">Dimsum Receipt</Link>
                                            <Link to="/orderMenuCard/3">Noodle Receipt</Link>
                                            <Link to="/orderMenuCard/4">Rice Receipt</Link>
                                            <Link to="/orderMenuCard/5">Chicken Receipt</Link>
                                            <Link to="/orderMenuCard/6">Beverage Receipt</Link>

                                        </div>
                                    </li>
                                    <li className={`navbar-dropdown ${isActive('/reservationForm')}`}>
                                        <Link to="/reservationForm">Reservation</Link>
                                    </li>

                                    <li className={`navbar-dropdown ${isActive('/about')}`}>
                                        <Link to="/about">About Us</Link>
                                    </li>
                                    <li className={`navbar-dropdown ${isActive('/faq')}`}>
                                        <Link to="/faq">FAQ</Link>
                                    </li>
                                    <li className={`navbar-dropdown ${isActive('/contact')}`}>
                                        <Link to="/contact">Contacts</Link>
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


                                                    <Link to="/profile" className="dropdown-item">My Profile</Link>

                                                    <a href="/orderStatus" className="dropdown-item">My Purchases</a>
                                                    <Link to="/myReservation" className="dropdown-item">My Reservations</Link>
                                                    <Link to="/addresses" className="dropdown-item">My Addresses</Link>

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

                                        {shoppingCarts.length === 0 &&
                                            <div class="text-center">
                                                <br />
                                                <br />
                                                <br />

                                                <img alt="no-item-found" src="../../../assets/img/noitemsfound.png" width="235"
                                                    height="251" />
                                                <p>Your Cart Is Currently Empty!</p>


                                            </div>
                                        }

                                      
                                            {!loading && shoppingCarts.map((m) => (

                                                <li class="price-list">
                                                    <i class="closeButton fa-solid fa-xmark" onClick={ev => onDeleteClick(m)}></i>
                                                    <div class="counter-container">
                                                        <div class="counter-food">
                                                            <img alt="food-dish" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${m.meal_image}`} width="140"
                                                                height="121" />

                                                            <h4>{m.meal_name}</h4>
                                                        </div>
                                                        <div class="col-lg-3">
                                                            <h3>RM{m.meal_price * m.pivot.shopping_cart_qty}</h3>
                                                        </div>
                                                    </div>
                                                    <div class="price">
                                                        <div class="priceList">
                                                            <h2>RM {m.meal_price}</h2>
                                                            <span>Sum</span>
                                                        </div>
                                                        <div class="priceButton">
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
                                                                    onClick={() => increaseQuantity(m.pivot.id, 1)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <span>Quantity</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        
                                    </ul>

                                    {shoppingCarts.length !== 0 &&
                                        <>
                                        <div class="totel-price">
                                                <span>Total order:</span>
                                                <h5>RM{calculateTotalPrice()}</h5>
                                            </div>
                                            <div class="totel-price">
                                                <span>Delivery Fee: </span>
                                                <h5>RM5</h5>
                                            </div>
                                            <div class="totel-price">
                                                <span>To pay:</span>
                                                <h2>RM {calculateTotalPrice() + 5}</h2>
                                            </div>
                                            <button class="button-price" onClick={ev => onNavigateClick()}>Checkout</button>
                                        </>
                                    }
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

                                <li><a href="/">Home</a>
                                </li>



                                <li class="menu-item-has-children"><a href="#">Order</a>

                                    <ul class="sub-menu">


                                        <li> <a href="/nutritionMenuCard/8">Healthy Recipe</a></li>
                                        <li> <a href="/orderMenuCard/1">Appertize Recipe</a></li>
                                        <li> <a href="/orderMenuCard/2">Dimsum Receipt</a></li>
                                        <li> <a href="/orderMenuCard/3">Noodle Receipt</a></li>
                                        <li> <a href="/orderMenuCard/4">Rice Receipt</a></li>
                                        <li> <a href="/orderMenuCard/5">Chicken Receipt</a></li>
                                        <li> <a href="/orderMenuCard/6">Beverage Receipt</a></li>

                                    </ul>

                                </li>


                                <li><a href="/reservationForm">Reservation</a></li>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/faq">FAQ</a></li>
                                <li><a href="/contact">Contacts</a></li>
                                {user &&
                                    <>
                                        <li><a href="/orderStatus" className="dropdown-item">My Purchases</a></li>
                                        <li><a onClick={onLogout} href="#">Logout</a></li>
                                    </>
                                }
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
                                <li><Link to="https://www.facebook.com/GrandImperialGroup/"><i class="fa-brands fa-facebook-f"></i></Link></li>
                                <li><Link to="https://www.instagram.com/grandimperialgroup/?hl=en"><i class="fa-brands fa-instagram"></i></Link></li>
                                <li><Link to="https://web.whatsapp.com/"><i class="fa-brands fa-twitter"></i></Link></li>
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
