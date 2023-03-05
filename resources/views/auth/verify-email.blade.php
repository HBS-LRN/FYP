<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>

    <head>
           <link rel="stylesheet" href="../css/customerRegister.css">
    </header>
    
        <style>
    
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
     
        .customer-login{
            padding-bottom:14px;
        }
        .txtCustName, .txtCustEmail, .txtCustPassword {
            font-size:15px;
        }
        .error {
             color: red;
             border: none;
             font-size: 13px;
             margin-bottom: 28px;
             width: 97%;
             padding-left: 10px;
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
                                <h1>Reset Password Email Validation</h1>
                                 <p>Remember password? <a href="/login">Login Here</a></p>
                            </div>
                            <form method="POST" action="/password/forget" enctype="multipart/form-data">
                                @csrf
                            <div class="form">
                             
                                 <p style="margin:30px 0px 15px 0px;"><label for="email">Email :</label></p>
                                
                                 <input type="text" class="txtCustEmail" name="email"
                                 value="{{old('email')}}" />
    
                                 @error('email')
                                 <p class="error">*{{$message}}</p>
                                 @enderror
                             
                                 <button class="submit-btnRegister">
                                   Submit
                                  </button>
    
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
    
            </div>
        </form>
    </x-layout-customer>