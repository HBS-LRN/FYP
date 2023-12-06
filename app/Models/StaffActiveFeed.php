<?php

namespace App;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffActiveFeed extends Model
{
    protected $fillable = [
        'user_id',
        'Action',
        'ActionIcon',
    ];

    // You can define relationships or additional methods here if needed

    // Example: Define a relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
