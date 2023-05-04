

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
    input[name="user_id"]{
        border:none;
        background:none;
        outline:none;
        font-weight: 800;
    }
    @media print {
        body{
            width:100%;
        }
  header,.checkoutHeader,.footer,button{
    display:none;
  }
  .containerBorder .bankImgHeader{
    padding-left:27%;
  }
  
}
button{
    margin-right:5px;
    border:none;
    outline:none;
    background-color: rgb(218, 68, 68);
    color:white;
    padding:5px 10px;
}
button:hover{
    cursor: pointer;
    background-color: rgb(230, 60, 60);
    
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
                <span class="checkout">Public Bank Payment Successfully</span>
            </div>
            <div class="containerBorder">
                <div class="bankImgHeader"><img src="../../image/publicBankLogo.png" alt="" srcset=""></div>
            </div>
        <div class="confirmationFormBox">
            
            <form action="/publicBank/continue" class="confirmationForm" method="POST">
               
                <h2 class="title">Public Bank Payment Receipt</h2>
            @csrf 
                <div class="flexBox">
                    <p class="Boxtitle">From Account</p><p class="result"><input type="text" name="user_id" id="user_id" value="{{$user_id}}" readonly></p>
                </div>
                <div class="flexBox">
                <p class="Boxtitle">Payment Status </p><p class="result">Successfully</p>
                </div>
               
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
              
                <div class="flexBox buttonBox">
                    <button onclick="window.print()">Print Receipt</button> 
                    <button type="submit">Continue</button>
                </div>

            </form>
            
        </div>
        
                
        </div>
        
   

    </x-layout-customer>
