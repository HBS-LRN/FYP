<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:10',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'gender' => 'required',
            'height' => 'required',
            'weight' => 'required',
            'phone' => ['required', 'regex:/^\d{3}-\d{7}|\d{3}-\d{8}$/'],
            'birthdate' => ['required', 'before:-13 years'],
            'image' => 'nullable|string',
          
        ];
    }
}