<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff  extends User
{
    use HasFactory;

    public function __construct($data)
    {
        parent::__construct($data);
    }
}
