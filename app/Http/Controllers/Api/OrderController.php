<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Delivery;
use App\Models\MealOrderDetail;
use App\Models\ShoppingCart;
use App\Models\User;
use App\Repository\OrderRepositoryInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrderController extends Controller
{

    private $orderRepositoryInterface;

    public function __construct(OrderRepositoryInterface $orderRepositoryInterface)
    {
        $this->orderRepositoryInterface = $orderRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /** @var \App\Models\Order $orders */
        $orders = Order::all();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();


        //call order repository interface to create data 
        // $order = $this->orderRepositoryInterface->create($data);




        $orderDate = Carbon::parse($data['order_date'])->format('Y-m-d');
        $order = Order::create([
            'user_id' => $data['user_id'],
            'order_total' => $data['order_total'],
            'delivery_fee' => $data['delivery_fee'],
            'order_status' => $data['order_status'],
            'payment_status' => $data['payment_status'],
            'payment_method' => $data['payment_method'],
            'order_date' => $orderDate,


        ]);

        // Create a Delivery record along with the order
        Delivery::create([
            'order_id' => $order->id,
            'username' => $data['username'],
            'userphone' => $data['userphone'],
            'street' => $data['street'],
            'city' => $data['city'],
            'state' => $data['state'],
            'postcode' => $data['postcode'],
            'delivery_man_id' => 0, //default value
        ]);

        foreach ($data['orderItems'] as $orderItem) {
            MealOrderDetail::create([
                'order_id' => $order->id,
                'meal_id' => $orderItem['meal_id'],
                'order_quantity' => $orderItem['order_quantity'],
            ]);
        }

        // Find all shopping cart items that belong to the user
        $shoppingCartItems = ShoppingCart::where('user_id',  $data['user_id'])->get();

        // Loop through the shopping cart items and delete them
        foreach ($shoppingCartItems as $shoppingCartItem) {
            $shoppingCartItem->delete();
        }


        return $order;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }

    public function userOrder($id)
    {

        $orders = User::with(['orders' => function ($query) {
            $query->where('order_status', 'delivering');
        }, 'orders.delivery'])->find($id);

        return response()->json($orders);
    }
    public function userDelivery()
    {
        // $deliveries = Delivery::with('order')
        //     ->whereHas('order', function ($query) {
        //         $query->where('order_status', 'preparing');
        //     })
        //     ->get();

        $deliveries = Delivery::with('order')
            ->get();

        return response()->json($deliveries);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function completedDelivery(Request $request, $id)
    {
        $deliveries = Delivery::with('order')
            ->where('delivery_man_id', $id)
            ->get();

        // Filter deliveries with an associated order having 'order_status' as 'completed'
        $filteredDeliveries = $deliveries->filter(function ($delivery) {
            return $delivery->order && $delivery->order->order_status === 'completed';
        });

        return response()->json($filteredDeliveries);
    }

    public function showOrderStatus($id)
    {



        //get all of the orders belong to that particular user 
        /** @var \App\Models\User $user */
        $user = User::with('orders.meals')->find($id);
        $orders = $user->orders;

        return response()->json($orders);
    }


    public function storeRating(Request $request)
    {
        // Validate the request data if needed

        // Find the meal_order_detail record based on the provided ID
        $mealOrderDetail = MealOrderDetail::find($request->input('id'));

        if (!$mealOrderDetail) {
            // Handle the case where the meal_order_detail with the provided ID is not found
            return response()->json(['error' => 'Meal Order Detail not found'], 404);
        }

        // Update the rating_star and rating_comment fields
        $mealOrderDetail->rating_star = $request->input('rating_star');
        $mealOrderDetail->rating_comment = $request->input('rating_comment');

        // Save the updated record
        $mealOrderDetail->save();

        //get all of the orders belong to that particular user 
        /** @var \App\Models\User $user */
        $user = User::with('orders.meals')->find($request->input('user_id'));
        $orders = $user->orders;

        return response()->json($orders);
    }
}
