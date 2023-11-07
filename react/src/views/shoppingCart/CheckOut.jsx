import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";

import { useNotificationContext } from "../../contexts/NotificationProvider.jsx";


export default function CheckOut() {


    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const { user, setUser, setToken, setCartQuantity, cartQuantity } = useStateContext()
    const [loading, setLoading] = useState(false);
    const [shoppingCarts, setShoppingCarts] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [states, setStates] = useState([]); // Initialize as an empty array
    const { setWarningNotification, setFailNotification } = useNotificationContext();
    useEffect(() => {
        //fetch shopping cart data
        getShoppingCarts();
        //fetch active address data
        getActiveAddress();
        //fetch state data
        getStates();
    }, [])


    //get the shopping carts item
    const getShoppingCarts = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`/shoppingCart/${user.id}`)
                .then(({ data }) => {
                    console.log(data)
                    const transformedProducts = data.map(cartItem => ({
                        description: cartItem.meal_name,
                        price: cartItem.meal_price * cartItem.pivot.shopping_cart_qty,
                    }));
                    setLoading(false);
                    setShoppingCarts(data); // This sets the original data if needed.
                    setProducts(transformedProducts);
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }


    //get the current active address
    const getActiveAddress = async () => {

        console.log("getting")

        try {
            await axiosClient.get(`/currentAddress/${user.id}`)
                .then(({ data }) => {
                    if (Object.keys(data).length === 0) {
                        setWarningNotification("Couldn't Check Out", "Please Ensure That You Have Active Current Address To Check Out").then((value) => {
                            if (value) {
                                navigate("/addresses")
                            }
                        });
                    } else {
                        setCurrentAddress(data)
                    }

                });
        } catch (error) {
            const response = error.response;
            console.log(response);

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

    // Increase the quantity by 1
    const increaseQuantity = (shoppingCartId) => {
        updateQuantity(shoppingCartId, 1);
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

    //get states
    const getStates = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get("/state")
                .then(({ data }) => {
                    console.log(data)
                    setStates(data)
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            const response = error.response;
            console.log(response);
        }
    }


    // Once Shopping Carts changed, Transform products and set the products state
    useEffect(() => {

        const transformedProducts = shoppingCarts.map((cartItem) => ({
            description: cartItem.meal_name,
            price: cartItem.meal_price * cartItem.pivot.shopping_cart_qty,
        }));
        setProducts(transformedProducts);

    }, [shoppingCarts]);
    //handle cash (pay on delivery order)
    const handleCashOrder = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setWarningNotification("Are You Sure?", "These Meal Will Need To Pay On Delivery").then(async (value) => {
            if (value) {

                const orderItems = shoppingCarts.map((cartItem) => ({
                    meal_id: cartItem.id,
                    order_quantity: cartItem.pivot.shopping_cart_qty,
                }));

                console.log(currentAddress)
                const payload = {
                    user_id: user.id,
                    order_total: calculateTotalPrice() + 5,
                    delivery_fee: 5,
                    order_status: 'pending',
                    payment_status: 'paid',
                    order_date: new Date(), // Use the current date or timestamp
                    payment_method: 'Pay On Delivery', // Set payment_method to 'Pay On Delivery'
                    orderItems: orderItems,
                    username: currentAddress.address_username,
                    userphone: currentAddress.address_userphone,
                    street: currentAddress.street,
                    city: currentAddress.city,
                    state: currentAddress.state,
                    postcode: currentAddress.postcode
                };

                try {
                    const response = await axiosClient.post("/order", payload);
                    console.log(response);
                    navigate("/orderStatus");
                    window.scrollTo(0, 0);
                    setCartQuantity(null);
                } catch (error) {
                    console.log(error);
                    const response = error.response;
                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    }
                }
            }
        });
    }



    //hanlde navigation
    const onNavigateClick = () => {

        navigate("/addresses")
        // Scroll to the top of the screen window
        window.scrollTo(0, 0);

    }
    //hanlde navigation
    const navigateToShop = () => {

        navigate("/index")
        // Scroll to the top of the screen window
        window.scrollTo(0, 0);

    }




    const [activeTab, setActiveTab] = useState('card'); // Initially set to 'card'
    const handleTabChange = (tab) => {
        setActiveTab(tab);
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
                                    <h6>{shoppingCarts.length}</h6>
                                </div>

                                {loading &&
                                    <div class="text-center">
                                        <div class="loaderCustom2"></div>
                                    </div>
                                }
                                {shoppingCarts.length === 0 &&
                                    <div class="text-center">
                                        <img alt="food-dish" src="../../../assets/img/noitemsfound.png" width="235"
                                            height="251" />
                                        <p>Your Cart Is Empty!</p>
                                        <br />
                                        <br />
                                        <button className="button-price" onClick={navigateToShop}>Shop Now!</button>
                                    </div>
                                }



                                {!loading && shoppingCarts.length != 0 && shoppingCarts.map((m) => (
                                    <ul>
                                        <li class="price-list">
                                            <i class="closeButton fa-solid fa-xmark" onClick={ev => onDeleteClick(m)}></i>
                                            <div class="counter-container">
                                                <div class="counter-food">
                                                    <img alt="food-dish" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${m.meal_image}`} width="135"
                                                        height="121" />
                                                    <h4>{m.meal_name}</h4>
                                                </div>
                                                <h3>RM{m.meal_price * m.pivot.shopping_cart_qty}</h3>
                                            </div>
                                            <div class="price">
                                                <div>
                                                    <h2>RM{m.meal_price}</h2>
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

                                    </ul>
                                ))}
                                {shoppingCarts.length !== 0 &&
                                    <>
                                        <div class="totel-price">
                                            <span>Total order:</span>
                                            <h5>RM{calculateTotalPrice()} </h5>
                                        </div>
                                        <div class="totel-price">
                                            <span>To pay:</span>
                                            <h2>RM {calculateTotalPrice() + 5}</h2>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                        <div class="offset-xl-1 col-xl-6 col-lg-12" data-aos="flip-up" data-aos-delay="300" data-aos-duration="400">
                            <form class="checkout-form">
                                <h4>Buyer information</h4>

                                <p>Name:</p>
                                <input type="text" value={user.name} name="Name" readOnly placeholder="Full Name" class="checkout-name" />

                                <div class="row">

                                    <div class="col-lg-12">
                                        <p>Email:</p>
                                        <input type="text" value={user.email} readOnly name="email" placeholder="E-mail" />
                                    </div>


                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-sm-5">
                                        <h4 class="two">Delivery addresses</h4>

                                    </div>
                                    <div class="col-lg-6 col-sm-6">
                                        <button class="button-price changeAddress" onClick={ev => onNavigateClick()}>Edit/Change Address</button>
                                    </div>
                                </div>
                                <p>Address Username:</p>
                                <input type="text" name="address_username" readOnly value={currentAddress && currentAddress.address_username} placeholder="Address Username" />

                                <p>Address Userphone:</p>
                                <input type="text" name="address_userphone" readOnly value={currentAddress && currentAddress.address_userphone} placeholder="Address Userphone" />


                                <p>Street:</p>
                                <input type="text" name="street" readOnly value={currentAddress && currentAddress.street} placeholder="Street" class="checkout-name" />
                                <div class="row">

                                    <div class="col-lg-6">
                                        <p>City:</p>
                                        <input type="text" name="city" readOnly placeholder="City" value={currentAddress && currentAddress.city} />
                                    </div>

                                    <div class="col-lg-6">
                                        <p>Postcode:</p>
                                        <input type="number" name="postcode" readOnly placeholder="Postcode" value={currentAddress && currentAddress.postcode} />
                                    </div>
                                </div>

                                <p>State</p>
                                <input type="text" name="street" readOnly value={currentAddress && currentAddress.state} placeholder="Street" class="checkout-name" />



                                <h4 class="two">Payment method</h4>
                                <br />
                                <div class="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => handleTabChange('card')}>Card</button>
                                    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick={() => handleTabChange('cash')}>Pay On Delivery</button>
                                </div>
                                <div class="tab-content" id="v-pills-tabContent">

                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <br />

                                        {currentAddress && shoppingCarts.length !== 0 &&


                                            <PayPalButton
                                                options={{
                                                    clientId: "Ac7ttAqaPjnYUOqrISTtqaoQB_hTxioIE7_IPo0swe3Ej9O_5qAex791191szOk3JINgu-ZkU8P-AL2N",
                                                    currency: "MYR",
                                                }}

                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: products.map((product, index) => ({
                                                            reference_id: `${index}`, // Provide a unique reference_id for each purchase unit
                                                            description: product.description,
                                                            amount: {
                                                                currency_code: "MYR",
                                                                value: index === 0 ? product.price + 5 : product.price,
                                                            },
                                                        })),
                                                    });
                                                }}
                                                onSuccess={async (details, data) => {
                                                    const orderItems = shoppingCarts.map((cartItem) => ({
                                                        meal_id: cartItem.id,
                                                        order_quantity: cartItem.pivot.shopping_cart_qty,
                                                    }));

                                                    const payload = {
                                                        user_id: user.id,
                                                        order_total: calculateTotalPrice() + 5, // Calculate the total order price
                                                        delivery_fee: 5, // Set delivery fee, adjust as needed
                                                        order_status: 'pending', // Set the initial order status
                                                        payment_status: 'paid', // Set To Paid
                                                        order_date: new Date(), // Use the current date or timestamp
                                                        payment_method: data.paymentSource, // Payment Method
                                                        orderItems: orderItems,
                                                        username: currentAddress.address_username,
                                                        userphone: currentAddress.address_userphone,
                                                        street: currentAddress.street,
                                                        city: currentAddress.city,
                                                        state: currentAddress.state,
                                                        postcode: currentAddress.postcode
                                                    };

                                                    try {
                                                        const response = await axiosClient.post("/order", payload);
                                                        console.log(response)
                                                        navigate("/orderStatus");
                                                        // Scroll to the top of the screen window
                                                        window.scrollTo(0, 0);
                                                        setCartQuantity(null);
                                                    } catch (error) {
                                                        console.log(error);
                                                        const response = error.response;
                                                        if (response && response.status === 422) {
                                                            setError(response.data.errors);
                                                        }
                                                    }
                                                }}
                                            />

                                        }



                                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">

                                        </div>


                                    </div>
                                </div>
                                {currentAddress && activeTab === 'cash' && shoppingCarts.length !== 0 && (
                                    <button className="button-price" onClick={handleCashOrder}>Confirm Your Order</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>



        </div >





    );
}
