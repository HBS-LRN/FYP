<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>




    <link rel="stylesheet" href="../css/homepage.css">
    <link rel="stylesheet" href="../css/basicStyle.css">
    <script src="https://kit.fontawesome.com/29cfd90f91.js" crossorigin="anonymous"></script>
    <style>
        .dotBlock {
            position: absolute;
            top: 180%;
            left: 48%;
        }

        .banner {
            display: flex;
            margin: 100px 50px;
            border-radius: 20px;
            padding: 0px;
        }

        .banner .content .detail {
            color: grey;
            font-weight: bolder;
        }

        .subTitle {
            margin-top: 80px;
            margin-bottom: 10px;
            text-align: center;
            font-size: 30px;
            font-family: 'Poppins', sans-serif;
        }

        .sectionBody .leftContent .btn .button {
            background-color: #f17163;
            padding: 15px 45px;
            box-shadow: 5px 5px 20px #f17163;
            margin-right: 20px;
            border-radius: 70px;
            font-weight: bolder;
            color: white;
        }

        .adminBtnBox {
            display: flex;
            justify-content: right;
            justify-items: right;
        }

        .adminBtnBox .adminBtn {
            color: white;
            padding: 5px 25px;
            text-decoration: none;
            background-color: rgb(255, 86, 86);
            border: 1px solid white;
            border-radius: 5px;
        }

        header .navigationBar {

            width: 1519.2px;
            height: 60px;
            background-color: rgb(236, 236, 236);
            padding: 0px;
            padding-bottom: 30px;

        }
    </style>



    <div class="sectionBody">
        <div class="rightContent div">
            <img src="../image/DimSum/indexDimSum.png" alt="">
        </div>
        <div class="leftContent div">
            <p class="p">&#128512; Easy Way To Order Your Food</p>
            <div class="title">
             
                <b>Order Tasty & Fresh Food <span class="title">anytime</span></b>

            </div>

            <pre class="p">Tracking along with us are a whole lot of restaurants </pre>
            <pre class="p"> for your picking together we care for your together</pre>
            <pre class="p"> we care for your hungry tummies!</pre>
            <div class="btn">
                <a href="/category/show" class="button">Delivery</a>
            </div>
        </div>

    </div>
    <h3 class="subTitle">Menu Categories</h3>
    <div class="section2">

        <div class="slideButton">
            <i class="fas fa-angle-left" onclick="scollLeft()"></i>
        </div>
        <div class="sideShow" id="sideShow">





           
                @foreach ($categories as $category)
                <div class="img">
                <a href="">

                    <img src="{{ $category->image ? asset ('storage/'.$category->image) : asset('/images/no-image.png')}}" alt="" />
                   
                    {{ $category->name }}
                   
                    Menu
                </a>
            </div>
                @endforeach
               
            



        </div>
        <div class="slideButton"><i class="fas fa-angle-right" onclick="scollRight()"></i></div>
        <div class="dotBlock"><i class="fas fa-circle" id="dot1"></i><i id="dot2" class="fas fa-circle"></i>
        </div>
    </div>
    <script>
        let sideShow = window.document.getElementById("sideShow");
        let dot1 = window.document.getElementById("dot1");
        let dot2 = window.document.getElementById("dot2");
        let scollValue = 0;

        function scollRight() {

            if (scollValue < 2805) {
                scollValue += 930;
                dot2.style.opacity = 1;
                dot1.style.opacity = 0.5;
            } else {
                scollValue = 0;
                dot1.style.opacity = 1;
                dot2.style.opacity = 0.5;
            }
            sideShow.scrollTo(scollValue, 0);

        }

        function scollLeft() {
            if (scollValue > 0) {
                scollValue -= 930;
                dot1.style.opacity = 1;
                dot2.style.opacity = 0.5;

            } else {
                scollValue = 2790;
                dot2.style.opacity = 1;
                dot1.style.opacity = 0.5;
            }
            sideShow.scrollTo(scollValue, 0);
        }
    </script>
    <div class="banner1 banner">
        <div class="img">
            <img class="img" src="../image/homepageBanner1.png" alt="">
        </div>
        <div class="content">
            <div class="detail">
                <h1 class="title">GRAND IMPERIAL GROUP</h1>
                Established since 2008, we are Malaysia's leading company in the food and beverage industry. Over the
                years, we have grown by leaps and bounds, and is now a household name synonymous with exquisite culinary
                offerings and excellent ambience and other food related products and services.
                <div class="adminBtnBox">
                    <a class="adminBtn" href="../StaffLogin.aspx">
                        Admin Login
                    </a>
                </div>
            </div>

        </div>

    </div>
    <div class="banner2 banner">
        <div class="content">
            <div class="detail">
                <h1 class="title">Grand Imperial Group's 10th Scores</h1>
                The Grand Imperial Group's 10th outpost scores close to a perfect ten on every level: Launched this past
                month in a sparkling setting on Pavilion Kuala Lumpur's sixth floor, fully refurbished with a stage
                backed by an LED screen, this is a banquet hall for all occasions, from birthday celebrations to
                weddings, serving striking culinary specialities that impress with prime flair.
            </div>
        </div>

        <div class="img">
            <img class="img" src="../image/homepageBanner2.png" alt="">
        </div>

    </div>


</x-layout-customer>
