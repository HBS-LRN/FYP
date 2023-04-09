<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Models\ShoppingCart;
use App\Models\Meal;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShoppingCartTest extends TestCase
{
   
    /**
     * A basic unit test
     *
     * @return void
     */
    
     private $shoppingCart;

    public function setUp(): void
    {

        parent::setUp();
        $this->shoppingCart = new ShoppingCart();
    }

    public function test_meal_pop_up_screen_can_be_rendered()
    {
        $response = $this->get('/mealpopups/2');

        $response->assertStatus(200);
    }

    public function test_meal_can_be_added_to_shopping_cart()
    { 
        $data=[
            'user_id'=>2,
            'meal_id'=>3,
            'shopping_cart_qty'=>1,
        ];
        $shoppingCart = new ShoppingCart();
        $newCart=$shoppingCart->store($data);
        $this->assertEquals('3',$newCart['meal_id']); 
    }

    public function test_shopping_cart_can_be_checkout_to_order()
    { 
        $shoppingCart = new ShoppingCart();
        $data=[
            'user_id'=>2,
            'order_total'=>15.90,
            'delivery_fee'=>4.5,
            'order_status'=>"preparing",
            'payment_status'=>"Y",
            'payment_method'=>"PayOnDelivery",
        ];

        $checkoutCart=$shoppingCart->checkoutStoreOrder($data);
        $this->assertEquals(15.90, $checkoutCart['order_total']);
        $this->assertEquals(4.5, $checkoutCart['delivery_fee']);
        
    }

    public function test_shopping_cart_can_be_checkout_to_delivery()
    {
        $shoppingCart = new ShoppingCart();
        $data=[
            'order_id'=>1,
            'address_username'=>"beep",
            'address_userphone'=>"012-3456789",
            'street'=>"No.18, Jln Putra Indah, Taman bang",
            'area'=> "Selangor",
            'postcode'=>"43300",
        ];
        $checkoutCart=$shoppingCart->checkoutStoreDelivery($data);
        $this->assertEquals("beep", $checkoutCart['username']);
        $this->assertEquals("012-3456789", $checkoutCart['userphone']);
    }

    public function test_shopping_cart_can_be_checkout_to_meal_order_detail()
    {
        $shoppingCart = new ShoppingCart();
        $data=[
            'order_id'=>1,
            'meal_id'=>3,
            'shopping_cart_qty'=>1,
            'meal_order_status'=>"preparing",
        ];
        $checkoutCart=$shoppingCart->checkoutStoreMealOrderDetail($data);
        $this->assertEquals(1, $checkoutCart['order_id']);
        $this->assertEquals(3, $checkoutCart['meal_id']);
        $this->assertEquals(1, $checkoutCart['order_quantity']);
    } 

    // public function test_shopping_cart_can_be_checkout()
    // { 
    //     $shoppingCart = new ShoppingCart();
    //     $dataOrder=[
    //         'user_id'=>2,
    //         'order_total'=>15.90,
    //         'delivery_fee'=>4.5,
    //         'order_status'=>"preparing",
    //         'payment_status'=>"Y",
    //         'payment_method'=>"PayOnDelivery",
    //     ];

    //     $dataDelivery=[
    //         'order_id'=>1,
    //         'address_username'=>"beep",
    //         'address_userphone'=>"012-3456789",
    //         'street'=>"No.18, Jln Putra Indah, Taman bang",
    //         'area'=> "Selangor",
    //         'postcode'=>"43300",
    //     ];

    //     $dataOrderDetail=[
    //         'order_id'=>1,
    //         'meal_id'=>3,
    //         'shopping_cart_qty'=>1,
    //         'meal_order_status'=>"preparing",
    //     ];
    //     $checkoutCartOrder=$shoppingCart->checkoutStoreOrder($dataOrder);
    //     $checkoutCartDelivery=$shoppingCart->checkoutStoreDelivery($dataDelivery);
    //     $checkoutCartDetail=$shoppingCart->checkoutStoreMealOrderDetail($dataOrderDetail);

    //     $this->assertEquals(15.90, $checkoutCartOrder['order_total']);
    //     $this->assertEquals(4.5, $checkoutCartOrder['delivery_fee']);

    //     $this->assertEquals("beep", $checkoutCartDelivery['username']);
    //     $this->assertEquals("012-3456789", $checkoutCartDelivery['userphone']);
       
    //     $this->assertEquals(1, $checkoutCartDetail['order_id']);
    //     $this->assertEquals(3, $checkoutCartDetail['meal_id']);
    //     $this->assertEquals(1, $checkoutCartDetail['order_quantity']);
        
    // }
}

