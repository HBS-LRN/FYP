<head>
    <link rel="stylesheet" href="../css/staffEditForm.css">
    <style>
        td {
        padding:0px;
        border:none;
        }
        .editMealInventoryBox {

            display:flex;
            justify-content:right;

        }
        .editMealInventoryButton {
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
            font-size:13px;
             position:relative;
            right:25px;
        }
        .error1{
           right:40px;           
        }

    </style>
</head>

<body>
    <div class="box">
    <x-layout-admin>
    </x-layout-admin>
      <h2 class="editMealInventory">Update Meal Quantity</h2>
      <form action="/updateInventory/{{$meal->id}}" method="POST" enctype="multipart/form-data">
        @csrf
          <div class="form">                
                <div class="flex">
                    <label for="mealID" class="label">Meal ID :</label>
                    <input type="text" id="txtMealID" name="meal_id" class="input" Text="1000" ReadOnly="true" value="{{$meal->id}}"/>                     
                </div>
                
                <div class="flex">
                    <label for="mealName" class="label">Meal Name :</label>
                    <input type="text" id="txtMealName" name="meal_name" class="input" ReadOnly="true" value="{{ $meal->meal_name }}" />  
                </div>

                <div class="flex">
                    <label for="mealQuantity" class="label">Meal Quantity :</label>
                    <input type="number" name="meal_qty" id="txtMealQuantity" class="input" value="{{ $meal->meal_qty }}" />   
                </div>
                @error('meal_qty')
                        <p class="error">{{ $message }}</p>
                @enderror
                   
                <div class="editMealInventoryBox">
                <button id="Edit" type="submit" class="editMealInventoryButton">Edit Meal</button>
                </div>
            
        </div>
        </form>
    </div>
</body>

