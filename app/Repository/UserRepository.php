<?php

namespace App\Repository;


use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Repository\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{

    public function __construct()
    {
       
        parent::__construct(User::class);
     
    }

    //manually open a new method that base repository doest not support
    public function updatePassword(User $user, $password)
    {
        //create user

        if (Hash::check($password, auth()->user()->password)) {

            $user->password = bcrypt($password);
            $user->update();

            return true;
        }

        return false;
    }

    
    
    public function create($data): User
    {
       
        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

    public function updateUser(User $user, array $data)
    {
       
        $user->name =  $data['name'];
        $user->email =  $data['email'];
        $user->gender =  $data['gender'];
        $user->phone =  $data['phone'];
        $user->birthdate =  $data['birthdate'];
        $user->image =  $data['image'];
        $user->update();
        return $user;
    }


}
