<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'order_id', 'username', 'userphone', 'street', 'area', 'postcode'];
    public function order()
    {
        return $this->hasOne(Order::class);
    }
}
