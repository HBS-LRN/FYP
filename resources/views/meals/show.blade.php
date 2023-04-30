<head>
    <link rel="stylesheet" href="../css/itemStyle.css">
<style>   
    p.freegift {
        font-family: 'Poppins', sans-serif;
        position:relative;
        text-align: center;
        font-size: 25px;
        margin: 10px 10px 10px 0%;
    }

    p.freegift label{
        position: absolute;
        top: 0;
        left: 0;
        text-align:center;
        color: black;
        font-size: 20px;
    }

    img.freegifts{
        width:110px;
        height:120px;
    }
    </style>

</head>

<form method="POST" action="/shoppingCart">
    @csrf


    <input name="meal_id" type="hidden" value="{{ $searchMeal->id }}">

    <div class="popup">
        <div class="popup-overlay"></div>
        <div class="main-popup">
            <div class="popup-content">
                <span class="close-btn"></span>

                <div class="imgbox">

                    <img class="img"
                        src="{{ $searchMeal->meal_image ? asset('storage/' . $searchMeal->meal_image) : asset('/images/no-image.png') }}"
                        alt="" />

                </div>
                <div class="detail">
                    <p class="foodName">
                        {{ $searchMeal->meal_name }}
                    </p>
                    <p class="price">
                        <label for="price" class="label">RM </label>

                        <input type="number" name="price" id="price" step="any"
                            value="{{ $searchMeal->meal_price }}" readonly>
                    </p>
                    <p class="qtySelection">
                        <label for="qty" class="label">QTY : </label>
                        <i class="fas fa-minus" id="QTYdecrement"></i>
                        <input type="number" name="shopping_cart_qty" id="qty" value="1">
                        <i class="fas fa-plus" id="QTYincrement"></i>
                    </p>
                    <p class="error NoDisplayError" id="errorMessage" style="font-size:20px;">*The Quantity Stock Has
                        Reach To Maximum</p>
                    <script>
                        const incrementButton = document.getElementById("QTYincrement");
                        const decrementButton = document.getElementById("QTYdecrement");
                        let priceValue = document.getElementById("price").value;
                        let qtyValue = 1;
                        const errorMessage = document.getElementById("errorMessage");
                        document.getElementById("qty").value = qtyValue;

                        document.getElementById("price").value = (qtyValue * priceValue).toFixed(2);


                        incrementButton.addEventListener("click", function() {

                            qtyValue++;
                            if (qtyValue > {{ $searchMeal->meal_qty }}) {
                                qtyValue -= 1;
                                errorMessage.classList.remove("NoDisplayError");
                            } else {

                                qty.value = {{ $searchMeal->meal_qty }};


                            }

                            document.getElementById("price").value = (qtyValue * priceValue).toFixed(2);


                            document.getElementById("qty").value = qtyValue;
                        });
                        decrementButton.addEventListener("click", function() {
                            errorMessage.classList.add("NoDisplayError");
                            if (qtyValue > 1) {
                                qtyValue -= 1;

                            } else {
                                qty.value = 1;
                            }
                            document.getElementById("price").value = (qtyValue * priceValue).toFixed(2);


                            document.getElementById("qty").value = qtyValue;
                        });
                    </script>
                    @if($freeGift!=null)
                        <p class="freegift">
                        <label for="freegift" class="label">Free Gift : </label>
                        <a><img class="freegifts" src="../{{$freeGift['image']}}" alt="Free Gift"></a>
                        </p>
                    @endif
                </div>

                <div class="submitBtnBox">

                    <button class="submitBtn">
                        Add To Cart
                    </button>

                </div>
                <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

            </div>
        </div>
    </div>
</form>


<script>
    const likeBtn = document.getElementsByClassName("fa-thumbs-up");
    var likeQty = document.getElementsByClassName("qtyLike");

    for (let i = 0; i < likeBtn.length; i++) {

        likeBtn[i].addEventListener("click", function() {
            if (likeBtn[i].style.color == "blue") {
                likeBtn[i].style.color = "grey";
                likeQty[i].innerHTML = parseInt(likeQty[i].innerHTML) - 1;
            } else {
                likeBtn[i].style.color = "blue";
                likeQty[i].innerHTML = parseInt(likeQty[i].innerHTML) + 1;
            }

        });

    }
    const popup = document.querySelector('.popup');
    const main_popup = document.querySelector('.main-popup');
    const close_btn = document.querySelector('.close-btn');
    popup.style.display = 'flex';
    main_popup.style.cssText = 'animation:slide-in ease; animation-fill-mode: forwards;';

    close_btn.addEventListener('click', () => {


        main_popup.style.cssText = 'animation:slide-out  ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 10000);
    });

    window.addEventListener('click', (e) => {

        if (e.target == document.querySelector('.popup-overlay')) {
            main_popup.style.cssText = 'animation:slide-out ease; animation-fill-mode: forwards;';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);
        }

    });
