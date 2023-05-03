

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


<?php 

     $orders = Session::get('order');
     $user_id = Session::get('publicBank_ID');
     foreach (Session::get('publicBank') as $account) {
        if($account['user_id']==$user_id){
            $accountSign= $account['account_sign'];
            $userName = $account['user_name'];
            $account_num = $account['acount_number'];
            $acc_Type = $account['account_type'];
            $acc_email = $account['user_email'];
        }
    }
    $totalAmount = $orders->order_total + $orders->delivery_fee;
    
?>
    <x-layout-customer>
        <div class="all">
        <div class="checkoutHeader">
                <div class="checkoutBar"></div>
                <span class="checkout">Public Bank Payment Confirmation</span>
            </div>
            <div class="containerBorder">
                <div class="bankImgHeader"><img src="../../image/publicBankLogo.png" alt="" srcset=""></div>
            </div>
        <div class="confirmationFormBox">
            
            <form action="/publicBank/checkPAC" class="confirmationForm" method="POST">
                <div class="turnBackBox">
                    <button type="submit" class="turnBackB"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></button>
                    <p class="word">Payment Confirmation Session</p>
                </div>
                <h2 class="title">Instant Transfer to Grand Imperial Group</h2>
            @csrf 
                <div class="flexBox">
                    <p class="Boxtitle">From Account</p><p class="result">{{$user_id}}</p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">PAC No. </p><p class="result"><input type="text" name="pac" id="pac" placeholder="Enter PAC No..."></p>
                </div>
                @if($errors->has('pac'))
                <div class="flexBox">
                    <p class="Boxtitle"></p>
                    <p class="error">{{ $errors->first('pac') }}</p>
                </div>
                                
                @endif
                <div class="flexBox">
                <p class="Boxtitle">Beneficiary Bank</p><p class="result">{{$orders->payment_method}}</p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">Beneficiary Account No</p><p class="result">{{$account_num}}</p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">Beneficiary Account Type</p><p class="result">{{$acc_Type}}</p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">Beneficiary Name</p><p class="result">{{$userName}}</p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">Other Payment Details </p><p class="result"></p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">Recipient Reference</p><p class="result">Grand Imprial Order Payment</p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">Transaction Amount</p><p class="result">RM {{$totalAmount}}</p>
                </div>
              
                <div class="flexBox">
                    <input type="submit" id="submit" name = "submit" value="Back">
                    <input type="submit" id="submit" name = "submit" value="Cancel">
                    <input type="submit" id="submit" name = "submit" value="Request PAC Now">
                    <input type="submit" id="submit" name = "submit" value="Confirm">
                </div>

            </form>
            <div class="popUpBox" id="popUpBox">
            <div class="overlay">
            <div class="content">
                <div class="close-btn" ><img src="../../image/PBeLogo.png" alt="" width="80px" height="80px"><i class="fas fa-times" onclick="closepage()"></i></div>
                <h1>PBe Authentication Code (PAC)</h1>
                <p><b>PAC Request via SMS</b></p>
                <p>Your PAC number has been sent via Email to your registered email address <b>{{$acc_email}}</b></p>
                <p>If you have not received the SMS after 1 minute. please close this window and request for a new PAC</p>
                <div class="buttonBox">
                    <button onclick="closepage()">Close</button>
                </div>
            </div>
            </div>
        </div>
        </div>
        
                
        </div>
        <script>
            const popUpPage = document.getElementById('popUpBox');
        </script>
        @if(session('SendSuccessful'))
            <script>
                popUpPage.style.display="inherit";
                
            </script>
            @else 
            <script>
                popUpPage.style.display="none";
            </script>      
        @endif
            <script>
                function closepage(){
                    if(popUpPage.style.display=="inherit"){
                        popUpPage.style.display="none";
                    }else{
                        popUpPage.style.display="inherit";
                    }
                }
            </script>
   

    </x-layout-customer>
