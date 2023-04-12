<?php

namespace App\Http\Controllers;

use App\Models\MealOrderDetail;
use App\Models\Order;
use App\Models\Meal;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User;
use App\Factories\OrderFactory;
use App\Factories\Interfaces\OrderFactoryInterface;

class OrderController extends Controller
{

    protected $orderFactory;

    public function __construct(OrderFactoryInterface $orderFactory) {
        $this->orderFactory = $orderFactory;
    }

    public function show()
    {


        //count order 
        $prepareOrder = 0;
        $deliverOrder = 0;
        $completeOrder = 0;

        //get all of the orders belong to that particular user 
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
        return redirect('/purchase')->with('successfullyComment', true);
    }

      //show meal rating page
      public function showMealRating()
      {
          return view('orders.mealRating',[
              'mealsOrderDetail' => MealOrderDetail::all(),
              'orders' => Order::all()
  
          ]);
      }
      

     //show the rating stars
    ///////////////////////////
    public function showRating2Star($rating){
        if($rating<2){
            return "display:none;";
        }
    }

    public function showRating3Star($rating){
        if($rating<3){
            return "display:none;";
        }
    }

    public function showRating4Star($rating){
        if($rating<4){
            return "display:none;";
        }
    }

    public function showRating5Star($rating){
        if($rating<5){
            return "display:none;";
        }
    }
    /////////////////////////////

    //show selected meal rating page
    public function showEditMealRating($id){
        return view('orders.editMealRating',[
            'mealOrderDetail' => MealOrderDetail::find($id),
        ]);
    }


    public function showRating($id){
        $mealOrderDetail = MealOrderDetail::find($id);
        return intval($mealOrderDetail->rating_star);
    }

    public function updateMealRating(Request $request){
        $result = $this->orderFactory->updateMealRating($request);
        return redirect('/mealRating')->with('successReply', true);
    }

    public function showOrders()  
    {
        return view('orders.listOfOrder',[
            'orders' => Order::all(),
        ]);
    }

    public function showOrderDetails($id){
        return view('orders.listOfOrderDetail',[
            'order' => Order::find($id),
            'orderDetails' => MealOrderDetail::where('order_id', $id)->get()
        ]);
    }
  
    public function updateDeliveryClick($id){
        $result = $this->orderFactory->updateDeliveryClick($id);
        return redirect('/orderDetails/show/'.$id)->with('successfullyUpdate', true);
    }

    public function updateCompletedClick($id){
        $result = $this->orderFactory->updateCompletedClick($id);
        return redirect('/orderDetails/show/'.$id)->with('successfullyUpdate', true);
    }
  
}
