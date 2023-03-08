<?php

namespace App\Repository;


use App\Models\User;

interface UserRepositoryInterface extends BaseRepositoryInterface{
  
 
    public function updatePassword(User $user, $password);
    public function updateUser(User $user, array $data);
    
}
