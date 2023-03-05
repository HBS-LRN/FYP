<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\User;
use App\Models\Order;
use App\Models\State;
use App\Models\Delivery;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use App\Models\MealOrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\Console\Input\Input;

class ShoppingCartController extends Controller
{


    public function index()
    {

        $user = User::find(auth()->user()->id);
        $addresses = $user->addresses;
        $states = State::all();
        $addressFee = 0;



        //finding address fee
        foreach ($addresses as $address) {
            if ($address->active_flag == 'T') {

                foreach ($states as $state) {
                    if ($address->area == $state->state_name)
                        $addressFee = $state->delivery_fee;
                }
            }
        }


        return view('shoppingcart.index', [
            'shoppingCarts' => $user->meals,
            'addressFee ' => $addressFee
        ]);
    }
    public function checkout()
    {
        $user = User::find(auth()->user()->id);


        //customer cannot check out if the item in cart is empty
        if ($user->meals->count() == 0) {
            return redirect()->back()->with('noItemFound', true);
        }   //customer cannot check out if the address is empty
        if ($user->addresses->count() == 0) {
            return redirect()->back()->with('noAddressFound', true);
        }


        $subTotal = 0;
        $totalPrice = 0;


        //caculate subtotal price
        foreach ($user->meals as $item) {


            $subTotal += $item->meal_price *  $item->pivot->shopping_cart_qty;
        }


        $totalPrice =    $subTotal + 4.50;

        $address = $user->addresses->where('active_flag', '=', 'T');


        return view('shoppingcart.checkout', [

            'address' => $address,
            'areas' =>  State::all(),
            'itemCheckOuts' => $user->meals,
            'subTotal' => $subTotal,
            'totalPrice' => $totalPrice


        ]);
    }

    public function redirectToPay(Request $request)
    {


        if ($request['paymethod'] == '') {
            return redirect()->back()->with('paymentNotFound', true);
        }
        //find user
        $user = User::find(auth()->user()->id);
        $order = new Order();
        $order->user_id = auth()->id();
        $order->order_total =  $request->input('total');
        $order->delivery_fee = 4.50;
        $order->order_status = "preparing";
        $order->payment_status = "Y";
        //bung seng change to public bank or maybank later
        $order->payment_method = "Public Bank";
        $order->order_date = now()->format('Y-m-d');


        $order->save();


        //get the current user address to set to delivery
        $address = $user->addresses->where('active_flag', '=', 'T');



        //create new delivery 


        $delivery['order_id'] = $order->id;
        $delivery['username'] =  $address[0]->address_username;
        $delivery['userphone'] = $address[0]->address_userphone;
        $delivery['street'] = $address[0]->street;
        $delivery['area'] = $address[0]->area;
        $delivery['postcode'] = $address[0]->postcode;

        $memberPoint = 0;
        Delivery::create($delivery);

        foreach ($user->meals as $meal) {


            //open a new meal order detail class

            $newMealOrderDetail['order_id'] = $order->id;
            $newMealOrderDetail['meal_id'] = $meal->id;
            $newMealOrderDetail['order_quantity'] = $meal->pivot->shopping_cart_qty;
            $newMealOrderDetail['meal_order_status'] = "preparing";
            $memberPoint += $meal->meal_price;
            //update the lastest meal quantity 
            DB::table('meals')
                ->where('id', $meal->id)
                ->update(['meal_qty' =>  $meal->meal_qty -= $meal->pivot->shopping_cart_qty]);



                
            MealOrderDetail::create($newMealOrderDetail);

            //delete the delete cart in the table 
            DB::table('shopping_carts')->where([
                'id' => $meal->pivot->id
            ])->delete();
        }



        //update member point
        $memberPoint = $memberPoint / 5;
        $memberPoint = ceil($memberPoint);
        if (auth()->user()->point != null) {
            $memberPoint =  $memberPoint + auth()->user()->point;
        }
        $user->point =  $memberPoint;
        $user->update();
     

        return redirect('purchase');
    }

    public function delete($id)
    {



        //find shopping cart
        $shoppingCart = ShoppingCart::find($id);

        //delete particular shopping cart
        $shoppingCart->delete();


        return redirect()->back()->with('successfullyUpdate', true);
    }
    public function store(Request $request)
    {



        //create a shopping cart
        $shoppingCart = $request->except('price', '_token');
        $shoppingCart['user_id'] = auth()->id();
        ShoppingCart::create($shoppingCart);



        return redirect()->back()->with('successAddCart', true);
    }
}
