import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';





import CustomerSideBar from "../../components/CustomerSideBar";


export default function Profile() {
    
    return (

        <div>
            <form method="POST" action="/profile/edit" enctype="multipart/form-data">

                <div class="all">

                    <div class="customerAccHeader">
                        <div class="customerAccBar"></div>
                        <span class="customerAcc">My Profile</span>
                    </div>

                    <div class="container custom-auth-gap" data-aos="flip-up"  data-aos-delay="300" data-aos-duration="400">
                        <div class="row">
                            <CustomerSideBar />
                            <div class="col-lg-2 accountContent">
                                <div class="accountTitle">
                                    <h3 class="profileTitle">My Profile</h3>
                                    <p class="subTitle">Manage and protect your account</p>

                                </div>


                                <div class="userProfile">
                                    <div class="text">


                                        <br />
                                        <div class="nameLabelInput">
                                            <label for="name" class="nameLabel">Name :</label>
                                            <input type="text" class="name" name="name"
                                                value="" />



                                        </div>
                                        {/* @error('name')
                                <span class="error" style="color:red">*{{ $message }}</span><br>
                            @enderror */}

                                        <br />
                                        <div class="emailLabelInput">
                                            <label for="email" class="emailLabel">Email :</label>
                                            <input type="text" class="email" name="email"
                                                value="" />

                                        </div>
                                        {/* @error('email')
                                <span class="error" style="color:red">*{{ $message }}</span><br>
                            @enderror */}


                                        <br />
                                        <div class="heightLabelInput">
                                            <label for="height" class="heightLabel">Height (CM):</label>
                                            <input type="text" class="height" name="height"
                                                value="" />

                                        </div>
                                        {/* @error('birthdate')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}



                                        <br />
                                        <div class="weightLabelInput">
                                            <label for="weight" class="weightLabel"> Weight (KG):</label>
                                            <input type="text" class="weight" name="weight"
                                                value="" />

                                        </div>
                                        {/* @error('birthdate')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}



                                        <br />
                                        <div class="phoneNumberLabelInput">
                                            <label for="phoneNumber" class="phoneNumberLabel">Phone Number With(-) :</label>
                                            <input type="text" class="phoneNumber" name="phone"
                                                value="" />

                                        </div>
                                        {/* @error('phone')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}

                                        <br />

                                        <div class="genderLabelInput">
                                            <label for="gender" class="genderLabel">Gender</label>


                                            <input type="radio" name="gender" value="Male" />Male
                                            &nbsp; <input type="radio" name="gender" value="Female"
                                            // {{ auth()->user()->gender == 'Male' ? 'checked' : '' }}>
                                            />Female

                                        </div>
                                        {/* 
                            @error('gender')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}

                                        <div class="dateLabelInput">
                                            <label for="birthOfDate" class="birthLabel">Birth Of Date</label>
                                            <input type="date" name="birthdate" id="birthdate" class="birthInput"
                                                value="{{ auth()->user()->birthdate }}" />
                                        </div>
                                        {/* @error('birthdate')
                                <span class="error"style="color:red">*{{ $message }}</span><br>
                            @enderror */}



                                        <br />

                                        
                                    

                                        <div class="saveButton">

                                            <button class="save" type="submit">Save </button>
                                        </div>




                                    </div>
                                    <div class="selectImage">
                                        {/* @if (auth()->user()->image != null) */}
                                        {/* <div class="image">



                                    <img Width="180" Height="180"
                                        src="{{ auth()->user()->image ? asset('storage/' . auth()->user()->image) : asset('/images/no-image.png') }}"
                                        alt="" />
                                </div> */}
                                        {/* @endif */}
                                        <img src="../assets/img/person3.jpg" width="180" height="180" /> 
                                        <input type="file" name="image" class="submitButton" accept=".png,.jpg,.jpeg,.gif" />
                                        <div class="fileSize">
                                            {/* @error('image') */}
                                            {/* <span style="color:red">*{{ $message }}</span><br><br>
                                @enderror */}
                                        </div>

                                        <div class="fileSize">
                                            File size: maximum 5 MB
                                        </div>
                                        <div class="fileExtension">File extension: .JPEG, .PNG</div>

                                    </div>
                                    

                                </div>


                            </div>
                        </div>
                    </div>



                </div>
            </form>

            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/customerAccount.css" />
                <link rel="stylesheet" href="../../../assets/css/customerSideBar.css" />
            </Helmet>
        </div>



    );
}
