<?php

namespace App\Http\Controllers\Api;

use App\Models\Meal;
use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use App\Models\MealIngredient;
use Illuminate\Http\Request;
use App\Http\Requests\mealStoreRequest;
use App\Http\Controllers\Controller;
use App\Models\Ingredient;
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

            // // Generate a unique image name
            // $imageName = Str::random(32) . "." . $request->meal_image->getClientOriginalExtension();

            // // Specify the absolute path
            // $absolutePath = public_path('../react/assets/img/meal');

            // // Ensure the directory exists
            // if (!File::exists($absolutePath)) {
            //     File::makeDirectory($absolutePath, 0755, true);
            // }


            // Create Product
            $meal = new Meal();
            $meal->meal_price = $request->meal_price;
            $meal->meal_name = $request->meal_name;
            $meal->meal_desc = $request->meal_desc;
            $meal->total_calorie = 0.00;
            if ($request->hasFile('meal_image')) {
                $data['meal_image'] = $request->file('meal_image')->store('images', 'public');
                $meal->meal_image =  $data['meal_image'];
            }
            // $meal->meal_image = $imageName;
            $meal->category_id = $request->category_id;

            $meal->save();
            // Specify the relative path
            // $relativePath = '../react/assets/img/meal/' . $imageName;

            // // Save Image using file_put_contents
            // file_put_contents($relativePath, file_get_contents($request->meal_image));
            $ingredientIds = is_array($request->ingredient_id) ? $request->ingredient_id : [];

            $this->storeMealIngredients($meal, $ingredientIds, $request->unit, $request->cookMethod);
            // Return Json Response
            return response()->json([
                'message' => "Category successfully created."
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Something went really wrong!' . $e->getMessage(),
            ], 500);
        }
    }

    function storeMealIngredients(Meal $meal, array $ingredients, array $unit, array $cookMethod)
    {

        $cookMethodCalories = [
            'water_boiled' => 0,
            'fried' => 100, 
            'deep_fried' => 200, 
            'raw' => 0,
            'saute' => 50, 
            'steam' => 20, 
            'spicy' => 150, 
        ];


        $totalCalorie = 0.00; // Initialize the total calorie to zero

        foreach ($ingredients as $key => $ingredient) {
            $mealIngredient = new MealIngredient([
                'ingredient_id' => $ingredient,
                'meal_id' => $meal->id,
                'unit' => $unit[$key],
                'cookMethod' => $cookMethod[$key],
            ]);

            // Retrieve the Ingredient model for the current ingredient
            $ingredientModel = Ingredient::find($ingredient);

            // Add the calorie of the current ingredient to the total calorie
            if ($ingredientModel) {
                $totalCalorie += $ingredientModel->calorie;
            }

            // Add the calorie based on the selected cook method
            if (isset($cookMethodCalories[$cookMethod[$key]])) {
                $totalCalorie += $cookMethodCalories[$cookMethod[$key]];
            }

            $mealIngredient->save();
        }

        // Update the total_calorie attribute of the Meal model with the calculated total calorie
        $meal->total_calorie = $totalCalorie;
        $meal->save();
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
    // function updateMealIngredients(Meal $meal, array $ingredients)
    // {
    //     // Delete existing Meal Ingredients
    //     MealIngredient::where('meal_id', $meal->id)->delete();

    //     // Store new Meal Ingredients
    //     $this->storeMealIngredients($meal, $ingredients);
    // }

    public function destroy($id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        $meal->delete();

        // Delete associated Meal Ingredients
        MealIngredient::where('meal_id', $id)->delete();

        return response()->json(['message' => 'Meal and associated ingredients deleted'], 200);
    }


    // public function showCategoryMeal($id)
    // {
    //     /** @var \App\Models\Category $category */
    //     $category = Category::find($id);



    //     return response()->json(
    //         $category->categorymeals->where('meal_qty', '!=', '0')
    //     );
    // }

    // public function showCategoryMeal($id)
    // {
    //     $category = Category::find($id);

    //     $categoryMeals = $category->categorymeals()
    //         ->whereHas('meal', function ($query) {
    //             $query->where('meal_qty', '!=', 0);
    //         })
    //         ->with(['mealIngredients', 'mealIngredients.ingredient'])
    //         ->get();

    //     return response()->json($categoryMeals);
    // }

    public function showCategoryMeal($id)
    {
        $category = Category::find($id);

        $categoryMeals = $category->categorymeals()
            ->with(['mealIngredients', 'mealIngredients.ingredient'])
            ->get();

        return response()->json($categoryMeals);
    }
}
