<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>
<head>
    <link rel="stylesheet" href="../css/customerRegister.css">
</header>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .customer-login {
            padding-bottom: 14px;
        }

        .txtCustName, .txtCustEmail, .txtCustPassword {
            font-size: 15px;
        }
         .error {
            color: red;
            border: none;
            font-size: 13px;
            margin-bottom: 28px;
            width: 97%;
            padding-left: 10px;
        }
    </style>
    <div class="customer-login-container">
        <div class="customer-login">
            <div class="logo">
                <img src="../image/GrandImperialGroupLogo.png" alt="">
            </div>
            <div class="customer-form">
                <div class="text-form">
                    <div class="login-form">
                        <h1>Tell About Yourself</h1>

                    </div>
                    <form method="POST" action="/listings" enctype="multipart/form-data">
                        @csrf
                    <div class="form">

                                <label for="Username">1) What's the name of the first school you attended?</label>
                                <input type="text" class="txtCustName" name="private_question"
                                value="{{old('private_question')}}" />
   
                                @error('private_question')
                                <span class="error">{{$message}}</span>
                                @enderror
                               


                 
                                <button class="submit-btnRegister">
                                    Submit
                                   </button>
                                
                       
                    </div>
                </form>

                </div>

            </div>

        </div>

    </div>



</x-layout-customer>