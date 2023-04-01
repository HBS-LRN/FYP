<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealOrderDetail extends Model
{
    use HasFactory;

    protected $fillable = ['order_id','meal_id','order_quantity','quantity_star','rating_comment','reply_comment','meal_order_status'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }
}
