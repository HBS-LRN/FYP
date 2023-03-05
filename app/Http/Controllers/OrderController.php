<?php

namespace App\Http\Controllers;

use App\Models\MealOrderDetail;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User;

class OrderController extends Controller
{


    public function show()
    {




        //count order 
        $prepareOrder = 0;
        $deliverOrder = 0;
        $completeOrder = 0;
        $orders = auth()->user()->orders;
        foreach ($orders as $order) {
            foreach ($order->meals as $meal) {

                if ($meal->pivot->meal_order_status == "preparing") {

                    $prepareOrder += 1;
                } else if ($meal->pivot->meal_order_status == "delivering") {
                    $deliverOrder += 1;
                } else {
                    $completeOrder += 1;
                }
            }
        }


        return view('profile.purchaseStatus', [
            'orders' => auth()->user()->orders,
            'prepareOrder' => $prepareOrder,
            'deliverOrder' => $deliverOrder,
            'completeOrder' => $completeOrder
        ]);
    }


    public function comment(Request $request)
    {

        $mealOrderDetails = MealOrderDetail::find($request['mealOrderDetailId']);
        $mealOrderDetails['rating_star'] = $request['rate'];
        $mealOrderDetails['rating_comment'] = $request['txtItemComment'];
        $mealOrderDetails->update();
        return redirect('/purchase')->with('successfullyUpdate', true);
    }
}
