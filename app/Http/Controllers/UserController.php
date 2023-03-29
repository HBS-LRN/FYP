<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use GuzzleHttp\Client;
use App\Mail\ResetPassword;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Cache\RateLimiter;
use Illuminate\Support\Facades\DB;
use App\FactoryPattern\UserFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\Session;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\Rules\Password;
use App\Repository\UserRepositoryInterface;

class UserController extends Controller
{

    //using user repository 
    private $userRepositoryInterface;
    
    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'currentPass' => 'required',
            'password' => ['required', Password::min(8)->letters()->numbers()->mixedCase()->symbols(), 'confirmed'],
        ]);

        //call repository method to update password
        $success =  $this->userRepositoryInterface->updatePassword(auth()->user(), $request['currentPass']);

        if ($success == true) {
            return back()->with('successfullyUpdate', true);
        } else {
            return back()->withErrors(['currentPass' => 'Invalid Current Password'])->onlyInput('currentPass');
        }
    }


    //update customer profile
    public function update(Request $request)
    {

        $user = auth()->user();

        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email'],
            'gender' => 'required',
            'phone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'birthdate' => 'required',

        ]);


        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('user', 'public');
            $user->image =  $data['image'];
        }

        //call repository class to update the class
        $this->userRepositoryInterface->updateUser($user, $data);

        return back()->with('successfullyUpdate', true);
    }

    //create new user
    public function store(Request $request)
    {
        //validation
        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/', 'confirmed'],
            'TermCondition' => 'required'
        ], [
            'password.regex'    => '*Minimum eight characters, at least one letter, one number and one special character',

        ]);


        $user = $this->userRepositoryInterface->create($data);
        //create the unqiue bearer token as the personal access api token
        $this->userRepositoryInterface->generatePrivateToken($user);
        return redirect('/login')->with('resgisterSucessful', $user);
    }

    // Authenticate User
    public function authenticate(LoginRequest $request)
    {




        //validation
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => 'required'
        ]);



        $user = User::where('email', $request->email)->first();
        //check if the user is the active member
        if ($user->active_member == 'N') {
            return back()->with('notActiveMember', true);
        }


        //call Enforce account disabling after an established number of invalid login attempts method
        $request->authenticate();
        // Check if the user has an active session to prevent concurrent login

        if ($user && $user->session_id && $user->session_id !== session()->getId()) {
            Auth::logoutOtherDevices($request->password);
            $user->session_id = session()->getId();
            $user->save();
            Session::flash('concurentLogin', true);
        }

        //if user login successfully
        if (User::login($data)) {

            //update session id 
            $user->session_id = session()->getId();
            $user->update();


            return redirect('/dashboard')->with('message', 'You are now logged in!');
        }

        return back()->withErrors(['email' => 'Invalid Credentials'])->onlyInput('email');
    }


    //log out user 
    public function logout()
    {



        User::logout();

        return redirect('/')->with('message', 'You have been logged out!');
    }



    //show dashboard Form
    public function dashboard()
    {

        return view('profile.dashboard');
    }
    //show Regitser/Create Form
    public function create()
    {

        return view('auth.customerRegister');
    }
    // Show Login Form
    public function login()
    {
        return view('auth.customerLogin');
    }


    // Show Login Form
    public function profile()
    {
        return view('profile.index');
    }

    public function showForgetForm()
    {
        return view('auth.verify-email');
    }


    public function sendResetLink(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);
        $token = Str::random(64);
        DB::table('password_resets')->insert([

            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now(),

        ]);



        $action_link = route('user.reset.password.form', ['token' => $token, 'email' => $request->email]);
        $body = "We are received a request to reset the password for Grand Imperial Food Ordering associated
                with " . $request->email . ".<b> Below Link Will Expired in 5 minutes</b>.You can reset your password by clicking the link below  ";
        Mail::send('auth.email-forget', ['action_link' => $action_link, 'body' => $body], function ($message) use ($request) {

            $message->from('noreply@gmail.com', 'Grand Imperial');
            $message->to($request->email, 'Grand Imperial')
                ->subject('Reset Password');
        });
        return back()->with('emailSuccess', true);
    }


    public function showResetForm(Request $request, $token = null)
    {

        return view('auth.confirm-password')->with(['token' => $token, 'email' => $request->email]);
    }
    public function resetPassword(Request $request, $token = null)
    {


        $request->validate([
            'password' => ['required', Password::min(8)->letters()->numbers()->mixedCase()->symbols(), 'confirmed'],
            'password_confirmation' => 'required'

        ]);


        //set user 
        $user = User::where('email', $request->email)->first();

        $check_token = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        $created_at = Carbon::parse($check_token->created_at);
        $now = Carbon::now();

        if ($created_at->diffInSeconds($now) > 60) {

            //the link will be expired if the time taken is too long 
            DB::table('password_resets')->where('token', $request->token)->delete();

            return redirect()->route('user.password.form')->with('linkExpired', 'Reset link expired!');

            //compare request password with user password
        } else if (Hash::check($request->password, $user->password)) {

            //prevent password reused 
            return redirect()->back()->with('reusedPassword', true);
        } else {
            //update user password if successfully 
            User::where('email', $request->email)->update([
                'password' => Hash::make($request->password)
            ]);
            DB::table('password_resets')->where([
                'email' => $request->email
            ])->delete();

            //inform user their password has been changed using email
            User::informPasswordChange($request->email);



            return redirect()->route('login')->with('passChangeSuccess', true);
        }
    }



    public function show()
    {
        return view('profile.changePassword');
    }

    public function requestLogin()
    {
        return view('auth.request-login');
    }

    public function accessDenied()
    {
        return view('auth.access-prohibited');
    }
    public function showPoint()
    {
        return view('profile.memberPoint');
    }

    public function showDashboard()
    {
        return view('staff.dashboard');
    }
    //return all user
    public function listOutCustomers(){
        return view('user.index',[
            'users' => User::all()
        ]);
    }

    public function editCustomer($id){
       
        return view('user.edit', [
            'user' => User::find($id)
        ]);

    }
    
    public function updateCustomer(Request $request, $id){
        $user = User::find($id);
      
        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email'],
            'gender' => 'required',
            'phone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'birthdate' => 'required',

        ]);
        $data['user_id'] = $id;
        $this->userRepositoryInterface->updateUser($user, $data);
        return redirect('/customer')->with('successfullyUpdate', true);
    } 
}
