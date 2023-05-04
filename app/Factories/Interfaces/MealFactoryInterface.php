<?php
namespace App\Factories\Interfaces;
use App\Models\Meal;
use App\Factories\Meals;
use Illuminate\Http\Request;

interface MealFactoryInterface{
    //new
    public function createMeal(array $data,Request $request):Meals;
    

}

?>