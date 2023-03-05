<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShoppingCart extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','meal_id','shopping_cart_qty','created_at','updated_at'];
    
    public function delivery(){
        return $this->hasOne(Order::class);
    }

   
}
