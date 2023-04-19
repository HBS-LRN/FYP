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
        $data = $request->validate([
            'reply_comment' => 'max:200',
        ]);

        return $mealOrderDetail->update($data);
        
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