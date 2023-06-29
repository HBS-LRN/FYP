<head>
@inject('OrderController','\App\Http\Controllers\OrderController')
    <style>

        .form{
            margin: 0px auto;
            width: 60%;
            padding: 30px 60px 30px 30px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 0px 20px grey;
        }
        .titleManageRating{
            font-size: 60px; 
            margin-left: 10px;
            margin-top:20px;
            margin-bottom:20px;
            text-align:center;
        }
        .form .flex{
            display: flex;
            margin-bottom: 20px;
            margin-top:20px;
        }
        .form .flex .label{
            flex-basis: 30%;
            text-align:left;
        }

        .form .flex .input{
            flex-basis:70%;
            padding: 10px;
            outline: none;

    
            border: 1px solid grey;
    
        }
        .form .flex .input:focus{
            border: 1px solid blue;
        }
        .form .flex .input:last-child {
            resize:none;
        }
        .form .editBtnSubmit{
            display: flex;
            justify-content: right;
            justify-items: center;
            align-items: center;

        }
        .form .editBtnSubmit .editBtnRating{
            border: 1px solid black;
            border-radius: 5px;
            background-color: rgb(255, 86, 86);
            color: white;
            font-size: 15px;
            height: 34px;
            cursor: pointer;
            padding: 5px 60px;
        }
        td {
            border:none;
            padding:0px;
        }

        .error {
            color: red;
            font-size: 13px;
            margin-bottom: 0px;
            width: 100%;
            font-style: italic;
           right:35px;
           
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css ">
    <script src="https://kit.fontawesome.com/550bf2e8d3.js" crossorigin="anonymous"></script>
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
</head>
<div class="Pagebody">
    <x-layout-admin>
    </x-layout-admin>
    <div class="box">
      <h2 class="titleManageRating">Manage Rating</h2>

     <form action="/mealRating/update" method="POST">
          <div class="form">
                @csrf
                @method('PUT')

                <input type="hidden" id="mealOrderDetailId" name="mealOrderDetailId" value="{{$mealOrderDetail->id}}">
           
                <div class="flex">
                    <label for="orderID" class="label">Order Number :</label>
                    <input type="text" id="orderID" name="order_id" class="input" Text="1000" ReadOnly="true" value="{{$mealOrderDetail->order_id}}"/>
                </div>

                <div class="flex">
                    <label for="custName" class="label">Customer Name :</label>
                    <input type="text" id="custName" name="name" class="input"  ReadOnly="true" value="{{$mealOrderDetail->Order->User->name}}"/>
                    
                </div>

                <div class="flex">
                    <label for="mealName" class="label">Meal Name :</label>
                    <input type="text" id="mealName" name="meal_name" class="input"  ReadOnly="true" value="{{$mealOrderDetail->Meal->meal_name}}"/>
                    
                </div>
                @php
                 $ratingValue = $OrderController->showRating($mealOrderDetail->id);
                @endphp

              

                <div class="flex">
                    <label for="Rating" class="label">Rating :</label>
                    @for ($i = 0; $i < $ratingValue; $i++)
                  
                     <i class="fa fa-star checked" id="fa-star1"></i>
                    @endfor
                    </div>

               <div class="flex">
                    <label for="Comment" class="label">Comment :</label>
                   
                    <textarea id="comment" name="rating_comment" class="input" cols="20" rows="3" readonly>{{$mealOrderDetail->rating_comment}}</textarea>
              </div>
               <div class="flex">
                     <label for="rating" class="label">Reply :</label>  
                     <textarea id="replyComment" name="reply_comment" class="input" cols="20" rows="2" ></textarea>
               </div>
               @error('reply_comment')
                        <p class="error">{{ $message }}</p>
                @enderror

                <div class="editBtnSubmit">
                <button type="submit" id="Edit" class="editBtnRating" Text="Reply">Reply</button>
                </div>
            

        </div>
    </form>
    </div>
    </div>


