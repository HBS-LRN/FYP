

<head>
    <link rel="stylesheet" href="../../css/customerCheckOut.css">
    <link rel="stylesheet" href="../../css/paymentStyle.css">
    <style>
        .error {
        color: red;
        font-size: 13px;
        flex-basis: 50%;

    }
    .all .paymentBox{
    box-shadow: 0px 0px 5px grey;
    display: flex;
    width: 50%;
    margin: 20px auto;
    
}
    .all .paymentBox .loginBox{
    flex-basis: 65%;
    padding: 15px 15px 0px 30px;
}
.loginForm .LoginButtonBox{
    padding-top: 10px;
    display: flex;
    justify-content: left;
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
                <div class="bankImgHeader"><img src="../../image/publicBankLogo.png" alt="" srcset=""></div>
            </div>
              <?php 
                foreach ($publicBankAccount as $account) {
                    if($account['user_id']==$user_id){
                        $accountSign= $account['account_sign'];
                        $userName = $account['user_name'];
                    }
                }
              
              ?>
               
                <div class="paymentBox">
                    <div class="loginBox">
                        <form class="loginForm" action="/purchase/publicBankLogin/password" method="post">
                            @csrf 
                            <div class="accountSignBox">
                                <span class="accountSign">{{$accountSign}}</span>
                            </div>
                            <p class="confirmInfo">
                                Is your Personal Login Phrase correct?
                            </p>
 
                            <div class="confirmButtonBox">
                                <div class="YesBox">
                                    <input type="radio" name="radBox" id="radBox1" value="yes"> Yes
                                </div>
                                <div class="NoBox">
                                <input type="radio" name="radBox" id="radBox2" value="No"> No
                                </div>
                            </div>
                            <div class="YesCondition" id="YesCondition">
                                <p class="infor">
                                    If this is not your Personal Login Phrase, do not proceed to login.
                                </p>
                                <p class="infor">
                                    Conact PBe Customer Support at 03-2179 5000 for assistance.
                                </p>
                                <div class="userNameBox">
                                    <input type="text" name="user_name" id="user_name" value="{{$userName}}" disabled>
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="passwordBox">
                            <input type="password" name="password" id="password" placeholder="User Password">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="LoginButtonBox">
                                <input type="submit" name="" value="Back"><input type="submit" value="Login">
                            </div>
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
<!-- <p id="showshow"></p> -->
            <script>
                
                var yesCond = document.getElementById("YesCondition");
                const radioSelection1 = document.getElementById("radBox1");
                const radioSelection2 = document.getElementById("radBox2");
                yesCond.style.display="none";
                radioSelection1.addEventListener("click",getRadioValueFunction);

                function getRadioValueFunction(){
                    if(radioSelection1.checked===true){
                        // document.getElementById("showshow").innerHTML = radioSelection1.value
                        yesCond.style.display="inherit";
                    }else{
                        // document.getElementById("showshow").innerHTML = "No";
                    }
                    
                }

                radioSelection2.addEventListener("click",getRadioValueFunction);

                function getRadioValueFunction(){
                    if(radioSelection2.checked===true){
                        // document.getElementById("showshow").innerHTML = radioSelection2.value
                        yesCond.style.display="none";
                    }else{
                        // document.getElementById("showshow").innerHTML = "Yes";
                    }
                    
                }
                
                
    

                
                
            </script>

   

    </x-layout-customer>
