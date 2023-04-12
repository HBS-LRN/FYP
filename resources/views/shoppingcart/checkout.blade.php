<!-- <head>
    <link rel="stylesheet" href="../css/customerCheckOut.css">
</head>

<form method="POST" action="/redirectToPay" enctype="multipart/form-data">
    @csrf

    <x-layout-customer>
        <div class="all">
            <div class="checkoutHeader">
                <div class="checkoutBar"></div>
                <span class="checkout">Checkout</span>
            </div>
            <div class="containerBorder">
                <div class="newAddressContent">
                    <div class="newAddressTitle">
                        <h3 class="title">Billing Details</h3>
                    </div>
                    <div class="newAddressForm">
                        <div class="text">
                            <div class="userSetting">
                                <label for="userNameLabel" class="userNameLabel">Username</label>

                                <input type="text" class="userNameInput" name="address_username"
                                    value="{{ $address[0]->address_username }}" disabled />


                            </div>


                            <div class="userPhoneSetting">
                                <label for="addressUserPhoneInputLabel"
                                    class="addressUserPhoneInputLabel">UserPhone</label>

                                <input type="text" class="addressUserPhoneInput" name="address_userphone"
                                    value="{{ $address[0]->address_userphone }}"disabled />

                            </div>

                            <div class="streetAddressSetting">
                                <label for="streetAddressLabel" class="streetAddressLabel">Street Address</label>

                                <input type="text" class="streetAddressInput" name="address_userphone"
                                    value="{{ $address[0]->street }}" disabled />

                            </div>

                            <div class="townSetting">
                                <label for="townLabel" class="townLabel">Town</label>
                                <select name="area" class="townInput " disabled>
                                    <option value=""> Select Area</option>
                                    @foreach ($areas as $area)
                                        <option
                                            value="{{ $area->state_name }}"{{ $address[0]->area == $area->state_name ? 'selected' : '' }}>
                                            {{ $area->state_name }}</option>
                                    @endforeach
                                </select>
                            </div>



                            <div class="postalCodeSetting">
                                <label for="postalCodeLabel" class="postalCodeLabel">PostCode</label>

                                <input type="text" class="postalCodeInput" name="address_postcode"
                                    value="{{ $address[0]->postcode }}" disabled />

                            </div>
                            <div class="btnBox">
                                <a class="editAddressBtn" href="/address">Edit Address</a>

                            </div>

                        </div>

                    </div>



                </div>



                <div class="CheckOutcontainer">
                    <div class="yourOrderHeader">
                        <h3 class="yourOrderTitle">Your Order</h3>
                    </div>

                    <div class="tableItem">
                        <table class="tableContent">
                            <thead class="thead">
                                <tr class="tableHeader">
                                    <th class="productName">Product</th>
                                    <th class="productSubTotal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="tbody">
                                @foreach ($itemCheckOuts as $item)
                                    <tr class="item">

                                        <td class="tdItem"><b>{{ $item->meal_name }} x
                                                {{ $item->pivot->shopping_cart_qty }}</b></td>
                                        <td class="tdItem">
                                            <b>RM{{ $item->meal_price * $item->pivot->shopping_cart_qty }}</b>
                                        </td>
                                    </tr>
                                @endforeach

                                <tr class="subtotal">
                                    <th class="thItem">Subtotal</th>
                                    <td class="tdItem">RM{{ $subTotal }}
                                    </td>
                                    <input type="hidden" id="total" name="total" value="{{ $subTotal }}">
                                </tr>

                                @if (session()->has('voucherCode'))
                                    <tr class="DelieryFee" style="border-bottom:0.1px solid Silver;">

                                        <th class="thItem"><b>Voucher Used</b></th>
                                        <td class="tdItem"><b>{{ Session::get('voucherCode')}}</b></td>

                                    </tr>
                                @endif


                                <tr class="DelieryFee" style="border-bottom:0.1px solid Silver;">

                                    <th class="thItem"><b>Delivery Fee</b></th>
                                    <td class="tdItem"><b>RM{{ $addressFee }}</b></td>

                                </tr>

                                <tr class="total">
                                    <th class="totalPriceTitle">Total</th>
                                    <td class="totalPrice">RM{{ $totalPrice }}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    {{-- <asp:RadioButtonList CssClass="RadioButtonList1" ID="rbDeliveryMethod" runat="server" Width="361px">
                    <asp:ListItem>Pay On Delivery</asp:ListItem>
                    <asp:ListItem>Public Bank</asp:ListItem>
                    <asp:ListItem>Maybank</asp:ListItem>
                </asp:RadioButtonList> --}}

                    {{-- bungseng Radiobuttonlist 1 是她的CSS 的class
                --}}
                    <input type="radio" id="paymethod" name="paymethod" value="PayOnDelivery"
                        class="RadioButtonList1">
                    <label for="payondelivery">Pay On Delivery</label><br><br>
                    <input type="radio" id="paymethod" name="paymethod" value="PublicBank" class="RadioButtonList1">
                    <label for="public bank">Public Bank</label><br><br>
                    <input type="radio" id="paymethod" name="paymethod" value="MayBank" class="RadioButtonList1">
                    <label for="Maybank">May Bank</label><br>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="submitButtonBox">


                        <button type="submit" class="placeOrder">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
        <script src="../JavaScript/jquery-3.6.0.min.js"></script>
        <script src="../JavaScript/sweetalert2.all.min.js"></script>
        <script src="../JavaScript/popup.js"></script>
        <script type="text/javascript">
            function addressNotFound() {
                Swal.fire({
                    icon: 'error',
                    title: 'You Do Not Have Any <b>Address<b> To Check Out',
                    footer: '<a href="../customer/CustomerAddressList.aspx">Click Here To Set Your Address </a>',
                    showCloseButton: true,
                    showCancelButton: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    }
                })
            }


            function paymentNotFound() {
                Swal.fire({
                    icon: 'error',
                    title: 'Please Choose At Least One Payment Method',

                    showCloseButton: true,
                    showCancelButton: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    }
                })
            }


            function yesNoCheck() {
                if (document.getElementById('directBankInBlock').style.display = "none") {
                    document.getElementById('directBankInBlock').style.display = "block";
                    document.getElementById('paypalBlock').style.display = "none";
                } else {
                    document.getElementById('directBankInBlock').style.display = "none";
                }
            }

            function paypalConfirm() {
                if (document.getElementById('paypalBlock').style.display = "none") {
                    document.getElementById('paypalBlock').style.display = "block";
                    document.getElementById('directBankInBlock').style.display = "none";
                } else {
                    document.getElementById('paypalBlock').style.display = "none";
                }
            }
        </script>

    </x-layout-customer> -->

    <head>
    <link rel="stylesheet" href="../css/customerCheckOut.css">
    <style>
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
    </style>

