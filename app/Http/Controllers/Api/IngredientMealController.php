<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IngredientMealController extends Controller
{
    public function index()
    {
        $mealIngredients = MealIngredient::all();
        return view('meal-ingredients.index', compact('mealIngredients'));
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'ingredient_qty' => 'required|integer',
            'ingredient_id' => 'required|exists:ingredients,id',
            'meal_id' => 'required|exists:meals,id',
        ]);

        MealIngredient::create($request->all());

        return redirect()->route('meal-ingredients.index')
            ->with('success', 'Meal Ingredient created successfully.');
    }

    public function update(Request $request, $id)
    {
        // Update an existing ingredient
        $request->validate([
            'ingredient_qty' => 'required|integer',
            'ingredient_id' => 'required|exists:ingredients,id',
            'meal_id' => 'required|exists:meals,id',
        ]);
        $mealIngredient = MealIngredient::find($id);
        $mealIngredient->update($data);
        return response()->json($mealIngredient);
    }

    public function destroy($id)
    {
        $mealIngredient = MealIngredient::find($id);
        if ($mealIngredient) {
            $mealIngredient->delete();
        }
        return response()->json($mealIngredient);
    }

   
}
