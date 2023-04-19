<?php

namespace App\Http\Controllers;

use App\Models\MealOrderDetail;
use App\Models\Order;
use App\Models\Meal;
use App\Models\Category;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User;
use App\Factories\OrderFactory;
use Illuminate\Validation\Rule;
use App\Factories\Interfaces\OrderFactoryInterface;
<<<<<<< HEAD
use Illuminate\Support\Facades\Validator;
=======
>>>>>>> 0e74f6c5675350a2bfe677cc1b20db4bc895b744

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
    public function publicBankLogin(){
        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]); 

        //get vouchers details api through webservices through the bearer token 
        $response = $client->get('publicBank', [

            'headers' => [
                'Accept' => 'application/json',

            ]


        ]);
        $publicBank = json_decode($response->getBody(), true);
        $userID=array();
        foreach($publicBank as $PBuserID){
            $userID[]=$PBuserID['user_id'];
        }
        
        return view('payment.publicBankLogin',['userID'=>$userID]);
    }

    public function publicBankCheckUserID(Request $request){

        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]); 

        //get vouchers details api through webservices through the bearer token 
        $response = $client->get('publicBank', [

            'headers' => [
                'Accept' => 'application/json',

            ]


        ]);
        $publicBank = json_decode($response->getBody(), true);
       
        $validateUserID=false;
        foreach($publicBank as $PBuserID){
            if($request['user_id'] == $PBuserID['user_id']){
                $validateUserID = true;
            }
        }
        $data = $request->validate(
            ['user_id' => 'required'],
            ['user_id.required' => 'The user id is required']
        );

        // $validator = Validator::make($request->all(),[
        //     'user_id' => [
        //         'required' => 'The ID field is required.',
        //         Rule::notIn($userID) => 'The selected ID is invalid or undefined.',
        //     ],
        // ],[
        //     'user_id.required' => 'The ID field is required.',
        //     'user_id.in' => 'The selected ID is invalid or undefined.',
        // ]);
        
        // if ($validator->fails()) {
        //     return redirect('/purchase/publicBankLogin')->back()->withErrors($validator)->withInput();
            
        // }
        if(!$validateUserID){
            return back()->withErrors(['user_id' => 'Undefine User ID'])->onlyInput('user_id');
        }
        return view('payment.publicBankPaySession',['user_id'=>$request['user_id'],'publicBankAccount'=>$publicBank]);

    }

    public function comment(Request $request)
    {

        $mealOrderDetails = MealOrderDetail::find($request['mealOrderDetailId']);
        $mealOrderDetails['rating_star'] = $request['rate'];
        $mealOrderDetails['rating_comment'] = $request['txtItemComment'];
        $mealOrderDetails->update();
        return redirect('/purchase')->with('successfullyUpdate', true);
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