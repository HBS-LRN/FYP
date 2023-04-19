<link rel="stylesheet" href="{{ asset('./css/staffEditForm.css') }}">
<style>
    td {
        border: none;
        padding: 0px;
    }

    .addBtnCustomer {
        border: 1px solid black;
        border-radius: 5px;
        background-color: rgb(255, 86, 86);
        color: white;
        font-size: 15px;
        height: 34px;
        cursor: pointer;
        padding: 5px 60px;
    }

    .box .titleAddCustomer {
        font-size: 60px;
        text-align: center;
        margin-bottom: 15px;
    }

    .form .flex {
        display: flex;
        margin-top: 20px;
        margin-bottom: 0px;
    }

    .form .flex:nth-child(1) {
        margin: 0px;
    }

    .editBtnStaff {
        margin-top: 20px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: rgb(255, 86, 86);
        color: white;
        font-size: 15px;
        height: 34px;
        cursor: pointer;
        padding: 5px 60px;
    }

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

    /* .error:nth-child(4) {
            right:45px;
        }
        .error:nth-child(6) {
            right:50px;
        }
        .error:nth-child(7) {
            right:60px;
        }
        .error:nth-child(9) {
            right:20px;
        }
        
        .error:nth-child(10) {
            right:60px;
        }
       
        .error:nth-child(12) {
            right:40px;
        } */
</style>
<div class="Pagebody">
    <x-layout-admin>
    </x-layout-admin>
    <div class="box">
        <h2 class="titleAddCustomer">Customer Create Form</h2>
        <form class="form" method="post" action="/customer/store">

            @csrf
            @method('POST')

            <div class="flex">
                <label for="custName" class="label">Customer Name :</label>
                <input type="text" name="name" id="name" class="input"   value="{{ old('name') }}">

            </div>
            <div class="errBox">
                <label for=""></label>
                @error('name')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>

            <div class="flex">
                <label for="email" class="label">Customer Email :</label>
                <input type="email" name="email" id="email" class="input" value="{{ old('email') }}">


            </div>
            <div class="errBox">
                <label for=""></label>
                @error('email')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>

            <div class="flex">
                <label for="password" class="label">Password :</label>
                <input type="password" name="password" id="password" class="input" value="{{ old('password') }}">


            </div>
            <div class="errBox">
                <label for=""></label>
                @error('password')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>
            <div class="flex">
                <label for="password" class="label">Confirmation Password:</label>
                <input type="password" name="password_confirmation" class="input"
                    value="{{ old('password_confirmation') }}">


            </div>
            <div class="flex">
                <label for="custPhone" class="label">Customer Phone Number With(-) :</label>
                <input type="text" id="custPhone" class="input" name="phone" value="{{ old('phone') }}">


            </div>
            <div class="errBox">
                <label for=""></label>
                @error('phone')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>
            <div class="flex">
                <label for="birthOfDate" class="label">Birth Of Date</label>
                <input type="date" id="birthOfDate" class="input" name="birthdate">
              
            </div>
            <div class="errBox">
                <label for=""></label>
                @error('birthdate')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>

            <div class="flex">
                <label for="custGender" class="label">Customer Gender:</label>
                <span class="customerGender" id="GenderRadioButtonList" width="361px">

                    <input type="radio" style="font-size: 13px" name="gender" value="Male">Male
                    <input type="radio" style="font-size: 13px" name="gender" value="Female">Female
                </span>

            </div>
            <div class="errBox">
                <label for=""></label>
                @error('gender')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>


            <div class="addBtnSubmit">
                <button class="addBtnCustomer" type="submit">Create</button>

            </div>


        </form>

    </div>
</div>
