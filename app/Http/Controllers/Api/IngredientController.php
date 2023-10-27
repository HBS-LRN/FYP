<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Ingredient;
use App\Http\Controllers\Controller;

class IngredientController extends Controller
{
    public function index()
    {
        // Retrieve a list of ingredients
        /** @var \App\Models\Ingredient $ingredients */
        $ingredients = Ingredient::all();
        return response()->json($ingredients);
    }

    public function show($id)
    {
        // Retrieve a specific ingredient by ID
        $ingredient = Ingredient::find($id);
        return response()->json($ingredient);
    }

    public function store(Request $request)
    {
        // Create a new ingredient
        $data = $request->validate([
            'ingredient_name' => 'required',
            'calorie' => 'required',
        ]);
        $ingredient = Ingredient::create($data);
        
        return response()->json($ingredient);
    }

    public function update(Request $request, $id)
    {
        // Update an existing ingredient
        $data = $request->validate([
            'ingredient_name' => 'required',
            'calorie' => 'required',
        ]);
        $ingredient = Ingredient::find($id);
        $ingredient->update($data);
        return response()->json($ingredient);
    }

    public function destroy($id)
    {
        // Delete an ingredient
        $ingredient = Ingredient::find($id);
        if ($ingredient) {
            $ingredient->delete();
        }
        return response()->json($ingredient);
    }
}
