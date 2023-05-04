<?php

namespace App\Repository;


use App\Models\User;
use App\Repository\Base\BaseRepositoryInterface;

interface UserRepositoryInterface extends BaseRepositoryInterface{
  
 
    public function generatePrivateToken($user);
    public function updatePassword(User $user, $currentPassword, $newPassword);
    public function updateUser(User $user, array $data);
    
}
