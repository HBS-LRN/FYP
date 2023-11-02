<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeliveryRequest extends FormRequest
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
            'order_id' => 'required|integer',
            'username' => 'required|string',
            'userphone' => 'required|string',
            'delivery_man_id' => 'nullable',
            'longitude' => 'nullable',
            'latitude' => 'nullable',
            'accuracy' => 'nullable',
            'street' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'postcode' => 'required|digits:5'
        ];
    }
}
