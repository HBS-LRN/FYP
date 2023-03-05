<x-layout-admin>
</x-layout-admin>

<head>
    <link href="{{ asset('/css/addMeal.css') }}" rel="stylesheet">
</head>
<div class="box">
    <h2 class="addMeal">Add Meal</h2>
    <form method="POST" action="/meal/store" enctype="multipart/form-data">
        @csrf
        <div class="form">


            <div class="flex">
                <label for="meal_name" class="label">Meal Name :</label>
                <input type="text" class="input" name="meal_name" value="{{ old('meal_name') }}" />
            </div>

            @error('meal_name')
                <p class="error">{{ $message }}</p>
            @enderror


            <div class="flex">
                <label for="mealCategory" class="label">Meal Category :</label>


                <select name="category_id" class="input">
                    <option value=""> Select category</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                    @endforeach


                </select>
            </div>
            @error('category_id')
                <p class="error">{{ $message }}</p>
            @enderror




            <div class="flex">
                <label for="mealQuantity" class="label">Meal Quantity :</label>
                <input class="input" name="meal_qty" value="{{ old('meal_qty') }}" type="number" />
            </div>
            @error('meal_qty')
                <p class="error">{{ $message }}</p>
            @enderror

            <div class="flex">
                <label for="mealPrice" class="label">Meal Price :</label>
                <input class="input" name="meal_price" value="{{ old('meal_price') }}" />
            </div>
            @error('meal_price')
                <p class="error">{{ $message }}</p>
            @enderror

            <div class="flex">
                <label for="foodImage" class="label">Upload Image:</label>

                <input type="file" name="meal_image" accept=".png,.jpg,.jpeg,.gif" />

            </div>
            @error('meal_image')
                <p class="error">{{ $message }}</p>
            @enderror

            <div class="addMeal">
                <button class="addMealButton" Text="Add Meal">Add Meal </button>


            </div>

        </div>

     
    </form>
