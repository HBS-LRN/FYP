<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>

    <head>
        <link rel="stylesheet" href="../css/customerChangePassword.css">
    </head>
    <form method="POST" action="/users/changePass">
    <div class="all">
        <div class="customerAccHeader">
            <div class="customerAccBar"></div>
            <span class="customerAcc">My Account</span>
        </div>
    
        <div class="customerAccContent">
            <x-customer-sidebar />
            
                @csrf
                <div class="passwordContent">
                    <div class="accountTitle">
                        <h3 class="profileTitle"><b>Set Password</b></h3>
                        <p class="subTitle">For your account's security, do not share your password with anyone else</p>
                        <hr>
                    </div>
                    <div class="userProfile">
                        <div class="text">

                            <div class="passwordSetting">
                                <label for="currentPassword" class="currentPasswordLabel">Current Password</label>
                                <input type="password" class="currentPassword" name="currentPass"
                                    value="{{ old('currentPass') }}" />

                            </div>
                            @error('currentPass')
                                <span class="error" style="red">*{{ $message }}</span>
                            @enderror

                            <div class="passwordSetting">
                                <label for="newPassword" class="newPasswordLabel">New Password</label>
                                <input type="password" class="newPassword" name="password"
                                    value="{{ old('password') }}" />

                            </div>

                            @error('password')
                                <span class="error"  style="red">*{{ $message }}</span>
                            @enderror

                            <div class="confirmPasswordSetting">
                                <label for="confirmPassword" class="confirmPasswordLabel">Confirm Password</label>

                                <input type="password" class="confirmPassword" name="password_confirmation"
                                    value="{{ old('password_confirmation') }}" />

                            </div>
                            @error('password_confirmation')
                                <span class="error" style="red">*{{ $message }}</span>
                            @enderror


                            <div class="confirmButton">
                                <button type="submit" class="confirm">Submit</button>
                            </div>

                        </div>
                    </div>
          

        </div>
    </div>
</form>
</x-layout-customer>