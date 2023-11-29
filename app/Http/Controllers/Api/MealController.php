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
use App\Models\MealOrderDetail;
use Illuminate\Support\Facades\DB;
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
        try {
            // Find the meal by ID
            $meal = Meal::with(['mealIngredients', 'mealIngredients.ingredient'])->find($id);

            if (!$meal) {
                return response()->json(['message' => 'Meal not found'], 404);
            }

            // Transform the meal data to ensure ingredient_name is defined
            $transformedMeal = $meal->toArray();

            // Loop through mealIngredients and set ingredient_name to an empty string if not defined
            if (isset($transformedMeal['mealIngredients'])) {
                foreach ($transformedMeal['mealIngredients'] as &$mealIngredient) {
                    if (isset($mealIngredient['ingredient']) && !isset($mealIngredient['ingredient']['ingredient_name'])) {
                        $mealIngredient['ingredient']['ingredient_name'] = '';
                    }
                }
            }

            // Return the meal with its ingredients
            return response()->json($transformedMeal);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
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

    public function adminSearchMeals(Request $request){
        $searchQuery = $request->get('searchQuery');

        $meals = Meal::query()
        ->where('meal_name', 'LIKE', "%$searchQuery%")
        ->get();

        return response()->json($meals);
    }

    public function getMealIngredient($meal_id)
    {
        try {
            $meal = Meal::find($meal_id);

            if (!$meal) {
                return response()->json(['message' => 'Meal not found'], 404);
            }

            // Get MealIngredients for the specified meal
            $mealIngredients = $meal->mealIngredients;

            // Extract ingredient_ids
            $ingredientIds = $mealIngredients->pluck('ingredient_id')->toArray();

            // Get Ingredients using ingredient_ids
            $ingredients = Ingredient::whereIn('id', $ingredientIds)->get();

            // Combine MealIngredients and corresponding Ingredients
            $result = $mealIngredients->map(function ($mealIngredient) use ($ingredients) {
                $ingredient = $ingredients->where('id', $mealIngredient->ingredient_id)->first();
                return [
                    'meal_ingredient' => $mealIngredient,
                    'ingredient' => $ingredient,
                ];
            });

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong: ' . $e->getMessage(),
            ], 500);
        }
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

    // public function getMealOrderDetail($meal_id)
    // {
    //     try {
    //         $mealOrderDetails = MealOrderDetail::where('meal_id', $meal_id)->get();

    //         return response()->json($mealOrderDetails);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'Something went wrong: ' . $e->getMessage(),
    //         ], 500);
    //     }
    // }

    public function getMealOrderDetail($meal_id)
    {
        try {
            // Use join to get the order details along with user details
            $mealOrderDetails = MealOrderDetail::join('orders', 'meal_order_details.order_id', '=', 'orders.id')
                ->select(
                    'meal_order_details.id as meal_order_detail_id',
                    'meal_order_details.meal_id',
                    'meal_order_details.order_id',
                    'meal_order_details.order_quantity',
                    'meal_order_details.rating_comment',
                    'meal_order_details.rating_star',
                    'meal_order_details.reply_comment',
                    'meal_order_details.created_at',
                    'orders.user_id as user_id'
                    // Add other columns you need
                )
                ->where('meal_order_details.meal_id', $meal_id)
                ->get();
    
            // Now, for each meal order detail, get the user details
            foreach ($mealOrderDetails as $mealOrderDetail) {
                $user = User::find($mealOrderDetail->user_id);
                $mealOrderDetail->username = $user ? $user->name : null;
            }
    
            return response()->json(['meal_order_details' => $mealOrderDetails]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong: ' . $e->getMessage(),
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
                $totalCalorie += $ingredientModel->calorie * $unit[$key];
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
    public function updateMealOrderDetail(MealStoreRequest $request, $id)
    {
        try {
            // Find meal order detail
            $mealOrderDetail = MealOrderDetail::find($id);

            if (!$mealOrderDetail) {
                return response()->json(['message' => 'Meal Order Detail not found'], 404);
            }

            // Validate request data
            $request->validate([
                'reply_comment' => 'required|string', // Update field name to 'rate_command'
            ]);
           
            // Update rate_command
            $mealOrderDetail->update([
                'reply_comment' => $request->reply_comment, // Update field name to 'rate_command'
            ]);
            return response()->json(['message' => $request->reply_comment], 200);
            // return response()->json(['message' => 'Meal Order Detail updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

 
    public function update(MealStoreRequest $request, $id)
    {
        try {
          
            // Find meal
            $meal = Meal::find($id);
    
            if (!$meal) {
                return response()->json(['message' => 'Meal Not Found.'], 404);
            }
    
            // Update meal attributes
            $meal->meal_price = $request->meal_price;
            $meal->meal_name = $request->meal_name;
            $meal->meal_desc = $request->meal_desc;
            $meal->category_id = $request->category_id;
    
            // Handle meal image update
            if ($request->hasFile('meal_image')) {
                $data['meal_image'] = $request->file('meal_image')->store('images', 'public');
                $meal->meal_image =  $data['meal_image'];
            }
    
            // Save the updated meal
            $meal->save();
    
            // Update meal ingredients
            $ingredientIds = $request->input('ingredient_id', []);
            $this->updateMealIngredients($meal, $ingredientIds, $request->unit, $request->cookMethod);
    
            return response()->json(['message' => 'Meal successfully updated.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went really wrong! ' . $e->getMessage()], 500);
        }
    }
  
    private function updateMealIngredients(Meal $meal, array $ingredients, array $unit, array $cookMethod)
    {
        try {
            // Delete existing Meal Ingredients for the given meal
            MealIngredient::where('meal_id', $meal->id)->delete();
    
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
                    $totalCalorie += $ingredientModel->calorie * $unit[$key];
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
        } catch (\Exception $e) {
            // Handle exception if needed
            // throw $e;
            return response()->json(['message' => 'Something went really wrong! ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        $meal->delete();

        // Delete associated Meal Ingredients
        MealIngredient::where('meal_id', $id)->delete();
        MealOrderDetail::where('meal_id', $id)->delete(); 

        return response()->json(['message' => $meal], 200);
    }


    public function showCategoryMeal($id)
    {
        $category = Category::find($id);

        $categoryMeals = $category->categorymeals()
            ->with(['mealOrderDetails', 'mealOrderDetails.order.user', 'mealIngredients', 'mealIngredients.ingredient'])
            ->whereHas('mealIngredients', function ($query) {
                $query->whereHas('ingredient', function ($subquery) {
                    $subquery->where('stock', '>', 0);
                });
            })
            ->whereDoesntHave('mealIngredients', function ($query) {
                $query->whereHas('ingredient', function ($subquery) {
                    $subquery->where('stock', '<=', 0);
                });
            })
            ->get();


        return response()->json($categoryMeals);
    }
    public function showRating()
    {
        $mealRating = MealOrderDetail::with(['meal.orders.user'])
            ->whereNotNull('rating_comment')
            ->whereNotNull('rating_star')
            ->whereNull('reply_comment')
            ->get();

        return response()->json($mealRating);
    }
    public function showRatingForm($id)
    {
        $mealRating = MealOrderDetail::with(['meal.orders.user'])
            ->where('id', $id)
            ->whereNotNull('rating_comment')
            ->whereNotNull('rating_star')
            ->first(); // Use first() to retrieve only one record

        return response()->json($mealRating);
    }
    public function submitRating(Request $request)
    {

        $data = $request->all();
        $mealRating = MealOrderDetail::find($data['id']);

        if (!$mealRating) {
            return response()->json(['message' => 'Meal Rating not found'], 404);
        }

        $mealRating->update(['reply_comment' => $data['reply_comment']]);

        return response()->json($mealRating);
    }
    public function searchMeal($search)
    {

        $meals = Meal::where('meal_name', 'like', '%' . $search . '%')->get();
        return response()->json($meals);
    }

   
}
