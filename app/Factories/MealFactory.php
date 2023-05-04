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
            'user_name' => auth()->user()->name,
            'action' => 'Created',
            'table_name' => 'Meals',
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

         //create a log
        $adminLog = new Log();
        $adminLog->old_data = $meal->toJson();
        $meal->update($data);
        $newmeal=$meal->fresh();

        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Updated';
        $adminLog->table_name ='Meals';
        $adminLog->row_id = $meal->id;
        $adminLog->new_data=$newmeal->toJson();

        $adminLog->save();
        return $newmeal;
    }

    public function delete($id)
    { 
        $meal = Meal::find($id);
         //create a log
         $adminLog = new Log();
         $adminLog->old_data = $meal->toJson();
         $adminLog->row_id = $meal->id;

        $boolean=$meal->delete();
        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Deleted';
        $adminLog->table_name ='Meals';
        $adminLog->save();
        return $boolean;
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
        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $meal->toJson();
        $meal->update($data);
        $newmeal=$meal->fresh();

        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Updated the Meal Quantity of ';
        $adminLog->table_name ='Meals';
        $adminLog->row_id = $meal->id;
        $adminLog->new_data=$newmeal->toJson();

        $adminLog->save();
        return $newmeal;
        
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