<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'table_id', 'reservation_date', 'reservation_time', 'reservation_status', 'pax','cust_email','cust_name','cust_contact','remark'];
}
