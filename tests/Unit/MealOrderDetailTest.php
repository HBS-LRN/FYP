<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Models\MealOrderDetail;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MealOrderDetailTest extends TestCase
{
   
    /**
     * A basic unit test
     *
     * @return void
     */
    
     private $mealOrderDetail;

    public function setUp(): void
    {

        parent::setUp();
        $this->mealOrderDetail = new MealOrderDetail();
    }

    public function test_meal_manage_rating_screen_can_be_rendered()
    {
        $response = $this->get('/mealRating/edit/1');

        $response->assertStatus(200);
    }

    public function test_comment_can_be_replied(){
       $data=[
        'id' => 2,
        'reply_comment'=>"Thank you for your feedback !",
       ];
       $instance =new MealOrderDetail();
       $mealOrderDetail=MealOrderDetail::find($data['id']);
       $repliedOrder= $instance->updateMealRating($mealOrderDetail,$data);
       $this->assertEquals('Thank you for your feedback !',  $repliedOrder['reply_comment']);
    }

}