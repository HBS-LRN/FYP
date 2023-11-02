<?php

namespace App\Http\Controllers\Api;


use App\Models\Meal;
use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use App\Models\MealOrderDetail;
use App\Models\Meal_Ingredient;
use Illuminate\Http\Request;
use App\Http\Requests\mealStoreRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;



class MealController extends Controller
{
   
    public function index()
    {
        $meal = Meal::all(); 
        return response()->json($meal);
    }

    public function show($id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        return response()->json($meal);
    }

    
    public function search(Request $request)
    {

        $output = "";
        if ($request->ajax()) {
            $meals = Meal::where('meal_name', 'like', '%' . $request->search . '%')
                ->orWhere('meal_price', 'Like', '%' . $request->search . '%')->get();

            if (count($meals) > 0) {

                foreach ($meals as $meal) {

                    $output .= "<p class='srcP'> <a class='productA' href='/mealpopups/" . $meal->id . "'>";
                    $output .= "<img class='imgSrc' src=" . asset('storage/' . $meal->meal_image) . ">" . $meal->meal_name . "</a></p>";

                    //<img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                    //  alt="" />
                }
            } else {
                $output .= '<b> *Sorry , No Result Found</b>';
            }
        } else {
            $output .= '<b>No Result Found</b>';
        }
        return $output;
    }


    
    public function store(MealStoreRequest $request)
{
    try {
        \Log::info('Request data received in update method', ['request' => $request->all()]);
        // Generate a unique image name
        $imageName = Str::random(32) . "." . $request->meal_image->getClientOriginalExtension();

        // Specify the absolute path
        $absolutePath = public_path('../react/assets/img/meal');

        // Ensure the directory exists
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        // Create Product
        $meal = new Meal();
        $meal->meal_price = $request->meal_price;
        $meal->meal_name = $request->meal_name;
        $meal->meal_desc = $request->meal_desc;
        $meal->meal_image = $imageName;
        $meal->category_id = $request->category_id;
        
        $meal->save();
        // Specify the relative path
        $relativePath = '../react/assets/img/meal/' . $imageName;

        // Save Image using file_put_contents
        file_put_contents($relativePath, file_get_contents($request->meal_image));
        $ingredientIds = is_array($request->ingredient_id) ? $request->ingredient_id : [];

        $this->storeMealIngredients($meal, $ingredientIds);
        // Return Json Response
        return response()->json([
            'message' => "Category successfully created."
        ], 200);
    } catch (\Exception $e) {
        \Log::error('Category creation failed: ' . $e->getMessage());
        return response()->json([
            'message' => 'Something went really wrong!' . $e->getMessage(),
        ], 500);
    }
}
function storeMealIngredients(Meal $meal, array $ingredients)
{
    foreach ($ingredients as $ingredient) {
        // Check if $ingredient is an array before accessing it
        if (is_array($ingredient)) {
            Meal_Ingredient::create([
                'ingredient_id' => $ingredient['ingredient_id'],
                'meal_id' => $meal->id,
            ]);
        }
    }
} 
    public function update(MealStoreRequest $request, $id)
    {
        try {
            // Find meal
            $meal = Meal::find($id);
            if (!$meal) {
                return response()->json([
                    'message' => 'Meal Not Found.'
                ], 404);
            }
    
            $meal->meal_price = $request->meal_price;
            $meal->meal_name = $request->meal_name;
            $meal->meal_desc = $request->meal_desc;
            $meal->category_id = $request->category_id;
    
            if ($request->hasFile('meal_image')) {
                // Handle image update
                $image = $request->file('meal_image');
                $imageName = Str::random(32) . "." . $image->getClientOriginalExtension();
    
                // Store the new image
                $image->move(public_path('react/assets/img/icon'), $imageName);
    
                // Delete the old image if it exists
                $oldImage = $meal->meal_image;
                if (File::exists(public_path('react/assets/img/icon/' . $oldImage))) {
                    File::delete(public_path('react/assets/img/icon/' . $oldImage));
                }
    
                // Update the image name in the database
                $meal->meal_image = $imageName;
            }
    
            $meal->save();
            $ingredientIds = is_array($request->ingredient_id) ? $request->ingredient_id : [];
            $this->updateMealIngredients($meal, $ingredientIds);
    
            return response()->json([
                'message' => "Meal successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong! " . $e->getMessage(),
            ], 500);
        }
    }
    function updateMealIngredients(Meal $meal, array $ingredients)
    {
        // Delete existing Meal Ingredients
        Meal_Ingredient::where('meal_id', $meal->id)->delete();

        // Store new Meal Ingredients
        $this->storeMealIngredients($meal, $ingredients);
    }

   

    public function destroy($id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        $meal->delete();

        // Delete associated Meal Ingredients
        Meal_Ingredient::where('meal_id', $id)->delete();

        return response()->json(['message' => 'Meal and associated ingredients deleted'], 200);
    } 
}