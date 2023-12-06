<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'table_id' => 'required',
            'reservation_date' => 'required',
            'reservation_time' => 'required',
            'reservation_status' => 'required',
            'pax' => 'required|integer',
            'cust_email' => 'nullable',
            'cust_name' => 'nullable',
            'cust_contact' => 'nullable',
            'remark' => 'nullable',
        ];
    }
}
