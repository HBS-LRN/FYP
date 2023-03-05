<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>


    <head>
        <link rel="stylesheet" href="../css/customerPurchase.css">
    </head>


    <div class="all">
        <div class="customerPurchaseHeader">
            <div class="customerPurchaseBar"></div>
            <span class="customerPurchase">My Purchase</span>
        </div>



        <div class="customerPurchaseContent">
            <x-customer-sidebar />

            <div class="purchaseContent">
                <div id="btn">
                </div>
                <div class="button-container">


                    <button type="button" class="toggle-btn" onclick="pendingProd()">
                        Preparing<span class="quantityProduct">({{ $prepareOrder }})</span></button>
                    <button type="button" class="toggle-btn" onclick="shipProd()">
                        To Delivery <span class="quantityProduct">({{ $deliverOrder }})</span></button>
                    <button type="button" class="toggle-btn" onclick="completeProd()">
                        Completed Order<span class="quantityProduct">({{  $completeOrder}})</span>
                    </button>

                </div>

                <div id="pendingProduct">


                    <div class="scroll-wrap">

                        @foreach ($orders as $order)
                            @foreach ($order->meals as $meal)
                                @if ($meal->pivot->meal_order_status == 'preparing')
                                    <div class="product-items">



                                        <img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                            alt="" />
                                        <div class="item-description">

                                            {{ $meal->meal_name }}

                                        </div>
                                        <div class="item-quantity">RM {{ $meal->meal_price }}
                                            X
                                            {{ $meal->pivot->order_quantity }}
                                        </div>
                                        <div class="item-total">
                                            Order Total:<p>
                                                RM {{ $meal->meal_price * $meal->pivot->order_quantity }}
                                            </p>
                                        </div>

                                        <div class="item-status">
                                            Product Status:<span class="item-currentStatus">Preparing</span>
                                        </div>
                                    </div>
                                    @endif
                                @endforeach
                            @endforeach
                    </div>

                </div>


                <div id="shipProduct">

                    <div class="scroll-wrap">

                        @foreach ($orders as $order)
                            @foreach ($order->meals as $meal)
                                @if ($meal->pivot->meal_order_status == 'delivering')
                                    <div class="product-items">
                                        <img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                            alt="" />

                                        <div class="item-description">
                                            {{ $meal->meal_name }}
                                        </div>
                                        <div class="item-quantity">RM{{ $meal->meal_price }}
                                            X
                                            {{ $meal->pivot->order_quantity }}
                                        </div>
                                        <div class="item-total">
                                            Order Total:<p>
                                                RM {{ $meal->meal_price * $meal->pivot->order_quantity }}
                                            </p>
                                        </div>

                                        <div class="confirmShip-item-status">
                                            Product Status:<span class="item-currentStatus">Delivering</span>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        @endforeach

                    </div>

                </div>



                <div id="completedProduct">

                    <div class="scroll-wrap">
                        @foreach ($orders as $order)
                            @foreach ($order->meals as $meal)
                                @if ($meal->pivot->meal_order_status == 'complete')
                                    <div class="product-items">

                                        <img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                            alt="" />


                                        <div class="item-description">
                                            {{ $meal->meal_name }}
                                        </div>
                                        <div class="item-quantity">RM{{ $meal->meal_price }}
                                            X
                                            {{ $meal->pivot->order_quantity }}
                                        </div>
                                        <div class="item-total">
                                            Order Total:<p>
                                                RM{{ $meal->meal_price * $meal->pivot->order_quantity }}
                                            </p>
                                        </div>

                                       
                                        <button type="button" class="ratingButton rating"
                                            runat="server">Rating</button>

                                      
                                            <div class="popup" id="popup-1">
                                                <div class="overlay"></div>
                                                <div class="content">
                                                    <div class="close-btn">&times;</div>
                                                    <div class="container">
                                                        <div class="">
                                                            <div class="text">Thanks for rating us!</div>
                                                        </div>
                                                        <form method="POST" action="/comment" enctype="multipart/form-data">
                                                            @csrf
                                                        <div class="star-widget">
                                                            <div class="star">

                                                                <input type="radio" name="rate" id="rate-5"
                                                                    value="5">
                                                                <label for="rate-5" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-4"
                                                                    value="4">
                                                                <label for="rate-4" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-3"
                                                                    value="3">
                                                                <label for="rate-3" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-2"
                                                                    value="2">
                                                                <label for="rate-2" class="fas fa-star"></label>
                                                                <input type="radio" name="rate" id="rate-1"
                                                                    value="1">
                                                                <label for="rate-1" class="fas fa-star"></label>
                                                            </div>
                                                            <div class="textarea">

                                                                <textarea cols="30" id="txtItemComment" placeholder="Describe about the product.." name="txtItemComment"></textarea>
                                                            </div>
                                                            <div class="btn">


                                                                <input type="hidden" id="mealOrderDetailId"
                                                                    name="mealOrderDetailId"
                                                                    value="{{ $meal->pivot->id }}">

                                                                <button type="submit" runat="server"
                                                                    onserverclick="btnRating_Click">Submit</button>

                                                            </div>
                                                        </div>
                                                    </form>



                                                    </div>
                                                </div>
                                            </div>
                                 

                                        <div class="item-status">
                                            Product Status:<span class="item-currentStatus">Completed</span>
                                        </div>
                                        @if ($meal->pivot->reply_comment != null)
                                            <div class="comment" id="id1" runat="server">
                                                <img src="../image/GrandImperialGroupLogo.png"
                                                    alt="">Grand<span class="semicolon">:</span>
                                                <p>{{ $meal->pivot->reply_comment }}</p>
                                            </div>
                                        @endif

                                    </div>
                                @endif
                            @endforeach
                        @endforeach


                    </div>

                </div>





            </div>
        </div>
    </div>

    <script src="../js/customerPurchase.js"></script>

</x-layout-customer>
