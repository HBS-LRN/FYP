<head>
    <style>
        .box {
            padding-bottom:30px;
        }
        .form{
            margin: 0px auto;
            width: 60%;
            height:fit-content;
            padding: 30px 60px 30px 30px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 0px 20px grey;
            margin-bottom:10000px;
        }
        .titleeditMeal{
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
        .form .flex:last-child {
            height:100px;
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
        .form .editMeal{
            display: flex;
            justify-content: right;
            justify-items: center;
            align-items: center;

        }
        .form .editMeal .editMealButton{
            border: 1px solid black;
            border-radius: 5px;
            background-color: rgb(255, 86, 86);
            color: white;
            font-size: 15px;
            height: 34px;
            cursor: pointer;
            padding: 5px 60px;
  
        }
        .image {
            height: 150px;
            width: 150px;
            margin-left: 26px;
        }
        td {
            padding:0px;
            border:none;
            
        }
        .error {
            color: red;
            font-size: 13px;
            margin-bottom: 0px;
            width: 100%;
           position:relative;
           right:35px;
           
        }
        .editMeal {
    font-size: 40px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
}
    </style>
</head>
<body>
<div class="Pagebody">
    <x-layout-admin>
    </x-layout-admin>

    <div class="box">
    
      <h2 class="editMeal">Edit Meal</h2>
      <form action="/mealupdate/{{$meal->id}}" method="POST" enctype="multipart/form-data">
        @csrf
       

          <div class="form">
              <!-- <asp:HiddenField ID="hiddenMealID" runat="server" /> -->
                
                <div class="flex">
                    <label for="mealID" class="label">Meal ID : </label>
                    <input type="text" id="txtMealID" name="meal_id" class="input" Text="1000" ReadOnly="true" value="{{$meal->id}}"/>                  
                </div>

                <div class="flex">
                    <label for="mealName" class="label">Meal Name :</label>
                    <input type="text" id="txtMealName" name="meal_name" class="input" value="{{ $meal->meal_name }}" />
                </div>
                @error('meal_name')
                        <p class="error">{{ $message }}</p>
                @enderror
            
              <div class="flex">
                        <label for="mealCategory" class="label">Meal Category :</label>
                        <select name="category_id" class="input">
                        <option value=""> Select category</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}" @if($meal->Category->id == $category->id) selected="selected" @endif>{{ $category->name }}</option>
                    @endforeach
                </select>
                       
                </div>
                @error('category_id')
                        <p class="error">{{ $message }}</p>
                @enderror

                <div class="flex">
                    <label for="mealQuantity" class="label">Meal Quantity :</label>
                    <input type="number" name="meal_qty" id="txtMealQuantity" class="input" value="{{ $meal->meal_qty }}" />
                    
                </div>
                @error('meal_qty')
                        <p class="error">{{ $message }}</p>
                @enderror

                <div class="flex">
                    <label for="mealPrice" class="label">Meal Price :</label>
                    <input type="text" id="txtMealPrice" name="meal_price" class="input" value="{{ $meal->meal_price }}" />  
                </div>
                @error('meal_price')
                        <p class="error">{{ $message }}</p>
                @enderror
            
                <div class="flex">
                    <label for="Image" class="label">Upload Image:</label>
                    <input type="file" id="FileUpload" name="meal_image" accept=".png,.jpg,.jpeg,.gif" />
                </div>
                @error('meal_image')
                        <p class="error">{{ $message }}</p>
                @enderror
                    

                <div class="editMeal">
                <button id="edit" type="submit" class="editMealButton" Text="Edit Meal">Edit Meal </button>
                </div>
            

        </div>
   </form>
    </div>
    </div>
</body>
