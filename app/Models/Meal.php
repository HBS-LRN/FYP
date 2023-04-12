<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = ['category_id','meal_qty','meal_price','meal_image','meal_name'];

    public function category() {

        return $this->belongsTo(Category::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class,'meal_order_details','order_id','meal_id')->withPivot('id','order_quantity','rating_star','rating_comment','reply_comment','meal_order_status');
    }
    public function users(){
        return $this->belongsToMany(User::class,'shopping_carts','user_id','meal_id')->withPivot('shopping_cart_qty','id');
    }

    //for testing add meal use
    public function add($data)
    {

        $meal = new Meal();
        $meal->meal_name =  $data['meal_name'];
        $meal->category_id = $data['category_id'];
        $meal->meal_qty = $data['meal_price'];
        $meal->meal_price = $data['meal_price'];
        $meal->meal_image =  $data['meal_image'];
        $meal->save();
        return $meal;
    }

}
