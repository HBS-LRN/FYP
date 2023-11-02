<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MealStoreRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

   /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        if(request()->isMethod('post')) {
            return [
                'meal_name' => 'required|string|max:258',
                'meal_price' => 'required|numeric',
                'meal_image' => 'required|image|mimes:jpeg,png,jpg|max:80000',
                'meal_desc' => 'required|string',
                'category_id' => 'required|integer',
                'ingredient_id' => 'array',
                'ingredient_id.*.ingredient_id' => 'integer|distinct',

            ];
        } else {
            return [
                'meal_name' => 'required|string|max:258',
                'meal_price' => 'required|numeric',
                'meal_image' => 'required|image|mimes:jpeg,png,jpg|max:80000',
                'meal_desc' => 'required|string',
                'category_id' => 'required|integer',
            ];
        }
    }
  
    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'meal_name.required' => 'Meal Name is required.',
                'meal_name.max' => 'Meal Name must not exceed 258 characters.',
                'meal_price.required' => 'Price is required.',
                'meal_price.numeric' => 'Price must be a number.',
                'meal_image.required' => 'Image is required.',
                'meal_image.image' => 'Please upload a valid image (jpeg, png, jpg).',
                'meal_image.mimes' => 'The image must be a file of type: jpeg, png, jpg.',
                'meal_image.max' => 'The image may not be greater than 80,000 kilobytes.',
                'meal_desc.required' => 'Meal Description is required.',
                'category_id.required' => 'Category is required.',
                'category_id.integer' => 'Category must be an integer.', // Adjust the message if necessary
                'ingredient_id.*.ingredient_id.integer' => 'Each ingredient must be an integer.', // Custom message for the 'integer' rule within the array
                 'ingredient_id.*.ingredient_id.distinct' => 'Each ingredient must be unique.', // Custom message for the 'distinct' rule within the array
            ];
        } else {
            return [
                'meal_name.required' => 'Meal Name is required.',
                'meal_name.max' => 'Meal Name must not exceed 258 characters.',
                'meal_price.required' => 'Price is required.',
                'meal_price.numeric' => 'Price must be a number.',
                'meal_desc.required' => 'Meal Description is required.',
                'category_id.required' => 'Category is required.',
                'category_id.integer' => 'Category must be an integer.', // Adjust the message if necessary
                'meal_image.image' => 'Please upload a valid image (jpeg, png, jpg).',
                'meal_image.mimes' => 'The image must be a file of type: jpeg, png, jpg.',
                'meal_image.max' => 'The image may not be greater than 80,000 kilobytes.',
            ];
            if (!request()->isMethod('post')) {
                // Remove the ingredient related messages if it's not a POST request
                unset($messages['ingredient_id.array']);
                unset($messages['ingredient_id.*.ingredient_id.integer']);
                unset($messages['ingredient_id.*.ingredient_id.distinct']);
            }
        }
    }
}