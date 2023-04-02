<?php
namespace App\Factories\Interfaces;
use Illuminate\Http\Request;

interface OrderFactoryInterface{
    public function updateMealRating(Request $request);
}

?>