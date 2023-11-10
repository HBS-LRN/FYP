<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allergic extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'ingredient_name'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
