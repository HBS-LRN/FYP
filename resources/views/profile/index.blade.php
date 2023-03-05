<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>


<head>
    <link rel="stylesheet" href="../css/customerAccount.css">
</head>

<form method="POST" action="/profile/edit" enctype="multipart/form-data">
    @csrf
<div class="all">
    <div class="customerAccHeader">
        <div class="customerAccBar"></div>
        <span class="customerAcc">My Account</span>
    </div>

    <div class="customerAccContent">
        <x-customer-sidebar/>
        <div class="accountContent">
            <div class="accountTitle">
                <h3 class="profileTitle">My Profile</h3>
                <p class="subTitle">Manage and protect your account</p>
                <hr>
            </div>
          
                
            <div class="userProfile">
                <div class="text">


                    <br>
                    <div class="nameLabelInput">
                        <label for="name" class="nameLabel">Name :</label>
                        <input type="text" class="name" name="name" value="{{ auth()->user()->name }}" />



                    </div>
                    @error('name')
                        <p class="error" style="color:red">*{{ $message }}</p>
                    @enderror

                    <br>
                    <div class="emailLabelInput">
                        <label for="email" class="emailLabel">Email :</label>
                        <input type="text" class="email" name="email" value="{{ auth()->user()->email }}" />

                    </div>
                    @error('email')
                        <p class="error" style="color:red">*{{ $message }}</p>
                    @enderror


                    <br>
                    <div class="phoneNumberLabelInput">
                        <label for="phoneNumber" class="phoneNumberLabel">Phone Number With(-) :</label>
                        <input type="text" class="phoneNumber" name="phone" value="{{ auth()->user()->phone }} {{old('phone')}}" />

                    </div>
                    @error('phone')
                        <p class="error"style="color:red" >*{{ $message }}</p>
                    @enderror

                    <br>

                    <div class="genderLabelInput">
                        <label for="gender" class="genderLabel">Gender</label>
                        {{-- <asp:RadioButtonList ID="GenderRadioButtonList" runat="server" CssClass="auto-style1"
                            RepeatDirection="Horizontal" Width="361px">
                            <asp:ListItem style="font-size: 13px" Selected="True">Male</asp:ListItem>
                            <asp:ListItem style="font-size: 13px">Female</asp:ListItem>
                        </asp:RadioButtonList> --}}

                        <input type="radio" style="font-size: 13px" name="gender" value="Male"
                            {{ auth()->user()->gender == 'Male' ? 'checked' : '' }}>Male
                        <input type="radio" style="font-size: 13px" name="gender" value="Female"
                            {{ auth()->user()->gender == 'Female' ? 'checked' : '' }}>Female
                    </div>

                    <div class="dateLabelInput">
                        <label for="birthOfDate" class="birthLabel">Birth Of Date</label>
                        <input type="date" name="birthdate" id="birthdate" class="birthInput" value="{{ auth()->user()->birthdate }}">
                    </div>
                    @error('birthdate')
                        <p class="error"style="color:red" >*{{ $message }}</p>
                    @enderror



                    <br>


                    <div class="saveButton">
                     
                            <button class="save" type="submit">Save </button>
                    </div>




                </div>
                <div class="selectImage">
                    @if( auth()->user()->image != null)
                    <div class="image">

                       
                    
                        <img Width="180" Height="180" src="{{ auth()->user()->image ? asset('storage/' . auth()->user()->image) : asset('/images/no-image.png') }}"
                        alt="" />
                    </div>
                    @endif
                   
                        <input type="file" name="image" class="submitButton" accept=".png,.jpg,.jpeg,.gif" />

                    <div class="fileSize">
                        File size: maximum 5 MB
                    </div>
                    <div class="fileExtension">File extension: .JPEG, .PNG</div>

                </div>
           
            </div>


            </div>
        </div>



    </div>
</form>
</x-layout-customer>