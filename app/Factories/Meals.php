<?php
namespace App\Factories;

abstract class Meals
{
    protected $meal_name;
    protected $meal_qty;
    protected $category_id;
    protected $meal_price;
    protected $meal_image;
  
    public function __construct($meal_name, $meal_qty,  $category_id,$meal_price,$meal_image)
    {
        $this->meal_name = $meal_name;
        $this->meal_qty = $meal_qty;
        $this->category_id = $category_id;
        $this->meal_price = $meal_price;
        $this->meal_image = $meal_image;
    }

    public function getMealName()
    {
        return $this->meal_name;
    }

    public function getMealQty()
    {
        return $this->meal_qty;
    }

    public function getCategoryId()
    {
        return $this->category_id;
    }

    public function getMealPrice()
    {
        return $this->meal_price;
    }

    public function getMealImage()
    {
        return $this->meal_image;
    }

    public function setMealName($meal_name)
    {
        $this->meal_name = $meal_name;
    }

    public function setMealQty($meal_qty)
    {
        $this->meal_qty = $meal_qty;
    }

    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    public function setMealPrice($meal_price)
    {
        $this->meal_price = $meal_price;
    }

    public function setMealImage($meal_image)
    {
        $this->meal_image = $meal_image;
    }

}

class AppertizerMeal extends Meals
{
}

class BeverageMeal extends Meals
{
   
}
class DessertMeal extends Meals
{
   
}
class NoodleMeal extends Meals
{
   
}
class RiceMeal extends Meals
{
   
}
class SeafoodMeal extends Meals
{
   
}
