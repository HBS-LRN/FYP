<?php

namespace App\Http\Controllers;

use App\Models\Meal;
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

    //update meal Inventory
    public function updateInventory(Request $request, $id)
    {

        $meal = Meal::find($id);
        $formFields = $request->validate([
            'meal_qty' => 'required|integer|min:0'
        ], [
            'meal_qty.required' => 'Please Provide A Meal Quantity',
        ]);

        $formFields['meal_id'] = auth()->id();

        $meal->update($formFields);

        return redirect('/showInventory')->with('successfullyUpdate', true);
    }


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
    //show meal rating page
    public function showMealRating()
    {
        return view('meals.mealRating',[
            'mealsOrderDetail' => MealOrderDetail::all(),
            'users'=> User::all()
        ]);
    }
}
