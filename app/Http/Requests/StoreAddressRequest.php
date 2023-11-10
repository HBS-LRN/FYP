<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required',
            'address_username' => 'required',
            'address_userphone' => ['required', 'regex:/^\d{3}-\d{7}|\d{3}-\d{8}$/'],
            'street' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postcode' => 'required|digits:5',
            'latitude' => 'required',
            'longitude'=> 'required'
        ];
    }
}
