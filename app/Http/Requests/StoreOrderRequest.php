<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'order_id' => 'required',
            'order_total' => 'required',
            'delivery_fee' => 'nullable',
            'order_status' => 'required',
            'payment_status' => 'nullable',
            'payment_method' => 'required',
            'order_date' => 'required'
        ];
    }
}
