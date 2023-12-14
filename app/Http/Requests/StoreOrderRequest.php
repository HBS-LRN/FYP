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

            'order_total' => 'required|numeric', 
            'delivery_fee' => 'required|numeric', 
            'order_status' => 'required|string', 
            'payment_status' => 'required|string', 
            'payment_method' => 'required|string',
            'order_date' => 'required|date', 
            'cust_email' =>'nullable',
            'cust_name' => 'nullable',
            'cust_contact' => 'nullable',
            'user_id' => 'required|integer',
            'orderItems' => 'required|array', 
            'orderItems.*.meal_id' => 'required|integer',
            'orderItems.*.order_quantity' => 'required|integer',


        ];
    }
}
