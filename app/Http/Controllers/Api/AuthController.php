<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
class AuthController extends Controller
{

    public function shoppingCart(Request $request, $id)
    {
        /** @var \App\Models\User $user */
        $user = User::find($id);
        return response($user->meals);
    }

    public function verifyEmail(Request $request)
    {

        $data = $request->all();
        /** @var \App\Models\User $user */
        $user = User::where('email', $data['email'])->first();


        if(!$user){
            return response([
                'message' => 'Email Do Not Exist'
            ], 401);
        }
       
        $token = Str::random(64);
        try {
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now(),
            ]);
        } catch (\Exception $e) {
            return response([
                'error' => 'Database error: ' . $e->getMessage(),
            ], 500);
        }


        $action_link = "http://localhost:3000/resetPassword";
        $body = "We are received a request to reset the password for Grand Imperial Food Ordering associated
                with " . $request->email . ".<b> Below Link Will Expired in 5 minutes</b>.You can reset your password by clicking the link below  ";
        Mail::send('auth.email-forget', ['action_link' => $action_link, 'body' => $body], function ($message) use ($request) {

            $message->from('noreply@gmail.com', 'Grand Imperial');
            $message->to($request->email, 'Grand Imperial')
                ->subject('Reset Password');
        });


        return response(compact('user', 'token'));
        //send email when email exist


       
    }
 
    public function authenticateUser(Request $request, $id)
    {

        $user = User::find($id);
        return $user;
    }
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */


        auth()->logout();
        session()->invalidate();
        session()->regenerateToken();
       
        return response('', 204);
    }
}
