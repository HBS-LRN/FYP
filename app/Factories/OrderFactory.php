<?php
namespace App\Factories;

use App\Factories\Interfaces\OrderFactoryInterface;
use Illuminate\Http\Request;
use App\Models\Meal;
use App\Models\Order;
use App\Models\MealOrderDetail;

class OrderFactory implements OrderFactoryInterface
{
    public function updateMealRating(Request $request){
        $mealOrderDetail = MealOrderDetail::find($request['mealOrderDetailId']);
        $mealOrderDetail['reply_comment'] = $request['reply_comment'];
        return $mealOrderDetail->update();
        
    }
  

}

?>