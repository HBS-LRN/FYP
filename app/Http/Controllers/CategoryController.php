<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

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
}
