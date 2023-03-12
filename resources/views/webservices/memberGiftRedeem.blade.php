<!DOCTYPE html>
<html lang="en">

<head>

    <script src="https://kit.fontawesome.com/550bf2e8d3.js" crossorigin="anonymous"></script>
    <!-- Title  -->
    <title>Karl - Fashion Ecommerce Template | Shop</title>



    <style>
        .companyTitle {
            margin: 5px 75px 95px 275px;
        }

        .cart-submit {
            margin-top: 24px;



        }
    </style>
    <!-- Core Style CSS -->
    <link rel="stylesheet" href="css/core-style.css">


    <!-- Responsive CSS -->
    <link href="css/responsive.css" rel="stylesheet">

</head>

<body>


    <div id="wrapper">

        <!-- ****** Header Area Start ****** -->
        <header class="header_area bg-img background-overlay-white" style="background-image: url(image/bg-1.jpg);">
            <!-- Top Header Area Start -->
            <div class="top_header_area">
                <div class="container h-100">
                    <div class="row h-100 align-items-center justify-content-end">

                        <div class="col-12 col-lg-7">
                            <div class="top_single_area d-flex align-items-center">
                                <!-- Logo Area -->
                                <div class="top_logo">
                                    <a href="#"><img src="image/logo.png" alt=""></a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </header>
        <!-- ****** Header Area End ****** -->



        <!-- ****** Quick View Modal Area Start ****** -->
        <div class="modal fade" id="quickview" tabindex="-1" role="dialog" aria-labelledby="quickview"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <!-- Add to Cart Form -->

                    <form method="POST" action="/gift/store" enctype="multipart/form-data" id="from1" data-flag="0">
                        @csrf
                        <div class="modal-body">
                            <div class="quickview_body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 col-lg-5">
                                            <div class="quickview_pro_img">
                                                <img src="image/product-1.jpg" alt="">
                                            </div>
                                        </div>
                                        <div class="col-12 col-lg-7">
                                            <div class="quickview_pro_des">
                                                <h4 class="title" id="item-name"></h4>

                                                <h5 class="price" id="item-memberPoint"></h5>

                                            </div>


                                            <input type="hidden" class="form-control" id="item-input" name="itemID">
                                            <div class="quantity">
                                                <span class="qty-minus"
                                                    onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i
                                                        class="fa fa-minus" aria-hidden="true"></i></span>

                                                <input type="number" class="qty-text" id="qty" step="1"
                                                    min="1" max="12" name="quantity" value="1">

                                                <span class="qty-plus"
                                                    onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i
                                                        class="fa fa-plus" aria-hidden="true"></i></span>
                                            </div>
                                            <button type="submit" name="addtocart" class="cart-submit">Redeem</button>


                                        </div>
                                    </div>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>

       

    </div>
    <!-- ****** Quick View Modal Area End ****** -->

    <section class="shop_grid_area section_padding_100">
        <p class="companyTitle">Grand Imperial Group Collaborated With KARL AS Third PARTY To Exchange Your item. Since you own <b> {{ auth()->user()->point }} Points</b>, Now Display Item Below <b> {{ auth()->user()->point }} </b> Points</p>

        <div class="container">
            <div class="row">
                <div class="col-12 col-md-2 col-lg-2">

                </div>

                <div class="col-12 col-md-8 col-lg-9">
                    <div class="shop_grid_product_area">
                        <div class="row">
                            @foreach ($memberGifts as $memberGift)
                                <!-- Single gallery Item -->
                                <div class="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                                    data-wow-delay="0.2s">
                                    <!-- Product Image -->
                                    <div class="product-img">

                                        <img src="{{ $memberGift['product_image'] ? asset('storage/' . $memberGift['product_image']) : asset('/images/no-image.png') }}"
                                            alt="" style="width:100%;height:240px;" />

                                        <div class="product-quicview">
                                            <a href="/voucher" class="item-link" data-item-id="{{ $memberGift['id'] }}"
                                                data-item-point="{{ $memberGift['memberPoint_cost'] }}"
                                                data-item-name="{{ $memberGift['product_name'] }}"
                                                data-item-image="{{ asset('storage/' . $memberGift['product_image']) }}"><i
                                                    class="fa fa-plus"></i></a>



                                        </div>
                                    </div>
                                    <!-- Product Description -->
                                    <div class="product-description">
                                        <h4 class="product-price">{{ $memberGift['memberPoint_cost'] }} Points</h4>
                                        <p>{{ $memberGift['product_name'] }}</p>

                                    </div>
                                </div>
                            @endforeach

                        </div>
                    </div>



                </div>
            </div>
        </div>
        <x-flash-message />
    </section>


    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/sweetalert2.all.min.js"></script>

    <script>
        $('.cart-submit').on('click', function(e) {
            e.preventDefault();
          
            Swal.fire({
                title: 'Are u sure you want to exchange this item ?',
                text: 'It Will Deduct Your Member Point Based On The Item Selected',
                type: 'warning',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok',

            }).then((result) => {

                $('#from1').attr('data-flag', '1');
                $('#from1').submit();
              
            })
        })
    </script>
    <script>
        $(document).ready(function() {
            $('.item-link').click(function() {
                // Get the item ID, name, and image URL from the data attributes
                var itemId = $(this).data('item-id');
                var itemName = $(this).data('item-name');
                var itemImage = $(this).data('item-image');
                var itemPoint = $(this).data('item-point');
                // Set the data-toggle and data-target attributes on the anchor tag
                $(this).attr('data-toggle', 'modal');
                $(this).attr('data-target', '#quickview');

                // Populate the pop-up form with the item data
                $('#quickview #item-input').val(itemId);
                // Add other input fields here
                $('#quickview #item-name').text(itemName);
                $('#quickview #item-memberPoint').text(itemPoint + ' Points');

                // Set the image source in the modal body
                $('#quickview .modal-body img').attr('src', itemImage);

                // Display the pop-up form
                $('#quickview').modal('show');

                // Prevent the default link behavior
                return false;
            });
        });
    </script>
    <script>
        $(document).ready(function() {
            $('.close').click(function() {
                $('#quickview').modal('hide');

                console.log("hi");
            });
        });
    </script>


    </div>

    <!-- /.wrapper end -->

    <!-- jQuery (Necessary for All JavaScript Plugins) -->
    <script src="js/jquery/jquery-2.2.4.min.js"></script>
    <!-- Popper js -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Plugins js -->
    <script src="js/plugins.js"></script>
    <!-- Active js -->
    <script src="js/active.js"></script>

</body>

</html>
