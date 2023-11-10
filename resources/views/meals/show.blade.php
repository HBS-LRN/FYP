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

