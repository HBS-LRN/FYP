import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';




import CustomerSideBar from "../../components/CustomerSideBar";


export default function OrderStatus() {



    //react declaration
    const { user, setUser, setNotification } = useStateContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);
    const [preparingCount, setPreparingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    //fetch user orders data
    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`/showOrderStatus/${user.id}`)
                .then(({ data }) => {
                    console.log(data)



                    setOrders(data)
                    // Categorize orders into pending, preparing, and completed
                    const pendingOrders = data.filter((order) => order.order_status === 'pending');
                    const preparingOrders = data.filter((order) => order.order_status === 'delivering');
                    const completedOrders = data.filter((order) => order.order_status === 'completed');
                    // Count the meals based on the order status
                    const pendingMealsCount = pendingOrders.reduce((count, order) => count + order.meals.length, 0);
                    const preparingMealsCount = preparingOrders.reduce((count, order) => count + order.meals.length, 0);
                    const completedMealsCount = completedOrders.reduce((count, order) => count + order.meals.length, 0);
                    // Update the counts
                    setPendingCount(pendingMealsCount);
                    setPreparingCount(preparingMealsCount);
                    setCompletedCount(completedMealsCount);
                    setLoading(false)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }


    // Initialize the state to keep track of the selected meal's id
    const [selectedMealId, setSelectedMealId] = useState(null);

    // Function to toggle the 'active' class of the popup
    const togglePopup = (mealId) => {
        setSelectedMealId((prevState) => (prevState === mealId ? null : mealId));
    };

    const [formData, setFormData] = useState({
        rating: '', // To store the selected rating
        comment: '', // To store the comment
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRatingSubmit = (e, mealId) => {
        e.preventDefault();

        // Access form data from the component's state
        const { rating, comment } = formData;

        // Now you can use the 'rating' and 'comment' values as needed
        console.log('Rating: ', rating);
        console.log('Comment: ', comment);
        console.log(mealId);

    };


    function pendingProd() {


        pendPrduct.style.display = 'block';
        console.log(pendPrduct)
        completedProduct.style.display = 'none';
        shipProduct.style.display = 'none';

        btn.style.left = "34.0%";
        btn.style.width = "20.5%";
    }
    function shipProd() {

        pendPrduct.style.display = 'none';
        completedProduct.style.display = 'none';
        shipProduct.style.display = 'block';

        btn.style.left = "53%";
        btn.style.width = "20.5%";
    }

    function completeProd() {

        pendPrduct.style.display = 'none';
        completedProduct.style.display = 'block';
        shipProduct.style.display = 'none';

        btn.style.left = "73.9%";
        btn.style.width = "19%";

    }




    return (


        <div class="all">


            <div class="customerPurchaseHeader">
                <div class="customerPurchaseBar"></div>
                <span class="customerPurchase">My Purchase</span>
            </div>



            <div class="customerPurchaseContent">
                <div class="container custom-auth-gap">
                    <div class="row">
                        <CustomerSideBar />
                        <div class="col-lg-2 purchaseContent" >

                            <div id="btn">
                            </div>
                            <div class="button-container">


                                <button type="button" class="toggle-btn" onClick={pendingProd}>
                                    Preparing<span class="quantityProduct">({pendingCount})</span></button>
                                <button type="button" class="toggle-btn" onClick={shipProd}>
                                    To Delivery <span class="quantityProduct">({preparingCount})</span></button>
                                <button type="button" class="toggle-btn" onClick={completeProd}>
                                    Completed Order<span class="quantityProduct">({completedCount})</span>
                                </button>

                                {/* <button type="button" class="toggle-btn" onclick="pendingProd()">
                            Preparing<span class="quantityProduct">(2)</span></button>
                        <button type="button" class="toggle-btn" onclick="shipProd()">
                            To Delivery <span class="quantityProduct">(3)</span></button>
                        <button type="button" class="toggle-btn" onclick="completeProd()">
                            Completed Order<span class="quantityProduct">(4)</span>
                        </button> */}


                            </div>

                            {loading &&
                                <div class="text-center">
                                    <div class="loaderCustom2"></div>
                                </div>
                            }
                            <div id="pendingProduct">
                                <div className="scroll-wrap">
                                    {!loading && orders.map((order) => (
                                        <div key={order.id}>
                                            {order.order_status === 'pending' ? (
                                                <>
                                                    {order.meals.length > 0 ? (
                                                        order.meals.map((meal) => (
                                                            <div className="product-items" key={meal.id}>
                                                                <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${meal.meal_image}`} alt="" />
                                                                <div className="item-description">{meal.meal_name}</div>
                                                                <div className="item-quantity">RM {meal.meal_price} X {meal.pivot.order_quantity} Qty</div>
                                                                <div className="item-total">
                                                                    Order Total:
                                                                    <p>RM {parseFloat(meal.meal_price * meal.pivot.order_quantity).toFixed(2)}</p>
                                                                </div>
                                                                <div className="item-status">
                                                                    Product Status:
                                                                    <span className="item-currentStatus">Pending</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No meals for this order.</p>
                                                    )}
                                                </>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div id="shipProduct">

                                <div class="scroll-wrap">
                                    <div className="scroll-wrap">
                                        {orders.map((order) => (
                                            <div key={order.id}>
                                                {order.order_status === 'delivering' ? (
                                                    <>
                                                        {order.meals.length > 0 ? (
                                                            order.meals.map((meal) => (
                                                                <div className="product-items" key={meal.id}>
                                                                    <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${meal.meal_image}`} alt="" />
                                                                    <div className="item-description">{meal.meal_name}</div>
                                                                    <div className="item-quantity">RM {meal.meal_price} X {meal.pivot.order_quantity} Qty</div>
                                                                    <div className="item-total">
                                                                        Order Total:
                                                                        <p>RM {parseFloat(meal.meal_price * meal.pivot.order_quantity).toFixed(2)}</p>
                                                                    </div>
                                                                    <div className="item-status">
                                                                        Product Status:
                                                                        <span className="item-currentStatus">Pending</span>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No meals for this order.</p>
                                                        )}
                                                    </>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <div id="completedProduct">
                                <div class="scroll-wrap">
                                    {orders.map((order) => (
                                        <div key={order.id}>
                                            {order.order_status === 'completed' ? (
                                                <>
                                                    {order.meals.length > 0 ? (
                                                        order.meals.map((meal) => (
                                                            <div className="product-items" key={meal.id}>
                                                                <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${meal.meal_image}`} alt="" />
                                                                <div className="item-description">{meal.meal_name}</div>
                                                                <div className="item-quantity">RM {meal.meal_price} X {meal.pivot.order_quantity} Qty</div>
                                                                <div className="item-total">
                                                                    Order Total:
                                                                    <p>RM {parseFloat(meal.meal_price * meal.pivot.order_quantity).toFixed(2)}</p>
                                                                </div>
                                                                <button type="button" className="ratingButton rating" runat="server" onClick={() => togglePopup(meal.pivot.id)}>
                                                                    Rating
                                                                </button>
                                                                {/* Add a unique identifier to the popup element */}
                                                                <div className={`popup ${meal.pivot.id === selectedMealId ? 'active' : ''}`} id={`popup-${meal.pivot.id}`}>
                                                                    <div className="overlay-pop"></div>
                                                                    <div className="content">
                                                                        <div className="close-btn" onClick={() => togglePopup(meal.pivot.id)}>×</div>
                                                                        <div className="ratingContainer">
                                                                            <div className="">
                                                                                <div className="text">Thanks for rating us!</div>
                                                                            </div>
                                                                            <form onSubmit={(e) => handleRatingSubmit(e, meal.pivot.id)}>
                                                                                <div className="star-widget">
                                                                                    <div className="star">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="rating"
                                                                                            id={`rate-5-${meal.pivot.id}`}
                                                                                            value="5"
                                                                                            checked={formData.rating === '5'}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                        <label
                                                                                            for={`rate-5-${meal.pivot.id}`}
                                                                                            className={`fas fa-star${formData.rating === '5' ? ' checked' : ''}`}
                                                                                            aria-hidden="true"
                                                                                        ></label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="rating"
                                                                                            id={`rate-4-${meal.pivot.id}`}
                                                                                            value="4"
                                                                                            checked={formData.rating === '4'}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                        <label for={`rate-4-${meal.pivot.id}`} className={`fas fa-star${formData.rating === '5' ? ' checked' : ''}`} aria-hidden="true"></label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="rating"
                                                                                            id={`rate-3-${meal.pivot.id}`}
                                                                                            value="3"
                                                                                            checked={formData.rating === '3'}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                        <label for={`rate-3-${meal.pivot.id}`} className={`fas fa-star${formData.rating === '5' ? ' checked' : ''}`} aria-hidden="true"></label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="rating"
                                                                                            id={`rate-2-${meal.pivot.id}`}
                                                                                            value="2"
                                                                                            checked={formData.rating === '2'}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                        <label for={`rate-2-${meal.pivot.id}`} className={`fas fa-star${formData.rating === '5' ? ' checked' : ''}`} aria-hidden="true"></label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="rating"
                                                                                            id={`rate-1-${meal.pivot.id}`}
                                                                                            value="1"
                                                                                            checked={formData.rating === '1'}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                        <label for={`rate-1-${meal.pivot.id}`} className={`fas fa-star${formData.rating === '5' ? ' checked' : ''}`} aria-hidden="true"></label>
                                                                                        <div className="textarea">
                                                                                            <textarea
                                                                                                cols="30"
                                                                                                id={`txtItemComment-${meal.pivot.id}`}
                                                                                                name="comment"
                                                                                                value={formData.comment}
                                                                                                onChange={handleInputChange}
                                                                                                placeholder="Describe about the product.."
                                                                                            ></textarea>
                                                                                        </div>
                                                                                        <div className="btnRating">
                                                                                            <button type="submit" runat="server">
                                                                                                Submit
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="item-status completed">
                                                                    Product Status:
                                                                    <span className="item-currentStatus">Completed</span>
                                                                </div>
                                                                {/* Comment Section */}
                                                                {meal.pivot.reply_comment !== null && (
                                                                    <div className="comment" id="id1" runat="server">
                                                                        <img src="../image/GrandImperialGroupLogo.png" alt="" />
                                                                        Grand<span className="semicolon">:</span>
                                                                        <p>{meal.pivot.reply_comment}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No meals for this order.</p>
                                                    )}
                                                </>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

                <Helmet>
                    <script src="../../../assets/js/customerPurchase.js" type="text/javascript" />
                    <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
                    <link rel="stylesheet" href="../../../assets/css/customerPurchase.css" />
                </Helmet>

            </div>

        </div>


    );
}
