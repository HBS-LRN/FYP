<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
   
    protected $fillable = ['user_id','action','table_name','row_id','old_data','new_data'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
