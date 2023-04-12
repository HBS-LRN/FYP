<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Meal;
use App\Models\MealOrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function showGraphReport(){
        return view('staff.graphReport', [
            'categories' => Category::all()
        ]);
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

}
