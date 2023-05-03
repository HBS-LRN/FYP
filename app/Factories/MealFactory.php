<?php
namespace App\Factories;

use App\Factories\Interfaces\MealFactoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Meal;
use App\Models\User;
use App\Models\Log;
use App\Models\Category;
use App\Models\MealOrderDetail;

class MealFactory implements MealFactoryInterface
{

    public function store(array $data,Request $request)
    {
        $data = $request->validate([

            'meal_price' => 'required|numeric|min:1',
            'meal_qty' => 'required|integer|min:1',
            'meal_name' => 'required',
            'category_id' => 'required',
            'meal_image' => 'required|mimes:jpeg,png,jpg,gif'
        ], [
            'meal_price.required'    => 'Please Provide A Meal Price',
            'meal_price.numeric'    => 'Please Provide A Number',
            'meal_price.integer'    => 'Please Provide A Number',
            'meal_price.min' => 'Please Set The Price At Least 1 Ringgit',
            'meal_qty.min' => 'Please Provide At Least 1 Quanlity Of Food',
            'meal_qty.required'      => 'Please Provide A Meal Quantity ',
            'meal_name.required' => 'Please Provide A Meal Name',
            'category_id.required'      => 'Please Select A Category',
            'meal_image.required' => 'Please Provide A Meal Image'

        ]);

        if ($request->hasFile('meal_image')) {
            $data['meal_image'] = $request->file('meal_image')->store('meals', 'public');
        }
        
        
        $meal = Meal::create($data);
        //create a log
        $adminLog = new Log([
            'user_id' => auth()->user()->id,
            'action' => 'create',
            'table_name' => 'users',
            'row_id' => $meal->id,
            'new_data' => $meal->toJson(),
        ]);

        $adminLog->save();
        return $meal;
    }

    public function update($id, array $data,Request $request)
    {
        $meal = Meal::find($id);
        $data = $request->validate([

            'meal_price' => 'required|numeric|min:0',
            'meal_qty' => 'required|integer|min:0',
            'meal_name' => 'required',
            'category_id' => 'required',
            'meal_image' => 'mimes:jpeg,png,jpg,gif'
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

    public function updateInventory($id,array $data,Request $request)
    {

        $meal = Meal::find($id);
        $data = $request->validate([
            'meal_qty' => 'required|integer|min:0'
        ], [
            'meal_qty.required' => 'Please Provide A Meal Quantity',
        ]);

        $data['meal_id'] = auth()->id();
        return $meal->update($data);
        
    }

    public function showQuantitySold($id)
    {
        
        $totalQuantity = 0;
        $meals = MealOrderDetail::where('meal_id', '=', $id)->get();

        $totalQuantity = 0;

        foreach ($meals as $mealOrder) {
        $totalQuantity +=  $mealOrder->order_quantity;
        }

        return $totalQuantity;
    }

    public function showRevenue($id){
        $totalRevenue = 0; 
        $meals = MealOrderDetail::where('meal_id', '=', $id)->get();
        
        foreach ($meals as $mealOrder) {
            $totalRevenue +=  ($mealOrder->order_quantity) * ($mealOrder->Meal->meal_price);
            }

        return $totalRevenue;
    }
}

?>