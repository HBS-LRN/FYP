import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';




import CustomerSideBar from "../../components/CustomerSideBar";


export default function OrderStatus() {



    useEffect(() => {

        let ratingButton = document.querySelectorAll(".rating");
        for (var i = 0; i < ratingButton.length; i++) {
            ratingButton[i].addEventListener("click", (e) => {
                let ratingParent = e.target.parentElement.children[5];//selecting main parent of arrow
                console.log(ratingParent);
                ratingParent.classList.toggle("active");

            });

        }


        let ratingCloseBtn = document.querySelectorAll(".close-btn");
        for (var i = 0; i < ratingCloseBtn.length; i++) {
            ratingCloseBtn[i].addEventListener("click", (e) => {
                let ratingCloseParent = e.target.parentElement.parentElement;//selecting main parent of arrow

                ratingCloseParent.classList.remove("active");

            });

        }


        var pendPrduct = document.getElementById("pendingProduct");
        var completedProduct = document.getElementById("completedProduct");
        var shipProduct = document.getElementById("shipProduct");
        pendPrduct.style.display = 'block';
        var btn = document.getElementById("btn");






    }, []);
    function pendingProd() {

        console.log('haha')
        pendPrduct.style.display = 'block';
        console.log(pendPrduct)
        completedProduct.style.display = 'none';
        shipProduct.style.display = 'none';

        btn.style.left = "34.1%";
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

        btn.style.left = "73.4%";
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
                                    Preparing<span class="quantityProduct">(2)</span></button>
                                <button type="button" class="toggle-btn" onClick={shipProd}>
                                    To Delivery <span class="quantityProduct">(3)</span></button>
                                <button type="button" class="toggle-btn" onClick={completeProd}>
                                    Completed Order<span class="quantityProduct">(4)</span>
                                </button>

                                {/* <button type="button" class="toggle-btn" onclick="pendingProd()">
                            Preparing<span class="quantityProduct">(2)</span></button>
                        <button type="button" class="toggle-btn" onclick="shipProd()">
                            To Delivery <span class="quantityProduct">(3)</span></button>
                        <button type="button" class="toggle-btn" onclick="completeProd()">
                            Completed Order<span class="quantityProduct">(4)</span>
                        </button> */}


                            </div>

                            <div id="pendingProduct">


                                <div class="scroll-wrap">

                                    {/* @foreach ($orders as $order)
                            @foreach ($order->meals as $meal)
                                @if ($meal->pivot->meal_order_status == 'preparing') */}
                                    <div class="product-items">



                                        {/* <img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                            alt="" /> */}
                                        <img src="../assets/img/Taiwanese-fried-chicken-11.png" alt="" />
                                        <div class="item-description">

                                           Taiwanese Chicken

                                        </div>
                                        <div class="item-quantity">RM 5
                                            X
                                            5 Qty
                                        </div>
                                        <div class="item-total">
                                            Order Total:<p>
                                                RM 25
                                            </p>
                                        </div>

                                        <div class="item-status">
                                            Product Status:<span class="item-currentStatus">Preparing</span>
                                        </div>
                                    </div>
                                    <div class="product-items">



                                        {/* <img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                            alt="" /> */}
                                        <img src="../assets/img/Taiwanese-fried-chicken-11.png" alt="" />
                                        <div class="item-description">

                                        Taiwanese Chicken

                                        </div>
                                        <div class="item-quantity">RM 5
                                            X
                                            5 Qty
                                        </div>
                                        <div class="item-total">
                                            Order Total:<p>
                                                RM 25
                                            </p>
                                        </div>

                                        <div class="item-status">
                                            Product Status:<span class="item-currentStatus">Preparing</span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                             


                            <div id="shipProduct">

                                <div class="scroll-wrap">

                                    {/* @foreach ($orders as $order)
    @foreach ($order->meals as $meal)
        @if ($meal->pivot->meal_order_status == 'preparing') */}
                                    <div class="product-items">



                                        {/* <img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                    alt="" /> */}
                                        <img src="../assets/img/Taiwanese-fried-chicken-11.png" alt="" />
                                        <div class="item-description">

                                            dsd

                                        </div>
                                        <div class="item-quantity">RM 5
                                            X
                                            5
                                        </div>
                                        <div class="item-total">
                                            Order Total:<p>
                                                RM 5
                                            </p>
                                        </div>

                                        <div class="item-status">
                                            Product Status:<span class="item-currentStatus">Preparing</span>
                                        </div>
                                    </div>

                                </div>

                            </div>



                            <div id="completedProduct">

                                <div class="scroll-wrap">
                                    {/* @foreach ($orders as $order)
                            @foreach ($order->meals as $meal)
                                @if ($meal->pivot->meal_order_status == 'completed') */}
                                    <div class="product-items">

                                    <img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
                                          


                                        <div class="item-description">
                                            gg
                                        </div>
                                        <div class="item-quantity">RM5
                                            X
                                            6
                                        </div>
                                        <div class="item-total">
                                            Order Total:<p>
                                                RM 5 * 6
                                            </p>
                                        </div>


                                        <button type="button" class="ratingButton rating"
                                            runat="server">Rating</button>


                                        <div class="popup" id="popup-1">
                                            <div class="overlay-pop"></div>
                                            <div class="content">
                                                <div class="close-btn">&times;</div>
                                                <div class="ratingContainer">
                                                    <div class="">
                                                        <div class="text">Thanks for rating us!</div>
                                                    </div>
                                                    <form method="POST" action="/comment" enctype="multipart/form-data">

                                                        <div class="star-widget">
                                                            <div class="star">

                                                                <input type="radio" name="rate" id="rate-5"
                                                                    value="5" />
                                                                <label for="rate-5" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-4"
                                                                    value="4" />
                                                                <label for="rate-4" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-3"
                                                                    value="3" />
                                                                <label for="rate-3" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-2"
                                                                    value="2" />
                                                                <label for="rate-2" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-1"
                                                                    value="1" />
                                                                <label for="rate-1" class="fas fa-star"></label>

                                                                <div class="textarea">

                                                                    <textarea cols="30" id="txtItemComment" placeholder="Describe about the product.." name="txtItemComment"></textarea>
                                                                </div>
                                                                <div class="btnRating">


                                                                    {/* <input type="hidden" id="mealOrderDetailId"
                                                                                name="mealOrderDetailId"
                                                                                value="{{ $meal->pivot->id }}"> */}

                                                                    <button type="submit" runat="server"
                                                                        onserverclick="btnRating_Click">Submit</button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>



                                                </div>
                                            </div>
                                        </div>


                                        <div class="item-status completed">
                                            Product Status:<span class="item-currentStatus">Completed</span>
                                        </div>
                                        {/* @if ($meal->pivot->reply_comment != null)
                                                <div class="comment" id="id1" runat="server">
                                                    <img src="../image/GrandImperialGroupLogo.png"
                                                        alt="">Grand<span class="semicolon">:</span>
                                                        <p>{{ $meal-> pivot -> reply_comment}}</p>
                                                </div>
                                                @endif */}

                                    </div>

                                    <div class="product-items">

<img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
      


    <div class="item-description">
        gg
    </div>
    <div class="item-quantity">RM5
        X
        6
    </div>
    <div class="item-total">
        Order Total:<p>
            RM 5 * 6
        </p>
    </div>


    <button type="button" class="ratingButton rating"
        runat="server">Rating</button>


    <div class="popup" id="popup-1">
        <div class="overlay-pop"></div>
        <div class="content">
            <div class="close-btn">&times;</div>
            <div class="ratingContainer">
                <div class="">
                    <div class="text">Thanks for rating us!</div>
                </div>
                <form method="POST" action="/comment" enctype="multipart/form-data">

                    <div class="star-widget">
                        <div class="star">

                            <input type="radio" name="rate" id="rate-5"
                                value="5" />
                            <label for="rate-5" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-4"
                                value="4" />
                            <label for="rate-4" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-3"
                                value="3" />
                            <label for="rate-3" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-2"
                                value="2" />
                            <label for="rate-2" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-1"
                                value="1" />
                            <label for="rate-1" class="fas fa-star"></label>

                            <div class="textarea">

                                <textarea cols="30" id="txtItemComment" placeholder="Describe about the product.." name="txtItemComment"></textarea>
                            </div>
                            <div class="btnRating">


                                {/* <input type="hidden" id="mealOrderDetailId"
                                            name="mealOrderDetailId"
                                            value="{{ $meal->pivot->id }}"> */}

                                <button type="submit" runat="server"
                                    onserverclick="btnRating_Click">Submit</button>

                            </div>
                        </div>
                    </div>
                </form>



            </div>
        </div>
    </div>


    <div class="item-status completed">
        Product Status:<span class="item-currentStatus">Completed</span>
    </div>
    {/* @if ($meal->pivot->reply_comment != null)
            <div class="comment" id="id1" runat="server">
                <img src="../image/GrandImperialGroupLogo.png"
                    alt="">Grand<span class="semicolon">:</span>
                    <p>{{ $meal-> pivot -> reply_comment}}</p>
            </div>
            @endif */}

</div>

                                    
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
