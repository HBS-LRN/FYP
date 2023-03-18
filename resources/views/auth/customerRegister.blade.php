<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>


    <head>
        <link rel="stylesheet" href="../css/customerRegister.css">
    </head>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .customer-login {
            padding-bottom: 14px;
        }

        .error {
            margin:0px;
            border: none;
            color: red;
            font-size: 13px;
            margin-bottom: 2px;
            width: 97%;
            padding-left: 10px;
        }

        .customer-login .logo {
            flex-basis: 20%;
        }

        .customer-login .customer-form {
            flex-basis: 80%;
            margin: 0px;
            padding: 10px 50px;
        }

        .txtCustName,
        .txtCustEmail {
            margin-right: 20px;
        }

        .submit-btnRegister {
            background: linear-gradient(to right, #ff105f, #ffad06);
            width: 350px;
            height: 38px;
            border-radius: 25px;
            text-align: center;
            padding-top: 5px;
            margin-top: 30px;
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
                        <h1>Customer Register</h1>
                        <p>Already Login? <a href="/login">Login Here</a></p>
                    </div>

                    <form method="POST" action="/users">
                        @csrf
                        <div class="form">



                            <label for="Username">Username</label>
                            <input type="text" class="txtCustName" name="name" value="{{ old('name') }}" />
                            @error('name')
                                <p class="error">*{{ $message }}</p>
                            @enderror


                            <p style="margin: 0px;">
                                <label for="email">Email</label>
                            </p>
                            <input type="text" class="txtCustEmail" name="email" value="{{ old('email') }}" />
                            @error('email')
                                <p class="error">*{{ $message }}</p>
                            @enderror

                            <p style="margin: 0px;">
                                <label for="password">Password</label>
                            </p>
                            <input type="password" class="txtCustPassword" name="password"
                                value="{{ old('password') }}" />
                            @error('password')
                                <p class="error">*{{ $message }}</p>
                            @enderror


                            <p style="margin: 0px;">
                                <label for="password">Confirm Password</label>
                            </p>

                            <input type="password" class="txtCustConfirmPassword" name="password_confirmation"
                                value="{{ old('password_confirmation') }}" />
                            @error('password_confirmation')
                                <p class="error">*{{ $message }}</p>
                            @enderror


                            <div class="checkbox">
                                <input type="checkbox" id="TermCondition" name="TermCondition"
                                    value="termAndCondition">


                                <label for="checkbox" id="checkbox">Term & Condition</label>
                            </div>

                            @error('TermCondition')
                                <p class="error">*{{ $message }}</p>
                            @enderror
                            <button type="submit" class="submit-btnRegister">Register</button>




                        </div>

                    </form>
                </div>

            </div>

        </div>
    


    </div>
 
    <div class="popUpTeamNCondition">
        <div class="model1">
            <div class="close2">+</div>
            <h1>Term & Condition</h1>
            <b>Welcome to Grand Imperial Group!</b><br>
            These terms and conditions outline the rules and regulations for the use of Grand Imperial Group! Website
            , located at Grand Imperial Group By accessing this website we assume you accept these terms and
            conditions.
            Do not continue to use Grand Imperial Group! if you do not agree to take all of the terms and conditions
            stated on this page.
            <br>
            <br>
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
            and all Agreements: “Students”, “You” and “Your” refers to you, the person log on this website and
            compliant
            to the Company's terms and conditions. All terms refer to the offer, acceptance and consideration of
            payment
            necessary to undertake the process of our assistance to the Client in the most appropriate manner for
            the express purpose of meeting the Client's needs in respect of provision of the Company's stated
            services, in
            accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other
            words in the singular, plural, capitalization and/or he/she or they, are taken as
            interchangeable and therefore as referring to same.
            <br>
            <br>
            <b>Cookies</b><br>
            We employ the use of cookies. By accessing Grand Imperial Group, you agreed to use cookies in
            agreement with the Grand Imperial Group! Privacy Policy.Most interactive websites use cookies
            to let us retrieve the user's details for each visit. Cookies are used by our website to enable the
            functionality of
            certain areas to make it easier for people visiting our website. Some of our affiliate/advertising
            partners may
            also use cookies.
            <br>
            <br>
            <b>License</b><br>
            Unless otherwise stated, Grand Imperial Group and/or its licensors own the intellectual property rights
            for all material on Grand Imperial Group. All intellectual property rights are reserved. You may
            access this
            from Grand Imperial Group for your own personal use subject to restrictions set in these terms
            and conditions.

            This Agreement shall begin on the date here of.
        </div>
    </div>
    <script>
        document.querySelector('.close2').addEventListener('click', function() {
            document.querySelector('.popUpTeamNCondition').style.display = 'none';
        });
        document.getElementById('checkbox').addEventListener('click', function() {
            document.querySelector('.popUpTeamNCondition').style.display = 'flex';
        });
    </script>
</x-layout-customer>
