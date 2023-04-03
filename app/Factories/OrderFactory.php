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
  
    
    public function updateDeliveryClick($id){
        $orderDetails = MealOrderDetail::where('order_id', $id)->get();
        
        foreach($orderDetails as $orderDetail){
            $orderDetail->meal_order_status ="delivering";
            $orderDetail->update();
        }

        $order= Order::find($id);
        $order->order_status="delivering";
        return $order->save();
        
    }

    public function updateCompletedClick($id){
        $orderDetails = MealOrderDetail::where('order_id', $id)->get();
        
        foreach($orderDetails as $orderDetail){
            $orderDetail->meal_order_status ="completed";
            $orderDetail->update();
        }

        $order= Order::find($id);
        $order->order_status="completed";
        return $order->save();
    }
}

?>