<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','address_username','address_userphone','street','area','postcode','active_flag'];
    public function user() {

        return $this->belongsTo(User::class);
    }

      //for testing add meal use
      public function add($data)
      {
  
          $address = new Address();
          $address->user_id = $data['user_id'];
          $address->address_username = $data['address_username'];
          $address->address_userphone = $data['address_userphone'];
          $address->street = $data['street'];
          $address->area =  $data['area'];
          $address->postcode = $data['postcode'];
          $address->active_flag = $data['active_flag'];
          $address->save();
          return $address;
      }
}
