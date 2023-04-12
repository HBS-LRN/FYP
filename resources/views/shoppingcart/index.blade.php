<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>

    <head>
        <link rel="stylesheet" href="../css/shoppingCart.css">


        <!--<div id="wrapper">-->
        <!--   <div id="container">-->

        <style>
            .check-out {
                margin: 30px 20px 54px 40px;
                border: 1px solid black;
                border-radius: 25px;
                font-weight: bold;
                text-align: center;
                color: white;
                background-color: rgb(255, 86, 86);
                padding: 14px 58px;
            }

            .noFoundBox {
                display: flex;
                padding-top: 40px;
                justify-content: center;
            }

            .noFoundBox .noItemfoundImg {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 100%;
                border: none;
                height: 350px;
            }

            .noFoundBox .ItemNoFound {
                text-align: center;
            }

            .item-quantity-input {
                margin-left: -15px;
            }

            input[name="quantity"] {
                width: 20px;
                background-color: transparent;
                border: none;
                color: black;

            }


            /* .redeem{
    margin-top: 70px;
    font-size: 15px;
    color: #FF9900;
    text-decoration: none;
  }
  
  .redeem:hover {
    text-decoration: underline;
  } */

            .progress-wrapper {
                position: relative;
                width: 200px;
                height: 200px;
            }

            .progress {
                position: absolute;
                top: 40px;
                left: 0;
                width: 100%;
                height: 100%;
                background: #f0f0f0;
                border-radius: 50%;
            }

            .progress-bar {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background-color: #FF9900;
                border-radius: 50%;
                transform: rotate(360deg);
            }

            .progress-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 24px;
                font-weight: bold;
                color: #444;
            }

            /* .redeem{
    margin-top: 70px;
    font-size: 15px;
    color: #FF9900;
    text-decoration: none;
  }
  
  .redeem:hover {
    text-decoration: underline;
  } */

            .vourcherBOX {
                display: flex;
                margin-top: 20px;
                box-shadow: 0px 0px 5px grey;
            }
        </style>
    </head>




    <div class="all">
        <div class="shoppingCartBar"></div>
        <span class="shoppingCart">Shopping Cart</span>




        <div class="shoppingCartContent">


            <div class="shoppingCartListItem">
                <div class="productSearch">
                </div>
                <div class="product-description">

                    <div></div>
                    <div class="description">
                        Product
                    </div>
                    <div class="description-size">
                        Name
                    </div>
                    <div class="description-price">
                        Price
                    </div>
                    <div class="description-quantity">
                        Quantity
                    </div>

                    <div class="description-subTotal">
                        Sub Total
                    </div>
                    <div></div>
                </div>
                @unless(count($shoppingCarts) == 0)
                    <div class="scroll-wrap" id="itemFound" runat="server">



                        @foreach ($shoppingCarts as $shoppingCart)
                            <div class="product-items">
                                <div></div>
                                <div class="imgBox">

                                    <img src="{{ $shoppingCart->meal_image ? asset('storage/' . $shoppingCart->meal_image) : asset('/images/no-image.png') }}"
                                        alt="" />
                                </div>

                                <div class="item-description">
                                    {{ $shoppingCart->meal_name }}
                                </div>

                                <div class="item-price" style="text-align:center; padding-left:20px;">
                                    RM<input type="text" id="price" name="price"
                                        value="{{ $shoppingCart->meal_price }}" disabled>
                                </div>
                                <div class="item-quantity">
                                    <div class="item-quantity-input">

                                        <input type="text" id="quantity" name="quantity"
                                            value="{{ $shoppingCart->pivot->shopping_cart_qty }}" min="0" disabled>
                                    </div>
                                </div>
                                <div class="item-sub-total">
                                    RM<input type="text" id="subtotal" name="subtotal"
                                        value="{{ $shoppingCart->meal_price * $shoppingCart->pivot->shopping_cart_qty }}"
                                        disabled>
                                </div>
                                <div class="actionButton">


                                    <a class="cancelButton" href="/deleteShoppingCart/{{ $shoppingCart->pivot->id }}">
                                        Cancel
                                    </a>

                                </div>
                            </div>
                        @endforeach





                    </div>
                @else
                    <div class="scroll-wrap" id="itemNonFound" runat="server">
                        <div class="noFoundBox">
                            <div class="noFoundDetail">
                                <img class="noItemfoundImg" src="../image/noItemsfound.png" alt="">
                                <p class="ItemNoFound">Oop! Item no Found..</p>
                            </div>
                        </div>

                    </div>
                @endunless
            </div>
            <div class="cartTotal">
                <div class="cartTotalContent">
                    <h1>Cart Totals</h1>
                    <div class="flex-form">
                        <div class="subTotal">
                            <h2>Sub Total</h2>
                        </div>
                        <div class="subTotal-price">
                            <p>
                                RM<input type="text" id="overallSubTotal" name="overallSubTotal" value="0.00"
                                    disabled>
                            </p>
                        </div>
                    </div>


                    <div class="flex-form">
                        <div class="shipping">
                            <h2>Shipping</h2>
                        </div>
                        <div class="address">
                            <p>
                                Delivery Fee:<span class="deliveryFee">RM <input type="text" id="delivery"
                                        name="delivery"
                                        value=@if (session()->has('promoteDeliveryFee')) {{ session('promoteDeliveryFee') }} @else {{ $addressFee }} @endif
                                        disabled /></span>

                            </p>

                            <p>Click Below Link To Manage Your Address</p>
                            <!--<p>To: <span class="customerAddress">Jalan 1A/6,47000 Sungai Buloh</span></p>-->



                            <div class="calculateShipping"><a href="/address">
                                    <p style="text-decoration-line:none; color:red">Manage Your Addresses</p>
                                </a></div>


                        </div>

                    </div>


                    <div class="flex-form">
                        <div class="shipping">
                            <h2>Voucher</h2>
                        </div>
                        <span class="moreVouchers" id="voucherButton">More Vouchers</span>

                        <div class="progress-container" id="voucherBox">

                            <form action="/update/voucher" method="POST">
                                @csrf
                                <input type="hidden" id="deliveryFee" name="deliveryFee" value="{{ $addressFee }}">

                                @foreach ($vouchers as $voucher)
                                    @if ($voucher['qty'] != 0)
                                        @if (!($voucher && now() > $voucher['expire_date']))
                                            <div class="vourcherBOX">
                                                <div class="vourcherInfrontDetailBox">

                                                    <img src="../image/grabfood.jpg" class="vourcherImg" />

                                                    <div class="vourcherCenterDetailBox">
                                                        <p class="discount"><b>{{ $voucher['code'] }}</b></p>
                                                        <p class="minSpend">{{ $voucher['description'] }}</p>
                                                    </div>
                                                </div>

                                                <div class="vourcherBackDetailBox">
                                                    <span class="validDate">Valid Until:
                                                        {{ $voucher['expire_date'] }}</span>


                                                </div>
                                                <div class="selectButtonBox"><input type="radio" name="voucher"
                                                        value="{{ $voucher['id'] }}"></div>
                                            </div>
                                        @endif
                                    @endif
                                @endforeach
                                <div class="redeemButtonBox">
                                    <button type="submit" id="apply_voucher" class="redeemButton">Apply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="flex-form">
                        <div class="Total">
                            <h2>Total</h2>
                        </div>
                        <div class="totalPrice">
                            <p>RM<input type="text" id="overallTotal" name="overallTotal" value="0.00"
                                    disabled>
                            </p>
                        </div>
                    </div>




                    <div class="flex-form">
                        <a class="check-out" href="/checkout">
                            Check Out
                        </a>
                    </div>



                </div>
            </div>
        </div>





    </div>




    <!-- <script src="../JavaScript/shoppingCart.js"></script>-->
    <script>
        let arrow = document.querySelectorAll(".calculateShipping");
        var incrementButton = document.getElementsByClassName('plus');
        var decrementButton = document.getElementsByClassName('minus');
        var overallSubtotal = 0;
        var subTotal = document.querySelectorAll("input[type='subtotal']");
        var setSubTotal = document.getElementById('overallSubTotal');
        var setTotalValue = document.getElementById('overallTotal');
        var setDelivery = document.getElementById('delivery');
        var voucherBox = document.getElementById('voucherBox');
        document.getElementById('voucherButton').addEventListener("click", function() {
            if (voucherBox.style.display === "none") {
                voucherBox.style.display = "initial";
            } else {
                voucherBox.style.display = "none";
            }
        });

        for (var i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement; //selecting main parent of arrow
                console.log(arrowParent)
                arrowParent.classList.toggle("showAddress");
            });
        }

        function calculateDeliveryFee(obj) {
            var state = obj.selectedIndex + 1;
            var westMalaysia = 8.25;
            var eastMalaysia = 10.20;
            if (state > 13) {

                setDelivery.value = eastMalaysia.toFixed(2);
            } else {
                setDelivery.value = westMalaysia.toFixed(2);
            }

            setTotalValue.value = (parseFloat(setDelivery.value) + parseFloat(setSubTotal.value)).toFixed(2)

        }

        if (subtotal.length == undefined) {
            overallSubtotal = parseFloat(subtotal.value);
            console.log(overallSubtotal);

        } else {
            for (var i = 0; i < subtotal.length; i++) {



                overallSubtotal = parseFloat(subtotal[i].value) + overallSubtotal;

            }
        }
        setSubTotal.value = overallSubtotal.toFixed(2);

        var totalPrice = parseFloat(setDelivery.value) + parseFloat(setSubTotal.value);
        setTotalValue.value = totalPrice.toFixed(2);



        for (var i = 0; i < incrementButton.length; i++) {
            var button = incrementButton[i];
            button.addEventListener('click', function(event) {
                var buttonClicked = event.target;
                var quantity = buttonClicked.parentElement.children[1];
                console.log(quantity);
                var itemPrice = buttonClicked.parentElement.parentElement.parentElement.children[2].children[0];
                console.log(itemPrice.value);
                var itemSubPrice = buttonClicked.parentElement.parentElement.parentElement.children[4].children[0];
                console.log(itemSubPrice);
                var newIncrementValue = parseInt(quantity.value) + 1;
                var newinputSubPrice = parseFloat(itemPrice.value) * newIncrementValue;
                itemSubPrice.value = newinputSubPrice.toFixed(2);
                quantity.value = newIncrementValue;
                overallSubtotal = 0;

                if (subtotal.length == undefined) {
                    overallSubtotal = parseFloat(subtotal.value) + overallSubtotal
                } else {
                    for (var i = 0; i < subtotal.length; i++) {

                        overallSubtotal = parseFloat(subtotal[i].value) + overallSubtotal;

                    }
                }
                setSubTotal.value = overallSubtotal.toFixed(2);
                setTotalValue.value = (parseFloat(setDelivery.value) + parseFloat(setSubTotal.value)).toFixed(2)

            })


        }

        for (var i = 0; i < decrementButton.length; i++) {
            var button = decrementButton[i];
            button.addEventListener('click', function(event) {
                var buttonClicked = event.target;
                var quantity = buttonClicked.parentElement.children[1];
                var itemPrice = buttonClicked.parentElement.parentElement.parentElement.children[2].children[0];
                console.log(itemPrice.value);
                var itemSubPrice = buttonClicked.parentElement.parentElement.parentElement.children[4].children[0];
                var newDecrementValue = parseInt(quantity.value) - 1;
                if (newDecrementValue == 0) {
                    return;
                }
                var newinputSubPrice = parseFloat(itemPrice.value) * newDecrementValue;
                itemSubPrice.value = newinputSubPrice.toFixed(2);
                quantity.value = newDecrementValue;
                overallSubtotal = 0;
                if (subtotal.length == undefined) {
                    overallSubtotal = parseFloat(subtotal.value) + overallSubtotal
                } else {
                    for (var i = 0; i < subtotal.length; i++) {

                        overallSubtotal = parseFloat(subtotal[i].value) + overallSubtotal;

                    }
                }
                setSubTotal.value = overallSubtotal.toFixed(2);
                setTotalValue.value = (parseFloat(setDelivery.value) + parseFloat(setSubTotal.value)).toFixed(2)

            })
        }
    </script>
</x-layout-customer>