</head>
<!-- entend customer layout component using x- instead of using include -->
<form method="POST" action="/redirectToPay" enctype="multipart/form-data">
    @csrf

    <x-layout-customer>
        <div class="all">
            <div class="checkoutHeader">
                <div class="checkoutBar"></div>
                <span class="checkout">Checkout</span>
            </div>
            <div class="containerBorder">
                <div class="newAddressContent">
                    <div class="newAddressTitle">
                        <h3 class="title">Billing Details</h3>
                    </div>
                    <!-- <form action="/address/update2/{{ $address[0]->id }}" method="POST">
                     @csrf
                    @method('PUT') -->
                    <div class="newAddressForm">
                        <input type="hidden" class="userNameInput" name="address_id" value="{{$address[0]->id}}"/>
                        <div class="text">
                            <div class="userSetting">
                                <label for="userNameLabel" class="userNameLabel">Username</label>

                                <input type="text" class="userNameInput" name="address_username"
                                    value="{{ $address[0]->address_username }}"  />
                            </div>
                            <div class="errBox">
                                <label for=""></label>
                                @error('address_username')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>
                            <br>


                            <div class="userPhoneSetting">
                                <label for="addressUserPhoneInputLabel"
                                    class="addressUserPhoneInputLabel">UserPhone</label>

                                <input type="text" class="addressUserPhoneInput" name="address_userphone"
                                    value="{{ $address[0]->address_userphone }}"/>

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
                                    value="{{ $address[0]->street }}"  />

                            </div>
                            <div class="errBox">
                                <label for=""></label>
                                @error('street')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>  
                            <br>

                            <div class="townSetting">
                                <label for="townLabel" class="townLabel">Town</label>
                                <select name="area" class="townInput " disabled>
                                    <option value=""> Select Area</option>
                                    @foreach ($areas as $area)
                                        <option
                                            value="{{ $area->state_name }}"{{ $address[0]->area == $area->state_name ? 'selected' : '' }}>
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
                                <label for="postalCodeLabel" class="postalCodeLabel">PostCode</label>

                                <input type="text" class="postalCodeInput" name="postcode"
                                    value="{{ $address[0]->postcode }}" />

                            </div>
                            <div class="errBox">
                                <label for=""></label> 
                            @error('postcode')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>

                            <!-- <div class="submitButtonaddAddress">
                                <button class="editAddressBtn" type="submit" >Submit</button>
                            </div> -->

                        </div>
                        <!-- </form> -->
                    </div>
           


                </div>



                <div class="CheckOutcontainer">
                    <div class="yourOrderHeader">
                        <h3 class="yourOrderTitle">Your Order</h3>
                    </div>

                    <div class="tableItem">
                        <table class="tableContent">
                            <thead class="thead">
                                <tr class="tableHeader">
                                    <th class="productName">Product</th>
                                    <th class="productSubTotal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="tbody">
                                @foreach ($itemCheckOuts as $item)
                                    <tr class="item">

                                        <td class="tdItem"><b>{{ $item->meal_name }} x
                                                {{ $item->pivot->shopping_cart_qty }}</b></td>
                                        <td class="tdItem">
                                            <b>RM{{ $item->meal_price * $item->pivot->shopping_cart_qty }}</b>
                                        </td>
                                    </tr>
                                @endforeach

                                <tr class="subtotal">
                                    <th class="thItem">Subtotal</th>
                                    <td class="tdItem">RM{{ $subTotal }}
                                    </td>
                                    <input type="hidden" id="total" name="total" value="{{ $subTotal }}">
                                </tr>

                                @if (session()->has('voucherCode'))
                                    <tr class="DelieryFee" style="border-bottom:0.1px solid Silver;">

                                        <th class="thItem"><b>Voucher Used</b></th>
                                        <td class="tdItem"><b>{{ Session::get('voucherCode')}}</b></td>

                                    </tr>
                                @endif


                                <tr class="DelieryFee" style="border-bottom:0.1px solid Silver;">

                                    <th class="thItem"><b>Delivery Fee</b></th>
                                    <td class="tdItem"><b>RM{{ $addressFee }}</b></td>

                                </tr>

                                <tr class="total">
                                    <th class="totalPriceTitle">Total</th>
                                    <td class="totalPrice">RM{{ $totalPrice }}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    {{-- <asp:RadioButtonList CssClass="RadioButtonList1" ID="rbDeliveryMethod" runat="server" Width="361px">
                    <asp:ListItem>Pay On Delivery</asp:ListItem>
                    <asp:ListItem>Public Bank</asp:ListItem>
                    <asp:ListItem>Maybank</asp:ListItem>
                </asp:RadioButtonList> --}}

                    {{-- bungseng Radiobuttonlist 1 是她的CSS 的class
                --}}
                    <input type="radio" id="paymethod" name="paymethod" value="PayOnDelivery"
                        class="RadioButtonList1">
                    <label for="payondelivery">Pay On Delivery</label><br><br>
                    <input type="radio" id="paymethod" name="paymethod" value="PublicBank" class="RadioButtonList1">
                    <label for="public bank">Public Bank</label><br><br>
                    <input type="radio" id="paymethod" name="paymethod" value="MayBank" class="RadioButtonList1">
                    <label for="Maybank">May Bank</label><br>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="submitButtonBox">


                        <button type="submit" class="placeOrder">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
        <script src="../JavaScript/jquery-3.6.0.min.js"></script>
        <script src="../JavaScript/sweetalert2.all.min.js"></script>
        <script src="../JavaScript/popup.js"></script>
        <script type="text/javascript">
            function addressNotFound() {
                Swal.fire({
                    icon: 'error',
                    title: 'You Do Not Have Any <b>Address<b> To Check Out',
                    footer: '<a href="../customer/CustomerAddressList.aspx">Click Here To Set Your Address </a>',
                    showCloseButton: true,
                    showCancelButton: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    }
                })
            }


            function paymentNotFound() {
                Swal.fire({
                    icon: 'error',
                    title: 'Please Choose At Least One Payment Method',

                    showCloseButton: true,
                    showCancelButton: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    }
                })
            }


            function yesNoCheck() {
                if (document.getElementById('directBankInBlock').style.display = "none") {
                    document.getElementById('directBankInBlock').style.display = "block";
                    document.getElementById('paypalBlock').style.display = "none";
                } else {
                    document.getElementById('directBankInBlock').style.display = "none";
                }
            }

            function paypalConfirm() {
                if (document.getElementById('paypalBlock').style.display = "none") {
                    document.getElementById('paypalBlock').style.display = "block";
                    document.getElementById('directBankInBlock').style.display = "none";
                } else {
                    document.getElementById('paypalBlock').style.display = "none";
                }
            }
        </script>

    </x-layout-customer>
