<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){

        $fields = $request->validate([
            'name'=>'required|string',
            'email'=>'required|string|unique:users,email',
            'password'=>'required|string|confirmed'
        ]);
        $user = User::create([
            'name'=>$fields['name'],
            'email'=>$fields['email'],
            'password'=>bcrypt(($fields['password']))
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user'=>$user,
            'token'=>$token,
            
        ];
        return response($response,201);
    }

    public function login(Request $request){

        $fields = $request->validate([
            'email'=>'required|string',
            'password'=>'required|string'
        ]);
        //check email
        $user = User::where('email',$fields['email'])->first();

        if(!$user ||!Hash::check($fields['password'],$user->password)){
            return response([
                'message'=>'Bad Creds'
            ],401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user'=>$user->meals,
            'token'=>$token,
            
        ];
        return response($response,201);
    }
    public function logout(Request $request){

        Auth::user()->tokens->each(function($token, $key) {
            $token->delete();
        });
        return[
            'message'=>'logged out'
        ];

    }
  
   
}
