<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>

    <form action="/address/{{ $address->id }}" method="POST">
        @csrf
        @method('PUT')

        <head>
            <link rel="stylesheet" href="../css/addAddress.css">

        </head>

        <div class="all">
            <div class="customerAccHeader">
                <div class="customerAccBar"></div>
                <span class="customerAcc">My Account</span>
            </div>



            <div class="customerAccContent">
                <x-customer-sidebar />

                <div class="addAddressContent">
                    <div class="addAddressTitle">
                        <h3 class="profileTitle">Edit Address</h3>
                        <hr class="hr1">
                    </div>

                    <div class="userAddress">
                        <div class="userInfo">

                            <div class="fullNameSetting">
                                <label for="fullNameLabel" class="fullNameLabel">Full Name</label>

                                <input type="text" class="fullNameInput" name="address_username"
                                    value="{{ $address->address_username }}" />


                            </div>
                            <div class="errBox">
                                <label for=""></label>
                                @error('address_username')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>
                            

                            <br>
                            <div class="phoneNumberSetting">
                                <label for="phoneNumberLabel" class="phoneNumberLabel">Phone Number(-)</label>
                                <input type="text" class="phoneNumberInput" name="address_userphone"
                                    value="{{ $address->address_userphone }}" />


                            </div>
                            <div class="errBox">
                                <label for=""></label>
                            @error('address_userphone')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
</div>
                            <br>

                            <div class="streetAddressSetting">
                                <label for="streetAddressLabel" class="streetAddressLabel">Street Address</label>

                                <input type="text" class="streetAddressInput" name="street"
                                    value="{{ $address->street }}" />


                            </div>
                            <div class="errBox">
                                <label for=""></label>
                                @error('street')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>
                            
                            <br>

                            <div class="stateSetting">
                                <label for="txtStateLabel" class="stateLabel">Area</label>


                                <select name="area" class="stateInput">
                                    <option value=""> Select Area</option>
                                    @foreach ($areas as $area)
                                        <option
                                            value="{{ $area->state_name }}"{{ $address->area == $area->state_name ? 'selected' : '' }}>
                                            {{ $area->state_name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="errBox">
                                <label for=""></label>
                            @error('area')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>
                            


                            <br>
                            <div class="postalCodeSetting">
                                <label for="postalCodeLabel" class="postalCodeLabel">PostCode </label>
                                <input type="text" class="postalCodeInput" name="postcode"
                                    value="{{ $address ->postcode }}" />

                            </div>
                            <div class="errBox">
                                <label for=""></label> 
@error('postcode')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
</div>
                            



                            <div class="submitButtonaddAddress">

                                <button class="submitaddAddress" type="submit" Text="Add Meal">Submit</button>

                            </div>

                        </div>

                    </div>
                </div>

    </form>

    </div>
    </div>

</x-layout-customer>
