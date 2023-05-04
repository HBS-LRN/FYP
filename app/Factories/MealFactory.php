<?php
namespace App\Factories;

use App\Factories\Interfaces\MealFactoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Meal;
use App\Models\User;
use App\Models\Log;
use App\Factories\AppertizerFactory;
use App\Factories\BeverageFactory;
use App\Factories\DessertFactory;
use App\Factories\NoodleFactory;
use App\Factories\RiceFactory;
use App\Factories\SeafoodFactory;
use App\Models\Category;
use App\Models\MealOrderDetail;

class MealFactory
{

    public function getFactory($type): MealFactoryInterface
    {
        switch ($type) {
            case 1:
                return new AppertizerFactory();
            case 3:
                return new BeverageFactory();
            case 4:
                return new DessertFactory();
            case 11:
                return new RiceFactory();
            case 12:
                return new NoodleFactory();
            case 14:
                return new SeafoodFactory();
            default:
                throw new InvalidArgumentException("Invalid meal type");
        
        }
    }

   
}

?>