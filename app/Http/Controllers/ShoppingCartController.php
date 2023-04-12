<?php

// namespace App\Http\Controllers;

// use DateTime;
// use App\Models\Meal;
// use App\Models\User;
// use App\Models\Order;
// use App\Models\State;
// use GuzzleHttp\Client;
// use App\Models\Delivery;
// use App\Models\ShoppingCart;
// use Illuminate\Http\Request;
// use App\Models\MealOrderDetail;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Session;
// use GuzzleHttp\Exception\RequestException;
// use Symfony\Component\Console\Input\Input;
// use DOMXPath;
// use DOMDocument;
// use SimpleXMLElement;
// class ShoppingCartController extends Controller
// {


//     public function index()
//     {

//         $client = new Client([
//             'base_uri' => 'http://localhost:8000/api/',
//             'timeout' => 30, 
//         ]);


//         $response = $client->get('voucherDetail', [

//             'headers' => [
//                 'Accept' => 'application/json',
//                 'Authorization' => 'Bearer ' . auth()->user()->token,
//             ]


//         ]);
//         $claimVouchers = json_decode($response->getBody(), true);
//         $response = $client->get('vouchers', [

//             'headers' => [
//                 'Accept' => 'application/json',
//                 'Authorization' => 'Bearer ' . auth()->user()->token,
//             ]


//         ]);

//         $vouchers = json_decode($response->getBody(), true);


//         $userVouchers = array();
//         foreach ($vouchers as $voucher) {
//             foreach ($claimVouchers as $claimedVoucher) {
//                 if ($claimedVoucher['user_email'] == auth()->user()->email && $claimedVoucher['voucher_id'] == $voucher['id']) {
//                     array_push($userVouchers, $voucher);
//                 }
//             }
//         }

//         $user = auth()->user();

//         return view('shoppingcart.index', [
//             'shoppingCarts' => $user->meals,
//             'addressFee' => $this->findDeliveryFee(),
//             'vouchers' => $userVouchers
//         ]);
//     }
//     public function checkout()
//     {
//         $user = User::find(auth()->user()->id);


        
//         if ($user->meals->count() == 0) {
//             return redirect()->back()->with('noItemFound', true);
//         }   
//         if ($user->addresses->count() == 0) {
//             return redirect()->back()->with('noAddressFound', true);
//         }

//         $subTotal = 0;
//         $totalPrice = 0;


//         foreach ($user->meals as $item) {


//             $subTotal += $item->meal_price *  $item->pivot->shopping_cart_qty;
//         }


   
//         $totalPrice =  $subTotal + $this->findDeliveryFee();
       
//         $address = $user->addresses->where('active_flag', '=', 'T');

//         if (session()->has('voucherID')) {

//             $client = new Client([
//                 'base_uri' => 'http://localhost:8000/api/',
//                 'timeout' => 30, 
//             ]);


//             $response = $client->get('vouchers', [

//                 'headers' => [
//                     'Accept' => 'application/json',
//                     'Authorization' => 'Bearer ' . auth()->user()->token,
//                 ]


//             ]);

//             $vouchers = json_decode($response->getBody(), true);

//             foreach ($vouchers as $voucher) {

//                 if ($voucher['id'] == Session::get('voucherID')) {
//                     Session::put('voucherCode', $voucher['code']);
//                 }
//             }
//         }

//         return view('shoppingcart.checkout', [

//             'address' => $address,
//             'areas' =>  State::all(),
//             'itemCheckOuts' => $user->meals,
//             'subTotal' => $subTotal,
//             'totalPrice' => $totalPrice,
//             'addressFee' => $this->findDeliveryFee()

//         ]);
//     }

//     public function findDeliveryFee()
//     {

//         if (Session::has('promoteDeliveryFee')) {
//             return Session::get('promoteDeliveryFee');
//         } else {
//             $user = auth()->user();
//             $states = State::all();
//             $addresses = $user->addresses;
//             $addressFee = 0;
//             foreach ($addresses as $address) {
//                 if ($address->active_flag == 'T') {


