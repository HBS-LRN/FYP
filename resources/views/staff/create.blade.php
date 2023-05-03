<link rel="stylesheet" href="{{ asset('./css/staffEditForm.css') }}">
<style>
    td {
        border: none;
        padding: 0px;
    }

    .deleteBtnStaff {
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

    .box .titleEditStaff {
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
        .box .titleAddStaff{
            font-size: 60px;
            text-align: center;
            margin-bottom: 15px;
        }
</style>
<div class="Pagebody">
    <x-layout-admin>
    </x-layout-admin>
    <div class="box">
        <h2 class="titleAddStaff">Staff Create Form</h2>
        <form class="form" method="post" action="/staff/store">

            @csrf
            @method('POST')

            <div class="flex">
                <label for="staffName" class="label">Staff Name :</label>
                <input type="text" name="name" id="name" class="input" value="{{ old('name') }}">

            </div>
            <div class="errBox">
                <label for=""></label>
                @error('name')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>

            <div class="flex">
                <label for="email" class="label">Staff Email :</label>
                <input type="email" name="email" id="email" class="input" value="{{ old('email') }}">


            </div>

            <div class="errBox">
                <label for=""></label>
                @error('email')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>
            <div class="flex">
                <label for="password" class="label">Staff Password :</label>
                <input type="password" name="password" id="password" class="input" value="{{ old('password') }}">


            </div>
            <div class="errBox">
                <label for=""></label>
                @error('password')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>
            <div class="flex">
                <label for="password" class="label">Staff Confirmation Password :</label>
                <input type="password" name="password_confirmation" class="input"
                    value="{{ old('password_confirmation') }}">


            </div>
            <div class="errBox">
                <label for=""></label>
                @error('password_confirmation')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>

            <div class="flex">
                <label for="custPhone" class="label">Staff Phone Number With(-) :</label>
                <input type="text" id="custPhone" class="input" name="phone" value="{{ old('phone') }}">


            </div>
            <div class="errBox">
                <label for=""></label>
                @error('phone')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>


            <div class="flex">
                <label for="custGender" class="label">Role :</label>

                <select name="role" class="input">
                    <option value=""> Select Role</option>
                    @foreach ($roles as $role)
                        <option value="{{ $role->id }}">
                            {{ $role->name }}</option>
                    @endforeach
                </select>

            </div>
            <div class="errBox">
                <label for=""></label>
                @error('role')
                    <p class="error" style="color:red">*{{ $message }}</p>
                @enderror
            </div>


            <div class="deleteBtnSubmit">
                <button id="delete" class="deleteBtnStaff">Create</button>

            </div>


        </form>

    </div>
</div>
