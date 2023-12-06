<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Delivery;
use App\Models\Meal;
use App\Models\MealOrderDetail;
use App\Models\ShoppingCart;
use App\Models\User;
use App\Repository\OrderRepositoryInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

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
            'customer_longitude'=> $data['customer_longitude'],
            'customer_latitude'=> $data['customer_latitude'],
            'delivery_man_id' => 0, //default value
        ]);

        foreach ($data['orderItems'] as $orderItem) {
            MealOrderDetail::create([
                'order_id' => $order->id,
                'meal_id' => $orderItem['meal_id'],
                'order_quantity' => $orderItem['order_quantity'],
            ]);
        }

        foreach ($data['orderItems'] as $orderItem) {
            // Find the meal associated with the order item
            $meal = Meal::find($orderItem['meal_id']);
        
            // Loop through the meal's ingredients and update the stock
            foreach ($meal->mealIngredients as $mealIngredient) {
                $ingredient = $mealIngredient->ingredient;
                $newStock = $ingredient->stock - ($orderItem['order_quantity'] * $mealIngredient->unit);
        
                // Ensure stock doesn't go negative
                if ($newStock < 0) {
                    $newStock = 0;
                }
        
                // Update the ingredient's stock
                $ingredient->update(['stock' => $newStock]);
            }
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
    public function searchCustomerOrderList(Request $request)
    {
        $query = Order::query();

        if ($request->has('order_date')) {
            // Use LIKE for a partial match
            $query->where('order_date', 'LIKE', '%' . $request->input('order_date') . '%');
        }

        $orders = $query->get();

        return response()->json($orders);
    }

    public function deleteCustomerOrder($orderId)
    {
        try {
            // Find the order by ID
            $order = Order::findOrFail($orderId);

            // Assuming you want to delete associated records in Delivery and MealOrderDetail tables
            $order->delivery()->delete();
            $order->mealOrderDetails()->delete();

            // Delete the order
            $order->delete();

            return response()->json(['message' => 'Order deleted successfully']);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., order not found)
            return response()->json(['error' => 'Failed to delete order'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function showMealOrderDetails($orderId)
    {
        try {
            // Retrieve meal order details for the specified order with joins
            $mealOrderDetails = DB::table('meal_order_details')
                ->join('meals', 'meal_order_details.meal_id', '=', 'meals.id')
                ->join('orders', 'meal_order_details.order_id', '=', 'orders.id')
                ->join('users', 'orders.user_id', '=', 'users.id')
                ->select(
                    'meal_order_details.*',
                    'meals.meal_name as meal_name',
                    'meals.meal_image as meal_image',
                    'orders.user_id',
                    'users.name as user_name',
                    // Add other columns you need from the users table
                )
                ->where('meal_order_details.order_id', $orderId)
                ->get();

            return response()->json($mealOrderDetails);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., order not found)
            return response()->json(['error' => 'Failed to retrieve meal order details'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    public function updateCustomerOrder(Request $request, $orderId)
    {
        try {
            // Find the existing order by ID
            $order = Order::findOrFail($orderId);

            // Get the new data from the request
            $data = $request->all();

            // Update the order with the new information
            $order->update([
                'user_id' => $data['user_id'],
                'order_total' => $data['order_total'],
                'delivery_fee' => $data['delivery_fee'],
                'order_status' => $data['order_status'],
                'payment_status' => $data['payment_status'],
                'payment_method' => $data['payment_method'],
                'order_date' => Carbon::parse($data['order_date'])->format('Y-m-d'),
            ]);

            // Return the updated order
            return response()->json(['message' => 'Order updated successfully', 'order' => $order]);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., order not found)
            return response()->json(['error' => 'Failed to update order'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateCustomerOrderDetail(Request $request, $mealOrderDetailId)
    {
        try {
            // Find the existing meal order detail by ID
            $mealOrderDetail = MealOrderDetail::findOrFail($mealOrderDetailId);

            // Get the new data from the request
            $data = $request->all();

            // Update the meal order detail with the new information
            $mealOrderDetail->update([
                'meal_id' => $data['meal_id'],
                'order_quantity' => $data['order_quantity'],
            ]);

            // Find the associated order
            $order = Order::findOrFail($mealOrderDetail->order_id);

            // Recalculate the order_total based on updated order details
            $orderTotal = $this->calculateOrderTotal($order);

            // Update the order with the new order_total
            $order->update([
                'order_total' => $orderTotal,
            ]);

            // Return the updated order
            return response()->json(['message' => 'Order details updated successfully', 'order' => $order]);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., meal order detail not found)
            return response()->json(['error' => 'Failed to update order details'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    // Helper function to calculate order_total based on updated order details
    private function calculateOrderTotal(Order $order)
    {
        $orderTotal = 0;

        foreach ($order->mealOrderDetails as $mealOrderDetail) {
            // Assuming meal_price is a column in the meals table
            $mealPrice = $mealOrderDetail->meal->meal_price;
            $orderQuantity = $mealOrderDetail->order_quantity;

            // Calculate subtotal for each meal order detail
            $subtotal = $mealPrice * $orderQuantity;

            // Add subtotal to order_total
            $orderTotal += $subtotal;
        }

        // Add delivery_fee to order_total
        $orderTotal += $order->delivery_fee;

        return $orderTotal;
    }

    public function deleteCustomerOrderDetail($mealOrderDetailId)
    {
        try {
            // Find the meal order detail by ID
            $mealOrderDetail = MealOrderDetail::findOrFail($mealOrderDetailId);

            // Find the associated order
            $order = Order::findOrFail($mealOrderDetail->order_id);

            // Delete the meal order detail
            $mealOrderDetail->delete();

            // Recalculate the order_total based on updated order details
            $orderTotal = $this->calculateOrderTotal($order);

            if(($orderTotal - $order->delivery_fee) == 0){
                $order->delete();
            }else{
                $order->update([
                    'order_total' => $orderTotal,
                ]);
            }
            

            return response()->json(['message' => 'Meal order detail deleted successfully', 'order' => $order]);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., meal order detail not found)
            return response()->json(['error' => 'Failed to delete meal order detail',$e], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTotal()
    {
        try {
            // Get the current year
            $currentYear = date('Y');

            // Get the total sales revenue for the current year
            $salesRevenue = Order::whereYear('order_date', $currentYear)->sum('order_total');

            // Get the number of sales for the current year
            $numOfSales = MealOrderDetail::join('orders', 'meal_order_details.order_id', '=', 'orders.id')
                ->whereYear('orders.order_date', $currentYear)
                ->sum('meal_order_details.order_quantity');

            // Calculate the average price
            $averagePrice = $numOfSales > 0 ? $salesRevenue / $numOfSales : 0;

            return response()->json([
                'salesRevenue' => $salesRevenue,
                'numOfSales' => $numOfSales,
                'averagePrice' => $averagePrice,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to retrieve total sales information. ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getMealAnalytics()
{
    try {
        // Get meal order details with associated meal and order data
        $currentYear = date('Y');
    
        // Get meal order details with associated meal and order data for the current year
        $mealAnalytics = DB::table('meal_order_details')
            ->join('meals', 'meal_order_details.meal_id', '=', 'meals.id')
            ->join('orders', 'meal_order_details.order_id', '=', 'orders.id')
            ->select(
                'meals.id as meal_id',
                'meals.meal_name',
                'orders.order_date',
                DB::raw('SUM(meals.meal_price * meal_order_details.order_quantity) as total_order'),
                DB::raw('SUM(meal_order_details.order_quantity) as total_order_quantity')
            )
            ->whereYear('orders.order_date', $currentYear)
            ->groupBy('meals.id', 'meals.meal_name', 'orders.order_date')
            ->get();

        // Check if $mealAnalytics is not empty
        if (!$mealAnalytics->isEmpty()) {
            // Calculate the percentage of total sales for each meal
            $totalSales = Order::whereYear('order_date', $currentYear)->sum('order_total');

            $mealAnalytics = $mealAnalytics->map(function ($item) use ($totalSales) {
                return [
                    'meal_id' => $item->meal_id,
                    'meal_name' => $item->meal_name,
                    'order_date' => $item->order_date,
                    'total_order' => $item->total_order,
                    'percentage_of_sales' => $totalSales > 0 ? ($item->total_order / $totalSales) * 100 : 0,
                    'total_order_quantity' => $item->total_order_quantity,
                ];
            });
           
            // Ensure the sum of percentages does not exceed 100
            // $totalPercentage = $mealAnalytics->sum('percentage_of_sales');

            // If the total exceeds 100%, adjust the percentages proportionally
            // if ($totalPercentage > 100) {
            //     $mealAnalytics = $mealAnalytics->map(function ($item) use ($totalPercentage) {
            //         return [
            //             'meal_id' => $item['meal_id'],
            //             'meal_name' => $item['meal_name'],
            //             'order_date' => $item['order_date'],
            //             'total_order' => $item['total_order'],
            //             'percentage_of_sales' => ($item['percentage_of_sales'] / $totalPercentage) * 100,
            //             'total_order_quantity' => $item['total_order_quantity'],
            //         ];
            //     });
            // } elseif ($totalPercentage < 100) {
            //     // If the total is less than 100%, distribute the remaining percentage equally
            //     $remainingPercentage = 100 - $totalPercentage;
            //     $mealAnalytics->each(function (&$item) use ($remainingPercentage) {
            //         $item['percentage_of_sales'] += ($remainingPercentage / count($mealAnalytics));
            //     });
            // }
           
        }

        return response()->json($mealAnalytics);
    } catch (\Exception $e) {
        // Handle exceptions
        return response()->json(['error' => 'Failed to retrieve meal analytics'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    public function getRevenueAnalytics()
    {
        try {
            // Get the current year and previous year
            $currentYear = date('Y');
            $previousYear = $currentYear - 1;

            // Get the order totals for each month in the previous year
            $previousYearData = $this->getMonthlyOrderData($previousYear);

            // Get the order totals for each month in the current year
            $currentYearData = $this->getMonthlyOrderData($currentYear);

            // Get the sum of order totals for the previous year
            $previousYearTotal = Order::whereYear('order_date', $previousYear)->sum('order_total');

            // Get the sum of order totals for the current year
            $currentYearTotal = Order::whereYear('order_date', $currentYear)->sum('order_total');

            return response()->json([
                'previousYearData' => $previousYearData,
                'currentYearData' => $currentYearData,
                'previousYearTotal' => $previousYearTotal,
                'currentYearTotal' => $currentYearTotal,
                'previousYear' => $previousYear,
                'currentYear' => $currentYear,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to retrieve revenue analytics'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function getMonthlyOrderData($year)
    {
        // Define an array to store the sum of order totals for each month
        $monthlyOrderData = [];

        // Get the distinct months for the specified year
        $distinctMonths = MealOrderDetail::join('orders', 'meal_order_details.order_id', '=', 'orders.id')
            ->select(DB::raw('MONTH(orders.order_date) as month'))
            ->whereYear('orders.order_date', $year)
            ->distinct()
            ->get();

        // Loop through each distinct month and calculate the sum of order totals
        foreach ($distinctMonths as $month) {
            $monthNumber = $month->month;

            // Calculate the sum of order totals for the current month
            $sumOrderTotals = Order::whereYear('order_date', $year)
                ->whereMonth('order_date', $monthNumber)
                ->sum('order_total');

            // Store the sum of order totals for the current month
            $monthlyOrderData[$this->getMonthName($monthNumber)] = $sumOrderTotals;
        }

        return $monthlyOrderData;
    }

    private function getMonthName($monthNumber)
    {
        // Convert month number to month name
        return date('M', mktime(0, 0, 0, $monthNumber, 1));
    }

    public function getDailyAndMonthlyOrderData()
    {
        try {
            // Get the current date
            $currentDate = now();
    
            // Get the current year, month, and day
            $currentYear = $currentDate->year;
            $currentMonth = $currentDate->month;
            $currentDay = $currentDate->day;
    
            // Get the sum of order totals for the current day
            $dailyOrderTotal = Order::whereYear('order_date', $currentYear)
                ->whereMonth('order_date', $currentMonth)
                ->whereDay('order_date', $currentDay)
                ->sum('order_total');
    
            // Get the sum of order totals for the current month
            $monthlyOrderTotal = Order::whereYear('order_date', $currentYear)
                ->whereMonth('order_date', $currentMonth)
                ->sum('order_total');
    
            return response()->json([
                'dailyOrderTotal' => $dailyOrderTotal,
                'monthlyOrderTotal' => $monthlyOrderTotal,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to retrieve daily and monthly order data' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTotalMealPurchase()
    {
        try {
            // Get all meals and their total purchase
            $mealDetails = Meal::select('meals.*')
                ->selectSub(
                    function ($query) {
                        $query->selectRaw('sum(meal_order_details.order_quantity * meals.meal_price)')
                            ->from('orders')
                            ->join('meal_order_details', 'orders.id', '=', 'meal_order_details.order_id')
                            ->whereColumn('meal_order_details.meal_id', 'meals.id');
                    },
                    'total_purchase'
                )
                ->withSum('mealOrderDetails', 'order_quantity') // Assuming 'order_quantity' is the correct column
                ->has('mealOrderDetails') // Ensure meals have associated orders
                ->orderByDesc('total_purchase') // Order meals by total purchase
                ->get();
    
            return response()->json([
                'mealDetails' => $mealDetails,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to retrieve meal purchase: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    


    public function dailyCustomerOrder()
    {
        try {
            // Get the current date
            $currentDate = now();

            // Get orders placed today
            $dailyOrders = Order::with(['user', 'mealOrderDetails.meal'])
                ->whereDate('order_date', $currentDate->format('Y-m-d'))
                ->get();

            return response()->json([
                'dailyOrders' => $dailyOrders,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to retrieve daily customer orders: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    

    

}
