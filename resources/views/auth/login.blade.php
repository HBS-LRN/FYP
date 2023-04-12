<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>


    <head>

    <link rel="stylesheet" href="../css/customerLogin.css">
   
    </head>
    <form method="POST" action="/users/authenticate">
        @csrf
    <div class="customer-login-container">
        <div class="customer-login">
            <div class="logo">
                <img src="../image/GrandImperialGroupLogo.png" alt="">
            </div>
            <div class="customer-form">
                <div class="text-form">

                    <div class="login-form">
                        <h1>User Login</h1>
                        <p>New User? <a href="/register">Register Here</a></p>
                    </div>
                    
                    <div class="text email">
                        <label for="email">User Email</label>
                        <input type="text" class="txtCustEmail" name="email"
                        value="{{ old('email') }}" />

                        @error('email')
                        <p class="error">*{{$message}}</p>
                        @enderror
                        
                    </div>
                    <div class="text password">
                        <label for="passwordText">Password</label><br>

                        <input type="password" class="txtCustPassword" name="password"
                        value="{{ old('password') }}" />
                      
                        @error('password')
                        <p class="error">*{{$message}}</p>
                        @enderror
                        </div>

                    
                    <div class="forgetPassword">
                        <a href="/password/forget">Forget Password?</a>
                    </div>

                    <button class="submit-btnLogin">
                        Log In
                      </button>
                  
                </div>

            </div>

        </div>

    </form>




    
    
    </div>




</x-layout-customer>