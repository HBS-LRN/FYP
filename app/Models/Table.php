<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;


    protected $fillable = ['table_id', 'seat_capacity', 'table_type'];

    public function users(){
        return $this->belongsToMany(User::class,'reservations','user_id','table_id')->withPivot('id', 'reservation_date', 'reservation_time', 'reservation_status', 'pax', 'remark');
    }
}
