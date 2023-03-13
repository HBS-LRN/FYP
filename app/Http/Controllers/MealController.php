<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Session;

class MealController extends Controller
{



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
        $formFields = $request->validate([

            'meal_price' => 'required|numeric|min:0',
            'meal_qty' => 'required|integer|min:0',
            'meal_name' => 'required',
            'category_id' => 'required'

        ], [
            'meal_price.required'    => 'Please Provide A Meal Price',
            'meal_price.numeric'    => 'Please Provide A Number',
            'meal_price.integer'    => 'Please Provide A Number',
            'meal_qty.required'      => 'Please Provide A Meal Quantity ',
            'meal_name.required' => 'Please Provide A Meal Name',
            'category_id.required'      => 'Please Select A Category',
        ]);

        if ($request->hasFile('meal_image')) {
            $formFields['meal_image'] = $request->file('meal_image')->store('meals', 'public');
        }


        Meal::create($formFields);

        return back();
    }

    public function update(Request $request, $id)
    {

        $meal = Meal::find($id);
        $formFields = $request->validate([

            'meal_price' => 'required|numeric|min:0',
            'meal_qty' => 'required|integer|min:0',
            'meal_name' => 'required',
            'category_id' => 'required'

        ], [
            'meal_price.required'    => 'Please Provide A Meal Price',
            'meal_price.numeric'    => 'Please Provide A Number',
            'meal_price.integer'    => 'Please Provide A Number',
            'meal_qty.required'      => 'Please Provide A Meal Quantity ',
            'meal_name.required' => 'Please Provide A Meal Name',
            'category_id.required'      => 'Please Select A Category',
        ]);

        if ($request->hasFile('meal_image')) {
            $formFields['meal_image'] = $request->file('meal_image')->store('meals', 'public');
        }

        $formFields['meal_id'] = auth()->id();

        $meal->update($formFields);

        return redirect('/meal/adshow')->with('successfullyUpdate', true);
    }

    public function delete($id)
    {

        $meal = Meal::find($id);
        $meal->delete();

        return redirect()->back()->with('successfullyUpdate', true);
    }
}
