<?php
namespace App\FactoryPattern;

use Exception;
use App\Models\Admin;
use App\Models\Staff;
use App\Models\Customer;


class UserFactory
{
    
        public static function create($role, $data)
        {

            if($role!=null){
            switch ($role) {
                case 0:
                    $user = new Admin($data);
                    break;
                case 1:
                    $user = new Staff($data);
                    break;
                case 2:
                    $user = new Customer($data);
                    break;
                default:
                    throw new Exception("Unsupported user role: $role");
            }
        }
       

    
            return $user;
        }
    
}
