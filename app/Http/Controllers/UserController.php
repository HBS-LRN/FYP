<?php

namespace App\Http\Controllers;

use App\Events\UserCreate;
use DOMXPath;
use DOMDocument;
use Carbon\Carbon;
use XSLTProcessor;
use App\Models\Role;
use App\Models\User;
use App\Models\Order;
use App\Models\Log;
use App\Models\MealOrderDetail;
use SimpleXMLElement;
use GuzzleHttp\Client;
use App\Events\UserDelete;
use App\Events\UserOrderDelete;
use App\Events\UserUpdate;
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


    //update the user password
    public function updatePassword(Request $request)
    {
        $success = false;
        $request->validate([
            'currentPass' => 'required',
            'password' => ['required', Password::min(8)->letters()->numbers()->mixedCase()->symbols(), 'confirmed'],
        ]);

        //call repository method to update password
        $success =  $this->userRepositoryInterface->updatePassword(auth()->user(), $request['currentPass'], $request['password']);

        if ($success) {
            return back()->with('successfullyUpdate', true);
        } else {
            return back()->withErrors(['currentPass' => 'Invalid Current Password'])->onlyInput('currentPass');
        }
    }


    //update customer profile
    public function update(Request $request)
    {


        //get the user email
        $user = User::where('email', $request->email)->first();
        //validate user email
        if ($user != null) {

            if ($user->email != auth()->user()->email)
                return back()->withErrors(['email' => 'The email has already been taken'])->onlyInput('email');
        }

        //validation condition
        $data = $request->validate(
            [
                'name' => ['required', 'min:3'],
                'email' => ['required', 'email'],
                'gender' => 'required',
                'phone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
                'birthdate' => ['required', 'before:-13 years'],
                'image' => ['file', 'mimes:jpg,png,jpeg', 'max:2084'],
            ],
            [
                'birthdate.before'    => 'Must be a date before today and at least 13 years before!',
                'image.mimes'    => 'Only allow for jpg,png,jpeg!',
            ]
        );



        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('user', 'public');
            $user->image =  $data['image'];
        }

        $instance = new User();
        $updatedUser = $instance->updateDetail($user, $data);

        // Dispatch an event to update the XML file
        event(new UserUpdate($user));

        //call repository class to update the class
        //recover this!! 
        //$this->userRepositoryInterface->updateUser($user, $data);

        return back()->with('successfullyUpdate', $updatedUser);
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



        //uisng the user repository interface to create the data
        $user = $this->userRepositoryInterface->create($data);
        //create the unqiue bearer token as the personal access api token
        $this->userRepositoryInterface->generatePrivateToken($user);

        // Fire the UserCreate event to create user in the XML file
        $user = User::find($user->id);
        event(new UserCreate($user));
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



        //call Enforce account disabling after an established number of invalid login attempts method
        $request->authenticate();
        //get the user email
        $user = User::where('email', $request->email)->first();





        // Check if the user has an active session to prevent concurrent login

        if ($user && $user->session_id && $user->session_id !== session()->getId()) {
            Auth::logoutOtherDevices($request->password);
            $user->session_id = session()->getId();
            $user->save();
            Session::flash('concurentLogin', true);
        }




        $instance = new User();
        if ($instance->login($data)) {

            //update session id 
            $user->session_id = session()->getId();
            $user->update();

            //if user is customer
            if ($user->role == 0) {
                return redirect('/dashboard')->with('message', 'You are now logged in!');
                //return to staff side
            } else {
                return redirect('/staffDashboard')->with('message', 'You are now logged in!');
            }
        }


        return back()->withErrors(['email' => 'Invalid Credential'])->onlyInput('email');
    }


    //log out user 
    public function logout()
    {

        $instance = new User();
        //call log out method
        $instance->logout();

        return redirect('/')->with('message', 'You have been logged out!');
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

    public function editStaff($id)
    {

        return view('staff.edit', [
            'user' => User::find($id),
            'roles' => Role::all()
        ]);
    }

    //show out form of edit customer
    public function editCustomer($id)
    {

        return view('user.edit', [
            'user' => User::find($id)
        ]);
    }

    public function storeCustomer(Request $request)
    {

        //validation
        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'gender' => 'required',
            'phone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'birthdate' => ['required'], //solution,
            'password' => ['required', 'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/', 'confirmed'],

        ], [
            'password.regex'    => '*Minimum eight characters, at least one letter, one number and one special character',

        ]);



        //uisng the user repository interface to create the data
        $user = $this->userRepositoryInterface->create($data);
        //create the unqiue bearer token as the personal access api token
        $this->userRepositoryInterface->generatePrivateToken($user);
        // Fire the UserCreate event to create user in the XML file
        $user = User::find($user->id);
        event(new UserCreate($user));

        //create a log
        $adminLog = new Log();
        $adminLog->user_id = auth()->user()->id;
        $adminLog->user_name = auth()->user()->name;
        $adminLog->action = 'Created Customer ';
        $adminLog->table_name = 'Users';
        $adminLog->row_id = $user->id;
        $adminLog->new_data = $user->toJson();

        $adminLog->save();
        return redirect('/customer')->with('successUpdate', $user);
    }



    public function updateCustomer(Request $request, $id)
    {
        $user = User::find($id);

        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email'],
            'gender' => 'required',
            'phone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'birthdate' => ['required', 'before:-13 years'],

        ]);
        $data['user_id'] = $id;

        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $user->toJson();

        //call repository class to update the user
        $newuser = $this->userRepositoryInterface->updateUser($user, $data);
        // Dispatch an event to update the XML file
        event(new UserUpdate($user));

        $adminLog->user_id = auth()->user()->id;
        $adminLog->user_name = auth()->user()->name;
        $adminLog->action = 'Updated Customer ';
        $adminLog->table_name = 'Users';
        $adminLog->row_id = $user->id;
        $adminLog->new_data = $newuser->toJson();
        $adminLog->save();
        return redirect('/customer')->with('successUpdate', true);
    }

    public function updateStaff(Request $request, $id)
    {
        $user = User::find($id);

        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'role' => 'required',

        ]);
        $data['user_id'] = $id;
        $data['gender'] = $user->gender;
        $data['birthdate'] = $user->birthdate;
        $data['role'] = $request['role'];

        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $user->toJson();

        //call repository class to update the user
        $newuser = $this->userRepositoryInterface->updateUser($user, $data);

        $adminLog->user_id = auth()->user()->id;
        $adminLog->user_name = auth()->user()->name;
        $adminLog->action = 'Updated Staff/Admin ';
        $adminLog->table_name = 'Users';
        $adminLog->row_id = $user->id;
        $adminLog->new_data = $newuser->toJson();
        $adminLog->save();
        return redirect('/staff')->with('successUpdate', true);
    }
    public function deleteCustomer($id)
    {
        $user = User::find($id);

        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $user->toJson();
        $adminLog->row_id = $user->id;
        $adminLog->user_id = auth()->user()->id;
        $adminLog->user_name = auth()->user()->name;
        $adminLog->action = 'Deleted Customer ';
        $adminLog->table_name = 'Users';
        $adminLog->save();

        // Fire the UserOrderDelet event to delete order in the xml file
        event(new UserOrderDelete($user));
        // Fire the UserDeleted event to delete user in the xml file
        event(new UserDelete($user));

        //call repository class to delete the class
        $this->userRepositoryInterface->delete($user);

        return redirect('/customer')->with('successUpdate', true);
    }

    public function deleteStaff($id)
    {
        $user = User::find($id);

        //create a log
        $adminLog = new Log();
        $adminLog->old_data = $user->toJson();
        $adminLog->row_id = $user->id;
        $adminLog->user_id = auth()->user()->id;
        $adminLog->user_name = auth()->user()->name;
        $adminLog->action = 'Deleted Staff/Admin ';
        $adminLog->table_name = 'Users';
        $adminLog->save();

        //call repository class to delete the class
        $this->userRepositoryInterface->delete($user);
        return redirect('/staff')->with('successUpdate', true);
    }
    public function createStaff()
    {
        return view('staff.create', [
            'roles' => Role::where('id', 2)->orWhere('id', '=', 1)->get()
        ]);
    }
    public function storeStaff(Request $request)
    {
        //validation
        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'phone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'role' => 'required',
            'password' => ['required', 'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/', 'confirmed'],

        ], [
            'password.regex'    => '*Minimum eight characters, at least one letter, one number and one special character',

        ]);



        //uisng the user repository interface to create the data
        $user = $this->userRepositoryInterface->create($data);
        //create the unqiue bearer token as the personal access api token
        $this->userRepositoryInterface->generatePrivateToken($user);

        //create a log
        $adminLog = new Log();
        $adminLog->user_id = auth()->user()->id;
        $adminLog->user_name = auth()->user()->name;
        $adminLog->action = 'Created Staff/Admin ';
        $adminLog->table_name = 'Users';
        $adminLog->row_id = $user->id;
        $adminLog->new_data = $user->toJson();

        $adminLog->save();

        return redirect('/staff')->with('successUpdate', $user);
    }


    //show out customer report
    public function showCustReport()
    {

        $xml = new DOMDocument();
        $xml->load(public_path('../app/XML/user/userOrder.xml'));
        $xsl = new DOMDocument();
        $xsl->load(public_path('../app/XML/user/userOrder.xsl'));
        $proc = new XSLTProcessor();
        $proc->importStylesheet($xsl);

        $html = $proc->transformToXML($xml);
        return response($html)->header('Content-Type', 'text/html');
        //list out for staff and admin


    }
    //show out customer report
    public function showCustOrderDetail($user_id)
    {
        $xml = new DOMDocument();
        $xml->load(public_path('../app/XML/user/userOrder.xml'));
        // Create XPath object
        $xpath = new DOMXPath($xml);
        // Calculate total quantity ordered and total sell price sold for a particular user
        $totalQuantity = $xpath->evaluate('sum(//user[@id=' . $user_id . ']/ordered/meal/quantity)');

        $totalPrice = $xpath->evaluate('sum(//user[@id=' . $user_id . ']/ordered/meal/totalprice)');
        //open xsl file
        $xsl = new DOMDocument();
        $xsl->load(public_path('../app/XML/user/userOrderDetail.xsl'));
        $proc = new XSLTProcessor();
        $proc->importStylesheet($xsl);
        // Set parameters
        $proc->setParameter('', 'user_id', $user_id); // 
        $proc->setParameter('', 'totalQuantity', $totalQuantity);
        $proc->setParameter('', 'totalPrice', $totalPrice);
        $html = $proc->transformToXML($xml);
        return response($html)->header('Content-Type', 'text/html');
    }

    //check user password 

    public function checkPassword($password)
    {

        $result = Hash::check($password, auth()->user()->password);

       
        if ($result == false) {
            return redirect('/customer')->with('invalidPassword', true);
        }
        return response()->json(['result' => $result]);
    }
    //show dashboard Form
    public function dashboard()
    {

        return view('profile.dashboard');
    }
    //show Regitser/Create Form
    public function create()
    {

        return view('auth.register');
    }
    // Show Login Form
    public function login()
    {
        return view('auth.login');
    }
    public function adminLogin()
    {
        return view('auth.adminLogin');
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
    public function nonAuthenticate()
    {
        return view('auth.nonAuthenticate');
    }


    public function showPoint()
    {
        return view('profile.memberPoint');
    }

    public function showDashboard()
    {
        $today = Carbon::today();
        $customerCount = User::where('role', 0)->filter(request(['search']))->count();

        $customerOrderCount = MealOrderDetail::whereHas('Order', function ($query) use ($today) {
            $query->whereDate('order_date', $today);
        })->count();

        $commentCount = MealOrderDetail::whereNotNull('rating_comment')->count();

        $todayEarnings = MealOrderDetail::whereHas('Order', function ($query) use ($today) {
            $query->whereDate('order_date', $today);
        })->get();

        $earning = 0;
        foreach ($todayEarnings as $mealOrderDetail) {
            $earning += $mealOrderDetail->meal->meal_price * $mealOrderDetail->order_quantity;
        }

        $customerOrders = MealOrderDetail::whereHas('Order', function ($query) use ($today) {
            $query->whereDate('order_date', $today);
        })->get();

        $customers = User::where('role', 0)->filter(request(['search']))->get();

        return view('staff.dashboard', [
            'customerCount' => $customerCount,
            'customerOrderCount' => $customerOrderCount,
            'commentCount' => $commentCount,
            'earning' => $earning,
            'customerOrders' => $customerOrders,
            'customers' => $customers
        ]);
    }



    public function createCustomer()
    {
        return view('user.create');
    }

    //return all customer
    public function listOutCustomers()
    {
        //list out only customer
        return view('user.index', [
            'users' => User::where('role', 0)->filter(request(['search']))->get()
        ]);
    }
    //return all user
    public function listOutStaff()
    {
        //list out for staff and admin
        return view('staff.index', [
            'users' => User::whereIn('role', [1, 2])->where('id', '!=', auth()->user()->id)->filter(request(['search']))->get(),
            'roles' => Role::all()
        ]);
    }
}
