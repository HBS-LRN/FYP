<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'meal_price', 'meal_image', 'meal_name', 'meal_desc', 'meal_qty', 'total_calorie'];

    public function category()
    {

        return $this->belongsTo(Category::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'meal_order_details', 'meal_id', 'order_id')
            ->withPivot('id', 'order_quantity', 'rating_star', 'rating_comment', 'reply_comment');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'shopping_carts', 'user_id', 'meal_id')->withPivot('shopping_cart_qty', 'id');
    }
    public function mealIngredients()
    {
        return $this->hasMany(MealIngredient::class, 'meal_id');
    }
    public function mealOrderDetails()
    {
        return $this->hasMany(MealOrderDetail::class, 'meal_id', 'id');
    }
    public function ingredients()
    {
        return $this->hasManyThrough(Ingredient::class, MealIngredient::class, 'meal_id', 'id', 'id', 'ingredient_id');
    }
}
