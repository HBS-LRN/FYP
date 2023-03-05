<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>

    <head>
        <link rel="stylesheet" href="../css/customerRegister.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

            .customer-login {
                padding-bottom: 14px;
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
    </head>

    <div class="customer-login-container">
        <div class="customer-login">
            <div class="logo">
                <img src="../image/GrandImperialGroupLogo.png" alt="">
            </div>
           
            <div class="customer-form">
                <div class="text-form">
                    <div class="login-form">
                        <h1>Reset Password </h1>
                        <p>Remember password? <a href="/login">Login Here</a></p>
                    </div>

                   
                    <form method="POST" action="/password/reset" enctype="multipart/form-data">
                        @csrf
                    <div class="form">
                    <div class="form">
                        <input type="hidden" name="token" value="{{ $token }}">
                        <input type="hidden" name="email" value="{{ $email }}">

                        <p style="margin:20px 0px 0px 0px;">
                            <label for="password">Email</label>
                            <br>
                            <input type="text" class="txtCustPassword" name="email"
                                value="{{ $email ??  old('password') }}" disabled />

                        </p>

                        <p style="margin:20px 0px 0px 0px;">
                            <label for="password">New Password</label>
                            <input type="password" class="txtCustPassword" name="password"
                                value="{{ old('password') }}" />


                            @error('password')
                            <p class="error">*{{ $message }}</p>
                        @enderror

                        </p>
                        <p style="margin:20px 0px 0px 0px;">
                            <label for="password">Confirm New Password</label>
                            <input type="password" class="txtCustPassword" name="password_confirmation"
                                value="{{ old('password_confirmation') }}" />

                            @error('password_confirmation')
                            <p class="error">{{ $message }}</p>
                        @enderror

                        </p>

                        <button type="submit" class="submit-btnRegister">
                            Submit
                        </button>


                    </div>

                </div>

            </div>

        </div>

    </div>
</x-layout-customer>
