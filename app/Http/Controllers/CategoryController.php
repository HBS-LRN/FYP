<?php

namespace App\Http\Controllers;

use DOMXPath;
use DOMDocument;
use XSLTProcessor;
use SimpleXMLElement;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use App\Models\Order;
use App\Models\Meal;
use App\Models\MealOrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Carbon;

class CategoryController extends Controller
{


    public function index()
    {

        return view('index', [


            'categories' => Category::all(),
           
        ]);
    }

    public function create()
    {
        return view('categories.create');
    }


    public function store(Request $request)
    {
        $formFields = $request->validate([

            'name' => 'required',


        ]);

        if ($request->hasFile('image')) {
            $formFields['image'] = $request->file('image')->store('categories', 'public');
        }
        if ($request->hasFile('subImage')) {
            $formFields['subImage'] = $request->file('subImage')->store('categories', 'public');
        }

        Category::create($formFields);

        return back();
    }



    public function show()
    {
        return view('categories.index', [
            'categories' => Category::all()
        ]);
    }

    // public function showGraphReport(){
    //     return view('staff.graphReport', [
    //         'categories' => Category::all()
    //     ]);
    // }
    public function showGraphReport()
    {
        $date = date('Y-m-d');
        $xml1 = new DOMDocument();
        $xml1->load(public_path('../app/XML/meal/graphReport.xml'));
        $xml2 = new DOMDocument();
        $xml2->load(public_path('../app/XML/meal/category.xml'));
        $xml2Node = $xml1->importNode($xml2->documentElement, true);
        $xml1->documentElement->appendChild($xml2Node);
        $xsl = new DOMDocument();
        $xsl->load(public_path('../app/XML/meal/graphReport.xsl'));
        $proc = new XSLTProcessor();
        $proc->setParameter('', 'today', $date);
        $proc->importStylesheet($xsl);

        $html = $proc->transformToXML($xml1);
        return response($html)->header('Content-Type', 'text/html');
    }


    public function showCategoryTodayQuantitySold($id)
    {
        $category=Category::find($id);
        $today=Carbon::now()->format('Y-m-d');
        
        
        // $mealOrderDetailList = from mealOrderDetail in _db.MealOrderDetails
        //                           where mealOrderDetail.Order.order_date == today
        //                           where mealOrderDetail.Meal.category_ID == category.category_ID
        //                           select mealOrderDetail;

        $mealOrderDetailList = MealOrderDetail::join((new Order)->getTable(),'meal_order_Details.order_id','=','orders.id')
                                             ->join((new Meal)->getTable(),'meal_order_Details.meal_id','=','meals.id')
                                             ->where('orders.order_date','=',$today)
                                             ->where('meals.category_id','=',$category->id)
                                             ->get();
    

        $quantitySold = 0;
        foreach ($mealOrderDetailList as $mealOrderDetail) {
            $quantitySold +=  $mealOrderDetail->order_quantity;
            
        }

        return $quantitySold;
    }

    public function showCategoryOverallQuantitySold($id)
    {
        $category=Category::find($id);
       
        $mealOrderDetailList = MealOrderDetail::join((new Meal)->getTable(),'meal_order_Details.meal_id','=','meals.id')
                                                ->where('meals.category_id','=',$category->id)
                                                ->get();

        $quantitySold = 0;
        foreach ($mealOrderDetailList as $mealOrderDetail) {
            $quantitySold +=  $mealOrderDetail->order_quantity;
            
        }

        return $quantitySold;
    }

    public function generateXml(){
       
         // Retrieve data from MySQL database
         $orders = Order::with('mealOrderDetails')->get();

         // Generate XML file
         $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><orders></orders>');
         foreach ($orders as $order) {
         $xmlOrder = $xml->addChild('order');
         $xmlOrder->addChild('id', $order->id);
         $xmlOrder->addChild('date', $order->order_date);
         $xmlMeals =$xmlOrder->addChild('meals');
         foreach($order->mealOrderDetails as $meal){
             $xmlMeal=$xmlMeals->addChild('meal');
             $xmlMeal->addChild('name',$meal->Meal->meal_name);  
             $xmlMeal->addChild('category',$meal->Meal->Category->name);   
             $xmlMeal->addChild('quantity',$meal->order_quantity);
         }
         }
 
         $xmlString=$xml->asXML();
         // Save XML file to disk
         $file = '../app/XML/meal/graphReport.xml';
         file_put_contents($file, $xmlString);

    }

}
