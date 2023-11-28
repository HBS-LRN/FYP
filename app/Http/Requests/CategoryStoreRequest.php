<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryStoreRequest extends FormRequest
{
      /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return false;
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
                'name' => 'required|string|max:258',
                'iconImage' => 'required|image|mimes:jpeg,png,jpg|max:80000',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:80000'
               
            ];
        } else {
            return [
                'name' => 'required|string|max:258',
                'iconImage' => 'nullable|image|mimes:jpeg,png,jpg|max:80000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:80000'
            ];
        }
    }
  
    public function messages()
    {
        return [
            'name.required' => 'The category name is required.',
            'iconImage.required' => 'The icon image is required.',
            'iconImage.image' => 'The icon image must be an image.',
            'iconImage.mimes' => 'The icon image must be a file of type: jpeg, png, jpg.',
            'image.required' => 'The image is required.',
            'image.image' => 'The image must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg.',
        ];
    }
}
