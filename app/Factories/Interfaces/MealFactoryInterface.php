<?php
namespace App\Factories\Interfaces;
use Illuminate\Http\Request;

interface MealFactoryInterface{
    public function store(array $data,Request $request);
    public function update($id, array $data,Request $request);
    public function delete($id);
}

?>