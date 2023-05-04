<?php
namespace App\Factories;

use App\Factories\Interfaces\MealFactoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Meal;
use App\Models\User;
use App\Models\Log;
use App\Models\Category;
use App\Models\MealOrderDetail;

require_once 'Meals.php';
class RiceFactory implements MealFactoryInterface
{

    public function createMeal(array $data,Request $request):Meals
    {

        $meal_price = $data['meal_price'];
        $meal_qty = $data['meal_qty'];
        $meal_name = $data['meal_name'];
        $category_id = $data['category_id'];
        $meal_image = $data['meal_image'];

        return new RiceMeal($meal_name, $meal_qty, $category_id,$meal_price,$meal_image);
        
    }
}