</script>



</section>



<script src="../js/popup.js"></script>
<script src="../js/itemsPage.js"></script>
<script>
    // const RankNav = document.getElementById("RankNav");
    // const reviewToUpBtn = document.getElementById("reviewToUp");
    // const reviewToDownBtn = document.getElementById("reviewToDown");
    // const commentBtn = document.getElementsByClassName("adminCommentBox");

    // const rankBox = document.getElementsByClassName("rank");
    // const adminCommentBoxBtn = document.getElementsByClassName("adminCommentBox");
    // const commentdisplayBox = document.getElementsByClassName("commentdisplayBox");
    // const rankPageButton = document.querySelectorAll(".rankButton");




    // const MealOrderQtyShow = document.getElementById("MealOrderQty");
    // const addToCartBtn = document.getElementById("addToCart");
    // const open_btn = document.querySelector('.item');

    // const pageR5 = document.getElementById("rank5B");
    // const pageR4 = document.getElementById("rank4B");
    // const pageR3 = document.getElementById("rank3B");
    // const pageR2 = document.getElementById("rank2B");
    // const pageR1 = document.getElementById("rank1B");

    // const qtyReview5 = document.getElementById("rank5");
    // const qtyReview4 = document.getElementById("rank4");
    // const qtyReview3 = document.getElementById("rank3");
    // const qtyReview2 = document.getElementById("rank2");
    // const qtyReview1 = document.getElementById("rank1");


    // for (let index = 0; index < adminCommentBoxBtn.length; index++) {
    //     commentdisplayBox[index].style.display = "none";
    //     adminCommentBoxBtn[index].addEventListener("click", function() {
    //         if (commentdisplayBox[index].style.display == "none") {
    //             commentdisplayBox[index].style.display = "flex";
    //         } else {
    //             commentdisplayBox[index].style.display = "none";
    //         }
    //     });

    // }
    // const additionalList = document.getElementById('additionalList');
    // reviewToUpBtn.addEventListener("click", function() {
    //     RankNav.style.display = "block";
    //     reviewToUpBtn.style.display = "none";
    //     reviewToDownBtn.style.display = "flex";
    //     additionalList.style.top = '3%';
    //     additionalList.style.height = '70%';

    //     for (let index = 0; index < rankBox.length; index++) {
    //         rankBox[index].style.minHeight = "495px";
    //         rankBox[0].style.display = "block";

    //     }

    // });
    // reviewToDownBtn.addEventListener("click", function() {
    //     RankNav.style.display = "none";
    //     reviewToUpBtn.style.display = "flex";
    //     reviewToDownBtn.style.display = "none";
    //     additionalList.style.top = '65%';
    //     additionalList.style.height = '25%';
    //     for (let index = 0; index < rankBox.length; index++) {
    //         rankBox[index].style.minHeight = "130px";
    //         rankBox[index].style.display = "none";

    //     }

    // });

    // function rankPageChangeFunction(x) {
    //     switch (x) {
    //         case 1:

    //             pageR5.style.display = "block";
    //             pageR4.style.display = "none";
    //             pageR3.style.display = "none";
    //             pageR2.style.display = "none";
    //             pageR1.style.display = "none";



    //             break;
    //         case 2:

    //             pageR5.style.display = "none";
    //             pageR4.style.display = "block";
    //             pageR3.style.display = "none";
    //             pageR2.style.display = "none";
    //             pageR1.style.display = "none";


    //             break;
    //         case 3:

    //             pageR5.style.display = "none";
    //             pageR4.style.display = "none";
    //             pageR3.style.display = "block";
    //             pageR2.style.display = "none";
    //             pageR1.style.display = "none";

    //             break;
    //         case 4:

    //             pageR5.style.display = "none";
    //             pageR4.style.display = "none";
    //             pageR3.style.display = "none";
    //             pageR2.style.display = "block";
    //             pageR1.style.display = "none";

    //             break;
    //         case 5:

    //             pageR5.style.display = "none";
    //             pageR4.style.display = "none";
    //             pageR3.style.display = "none";
    //             pageR2.style.display = "none";
    //             pageR1.style.display = "block";


    //             break;
    //         default:
    //             break;
    //     }
    // }
</script>
