<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealOrderDetail extends Model
{
    use HasFactory;

    protected $fillable = ['order_id','meal_id','order_quantity','rating_star','rating_comment','reply_comment'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    public function meal()
    {
        return $this->belongsTo(Meal::class, 'meal_id', 'id');
    }

}
