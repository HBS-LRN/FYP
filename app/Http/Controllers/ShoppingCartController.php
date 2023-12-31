<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\Meal;
use App\Models\User;
use App\Models\Order;
use App\Models\State;
use GuzzleHttp\Client;
use App\Models\Delivery;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use App\Models\MealOrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use GuzzleHttp\Exception\RequestException;
use Symfony\Component\Console\Input\Input;
use App\BuilderPattern\OrderBuilder;
use DOMXPath;
use DOMDocument;
use SimpleXMLElement;
class ShoppingCartController extends Controller
{

    public function index()
    {

        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);


        //get vouchers details api through webservices through the bearer token 
        $response = $client->get('voucherDetail', [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]

        ]);
        $claimVouchers = json_decode($response->getBody(), true);
        //get vouchers api through webservices through the bearer token 
        $response = $client->get('vouchers', [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]


        ]);

        $vouchers = json_decode($response->getBody(), true);

        //declare a new user voucher that only store the voucher that claimed by the user
        $userVouchers = array();
        foreach ($vouchers as $voucher) {
            foreach ($claimVouchers as $claimedVoucher) {
                if ($claimedVoucher['user_email'] == auth()->user()->email && $claimedVoucher['voucher_id'] == $voucher['id']) {
                    array_push($userVouchers, $voucher);
                }
            }
        }

        //retrieve the free gifts based on selected meal
        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);


        //get meal free gifts api through webservices through the bearer token 
        $response = $client->get('mealfreegifts', [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]

        ]);
        $mealFreeGifts = json_decode($response->getBody(), true);

         $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);


        //get all free gifts and details api through webservices through the bearer token 
        $response = $client->get('freegifts', [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]

        ]);
        $freeGifts = json_decode($response->getBody(), true);
        $user = auth()->user();

        //for retrieve the free gifts id from the selected meal use
        $mealsInCart = $user->meals;
        
        if($mealsInCart !=null){
        $mealGifts= array();
        foreach($mealsInCart as $mealInCart){
            foreach($mealFreeGifts as $mealFreeGift){
                if($mealInCart->id == $mealFreeGift['meal_id']){
                    array_push($mealGifts, $mealFreeGift['freegift_id']);
                }
            }
        }
       
        $getGifts=array();
        //retrieve the gift associated with selected meal
        foreach($mealGifts as $mealGift){
            foreach($freeGifts as $freeGift){
                if($mealGift == $freeGift['id']){
                    array_push($getGifts,$freeGift);
                }
            }
        }
        }

        return view('shoppingcart.index', [
            'shoppingCarts' => $user->meals,
            'addressFee' => $this->findDeliveryFee(),
            'vouchers' => $userVouchers,
            'gifts' => $getGifts
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


        //find total price with delivery Fee
        $totalPrice =  $subTotal + $this->findDeliveryFee();
        //find user current used address
        $address = $user->addresses->where('active_flag', '=', 'T');

        if (session()->has('voucherID')) {

            $client = new Client([
                'base_uri' => 'http://localhost:8000/api/',
                'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
            ]);


            //get vouchers api through webservices through the bearer token 
            $response = $client->get('vouchers', [

                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . auth()->user()->token,
                ]


            ]);

            $vouchers = json_decode($response->getBody(), true);

            foreach ($vouchers as $voucher) {

                if ($voucher['id'] == Session::get('voucherID')) {
                    Session::put('voucherCode', $voucher['code']);
                }
            }
        }

        return view('shoppingcart.checkout', [

            'address' => $address,
            'areas' =>  State::all(),
            'itemCheckOuts' => $user->meals,
            'subTotal' => $subTotal,
            'totalPrice' => $totalPrice,
            'addressFee' => $this->findDeliveryFee()

        ]);
    }

    public function findDeliveryFee()
    {

        if (Session::has('promoteDeliveryFee')) {
            return Session::get('promoteDeliveryFee');
        } else {
            $user = auth()->user();
            $states = State::all();
            $addresses = $user->addresses;
            $addressFee = 0;
            foreach ($addresses as $address) {
                if ($address->active_flag == 'T') {


                    foreach ($states as $state) {
                        if ($address->area == $state->state_name)
                            $addressFee = $state->delivery_fee;
                    }
                }
            }

            return $addressFee;
        }
    }
    public function redirectToPay(Request $request)
    {

        if ($request['paymethod'] == '') {
            return redirect()->back()->with('paymentNotFound', true);
        }

        $voucherID = Session::get('voucherID');
        //find user
        $user = User::find(auth()->user()->id);
        $order = (new OrderBuilder())
        ->withUserId(auth()->id())
        ->withOrderTotal($request->input('total'))
        ->withDeliveryFee($this->findDeliveryFee())
        ->withOrderStatus("preparing")
        ->withPaymentStatus("Y")
        ->withPaymentMethod($request['paymethod'])
        ->withOrderDate(now()->format('Y-m-d'))
        ->build();
        
        Session::put('order',$order);
        

       

        
        if($request['paymethod'] == 'PayOnDelivery'){
            $order->save(); 
            $totalAmount = $order->order_total + $order->delivery_fee;
            //update xml file (hbs)
         $xml3 = simplexml_load_file('../app/XML/order/listOfOrder.xml');
         $listOfOrder = Order::find($order->id);
         //new order element
         $newlistOfOrder  =  $xml3->addChild('order');
         $newlistOfOrder->addAttribute('id', $listOfOrder->id);
         $newlistOfOrder->addChild('user_id', $listOfOrder->user_id);
         $newlistOfOrder->addChild('order_total', $totalAmount);
         $newlistOfOrder->addChild('delivery_fee', $listOfOrder->delivery_fee);
         $newlistOfOrder->addChild('order_status', $listOfOrder->order_status);

         $newlistOfOrder->addChild('payment_status', $listOfOrder->payment_status);
         $newlistOfOrder->addChild('payment_method', $listOfOrder->payment_method);
         $newlistOfOrder->addChild('order_date', $listOfOrder->order_date);

          //save modified xml (hbs)
          $xml3->asXML('../app/XML/order/listOfOrder.xml');
    
          //format XML
          $xmlString3 = $xml3->asXML();
          $dom3 = new DOMDocument;
          $dom3->preserveWhiteSpace = false;
          $dom3->loadXML($xmlString3);
          $dom3->formatOutput = true;
          $xmlStringFormatted3 = $dom3->saveXML();
          file_put_contents('../app/XML/order/listOfOrder.xml', $xmlStringFormatted3);
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
         //update xml file (cy)
         $xml2 = simplexml_load_file('../app/XML/meal/graphReport.xml');
         $graphOrder = Order::find($order->id);
         //new order element
         $newGraphOrder  =  $xml2->addChild('order');
         $newGraphOrder->addAttribute('id', $graphOrder->id);
         $newGraphOrder->addChild('date', $graphOrder->order_date);
            foreach ($user->meals as $meal) {

                //find the meal 
                $selectedMeal = Meal::find($meal->id);
          
                $quantityOrdered = $meal->pivot->shopping_cart_qty;
                //update xml file
                $xml = simplexml_load_file('../app/XML/user/userOrder.xml');
    
                // find the customer with xpath
                $xpathUser = $xml->xpath('/users/user[@id="' . auth()->user()->id . '"]')[0];
    
                // Check if the customer has placed an order
                if (!isset($xpathUser->ordered)) {
                    // Create a new <ordered> element
                    $ordered = $xpathUser->addChild('ordered');
                } else {
                    // Use the existing <ordered> element
                    $ordered = $xpathUser->ordered;
                }
                // create a new meal element
                $newMeal = $xpathUser->ordered->addChild('meal');
    
                // add child elements to the meal element
                $newMeal->addChild('name',   $selectedMeal->meal_name);
                $newMeal->addChild('price', $selectedMeal->meal_price)->addAttribute('currency', 'RM');
                $newMeal->addChild('quantity',$meal->pivot->shopping_cart_qty)->addAttribute('unit', 'plate');
                $newMeal->addChild('totalprice',  $selectedMeal->meal_price * $meal->pivot->shopping_cart_qty)->addAttribute('currency', 'RM');
                $newMeal->addChild('date', now()->format('Y-m-d'));
    
                // save the modified XML file
                $xml->asXML('../app/XML/user/userOrder.xml');
    
                //format XML
                $xmlString = $xml->asXML();
                $dom = new DOMDocument;
                $dom->preserveWhiteSpace = false;
                $dom->loadXML($xmlString);
                $dom->formatOutput = true;
                $xmlStringFormatted = $dom->saveXML();
                file_put_contents('../app/XML/user/userOrder.xml', $xmlStringFormatted);
    
                //continue add new meal element (cy)
                $newGraphMeal=$newGraphOrder->addChild('meal');
                $newGraphMeal->addChild('name', $selectedMeal->meal_name);
                $newGraphMeal->addChild('category', $selectedMeal->Category->name);
                $newGraphMeal->addChild('quantity', $meal->pivot->shopping_cart_qty);
    
                //save modified xml (cy)
                $xml2->asXML('../app/XML/meal/graphReport.xml');
    
                //format XML
                $xmlString2 = $xml2->asXML();
                $dom2 = new DOMDocument;
                $dom2->preserveWhiteSpace = false;
                $dom2->loadXML($xmlString2);
                $dom2->formatOutput = true;
                $xmlStringFormatted2 = $dom2->saveXML();
                file_put_contents('../app/XML/meal/graphReport.xml', $xmlStringFormatted2);
    
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
        // $memberPoint = $memberPoint / 5;
        $memberPoint = ceil($memberPoint);
        if (auth()->user()->point != null) {
            $memberPoint =  $memberPoint + auth()->user()->point;
        }
        $user->point =  $memberPoint;
        $user->update();


        //if User has use the voucher 
        if (Session::has('voucher')) {

            $client = new Client([
                'base_uri' => 'http://localhost:8000/api/',
                'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
            ]);

            //delete the voucher that user own it since it has been used by the particular user 
            $client->delete('userUsedVoucher/' . Session::get('voucher'), [

                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . auth()->user()->token,
                ]


            ]);

            
            $client = new Client([
                'base_uri' => 'http://localhost:8000/api/',
                'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
            ]);

            //update the quantity of the voucher that has been used by user
            $client->put('vouchers/' . $voucherID, [

                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . auth()->user()->token,
                ],
                'json' => [
                    'qty' => $this->quantityVoucher($voucherID) - 1
                ],


            ]);


            
            session()->forget('voucherID');
            session()->forget('voucher');
            session()->forget('voucherCode');
            session()->forget('promoteDeliveryFee');
        }
            return redirect('purchase');
        }else if($request['paymethod'] == 'PublicBank'){
            
            return redirect('publicBankLogin');

        }
        
        return redirect('purchase');
    }

    public function quantityGifts($giftID){
        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);

        //get vouchers api through webservices through the bearer token 
        $response = $client->get('freegifts/' . $giftID, [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]

        ]);

        $freeGift = json_decode($response->getBody(), true);
        return $freeGift['qty'];
    }

    public function quantityVoucher($voucherID)
    {
        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);


        //get vouchers api through webservices through the bearer token 
        $response = $client->get('vouchers/' . $voucherID, [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]


        ]);

        $voucher = json_decode($response->getBody(), true);
        return $voucher['qty'];
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

        if (auth()->id() == null) {
            return redirect()->back()->with('registerMeesage', true);
        }
        //create a shopping cart
        $shoppingCart = $request->except('price', '_token');
        $shoppingCart['user_id'] = auth()->id();
        ShoppingCart::create($shoppingCart);

        return redirect()->back()->with('successAddCart', true);
    }
}
