<?php
namespace App\Factories\Interfaces;
use Illuminate\Http\Request;

interface OrderFactoryInterface{
    public function updateMealRating(Request $request);
    public function updateDeliveryClick($id);
    public function updateCompletedClick($id);
}

?>