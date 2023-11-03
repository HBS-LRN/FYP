import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import AOS from 'aos';

import OwlCarousel from 'react-owl-carousel2';
import { useNavigate, useParams } from "react-router-dom";
import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";

export default function OrderMenuCard() {






    //react declaration
    const navigate = useNavigate();
    const { user, setCartQuantity,cartQuantity } = useStateContext();
    let { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setDeleteNotification, setSuccessNotification } = useNotificationContext();



    //fetch meal data
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/meal/${id}`)
                .then(({ data }) => {
                    console.log(data);

                    const mealData = data;

                    // Set the initial quantity for each meal to 1
                    const mealsWithQuantity = mealData.map((meal) => ({
                        ...meal,
                        quantity: 1,
                    }));

                    setMeals(mealsWithQuantity);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }
    //fetch categories data
    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`category`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setCategories(data)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }



    const addToCart = meal => {
        // make an API request here to add the meal to the cart
        // Use axios.post to send a POST request to  API endpoint
        // Include the `mealId` and the `quantity` in the request body
        const payload = {
            meal_id: meal.id,
            shopping_cart_qty: meal.quantity,
            user_id: user.id
        };

        try {
            axiosClient.post("/shoppingCart", payload)
                .then(({ data }) => {
                    console.log(data)
                    setSuccessNotification('Shopping Cart Added Successfully ')
                    // Update the cart quantity in the layout
                  
                    setCartQuantity(data);
                    console.log(cartQuantity); // Log the updated value here
                });
        } catch (error) {
            const response = error.response;
            console.log(response);

        }
    };

    const decreaseQuantity = (mealId) => {
        setMeals((prevMeals) =>
            prevMeals.map((meal) => {
                if (meal.id === mealId && meal.quantity > 1) {
                    return { ...meal, quantity: meal.quantity - 1 };
                }
                return meal;
            })
        );
    };

    const increaseQuantity = (mealId) => {
        setMeals((prevMeals) =>
            prevMeals.map((meal) => {
                if (meal.id === mealId) {
                    return { ...meal, quantity: meal.quantity + 1 };
                }
                return meal;
            })
        );
    };
    //handle owl
    const options = {
        loop: true,
        margin: 170,
        dots: true,
        items: 3,

    };



    //handle style
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

                                    <li><a href="index.html"><i class="fa-solid fa-right-long"></i>Category</a></li>
                                    <li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i>Menu</a></li>
                                </ul>
                                <h2 data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">Appertize Menu</h2>

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

                                            {loading &&
                                                <div class="text-center">
                                                    <div class="loaderCustom2"></div>
                                                </div>
                                            }

                                            {!loading && meals && meals
                                                .map((m) => (
                                                    <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                        <div class="dish">
                                                            <img alt="food-dish" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${m.meal_image}`} />
                                                            <div class="dish-foods">
                                                                <h3>{m.meal_name} </h3>
                                                                <div class="dish-icon">

                                                                    <div class="dish-icon end">

                                                                        <i class="info fa-solid fa-circle-info" onClick={handleShowDishInfoClick}></i>

                                                                    </div>
                                                                </div>
                                                                <div class="price">
                                                                    <h2>RM {m.meal_price}</h2>
                                                                    <div class="qty-input">
                                                                        <button
                                                                            className="qty-count qty-count--minus"
                                                                            data-action="minus"
                                                                            type="button"
                                                                            onClick={() => decreaseQuantity(m.id)}
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <input
                                                                            className="product-qty"
                                                                            type="number"
                                                                            name="product-qty"
                                                                            min="1"
                                                                            value={m.quantity}
                                                                            readOnly
                                                                        />
                                                                        <button
                                                                            className="qty-count qty-count--add"
                                                                            data-action="add"
                                                                            type="button"
                                                                            onClick={() => increaseQuantity(m.id)}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                                <button class="button-price" onClick={() => addToCart(m)}>Add to Basket<i class="fa-solid fa-bag-shopping"></i></button>
                                                            </div>
                                                            <div class="dish-info" style={{ display: 'none' }}>
                                                                <i class="info2 fa-solid fa-xmark" onClick={handleHideDishInfoClick}></i>
                                                                <h5>
                                                                    {m.meal_name}
                                                                </h5>

                                                                <p>{m.meal_desc}

                                                                </p>
                                                                <ul class="menu-dish">
                                                                    {m.meal_ingredients.map((meal_ingredient) => (
                                                                        <>
                                                                            <li>{meal_ingredient.ingredient.ingredient_name}</li>

                                                                        </>

                                                                    ))}

                                                                </ul>
                                                                <h5>
                                                                    Rating And Review
                                                                </h5>


                                                                <div className="dropdown float-end">
                                                                    <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">

                                                                        <i class="fa-solid fa-filter"></i>
                                                                        <span class="filter">Filter</span>

                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        {/* item */}
                                                                        <a href="javascript:void(0);" className="dropdown-item">5 Star&nbsp;(8)</a>
                                                                        {/* item */}
                                                                        <a href="javascript:void(0);" className="dropdown-item">4 Star&nbsp;(80)</a>
                                                                        {/* item */}
                                                                        <a href="javascript:void(0);" className="dropdown-item">3 Star&nbsp;(80)</a>
                                                                        {/* item */}
                                                                        <a href="javascript:void(0);" className="dropdown-item">2 Star&nbsp;(80)</a>
                                                                        <a href="javascript:void(0);" className="dropdown-item">1 Star&nbsp; (80)</a>
                                                                    </div>
                                                                </div>
                                                                <div class="overallRating">
                                                                    <h3>
                                                                        4.9 Out Of 5
                                                                        <br />
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>
                                                                        <i class="fa-solid fa-star"></i>

                                                                    </h3>
                                                                    {/* <p> 50 Ratings.</p> */}

                                                                </div>
                                                                <div class="rating-scroll" >
                                                                    <div class="row rating">
                                                                        <div class="col-xl-2 rating-review">
                                                                            <img src="../assets/img/bungsenggg.jpg" />


                                                                        </div>

                                                                        <div class="col-xl-8 col-lg-12  comment">
                                                                            <div>
                                                                                <h6>Thomas Adamson</h6>


                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>

                                                                            </div>
                                                                        </div>
                                                                        <p>
                                                                            Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                                    </div>
                                                                    <div class="row rating">
                                                                        <div class="col-xl-2 rating-review">
                                                                            <img src="../assets/img/bungsenggg.jpg" />


                                                                        </div>

                                                                        <div class="col-xl-8 col-lg-12 comment">
                                                                            <div>
                                                                                <h6>Thomas Adamson</h6>


                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>

                                                                            </div>
                                                                        </div>
                                                                        <p>
                                                                            Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                                    </div>
                                                                    <div class="row rating">
                                                                        <div class="col-xl-2 rating-review">
                                                                            <img src="../assets/img/bungsenggg.jpg" />


                                                                        </div>

                                                                        <div class="col-xl-8 col-lg-12 comment">
                                                                            <div>
                                                                                <h6>Thomas Adamson</h6>


                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>
                                                                                <i class="fa-solid fa-star"></i>

                                                                            </div>
                                                                        </div>
                                                                        <p>
                                                                            Service top notch! Restaurant was very comfortable to dine in. Gotta love the dim sum there! Will definitely go back again</p>

                                                                    </div>
                                                                </div>

                                                            </div>



                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section class="service-shows gap" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-4 col-lg-12">
                            <div class="good-taste">
                                <h2>See Also Others Categories!</h2>
                                <p>This Is Our Overall Categories, Use Your Mouse To Scroll It!!! </p>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-12">
                            {/* <div class="comment-data comment-slide owl-carousel owl-theme"> */}

                            {categories.length > 0 ?
                                <OwlCarousel options={options}> {/* Render data using Owl Carousel */}
                                    {categories && categories.map((category) => (


                                        <div class="col-xl-4 col-lg-6" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                            <div class="category">
                                                <a href={`/orderMenuCard/${category.id}`}>
                                                    <img alt="food-dish" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${category.image}`} width="300" height="340" />
                                                </a>
                                                <div class="dish-foods">
                                                    <h3>{category.name}  Menu </h3>


                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                    {/* <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                        <div class=" category">

                                            <img alt="food-dish" src="../assets/img/chinese-egg-tarts-dan-tat.png" width="300" height="340" />
                                            <div class="dish-foods">
                                                <h3>Appertizer Menu </h3>


                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                        <div class=" category">

                                            <img alt="food-dish" src="../assets/img/hokkien-mee.png" width="300" height="340" />
                                            <div class="dish-foods">
                                                <h3>Appertizer Menu </h3>


                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                        <div class=" category">

                                            <img alt="food-dish" src="../assets/img/chinese-egg-tarts-dan-tat.png" width="300" height="340" />
                                            <div class="dish-foods">
                                                <h3> Menu </h3>


                                            </div>

                                        </div>
                                    </div> */}
                                </OwlCarousel> : ""}
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </section>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/orderMenuCard.css" />

            </Helmet>
        </div>


    );
}
