<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'order_id', 'delivery_man_id','username', 'userphone', 'longitude', 'latitude',  'accuracy', 'street', 'city', 'state', 'postcode','customer_longitude','customer_latitude'];
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
