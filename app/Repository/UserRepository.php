<?php

namespace App\Repository;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Hash;
use App\Repository\Base\BaseRepository;
use App\Repository\UserRepositoryInterface;


class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(User::class);
    }

     //only specified method base repository doest not support need to be created
     public function updatePassword(User $user, $password)
     {
         if (Hash::check($password, auth()->user()->password)) {
             $user->password = bcrypt($password);
             $user->update();
             return true;
         }
         return false;
     }

    //user repository 
    public function create($data): User
    {
        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

   

    //generete a private token via 
    public function generatePrivateToken($user)
    {

        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout'  => 6.0,
        ]);
        $response = $client->post('generateToken', [
            'headers' => [
                'Accept' => 'application/json',
            ],
            'json' => [
                'email' => $user->email,
                'password' => $user->password,
            ],
        ]);
        $token = json_decode($response->getBody(), true);
        $user->token = $token['token'];
        $user->update();
    }


    public function updateUser(User $user, array $data)
    {
        $user->name =  $data['name'];
        $user->email =  $data['email'];
        $user->gender =  $data['gender'];
        $user->phone =  $data['phone'];
        $user->birthdate =  $data['birthdate'];
     

      
    

        $user->update();
        return $user;
    }
}
