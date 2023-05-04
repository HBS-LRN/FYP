<?php

namespace App\Http\Controllers;

use App\Models\MealOrderDetail;
use App\Models\Order;
use App\Models\Meal;
use App\Models\Category;
use App\Models\ShoppingCart;
use App\Models\Delivery;
use App\Models\User;
use App\Models\Log;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Factories\OrderFactory;
use Illuminate\Validation\Rule;
use App\Factories\Interfaces\OrderFactoryInterface;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Mail;
use DOMXPath;
use DOMDocument;
use SimpleXMLElement;
use XSLTProcessor;

class OrderController extends Controller
{



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

        if(!$validateUserID){
           
            return back()->withErrors(['user_id' => 'Undefine User ID'])->onlyInput('user_id');
        }
        Session::put('publicBank_ID',$request['user_id']);
        Session::put('publicBank',$publicBank);
        return redirect('/publicBank/password');


    }

    public function publicBankCheckPassword(Request $request){
        if($request['submit'] == "Back"){
            return redirect('/publicBankLogin');
        }
        
        $data = $request->validate(
            ['password' => 'required'],
            ['password.required' => 'The password is required']
        );
        
        $passwordValidate = true;
        foreach (Session::get('publicBank') as $publicBankUser) {
            if($publicBankUser['user_id'] == $request['user_id']){
                if($publicBankUser['password'] == $request['password']){
                    $passwordValidate = false;
                }
            }
        }
        if($passwordValidate){
            return back()->withErrors(['password' => 'Incorrect Password'])->onlyInput('password');
        }
        
        return redirect('publicBank/PayConfirmSession');
            

    }
    
    public function publicCheckPAC(Request $request){
        
      
        $PACno = session('PACno');
        $GLOBALS['PACno']=null;
        foreach ( Session::get('publicBank') as $publicBank) {
            if($publicBank['user_id'] == Session::get('publicBank_ID')){
                $user_email = $publicBank['user_email'];
                $user_name = $publicBank['user_name'];
            }
        }
        date_default_timezone_set("Asia/Kuala_Lumpur"); 
        $date=date_create(date(DATE_RFC822));
        $todate = date_format($date,"d M y H:i:s");
        $order = Session::get('order');
        $totalAmount = $order->order_total + $order->delivery_fee;
        if($request['submit']=="Request PAC Now"){
            $PACno = rand(100000,999999);
            $SerialNo = rand(100000,999999);
            $data = array(
                'PAC_No' => $PACno,
                'SerialNo' => $SerialNo, 
                'totalAmount'=> $totalAmount,
                'date' => $todate
            );
        Mail::send('payment.MailPAC', $data, function ($message) use ($user_email, $user_name) {
            $message->from('noreply@gmail.com', 'Public Bank');
            $message->to($user_email, $user_name)
                ->subject('PAC No');
                
        });
        session(['PACno' => $PACno]);
        return back()->with('SendSuccessful', true);
        }else if($request['submit']=="Confirm"){
            $data = $request->validate(
                [
                    'pac' => 'required'
                ],[
                    'pac.required' => 'Pls Click the button of "Request PAC Now" for getting PAC'
                    ]
            );
            if($PACno == $request['pac']){
                $voucherID = Session::get('voucherID');
                $user = User::find(auth()->user()->id);
                $order = Session::get('order');
                $order->save();
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
        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]); 

        //get vouchers details api through webservices through the bearer token 
        
        $user_id = Session::get('publicBank_ID');
        foreach (Session::get('publicBank') as $publicBank) {
            if($publicBank['user_id']==$user_id){
                $totalAsset = $publicBank['total_asset'];
                $id = $publicBank['id'];
            }
        }
        $client->put('publicBank/'. $id, [

            'headers' => [
                'Accept' => 'application/json',

            ],
            'json' => [
                'total_asset' => $totalAsset - $totalAmount
            ],


        ]);
            return redirect('/publicBank/PaySuccess');
            }else{
                return back()->withErrors(['pac' => 'Invalid PAC'])->onlyInput('pac');
            }
        }else if($request['submit']=="Cancel"){
            return redirect("/shoppingCart");
        }

        return redirect("/publicBank/password");
    }

    public function generateXml()
    {
        // Retrieve data from MySQL database
        $orders = Order::with('mealOrderDetails')->get();

        // Generate XML file
        $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><orders></orders>');
        foreach ($orders as $order) {
        $xmlOrder = $xml->addChild('order');
        $xmlOrder->addAttribute('id', $order->id);
        $xmlOrder->addChild('user_id', $order->user_id);
        $xmlOrder->addChild('order_total', ($order->order_total + $order->delivery_fee));
        $xmlOrder->addChild('delivery_fee', $order->delivery_fee);
        $xmlOrder->addChild('order_status', $order->order_status);
        $xmlOrder->addChild('payment_status', $order->payment_status);
        $xmlOrder->addChild('payment_method', $order->payment_method);
        $xmlOrder->addChild('order_date', $order->order_date);
        }

        $xmlString=$xml->asXML();
        // Save XML file to disk
        $file = '../app/XML/order/listOfOrder.xml';
        file_put_contents($file, $xmlString);

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
    public function showListOfOrder()
    {
        $xml = new DOMDocument();
        $xml->load(public_path('../app/XML/order/listOfOrder.xml'));

        $xsl = new DOMDocument();
        $xsl->load(public_path('../app/XML/order/listOfOrder.xsl'));

        $proc = new XSLTProcessor();
        $proc->importStylesheet($xsl);

        $html = $proc->transformToXML($xml);
        return response($html)->header('Content-Type', 'text/html');
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
        $mealOrderDetail = MealOrderDetail::find($request['mealOrderDetailId']);
        $data = $request->validate([
            'reply_comment' => 'max:200',
        ]);
        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $mealOrderDetail->toJson();

        $mealOrderDetail->update($data);
        $newDetail=$mealOrderDetail->fresh();
 
        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Reply comment of the ';
        $adminLog->table_name ='Order Details';
        $adminLog->row_id = $mealOrderDetail->id;
        $adminLog->new_data=$newDetail->toJson();
 
        $adminLog->save();
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
        $orderDetails = MealOrderDetail::where('order_id', $id)->get();
        
        foreach($orderDetails as $orderDetail){
            $orderDetail->meal_order_status ="delivering";
            $orderDetail->update();
        }

        $order= Order::find($id);
        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $order->toJson();

        $order->order_status="delivering";
        $order->save();
       
        $neworder=$order->fresh();

        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Updated the order status to Delivering of the';
        $adminLog->table_name ='Orders and Order Details';
        $adminLog->row_id = $order->id;
        $adminLog->new_data=$neworder->toJson();

        $adminLog->save();

        return redirect('/orderDetails/show/'.$id)->with('successfullyUpdate', true);
    }


    public function updateCompletedClick($id){
        $orderDetails = MealOrderDetail::where('order_id', $id)->get();
        
        foreach($orderDetails as $orderDetail){
            $orderDetail->meal_order_status ="completed";
            $orderDetail->update();
        }

        $order= Order::find($id);
        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $order->toJson();

        $order->order_status="completed";
        $order->save(); 
        $neworder=$order->fresh();
 
        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Updated the order status to Completed of the ';
        $adminLog->table_name ='Orders and Order Details';
        $adminLog->row_id = $order->id;
        $adminLog->new_data=$neworder->toJson();
 
        $adminLog->save();
        return redirect('/orderDetails/show/'.$id)->with('successfullyUpdate', true);
    }
    
}