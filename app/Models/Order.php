<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'order_total', 'delivery_fee', 'order_status', 'payment_status', 'payment_method', 'order_date'];
    public function delivery()
    {
        return $this->hasOne(Delivery::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function meals()
    {
        return $this->belongsToMany(Meal::class,'meal_order_details','order_id','meal_id')->withPivot('id','order_quantity','rating_star','rating_comment','reply_comment','meal_order_status');
    }

    
}
