<?php

namespace App\Repository;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Repository\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{





    public function getAllUsers()
    {
        return User::all();
    }


    public function updatePassword(User $user, $password)
    {
        //create user

        if (Hash::check($password, auth()->user()->password)) {

            $user->password =  bcrypt($password);
            $user->update();

            return true;
        }

        return false;
    }

    public function create(array $data): User
    {
        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

    public function update(User $user, array $data): User
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

    public function delete(User $user): bool
    {
        return $user->delete();
    }

    public function getById(int $id): ?User
    {
        return User::find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }
}
