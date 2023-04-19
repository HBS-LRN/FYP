<head>
    <link href="{{ asset('/css/addMeal.css') }}" rel="stylesheet">

    <style>
        .swal-wide {
            width: 512px !important;
            height: 333.98px !important;
            padding: 0.8em 1em 0 !important;
            color: #595959 !important;
            font-size: 1.03em !important;
            font-weight: 300 !important;
            text-align: center !important;
            text-transform: none !important;
        }
    </style>
</head>
<div class="Pagebody">
    <x-layout-admin>
    </x-layout-admin>


    <div class="box">
        <h2 class="titleaddMeal">Add Meal</h2>
        <form method="POST" action="/meal/store" enctype="multipart/form-data">
            @csrf
            <div class="form">


                <div class="flex">
                    <label for="meal_name" class="label">Meal Name :</label>
                    <input type="text" class="input" name="meal_name" value="{{ old('meal_name') }}" />
                </div>
                <div class="errBox">
                    <label for=""></label>
                    @error('meal_name')
                        <p class="error" style="color:red">*{{ $message }}</p>
                    @enderror
                </div>


                <div class="flex">
                    <label for="mealCategory" class="label">Meal Category :</label>


                    <select name="category_id" class="input">
                        <option value=""> Select category</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                        @endforeach


                    </select>
                </div>

                <div class="errBox">
                    <label for=""></label>
                    @error('category_id')
                        <p class="error" style="color:red">*{{ $message }}</p>
                    @enderror
                </div>



                <div class="flex">
                    <label for="mealQuantity" class="label">Meal Quantity :</label>
                    <input class="input" name="meal_qty" value="{{ old('meal_qty') }}" type="number" />
                </div>

                <div class="errBox">
                    <label for=""></label>
                    @error('meal_qty')
                        <p class="error" style="color:red">*{{ $message }}</p>
                    @enderror
                </div>
                <div class="flex">
                    <label for="mealPrice" class="label">Meal Price :</label>
                    <input class="input" name="meal_price" value="{{ old('meal_price') }}" />
                </div>
                <div class="errBox">
                    <label for=""></label>
                    @error('meal_price')
                        <p class="error" style="color:red">*{{ $message }}</p>
                    @enderror
                </div>


                <div class="flex">
                    <label for="foodImage" class="label">Upload Image:</label>

                    <input type="file" name="meal_image" accept=".png,.jpg,.jpeg,.gif" />

                </div>

                <div class="errBox">
                    <label for=""></label>
                    @error('meal_image')
                        <p class="error" style="color:red">*{{ $message }}</p>
                    @enderror
                </div>
                <div class="addMeal">
                    <button class="addMealButton" Text="Add Meal">Add Meal </button>


                </div>

            </div>


        </form>
    </div>
</div>
