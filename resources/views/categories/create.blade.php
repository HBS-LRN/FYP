<x-layout-admin>
</x-layout-admin>

<head>
    <link href="{{ asset('/css/addMeal.css') }}" rel="stylesheet">
</head>
<div class="box">
    <h2 class="addMeal">Add Category</h2>
    <form method="POST" action="/category/store" enctype="multipart/form-data">
        @csrf
        <div class="form">


            <div class="flex">
                <label for="name" class="label">Category Name :</label>
                <input type="text" class="input" name="name" />
            </div>
          

            <div class="flex">
                <label for="foodImage" class="label">Upload Image:</label>

                <input type="file" name="image" accept=".png,.jpg,.jpeg,.gif" />

            </div>
            
            <div class="flex">
                <label for="foodImage" class="label">Upload Image:</label>

                <input type="file" name="subImage" accept=".png,.jpg,.jpeg,.gif" />

            </div>
          
            <div class="addMeal">
                <button class="addMealButton" Text="Add Meal">Add Meal </button>


            </div>

        </div>

     
    </form>
