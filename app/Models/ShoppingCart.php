<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Order;
use App\Models\Delivery;
use App\Models\MealOrderDetail;

class ShoppingCart extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','meal_id','shopping_cart_qty','created_at','updated_at'];
    
    public function delivery(){
        return $this->hasOne(Order::class);
    }

    //for agile testing use only
    public function store($data)
    {
        //create a shopping cart
        $shoppingCart = new ShoppingCart();
        $shoppingCart->user_id= $data['user_id'];
        $shoppingCart->meal_id=$data['meal_id'];
        $shoppingCart->shopping_cart_qty=$data['shopping_cart_qty'];
        $shoppingCart->save();
        return $shoppingCart;
    }
   
    public function checkoutStoreOrder($data)
    {
        $order=new Order();
        $order-> user_id= $data['user_id'];
        $order->order_total =  $data['order_total'];
        $order->delivery_fee =  $data['delivery_fee'];
        $order->order_status = $data['order_status'];
        $order->payment_status = $data['payment_status'];
        $order->payment_method = $data['payment_method'];
        $order->order_date = now();
        $order->save();
        return $order;
    }

    public function checkoutStoreDelivery($data)
    {
        $delivery=new Delivery();
        $delivery->order_id =$data['order_id'];
        $delivery->username =  $data['address_username'];
        $delivery->userphone = $data['address_userphone'];
        $delivery->street = $data['street'];
        $delivery->area = $data['area'];
        $delivery->postcode= $data['postcode'];
        $delivery->save();
        return $delivery;
    }

    public function checkoutStoreMealOrderDetail($data)
    {
    $mealOrderDetail=new MealOrderDetail();
    $mealOrderDetail->order_id= $data['order_id'];
    $mealOrderDetail->meal_id=$data['meal_id'];
    $mealOrderDetail->order_quantity = $data['shopping_cart_qty'];
    $mealOrderDetail->meal_order_status=$data['meal_order_status'];
    $mealOrderDetail->save();
    return $mealOrderDetail;
    }
}
