
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import OwlCarousel from 'react-owl-carousel2';
import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";


export default function NuritionMenuCard() {



    //react declaration
    const navigate = useNavigate();
    const { user, setCartQuantity, cartQuantity } = useStateContext();
    let { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState(false);
    const { setDeleteNotification, setSuccessNotification, setWarningNotification, setFailNotification } = useNotificationContext();
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const [selectedFilterCount, setSelectedFilterCount] = useState(null);
    const [allergies, setAllergies] = useState([]);
    const [options, setOptions] = useState({
        loop: true,
        margin: 170,
        dots: true,
        items: 3,
        nav: true,
    });

    if (id) {
        useEffect(() => {
            getCategoryMenu();
        }, []);
    }
    //fetch allergies data
    if (user) {
        useEffect(() => {
            getAllergies();
        }, []);
    }


    const getCategoryMenu = async () => {

        try {
            await axiosClient.get(`/category/${id}`)
                .then(({ data }) => {
                    console.log(data)
                    setCategoryName(data.name);

                });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    //fetch user allergies

    const getAllergies = async () => {

        try {
            await axiosClient.get(`/allergic/${user.id}`)
                .then(({ data }) => {
                    console.log(data)
                    setAllergies(data);

                });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const isMealRecommended = (meal) => {
        return (
            meal.total_calorie <= user.BMR &&
            !(user.BMI > 30 && meal.total_calorie > 1000) &&
            meal.meal_ingredients.every((meal_ingredient) => {
                const allergicIngredients = [];
                allergies.forEach((allergy) => {
                    if (
                        allergy.ingredient_name.toLowerCase() ===
                        meal_ingredient.ingredient.ingredient_name.toLowerCase()
                    ) {
                        allergicIngredients.push(
                            meal_ingredient.ingredient.ingredient_name
                        );
                    }
                });

                // Check if the cookMethod is "spicy" or "deep_fried"
                const isSpicyOrDeepFried =
                    meal_ingredient.cookMethod &&
                    (meal_ingredient.cookMethod.toLowerCase() === "spicy" ||
                        meal_ingredient.cookMethod.toLowerCase() === "deep_fried");

                return allergicIngredients.length === 0 && !isSpicyOrDeepFried;
            })
        );
    };

    const hasAllergicIngredients = (meal) => {
        // Check if the meal has any ingredients that the user is allergic to
        return meal.meal_ingredients.some((meal_ingredient) => {
            return allergies.some((allergy) =>
                allergy.ingredient_name.toLowerCase() === meal_ingredient.ingredient.ingredient_name.toLowerCase()
            );
        });
    };

    useEffect(() => {
        setLoading(true);
        if (user && allergies.length > 0) {

            axiosClient
                .get(`/showCategoryMeal/${id}`)
                .then(({ data }) => {
                    console.log(data);

                    const mealData = data;
                    const mealsWithQuantity = mealData.map((meal) => ({
                        ...meal,
                        quantity: 1,
                    }));

                    // Custom sorting logic
                    const sortedMeals = mealsWithQuantity.slice().sort((mealA, mealB) => {
                        if (isMealRecommended(mealA) && !isMealRecommended(mealB)) {
                            return -1; // mealA is recommended and mealB is not, so mealA comes first
                        } else if (!isMealRecommended(mealA) && isMealRecommended(mealB)) {
                            return 1; // mealB is recommended and mealA is not, so mealB comes first
                        } else if (hasAllergicIngredients(mealA) && !hasAllergicIngredients(mealB)) {
                            return 1; // mealA has allergic ingredients and mealB doesn't, so mealB comes first
                        } else if (!hasAllergicIngredients(mealA) && hasAllergicIngredients(mealB)) {
                            return -1; // mealB has allergic ingredients and mealA doesn't, so mealA comes first
                        } else {
                            // Check user's BMI and meal's total calorie for obese users
                            if (user.BMI >= 30) {
                                if (mealA.total_calorie < 1000 && mealB.total_calorie >= 1000) {
                                    return -1; // mealA has less than 1000 calories, so it comes first for obese users
                                } else if (mealA.total_calorie >= 1000 && mealB.total_calorie < 1000) {
                                    return 1; // mealB has less than 1000 calories, so it comes first for obese users
                                }
                            }
                        }
                        return 0; // Default: maintain the order
                    });

                    console.log("gettingsortmeal", sortedMeals);

                    setMeals(sortedMeals);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {

            axiosClient
                .get(`/showCategoryMeal/${id}`)
                .then(({ data }) => {
                    console.log(data);

                    const mealData = data;
                    const mealsWithQuantity = mealData.map((meal) => ({
                        ...meal,
                        quantity: 1,
                    }));


                    setMeals(mealsWithQuantity);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
            // setWarningNotification(
            //     "Oops! Login First!",
            //     "Please log in to view your personalized recommended meals."
            // );
        }
    }, [allergies]);
    //fetch categories data
    useEffect(() => {
        getCategories();

    }, [])


    if (user) {
        useEffect(() => {
            getShoppingCarts()
        }, [cartQuantity]);
    }

    const getCategories = async () => {

        console.log("getting")

        try {
            await axiosClient.get(`category`)
                .then(({ data }) => {
                    console.log(data)

                    setCategories(data)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);

        }
    }



    // This function checks if a meal with a specific `mealId` is already in the cart
    const isMealInCart = (shoppingCart, mealId) => {
        return shoppingCart.some((cartItem) => cartItem.id === mealId);
    };

    const addToCart = (meal) => {
        // Make an API request here to add the meal to the cart
        // Use axios.post to send a POST request to the API endpoint
        // Include the `mealId` and the `quantity` in the request body


        const mealId = meal.id;

        if (!user) {
            setFailNotification('Unable To Add Cart', 'You Need To Login First!.');
            // Check if the meal is already in the cart
        } else if (isMealInCart(shoppingCarts, mealId)) {
            // Meal is already in the cart, show a warning message or handle it as needed
            setWarningNotification('Meal Already in Cart', 'You cannot add the same meal to the cart multiple times.');
        } else {
            // The meal is not in the cart, proceed to add it
            // Check if the meal is not recommended or has allergens
            const isNotRecommendedOrHasAllergens =
                (!isMealRecommended(meal) || hasAllergicIngredients(meal));

            // Display confirmation dialog only if the meal is not recommended or has allergens
            if (isNotRecommendedOrHasAllergens) {

                setWarningNotification("This meal is not recommended or contains allergens.", "Are you sure you want to add it to the cart?").then((value) => {
                    if (value) {
                        // Proceed to add the meal to the cart
                        const payload = {
                            meal_id: mealId,
                            shopping_cart_qty: meal.quantity,
                            user_id: user.id
                        };

                        axiosClient
                            .post('/shoppingCart', payload)
                            .then(({ data }) => {
                                setSuccessNotification('Shopping Cart Added Successfully');
                                setCartQuantity(data);
                            })
                            .catch((error) => {
                                const response = error.response;
                                console.log(response);
                            });
                    }
                });
            } else {
                // Add the meal to the cart without confirmation if it's recommended and has no allergens
                const payload = {
                    meal_id: mealId,
                    shopping_cart_qty: meal.quantity,
                    user_id: user.id
                };

                axiosClient
                    .post('/shoppingCart', payload)
                    .then(({ data }) => {
                        setSuccessNotification('Shopping Cart Added Successfully');
                        setCartQuantity(data);
                    })
                    .catch((error) => {
                        const response = error.response;
                        console.log(response);
                    });
            }
        }

    };

    // Get the shopping cart items for the user
    const getShoppingCarts = async () => {
        console.log('Getting shopping cart items');

        try {
            const { data } = await axiosClient.get(`/shoppingCart/${user.id}`);
            console.log(data);
            setShoppingCarts(data); // This sets the original data if needed.
        } catch (error) {
            const response = error.response;
            console.log(response);
            return []; // Return an empty array in case of an error
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
        const updatedMeals = meals.map((meal) => {
            if (meal.id === mealId) {
                const ingredientShortages = [];

                meal.meal_ingredients.forEach((mealIngredient) => {
                    //+1 because cannot add more than that available stock
                    if (mealIngredient.ingredient.stock < (meal.quantity + 1) * mealIngredient.unit) {
                        ingredientShortages.push({
                            ingredientName: mealIngredient.ingredient.ingredient_name,
                            requiredStock: (meal.quantity + 1) * mealIngredient.unit,
                            availableStock: mealIngredient.ingredient.stock,
                        });
                    }
                });

                if (ingredientShortages.length === 0) {
                    // Sufficient stock for all ingredients
                    return { ...meal, quantity: meal.quantity + 1 };
                } else {
                    // Notify about insufficient stock for each ingredient
                    for (const shortage of ingredientShortages) {
                        setWarningNotification(
                            "Insufficient Stock, Cannot Add More",
                            `Meal For ${shortage.ingredientName} for  ${meal.quantity + 1} requires ${shortage.requiredStock}g, but there are only ${shortage.availableStock}g available.`
                        );
                    }
                }
            }
            return meal;
        });

        setMeals(updatedMeals);
    };

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

    const handleResize = () => {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;

        if (screenWidth < 1200) {
            setOptions({
                loop: true,
                margin: 10,
                dots: true,
                items: 1,
                nav: true,
            });
        } else {
            setOptions({
                loop: true,
                margin: 170,
                dots: true,
                items: 3,
                nav: false,
            });
        }
    };
    useEffect(() => {
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //this function  is to calculate the number of ratings
    const calculateRatings = (mealOrderDetails) => {
        const ratingCounts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };
        let totalRatings = 0;
        let totalRatingSum = 0;

        mealOrderDetails.forEach((orderDetail) => {
            if (orderDetail.rating_star !== null) {
                ratingCounts[orderDetail.rating_star]++;
                totalRatingSum += orderDetail.rating_star;
                totalRatings++;
            }
        });

        const overallRating = totalRatings > 0 ? (totalRatingSum / totalRatings).toFixed(1) : '0';

        return { ratingCounts, overallRating };
    };




    //this is to generate the start rating
    function generateStarRating(overallRating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= overallRating) {
                stars.push(<i key={i} className="fa-solid fa-star"></i>);
            } else if (i - 0.5 <= overallRating) {
                stars.push(<i key={i} className="fa-solid fa-star-half"></i>);
            } else {
                stars.push(<i key={i} className="fa-solid fa-star-o"></i>);
            }
        }
        return stars;
    }


    const handleFilterSelect = (selectedFilterCount) => {
        setSelectedFilterCount(selectedFilterCount);
    };
    // Function to update the selected filter count
    const countOrderDetailsWithRating = (rating, orderDetails) => {
        return orderDetails.filter((orderDetail) => orderDetail.rating_star === rating).length;
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
                                <h2 data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">{categoryName} Menu</h2>

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

                                <div class="Provides" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">


                                    <div class="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        {/* <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Breakfast</button>
                                        <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Lunch</button>
                                        <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Dinner</button> */}

                                    </div>
                                    <div class="like-meal">
                                        {/* {user ? (
                                            <a href="#"><i class="fa-solid fa-heart"></i>Your Personalized Meals</a>
                                        ) : (
                                            <a href="#"><i class="fas fa-sign-in"></i>Login To See Your Own Personalized Meals</a>
                                        )} */}
                                    </div>

                                </div>

                            </div>

                            <div class="col-lg-12">

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



                                                            <div class="cafa-button">
                                                                {m.meal_ingredients.map((meal_ingredient) => {
                                                                    const allergicIngredients = [];
                                                                    if (allergies) {
                                                                        allergies.forEach((allergy) => {
                                                                            if (allergy.ingredient_name.toLowerCase() === meal_ingredient.ingredient.ingredient_name.toLowerCase()) {
                                                                                allergicIngredients.push(meal_ingredient.ingredient.ingredient_name);
                                                                            }

                                                                        });
                                                                    }
                                                                    return (
                                                                        <div key={meal_ingredient.id}>
                                                                            {allergicIngredients.length > 0 && (
                                                                                <div class="not-recommended float">
                                                                                    <div class="allergic">
                                                                                        <a href="#">Ingredients, ({allergicIngredients.join(', ')}) Cause You Allergies!</a>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}

                                                                {user && user.BMI <= 30 && (
                                                                    m.total_calorie <= user.BMR && m.meal_ingredients.every((meal_ingredient) => {
                                                                        const allergicIngredients = [];
                                                                        allergies.forEach((allergy) => {
                                                                            if (allergy.ingredient_name.toLowerCase() === meal_ingredient.ingredient.ingredient_name.toLowerCase()) {
                                                                                allergicIngredients.push(meal_ingredient.ingredient.ingredient_name);
                                                                            }
                                                                        });
                                                                        return allergicIngredients.length === 0;
                                                                    }) && (
                                                                        <div class="recommended float">
                                                                            <div class="bold">
                                                                                <a href="#">Recommended Meal Just For You.</a>
                                                                                <a href="#">{m.total_calorie}-Calorie Diet Align Your BMI & BMR</a>
                                                                                <a href="#">No Ingredients Cause You Allergies.</a>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}

                                                                {user && user.BMI <= 30 && (
                                                                    m.total_calorie > user.BMR && m.meal_ingredients.every((meal_ingredient) => {
                                                                        const allergicIngredients = [];
                                                                        allergies.forEach((allergy) => {
                                                                            if (allergy.ingredient_name.toLowerCase() === meal_ingredient.ingredient.ingredient_name.toLowerCase()) {
                                                                                allergicIngredients.push(meal_ingredient.ingredient.ingredient_name);
                                                                            }
                                                                        });
                                                                        return allergicIngredients.length === 0;
                                                                    }) && (
                                                                        <div class="not-recommended float">
                                                                            <div class="bold">
                                                                                <a href="#">Not Recommended Meal For You.</a>
                                                                                <a href="#">{m.total_calorie}-Calorie Not Align Your BMI & BMR</a>
                                                                                <a href="#">No Ingredients Cause You Allergies.</a>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}



                                                                {user && user.BMI >= 30 && m.total_calorie <= 1000 && m.meal_ingredients.every((meal_ingredient) => {
                                                                    const allergicIngredients = [];
                                                                    allergies.forEach((allergy) => {
                                                                        if (allergy.ingredient_name.toLowerCase() === meal_ingredient.ingredient.ingredient_name.toLowerCase()) {
                                                                            allergicIngredients.push(meal_ingredient.ingredient.ingredient_name);
                                                                        }
                                                                    });

                                                                    const isSpicyOrDeepFried =
                                                                        meal_ingredient.cookMethod &&
                                                                        (meal_ingredient.cookMethod.toLowerCase() === "spicy" ||
                                                                            meal_ingredient.cookMethod.toLowerCase() === "deep_fried");

                                                                    return allergicIngredients.length === 0 && !isSpicyOrDeepFried;
                                                                }) && (
                                                                        <div class="recommended float">
                                                                            <div class="bold">
                                                                                <a href="#">Recommended Meal For You (Obese)</a>
                                                                                <a href="#">{m.total_calorie}-Calorie Diet Align Your BMI & BMR</a>
                                                                                <a href="#">No Ingredients Cause You Allergies.</a>
                                                                            </div>
                                                                        </div>
                                                                    )}



                                                                {user && user.BMI >= 30 && m.total_calorie > 1000 && m.meal_ingredients.every((meal_ingredient) => {
                                                                    const allergicIngredients = [];
                                                                    allergies.forEach((allergy) => {
                                                                        if (allergy.ingredient_name.toLowerCase() === meal_ingredient.ingredient.ingredient_name.toLowerCase()) {
                                                                            allergicIngredients.push(meal_ingredient.ingredient.ingredient_name);
                                                                        }
                                                                    });
                                                                    return allergicIngredients.length === 0;
                                                                }) && !m.meal_ingredients.some((meal_ingredient) =>
                                                                    meal_ingredient.cookMethod &&
                                                                    (meal_ingredient.cookMethod.toLowerCase() === "spicy" ||
                                                                        meal_ingredient.cookMethod.toLowerCase() === "deep_fried")
                                                                ) && (
                                                                        <div class="not-recommended float">
                                                                            <div class="bold">
                                                                                <a href="#">Not Recommended Meal For You (Obese)</a>
                                                                                <a href="#">{m.total_calorie}-Calorie Not Align Your BMI & BMR</a>
                                                                                <a href="#">No Ingredients Cause You Allergies.</a>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                {user && user.BMI >= 30 && m.meal_ingredients.some((meal_ingredient) =>
                                                                    meal_ingredient.cookMethod &&
                                                                    (meal_ingredient.cookMethod.toLowerCase() === "spicy" ||
                                                                        meal_ingredient.cookMethod.toLowerCase() === "deep_fried")
                                                                ) && !m.meal_ingredients.some((meal_ingredient) =>
                                                                    allergies.some((allergy) =>
                                                                        allergy.ingredient_name.toLowerCase() === meal_ingredient.ingredient.ingredient_name.toLowerCase()
                                                                    )
                                                                ) && (
                                                                        <div class="not-recommended float">
                                                                            <div class="bold">
                                                                                <a href="#">
                                                                                    Not Recommended Meal For You (Obese)
                                                                                </a>
                                                                                <a href="#">Have Spicy or Deep Fried Cook Method.</a>
                                                                               
                                                                                <a href="#">No Ingredients Cause You Allergies.</a>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </div>


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
                                                                {[5, 4, 3, 2, 1].map((filterCount) => (
                                                                    <a
                                                                        key={filterCount}
                                                                        href="javascript:void(0);"
                                                                        className="dropdown-item"
                                                                        onClick={() => handleFilterSelect(filterCount)}
                                                                    >

                                                                        {filterCount} Star
                                                                        {`  (${countOrderDetailsWithRating(filterCount, m.meal_order_details)})`}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div class="overallRating">
                                                            <h3>
                                                                {calculateRatings(m.meal_order_details).overallRating} Out Of 5
                                                                <br />
                                                                {generateStarRating(calculateRatings(m.meal_order_details).overallRating)}

                                                            </h3>
                                                            {/* <p> 50 Ratings.</p> */}

                                                        </div>
                                                        <div class="rating-scroll">
                                                            {m.meal_order_details.length > 0 ? (
                                                                (() => {
                                                                    // Filter the data to remove items with no ratings


                                                                    const filteredOrderDetails =
                                                                        selectedFilterCount !== null
                                                                            ? m.meal_order_details.filter((orderDetail) =>
                                                                                orderDetail.rating_star === selectedFilterCount && (orderDetail.rating_comment || orderDetail.rating_star !== null)
                                                                            )
                                                                            : m.meal_order_details.filter((orderDetail) =>
                                                                                orderDetail.rating_star !== null || orderDetail.rating_comment !== null
                                                                            );

                                                                    // Check if there are any items left after filtering
                                                                    if (filteredOrderDetails.length > 0) {
                                                                        // If there are items with ratings, display them
                                                                        return filteredOrderDetails.map((orderDetail, index) => (
                                                                            <div className="row rating" key={index}>
                                                                                <div className="col-xl-2 rating-review">
                                                                                    {orderDetail.order.user.image ? (
                                                                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/${orderDetail.order.user.image}`} alt={`User ${index + 1}`} />
                                                                                    ) : (
                                                                                        <i class="fa fa-user" aria-hidden="true"></i>
                                                                                    )}
                                                                                </div>
                                                                                <div className="col-xl-8 col-lg-12 comment">
                                                                                    <div>
                                                                                        <h6>{orderDetail.order.user.name}</h6>
                                                                                        {[...Array(orderDetail.rating_star || 0)].map((star, starIndex) => (
                                                                                            <i key={starIndex} className="fa-solid fa-star"></i>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                                <p>{orderDetail.rating_comment || '0'}</p>
                                                                            </div>
                                                                        ));
                                                                    } else {
                                                                        // If there are no items with ratings, display "No Ratings Yet"
                                                                        return (

                                                                            <p>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This Meal Has No Ratings Yet!</p>

                                                                        );
                                                                    }
                                                                })()
                                                            ) : <div className="text center">
                                                                <p>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This Meal Has No Ratings Yet!</p>
                                                            </div>}
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

            </section >

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
        </div >


    );
}
