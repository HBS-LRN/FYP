

    <head>
    <link rel="stylesheet" href="../css/customerCheckOut.css">
    <link rel="stylesheet" href="../css/paymentStyle.css">
    <style>
        .error {
        color: red;
        font-size: 13px;
        flex-basis: 50%;

    }

    .errBox label {
        flex-basis: 30%;
    }

    .errBox {
        display: flex;
    }
    </style>

</head>
<!-- entend customer layout component using x- instead of using include -->



    <x-layout-customer>
        <div class="all">
            <div class="checkoutHeader">
                <div class="checkoutBar"></div>
                <span class="checkout">Public Bank Payment Login</span>
            </div>
            <div class="containerBorder">
                <div class="bankImgHeader"><img src="../image/publicBankLogo.png" alt="" srcset=""></div>
            </div>

                <div class="paymentBox">
                    <div class="loginBox">
                        <form class="loginForm" action="/purchase/publicBankLogin/checkID" method="post">
                            @csrf 
                           
                            <h4>Login to PBe</h4>
                            <p class="todayTime" id="todayTime"></p>
                            <div class="inputBox">
                            
                            <input type="text" name="user_id" id="user_id" placeholder=" User ID">
                            <i class="fas fa-user"></i>
                            </div>
                            @if($errors->has('user_id'))
                                <div class="error">{{ $errors->first('user_id') }}</div>
                            @endif
                            <div class="LoginButtonBox">
                                <input type="submit" value="Next">
                            </div>
                        </form>
                    </div>
                    <div class="otherFunctionBox">
                            <p class="infoTitle">New to PBe?</p>
                            <ul>
                                <li><a href="">First Time Login Guide</a></li>
                                <li><a href="">PBe Online Security</a></li>
                                <li><a href="">FAQs</a></li>

                            </ul>
                            <p class="infoTitle">Need Help?</p>
                            <ul>
                            <li><a href="">Forgor Password?</a></li>
                            <li><a href="">User ID Deactivated?</a></li>
                            </ul>
                    </div>
                </div>
</div>
            <script>
                setInterval(loginTime, 1000);

                function loginTime(){
                    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                    const week =["Monday", "Tuesday", "Wednesday","Thurday","Friday","Saturday","Sunday"]
                    const setDate = new Date();

                    document.getElementById("todayTime").innerHTML= week[setDate.getDay()]+", " +setDate.getDate() +" " + months[setDate.getMonth()]+" " + setDate.getFullYear()+ " " + setDate.getHours() +":"+setDate.getMinutes()+":"+setDate.getSeconds();
                }

                
                
            </script>

   

    </x-layout-customer>