//                     foreach ($states as $state) {
//                         if ($address->area == $state->state_name)
//                             $addressFee = $state->delivery_fee;
//                     }
//                 }
//             }

//             return $addressFee;
//         }
//     }
//     public function redirectToPay(Request $request)
//     {

//         if ($request['paymethod'] == '') {
//             return redirect()->back()->with('paymentNotFound', true);
//         }

//         $voucherID = Session::get('voucherID');
        
//         $user = User::find(auth()->user()->id);
//         $order = new Order();
//         $order->user_id = auth()->id();
//         $order->order_total =  $request->input('total');
//         $order->delivery_fee =  $this->findDeliveryFee();
//         $order->order_status = "preparing";
//         $order->payment_status = "Y";
       
//         $order->payment_method = "Public Bank";
//         $order->order_date = now()->format('Y-m-d');

//         $order->save();


      
//         $address = $user->addresses->where('active_flag', '=', 'T');





//         $delivery['order_id'] = $order->id;
//         $delivery['username'] =  $address[0]->address_username;
//         $delivery['userphone'] = $address[0]->address_userphone;
//         $delivery['street'] = $address[0]->street;
//         $delivery['area'] = $address[0]->area;
//         $delivery['postcode'] = $address[0]->postcode;

//         $memberPoint = 0;
//         Delivery::create($delivery);

//         foreach ($user->meals as $meal) {

          
//             $selectedMeal = Meal::find($meal->id);
      
//             $quantityOrdered = $meal->pivot->shopping_cart_qty;
            
//             $xml = simplexml_load_file('../app/XML/user/userOrder.xml');
           
//             $xpathUser = $xml->xpath('/users/user[@id="' . auth()->user()->id . '"]')[0];

          
//             if (!isset($xpathUser->ordered)) {
              
//                 $ordered = $xpathUser->addChild('ordered');
//             } else {
               
//                 $ordered = $xpathUser->ordered;
//             }
          
//             $newMeal = $xpathUser->ordered->addChild('meal');

           
//             $newMeal->addChild('name',   $selectedMeal->meal_name);
//             $newMeal->addChild('price', $selectedMeal->meal_price)->addAttribute('currency', 'RM');
//             $newMeal->addChild('quantity',$meal->pivot->shopping_cart_qty)->addAttribute('unit', 'plate');
//             $newMeal->addChild('totalprice',  $selectedMeal->meal_price * $meal->pivot->shopping_cart_qty)->addAttribute('currency', 'RM');
//             $newMeal->addChild('date', now()->format('Y-m-d'));


//             $xml->asXML('../app/XML/user/userOrder.xml');

//             $xmlString = $xml->asXML();
//             $dom = new DOMDocument;
//             $dom->preserveWhiteSpace = false;
//             $dom->loadXML($xmlString);
//             $dom->formatOutput = true;
//             $xmlStringFormatted = $dom->saveXML();
//             file_put_contents('../app/XML/user/userOrder.xml', $xmlStringFormatted);



//             $newMealOrderDetail['order_id'] = $order->id;
//             $newMealOrderDetail['meal_id'] = $meal->id;
//             $newMealOrderDetail['order_quantity'] = $meal->pivot->shopping_cart_qty;
//             $newMealOrderDetail['meal_order_status'] = "preparing";
//             $memberPoint += $meal->meal_price;
 
//             DB::table('meals')
//                 ->where('id', $meal->id)
//                 ->update(['meal_qty' =>  $meal->meal_qty -= $meal->pivot->shopping_cart_qty]);




//             MealOrderDetail::create($newMealOrderDetail);

           

//              DB::table('shopping_carts')->where([
//                 'id' => $meal->pivot->id
//             ])->delete();
//         }






//         $memberPoint = ceil($memberPoint);
//         if (auth()->user()->point != null) {
//             $memberPoint =  $memberPoint + auth()->user()->point;
//         }
//         $user->point =  $memberPoint;
//         $user->update();



//         if (Session::has('voucher')) {

//             $client = new Client([
//                 'base_uri' => 'http://localhost:8000/api/',
//                 'timeout' => 30, 
//             ]);

//             $client->delete('userUsedVoucher/' . Session::get('voucher'), [

