<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Meal;
use App\Providers\RouteServiceProvider;
use Tests\TestCase;

class mealTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    private $meal;
    public function setUp(): void
    {
      parent::setUp();
      $this->meal = new Meal();
    }

   public function test_add_meal()
   {

      $response = $this->get('/meal/create');
      $response->assertStatus(200);
   }

   public function test_add_new_meal(){

      $data = [
        'meal_name' => 'Test Meal Name',
        'category_id' => 1, 
        'meal_qty' => 10,
        'meal_price' => 10.20,
        'meal_image' => 'meals/7ABskOLwwAzYTGoxcsnktbZlh7bwRz8GYpX86d8m.jpg'
      ];
      $meal = new Meal();
      $newMeal = $meal->add($data);
      $this->assertEquals('Test Meal Name',$newMeal['meal_name']);
   }
}
