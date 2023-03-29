<?php
namespace App\Factories;

use App\Factories\Interfaces\MealFactoryInterface;
use Illuminate\Http\Request;
use App\Models\Meal;
use App\Models\User;
use App\Models\Category;
use App\Models\MealOrderDetail;

class MealFactory implements MealFactoryInterface
{

    public function store(array $data,Request $request)
    {
        $data = $request->validate([

            'meal_price' => 'required|numeric|min:0',
            'meal_qty' => 'required|integer|min:0',
            'meal_name' => 'required',
            'category_id' => 'required'

        ], [
            'meal_price.required'    => 'Please Provide A Meal Price',
            'meal_price.numeric'    => 'Please Provide A Number',
            'meal_price.integer'    => 'Please Provide A Number',
            'meal_qty.required'      => 'Please Provide A Meal Quantity ',
            'meal_name.required' => 'Please Provide A Meal Name',
            'category_id.required'      => 'Please Select A Category',
        ]);

        if ($request->hasFile('meal_image')) {
            $data['meal_image'] = $request->file('meal_image')->store('meals', 'public');
        }

        return Meal::create($data);
    }

    public function update($id, array $data,Request $request)
    {
        $meal = Meal::find($id);
        $data = $request->validate([

            'meal_price' => 'required|numeric|min:0',
            'meal_qty' => 'required|integer|min:0',
            'meal_name' => 'required',
            'category_id' => 'required'

        ], [
            'meal_price.required'    => 'Please Provide A Meal Price',
            'meal_price.numeric'    => 'Please Provide A Number',
            'meal_price.integer'    => 'Please Provide A Number',
            'meal_qty.required'      => 'Please Provide A Meal Quantity ',
            'meal_name.required' => 'Please Provide A Meal Name',
            'category_id.required'      => 'Please Select A Category',
        ]);

        if ($request->hasFile('meal_image')) {
            $data['meal_image'] = $request->file('meal_image')->store('meals', 'public');
        }

        $data['meal_id'] = auth()->id();
        return $meal->update($data);
    }

    public function delete($id)
    { 
        $meal = Meal::find($id);
        return $meal->delete();
    }
}

?>