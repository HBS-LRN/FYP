<!DOCTYPE html>
<html>

<head>
    <title>

    </title>
    <link rel="stylesheet" href="../../css/basicStyle.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="../css/CustomerHeaderBar.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/550bf2e8d3.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@700&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&family=Source+Sans+Pro:wght@300&display=swap"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300&family=DM+Sans:wght@500&family=Lato:wght@300&family=Nunito+Sans:wght@300&family=Source+Sans+Pro:wght@300&family=Work+Sans:wght@100;300&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&family=Source+Sans+Pro:wght@300&display=swap"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300&family=DM+Sans:wght@500&family=Lato:wght@300&family=Nunito+Sans:wght@300&family=Source+Sans+Pro:wght@300&family=Work+Sans:wght@100;300&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&family=Poppins&family=Roboto+Slab:wght@600&family=Source+Sans+Pro:ital,wght@1,300&family=Source+Serif+Pro:wght@300&display=swap"
        rel="stylesheet">

    <style>
        header .navigationBar {
            padding: 0px;
        }

        .customerAccContent .sideNavigation {
            flex-basis: 40%;
        }

        .profile_email {
            word-break: keep-all;
            word-wrap: normal;
            overflow-x: auto;
            overflow-y: no-display;
            text-overflow: ellipsis;
            margin: 0px;
            word-break: keep-all;
            width: 65%;
        }

        .profile_email::-webkit-scrollbar {
            -webkit-appearance: none;

        }

        header .navigationBar .nav .div {
            flex-basis: 25%;
            justify-content: center;
            display: flex;
            align-items: center;
            align-content: center;
            text-align: center;
        }

        header .navigationBar .nav .span {
            flex-basis: 100%;
            align-content: center;
            text-align: center;

        }

        header .navigationBar .nav .span a {}

        header .navigationBar .nav .span .underlineEffect {
            content: " ";
            transition: padding 0.8s;
            padding 0px;
            margin: 0pc 10px;
        }

        header .navigationBar .nav .span:hover .underlineEffect {
            background-color: rgb(197, 196, 196);
            padding: 0px 0px 2px 0px;
        }
    </style>
</head>

<body>

    <header>
        @auth <nav>
                <div>
                    <a href="/"><img src="../image/GrandImperialGroupLogoSmall.png" alt=""></a>
                </div>
                <div>
                    <input type="search" name="searchbar" id="search_text" placeholder="Type here to search"><i
                        class="fa fa-search"></i>



                </div>

                @if (auth()->user()->image != null)
                    <div class="custDetail" onclick="showLoginBar()">
                        <img class="profileImg"
                            src="{{ auth()->user()->image ? asset('storage/' . auth()->user()->image) : asset('/images/no-image.png') }}"
                            alt="" />
                        <span class="span">
                            HI!
                            {{ auth()->user()->name }}
                        </span>
                    </div>
                @else
                    <div class="loginRegister" onclick="showLoginBar()">
                        <i class="fas fa-user"></i><span class="span">HI!
                            {{ auth()->user()->name }}
                        </span>
                    </div>
                @endif

                <div>
                    <a href="/shoppingCart" class="a"><i class="fas fa-shopping-cart"></i>
                        <span class="MealOrderQty">
                            {{ auth()->user()->meals->count() }} </span><span id="cart"></span>
                    </a>
                </div>
                <div class="loginBar" id="loginBar">
                    <li><i class="far fa-user"></i><a href="/profile">My Account</a></li>
                    <li><i class="fas fa-wallet"></i><a href="/purchase"> My Purchase</a></li>
                    <li><i class="fas fa-sign-out-alt"></i> <a href="/logout"> Log Out</a> </li>
                </div>
                <script>
                    function showLoginBar() {
                        let logBar = document.getElementById("loginBar");
                        if (logBar.style.display == "block") {
                            logBar.style.display = "none";
                        } else {
                            logBar.style.display = "block"
                        }
                    }
                </script>

            </nav>
        @else
            <nav>
                <div>
                    <a href="/"><img src="../image/GrandImperialGroupLogoSmall.png" alt=""></a>
                </div>
                <div>
                    <input type="search" name="searchbar" id="search_text" placeholder="Type here to search"><i
                        class="fa fa-search"></i>

                </div>

                <div class="loginRegister"><i class="fas fa-user"></i><span><a href="/login">Login/Register</a></span>
                </div>

                <div><a href="/shoppingCart" class="a"><i class="fas fa-shopping-cart"></i></a>
                </div>

            </nav>


        @endauth
        <div id="result">

        </div>

        <div class="navigationBar">
            <nav class="nav">
                <span class="div"><span class="span"><a class="span" href="/">Home </a>
                        <div class="underlineEffect"></div>
                    </span></span>
                <span class="div">
                    <span class="span"><a href="/contactUs">Contact US </a>
                        <div class="underlineEffect"></div>
                    </span></span>
                <span class="div">
                    <span class="span"><a class="span" href="/aboutUs">About US </a>
                        <div class="underlineEffect"></div>
                    </span></span>
                <span class="div"><span class="span"><a class="span" href="/FAQ">FAQ </a>
                        <div class="underlineEffect"></div>
                    </span></span>


            </nav>
        </div>
    </header>



    <main>
        {{ $slot }}
    </main>


    <x-flash-message />
    <footer class="footer">
        <div class="col">
            <div class="content">
                <h3>Grand Imperial</h3>
                <pre>Grand Imperial was founded with an aim:
"The complement of enthusiasm, grace,
 and warm customer service are able tickle
 the senses as customers enjoy the flavors 
 and textures of exquisite cuisines produced 
 with passion by a team of skilled chefs.
 Grand Imperial Group offers their customers
 a new ambience to enjoy the Chinese cuisine
 great food with an affordable price.</pre>
            </div>


        </div>
        <div class="col">
            <h3>About</h3>
            <div class="content">

                <a href="/contactUs">
                    <p class="p"><u> Contact US</u></p>
                </a>
                <a href="/aboutUs">
                    <p class="p"><u>About US</u> </p>
                </a>
                <a href="/FAQ">
                    <p class="p"><u>F&Q</u></p>
                </a>
            </div>
        </div>
        <div class="col">
            <h3>Help</h3>
            <div class="content">



                <a href="/">
                    <p>Terms & Conditions</p>
                </a>

                <a href="/">
                    <p>Data Protection Policy</p>
                </a>
                <a href="/">
                    <p>Return Policy</p>
                </a>
            </div>
        </div>
        <div class="col">

            <div class="content">
                <h3>Follow Us On</h3>
                <a href="https://www.facebook.com/GrandImperialGroup/" class="a">
                    <img src="../image/fb.png" alt=""></a>
                <a href="https://www.instagram.com/grandimperialgroup/?hl=en" class="a">
                    <img src="../image/ig.png" alt=""></a>
                <a href="https://web.whatsapp.com/" class="a">
                    <img src="../image/whatsapp.png" alt=""></a>
            </div>

        </div>
    </footer>

</body>

</html>

<script>
    $(document).ready(function() {

        load_data();
        $('#search_text').keyup(function() {

            var search = $(this).val();
            if (search !== '') {
                load_data(search);
                $("#result").css("display", "inherit");
            } else {
                load_data();
                $("#result").css("display", "none");

            }
        });
    });

    function load_data(query) {
        $.ajax({

            type: 'get',
            url: '../search',
            data: {
                'search': query
            },
            success: function(data) {
                $('#result').html(data);
            }
        });
    }
</script>
