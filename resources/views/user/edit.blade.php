
    <link rel="stylesheet" href="{{ asset('./css/staffEditForm.css') }}">
<style>
        td {
            border:none;
            padding:0px;
        }
        .editBtnCustomer{
            border: 1px solid black;
            border-radius: 5px;
            background-color: rgb(255, 86, 86);
            color: white;
            font-size: 15px;
            height: 34px;
            cursor: pointer;
            padding: 5px 60px;
         }
        .box .titleEditCustomer {
            font-size: 60px;
            text-align:center;
            margin-bottom: 15px;
        }
        .form .flex {
            display: flex;
            margin-top: 20px;
            margin-bottom:0px;
        }
        .form .flex:nth-child(1) {
            margin:0px;
        }
        .editBtnStaff {
            margin-top:20px;
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
            margin-bottom: 0px;
            width: 100%;
            position:relative;
            right:45px;
           
         }
        .error:nth-child(4) {
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
        }
</style>
    <div class="box">
      <h2 class="titleEditCustomer">Customer Edit Form</h2>
          <form class="form" method="post" action="/CustomerUpdate/{$user->id}">
              <asp:HiddenField ID="HiddenFieldCustomerId" runat="server" />
                
                <div class="flex">
                    <label for="custID" class="label">Customer ID :</label>
                    <input type="text" id="custID" class="input" ReadOnly value="{{$user->id}}">
                   
                   
                </div>
                <div class="flex">
                    <label for="custName" class="label">Customer Name :</label>
                    <input type="text" id="custName" class="input" value="{{$user->name}}">
                    
                </div>
                <!-- <asp:RequiredFieldValidator ID="reqCustName" runat="server" ErrorMessage="*Name Cannot Be Empty" CssClass="error" ControlToValidate="custName"  Display="Dynamic">*Name Cannot Be Empty</asp:RequiredFieldValidator> -->

                <div class="flex">
                    <label for="email" class="label">Customer Email :</label>
                    <input type="email" id="custEmail" class="input" value="{{$user->email}}">
                   
                    
                </div>
                <!-- <asp:RequiredFieldValidator ID="reqCustEmail" runat="server" ErrorMessage="*Email Cannot Be Empty" CssClass="error" ControlToValidate="custEmail"  Display="Dynamic">*Email Cannot Be Empty</asp:RequiredFieldValidator> -->

                <!-- <asp:RegularExpressionValidator ID="regexEmailValid" runat="server" CssClass="error" ValidationExpression="\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ControlToValidate="custEmail" Display="Dynamic" ErrorMessage="*Invalid Email Format"></asp:RegularExpressionValidator> -->
              <div class="flex">
                     <label for="custPhone" class="label">Customer Phone Number With(-) :</label>
                     <input type="text" id="custPhone" class="input" value="{{$user->phone}}">
                    
                    
                      </div>
               <!-- <asp:RequiredFieldValidator ID="reqCustPhone" runat="server" ErrorMessage="*Phone Number Cannot Be Empty" CssClass="error" ControlToValidate="custPhone"  Display="Dynamic">*Phone Number Cannot Be Empty</asp:RequiredFieldValidator> -->
                <!-- <asp:RegularExpressionValidator ID="regexPhoneValid" runat="server" CssClass="error" ValidationExpression="^[0-9]{3}-[0-9]{7}" ControlToValidate="custPhone" Display="Dynamic" ErrorMessage="*Invalid Phone Format"></asp:RegularExpressionValidator> -->
                  <div class="flex">
                        <label for="birthOfDate" class="label">Birth Of Date</label>
                        <input type="date" id="birthOfDate" class="input" value="<?php echo date_format(date_create($user->birthdate),"Y-m-d"); ?>" >
                        <!-- <?php echo $user->birthdate;?>  -->
                            </div>
                                  <!-- <asp:RequiredFieldValidator ID="reqCustBirthOfDate" runat="server" ErrorMessage="*Birth Date Cannot Be Empty" CssClass="error" ControlToValidate="birthOfDate"  Display="Dynamic">*Birth Date Cannot Be Empty</asp:RequiredFieldValidator> -->

              <div class="flex">
                     <label for="custGender" class="label">Customer Gender:</label>
                     <span class="customerGender" id="GenderRadioButtonList" width="361px">
                        <?php $genders=array('Male','Female'); 
                              foreach($genders as $gender): ?>
                        <input type="radio" value="<?php echo $gender;?>" 
                            <?php if($gender == $user->gender){ echo "checked";} ?>
                            ><?php echo $gender;?>
                        
                        <?php endforeach; ?>

                    </span> 
                     <!-- <asp:RadioButtonList ID="GenderRadioButtonList" runat="server" CssClass="customerGender" RepeatDirection="Horizontal" Width="361px">
                                    <asp:ListItem style="font-size:13px">Male</asp:ListItem>
                                    <asp:ListItem style="font-size:13px">Female</asp:ListItem>
                     </asp:RadioButtonList> -->

                 
                      </div>
                <!-- <asp:RequiredFieldValidator ID="RequiredCustomerGender" runat="server" ErrorMessage="*Gender Cannot Be Empty" CssClass="error" ControlToValidate="GenderRadioButtonList"  Display="Dynamic">*Gender Cannot Be Empty</asp:RequiredFieldValidator> -->


                <div class="editBtnSubmit">
                <button id="Edit" class="editBtnCustomer" OnClick="EditCustomer_Click" >Edit</button>
                 
                </div>
            

        </form>

    </div>
  


