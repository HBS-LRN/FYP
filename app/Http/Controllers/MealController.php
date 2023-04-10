<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use App\Models\MealOrderDetail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Session;
use App\Factories\MealFactory;
use App\Factories\Interfaces\MealFactoryInterface;


class MealController extends Controller
{
    protected $mealFactory;

    public function __construct(MealFactoryInterface $mealFactory) {
        $this->mealFactory = $mealFactory;
    }

    public function index($id)
    {

        $category = Category::find($id);




        return view('meals.index', [


            'meals' => $category->categorymeals->where('meal_qty', '!=', '0'),

            //'meals' => Meal::where('category_id', '=', $category->id),
            'categories' => Category::all()



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

        return view('meals.index', [


            'meals' => $category->categorymeals->where('meal_qty', '!=', '0'),
            'categories' => Category::all(),
            'searchMeal' => $meal,
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

    //for retreive/show meal list
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
        $meal = $this->mealFactory->store($request->all(),$request);
        return back();
        
    }

    public function update(Request $request, $id)
    {
        $result = $this->mealFactory->update($id, $request->all(),$request);
        return redirect('/meal/adshow')->with('successfullyUpdate', true);
    }

    public function delete($id)
    {
        $result = $this->mealFactory->delete($id);
        return redirect()->back()->with('successfullyUpdate', true);

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
        $result = $this->mealFactory->updateInventory($id, $request->all(),$request);
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
        $meals= MealOrderDetail::where('meal_id',$id)->get();

        $totalQuantity = 0;

        foreach ($meals as $mealOrder) {
        $totalQuantity +=  $mealOrder->order_quantity;
        }

        return $totalQuantity;
    }

    public function showRevenue($id){
        $totalRevenue = 0; 
        $meals= MealOrderDetail::where('meal_id',$id)->get();

        foreach ($meals as $mealOrder) {
            $totalRevenue +=  ($mealOrder->order_quantity) * ($mealOrder->Meal->meal_price);
            }

        return $totalRevenue;
    }

    public function showInventoryReportDetail($id)
    {
        return view('staff.inventoryReportDetail',[
            'mealOrderDetails'=>MealOrderDetail::where('meal_id',$id)->get(),
            'meal'=>Meal::find($id)
        ]);
    }
}
