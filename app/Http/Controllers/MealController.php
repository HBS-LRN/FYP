<?php

namespace App\Http\Controllers;

use DOMXPath;
use DOMDocument;
use XSLTProcessor;
use SimpleXMLElement;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Meal;
use App\Factories\Meals;
use App\Factories\AppertizerFactory;
use App\Factories\BeverageFactory;
use App\Factories\DessertFactory;
use App\Factories\NoodleFactory;
use App\Factories\RiceFactory;
use App\Factories\SeafoodFactory;
use App\Factories\MealFactory;
use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use App\Models\Log;
use App\Models\MealOrderDetail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Session;
use InvalidArgumentException;
use App\Factories\Interfaces\MealFactoryInterface;


class MealController extends Controller
{
   
    public function index($id)
    {
       
        $category = Category::find($id);

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


        return view('meals.index', [


            'meals' => $category->categorymeals->where('meal_qty', '!=', '0'),

            //'meals' => Meal::where('category_id', '=', $category->id),
            'categories' => Category::all(),
            'mealFreeGifts'=> $mealFreeGifts


        ]);
    }

    public function search(Request $request)
    {

        $output = "";
        if ($request->ajax()) {
            $meals = Meal::where('meal_name', 'like', '%' . $request->search . '%')
                ->orWhere('meal_price', 'Like', '%' . $request->search . '%')->get();

            if (count($meals) > 0) {

                foreach ($meals as $meal) {

                    $output .= "<p class='srcP'> <a class='productA' href='/mealpopups/" . $meal->id . "'>";
                    $output .= "<img class='imgSrc' src=" . asset('storage/' . $meal->meal_image) . ">" . $meal->meal_name . "</a></p>";

                    //<img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                    //  alt="" />
                }
            } else {
                $output .= '<b> *Sorry , No Result Found</b>';
            }
        } else {
            $output .= '<b>No Result Found</b>';
        }
        return $output;
    }


    public function mealPopUp($id)
    {

        $meal = Meal::find($id);
        $category = Category::find($meal->category_id);

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

        $giftid=null;
        foreach($mealFreeGifts as $mealFreeGift){
            if($mealFreeGift['meal_id']==$id){
                $giftid=$mealFreeGift['freegift_id'];
            }

        }
        

        if($giftid!=null){
        //get a meal free gift (retrieve the free gift id) api through webservices through the bearer token 
        $response = $client->get('freegifts/'. $giftid ,[

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]

        ]);

        $freeGift = json_decode($response->getBody(), true);
        }else{
            $freeGift=null;
        }

        return view('meals.index', [

            'meals' => $category->categorymeals->where('meal_qty', '!=', '0'),
            'categories' => Category::all(),
            'searchMeal' => $meal,
            'mealFreeGifts'=>$mealFreeGifts,
            'freeGift'=>$freeGift,
            'popup' => true

        ]);

