
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
            flex-basis: 50%;
           
         }
         .errBox label{
    flex-basis: 30%;
}
.errBox{
    display:flex;
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
      <h2 class="titleEditCustomer">Customer Edit Form</h2>
          <form class="form" method="post" action="/customer/edit/{{$user->id}}">
                
                @csrf
                @method('PUT')
                <div class="flex">
                    <label for="custID" class="label">Customer No :</label>
                    <input type="text" id="custID" name="user_id" class="input" ReadOnly value="{{$user->id}}">
                   
                   
                </div>
                <div class="flex">
                    <label for="custName" class="label">Customer Name :</label>
                    <input type="text" name="name" id="name" class="input" value="{{$user->name}}">
                    
                </div>
                <div class="errBox">
                                <label for=""></label>
                                @error('name')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>

                <div class="flex">
                    <label for="email" class="label">Customer Email :</label>
                    <input type="email" name="email" id="email" class="input" value="{{$user->email}}">
                   
                    
                </div>
                <div class="errBox">
                                <label for=""></label>
                                @error('email')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>
              <div class="flex">
                     <label for="custPhone" class="label">Customer Phone Number With(-) :</label>
                     <input type="text" id="custPhone" class="input" name="phone" value="{{$user->phone}}">
                    
                    
                      </div>
                      <div class="errBox">
                                <label for=""></label>
                                @error('phone')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>
                  <div class="flex">
                        <label for="birthOfDate" class="label">Birth Of Date</label>
                        <input type="date" id="birthOfDate" class="input" name="birthdate" value="<?php echo date_format(date_create($user->birthdate),"Y-m-d"); ?>" >
                        <!-- <?php echo $user->birthdate;?>  -->
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
                        <?php $genders=array('Male','Female'); 
                              foreach($genders as $gender): ?>
                        <input type="radio" name="gender" value="<?php echo $gender;?>" 
                            <?php if($gender == $user->gender){ echo "checked";} ?>
                            ><?php echo $gender;?>
                        
                        <?php endforeach; ?>

                    </span> 

                      </div>
                      <div class="errBox">
                                <label for=""></label>
                                @error('gender')
                                <p class="error" style="color:red">*{{ $message }}</p>
                            @enderror
                            </div>


                <div class="editBtnSubmit">
                <button id="Edit"  class="editBtnCustomer">Edit</button>
                 
                </div>
            

        </form>

    </div>
</div>