//                 'headers' => [
//                     'Accept' => 'application/json',
//                     'Authorization' => 'Bearer ' . auth()->user()->token,
//                 ]


//             ]);



//             $client->put('vouchers/' . $voucherID, [

//                 'headers' => [
//                     'Accept' => 'application/json',
//                     'Authorization' => 'Bearer ' . auth()->user()->token,
//                 ],
//                 'json' => [
//                     'qty' => $this->quantityVoucher($voucherID) - 1
//                 ],


//             ]);

//             session()->forget('voucherID');
//             session()->forget('voucher');
//             session()->forget('voucherCode');
//             session()->forget('promoteDeliveryFee');
//         }
//         return redirect('purchase');
//     }



//     public function quantityVoucher($voucherID)
//     {
//         $client = new Client([
//             'base_uri' => 'http://localhost:8000/api/',
//             'timeout' => 30, 
//         ]);


       
//         $response = $client->get('vouchers/' . $voucherID, [

//             'headers' => [
//                 'Accept' => 'application/json',
//                 'Authorization' => 'Bearer ' . auth()->user()->token,
//             ]


//         ]);

//         $voucher = json_decode($response->getBody(), true);
//         return $voucher['qty'];
//     }

//     public function delete($id)
//     {



//         $shoppingCart = ShoppingCart::find($id);

       
//         $shoppingCart->delete();


//         return redirect()->back()->with('successfullyUpdate', true);
//     }
//     public function store(Request $request)
//     {

//         if (auth()->id() == null) {
//             return redirect()->back()->with('registerMeesage', true);
//         }
       
//         $shoppingCart = $request->except('price', '_token');
//         $shoppingCart['user_id'] = auth()->id();
//         ShoppingCart::create($shoppingCart);

//         return redirect()->back()->with('successAddCart', true);
//     }
// }

namespace App\Http\Controllers;

use DateTime;
use App\Models\User;
use App\Models\Order;
use App\Models\State;
use App\Models\Address;
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
use App\Repository\AddressRepositoryInterface;

class ShoppingCartController extends Controller
{
 
    private $addressRepositoryInterface;

    public function __construct(AddressRepositoryInterface $addressRepositoryInterface)
    {
        $this->addressRepositoryInterface = $addressRepositoryInterface;
    }

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

        $user = auth()->user();

        return view('shoppingcart.index', [
            'shoppingCarts' => $user->meals,
            'addressFee' => $this->findDeliveryFee(),
            'vouchers' => $userVouchers
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

    $address = Address::find($request['address_id']);
    $data['user_id'] = auth()->id();
    $data['active_flag'] = $address->active_flag;
    $data = $request->validate([
        'address_username' => 'required',
        'address_userphone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
        'street' => 'required',
        'postcode' => ['required', 'regex:/^[0-9]{5}/']
    ], [
        'address_username.required'    => 'User name field is required',
        'address_userphone.required'    => 'User phone field is required',
        'postcode.regex'    => '5 digit for postcode only',
        'address_userphone.regex'    => 'please follow format xxx-xxxxxxxxx',
    ]);
  
       

    if ($request['paymethod'] == '') {
        return redirect()->back()->with('paymentNotFound', true);
    }

    $voucherID = Session::get('voucherID');
    //find user
    $user = User::find(auth()->user()->id);
    $order = new Order();
    $order->user_id = auth()->id();
    $order->order_total =  $request->input('total');
    $order->delivery_fee = $this->findDeliveryFee();
    $order->order_status = "preparing";
    $order->payment_status = "Y";
    //bung seng change to public bank or maybank later
    $order->payment_method = $request['paymethod'];
    $order->order_date = now()->format('Y-m-d');


    $order->save();
//call address repository interface to update data 
$this->addressRepositoryInterface->update($address,$data);

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



    if(auth()->id() == null){
        return redirect()->back()->with('registerMeesage', true);
    }
    //create a shopping cart
    $shoppingCart = $request->except('price', '_token');
    $shoppingCart['user_id'] = auth()->id();
    ShoppingCart::create($shoppingCart);



    return redirect()->back()->with('successAddCart', true);
}
}