        //     return redirect()->back()->with([
        //               'meals' =>Meal::where('category_id', '=', $meal->category_id)->paginate(6),
        //          'categories' =>Category::all(),
        //          'searchMeal'=>$meal,
        //          'popup'=>true
        //  ]); 
    }

    public function create()
    {
        return view('meals.create', [
            'categories' => Category::all()
        ]);
    }

    //for retrieve/show meal list
    public function adshow()
    {
        return view('meals.adshow',[
            'meals' => Meal::all()
        ]);

    }

    //for show selected meal from meal list
    public function upshow($id){
        return view('meals.adupdate',[
            'meal'=> Meal::find($id),
            'categories' => Category::all(),
        ]);
    }


    public function show($id)
    {

        $url = route('popUpMeal', [$id]);
        echo $url;
        return redirect($url)->withFragment('meals');
    }

    public function store(Request $request)
    {    
        $data = $request->validate([

            'meal_price' => 'required|numeric|min:1',
            'meal_qty' => 'required|integer|min:1',
            'meal_name' => 'required',
            'category_id' => 'required',
            'meal_image' => 'required|mimes:jpeg,png,jpg,gif'
        ], [
            'meal_price.required'    => 'Please Provide A Meal Price',
            'meal_price.numeric'    => 'Please Provide A Number',
            'meal_price.integer'    => 'Please Provide A Number',
            'meal_price.min' => 'Please Set The Price At Least 1 Ringgit',
            'meal_qty.min' => 'Please Provide At Least 1 Quanlity Of Food',
            'meal_qty.required'      => 'Please Provide A Meal Quantity ',
            'meal_name.required' => 'Please Provide A Meal Name',
            'category_id.required'      => 'Please Select A Category',
            'meal_image.required' => 'Please Provide A Meal Image'
            
        ]);

        if ($request->hasFile('meal_image')) {
            $data['meal_image'] = $request->file('meal_image')->store('meals', 'public');
        }
        $factory = new MealFactory();
        $mealFactory = $factory->getFactory($data['category_id']);
        
        $meal = $mealFactory->createMeal($data,$request);

        $newMeal = new Meal();
        $newMeal->meal_name = $meal->getMealName();
        $newMeal->meal_qty = $meal->getMealQty();
        $newMeal->category_id = $meal->getCategoryId();
        $newMeal->meal_price = $meal->getMealPrice();
        $newMeal->meal_image =$meal->getMealImage();

        $newMeal->save();
        //create a log
        $adminLog = new Log([
            'user_id' => auth()->user()->id,
            'user_name' => auth()->user()->name,
            'action' => 'Created',
            'table_name' => 'Meals',
            'row_id' => $newMeal->id,
            'new_data' => $newMeal->toJson(),
        ]);

        $adminLog->save();

        return redirect('/meal/adshow')->with('successfullyAddedMeal', true);
    }

    public function update(Request $request, $id)
    {
        $meal = Meal::find($id);
        $data = $request->validate([
                'meal_price' => 'required|numeric|min:0',
                'meal_qty' => 'required|integer|min:0',
                'meal_name' => 'required',
                'category_id' => 'required',
                'meal_image' => 'mimes:jpeg,png,jpg,gif'
            ], [
                'meal_price.required'    => 'Please Provide A Meal Price',
                'meal_price.numeric'    => 'Please Provide A Number',
                'meal_price.integer'    => 'Please Provide A Number',
                'meal_qty.required'      => 'Please Provide A Meal Quantity ',
                'meal_name.required' => 'Please Provide A Meal Name',
                'category_id.required'   => 'Please Select A Category',
            ]);
    
            if ($request->hasFile('meal_image')) {
                $data['meal_image'] = $request->file('meal_image')->store('meals', 'public');
            }
    
            $data['meal_id'] = auth()->id();
    
             //create a log
            $adminLog = new Log();
            $adminLog->old_data = $meal->toJson();
            $meal->update($data);
            $newmeal = $meal->fresh();
    
            $adminLog->user_id =auth()->user()->id;
            $adminLog->user_name =auth()->user()->name;
            $adminLog->action ='Updated';
            $adminLog->table_name ='Meals';
            $adminLog->row_id = $meal->id;
            $adminLog->new_data=$newmeal->toJson();
    
            $adminLog->save();
            return redirect('/meal/adshow')->with('successfullyUpdate', true);
        
    }

    public function delete($id)
    {
        $meal = Meal::find($id);
        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $meal->toJson();
        $adminLog->row_id = $meal->id;
    
        $meal->delete();
        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Deleted';
        $adminLog->table_name ='Meals';
        $adminLog->save();
       
        return redirect()->back()->with('successDeleteMeal', true);

    }

    //return meals and show on inventory page
    public function inventory()
    {
        return view('meals.manageInventory',[
            'meals' => Meal::all()
        ]);
    }

    //show selected meal edit inventory page
    public function showEditInventory($id)
    {
        return view('meals.editMealInventory',[
            'meal'=> Meal::find($id)
        ]);
    }

    //update meal Inventories
    public function updateInventory(Request $request, $id)
    {
        $meal = Meal::find($id);
        $data = $request->validate([
            'meal_qty' => 'required|integer|min:0'
        ], [
            'meal_qty.required' => 'Please Provide A Meal Quantity',
        ]);

        $data['meal_id'] = auth()->id();
        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $meal->toJson();
        $meal->update($data);
        $newmeal=$meal->fresh();

        $adminLog->user_id =auth()->user()->id;
        $adminLog->user_name =auth()->user()->name;
        $adminLog->action ='Updated the Meal Quantity of ';
        $adminLog->table_name ='Meals';
        $adminLog->row_id = $meal->id;
        $adminLog->new_data=$newmeal->toJson();

        $adminLog->save();
        return redirect('/showInventory')->with('successfullyUpdate', true);
    }

    public function showInventoryReport()
    {
        return view('staff.inventoryReport',[
            'meals' => Meal::all()
        ]);
    }
   
    public function showQuantitySold($id)
    {
        $totalQuantity = 0;
        $meals = MealOrderDetail::where('meal_id', '=', $id)->get();

        $totalQuantity = 0;

        foreach ($meals as $mealOrder) {
        $totalQuantity +=  $mealOrder->order_quantity;
        }

        return $totalQuantity;
    }

    public function showRevenue($id){
        $totalRevenue = 0; 
        $meals = MealOrderDetail::where('meal_id', '=', $id)->get();
        
        foreach ($meals as $mealOrder) {
            $totalRevenue +=  ($mealOrder->order_quantity) * ($mealOrder->Meal->meal_price);
            }

        return $totalRevenue;
       
    }

    public function showInventoryReportDetail($id)
    {
        return view('staff.inventoryReportDetail',[
            'mealOrderDetails' => MealOrderDetail::where('meal_id', '=', $id)->get(),
            'meal'=>Meal::find($id)
        ]);
    }

    public function generateXml()
    {
        // Retrieve data from MySQL database
        $categories = Category::with('categorymeals')->get();

        // Generate XML file
        $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><categories></categories>');
        foreach ($categories as $category) {
        $xmlCategory = $xml->addChild('category');
        $xmlCategory->addChild('id', $category->id);
        $xmlCategory->addChild('name', $category->name);
        $xmlMeals =$xmlCategory->addChild('meals');
        foreach($category->categorymeals as $meal){
            $xmlMeal=$xmlMeals->addChild('meal');
            $xmlMeal->addChild('id',$meal->id);  
            $xmlMeal->addChild('name',$meal->meal_name);  
            $xmlMeal->addChild('image',$meal->meal_image);  
            $xmlMeal->addChild('price',$meal->meal_price);  
            $xmlMeal->addChild('quantity',$meal->meal_qty);
        }
        }

        $xmlString=$xml->asXML();
        // Save XML file to disk
        $file = '../app/XML/meal/mealAdShow.xml';
        file_put_contents($file, $xmlString);

    }

    public function showListOfMeals()
    {

        $xml = new DOMDocument();
        $xml->load(public_path('../app/XML/meal/mealAdShow.xml'));
        $xsl = new DOMDocument();
        $xsl->load(public_path('../app/XML/meal/mealAdShow.xsl'));
        $proc = new XSLTProcessor();
        $proc->importStylesheet($xsl);

        $html = $proc->transformToXML($xml);
        return response($html)->header('Content-Type', 'text/html');
    }

    public function showLog()
    {
    $logs = DB::table('logs')
        ->orderBy('created_at', 'desc')
        ->paginate(20);

    return view('logs.index', ['logs' => $logs]);
    }

    public function showLogDetails($id)
    {
    $log = Log::find($id);
    $oldData=[];
    $newData=[];
    
    if($log->old_data !=null){
    foreach(json_decode($log->old_data,true)as $key => $value){
        $oldData[$key]=$value;
    }
    }else{
        $oldData=null;
    }

    if($log->new_data !=null){
    foreach(json_decode($log->new_data,true)as $key => $value){
        $newData[$key]=$value;
    }
    }else{
        $newData=null;
    }

    
    return view('logs.details', ['log' => $log
    , 'oldData'=>$oldData,
      'newData'=>$newData]);
    }
}
