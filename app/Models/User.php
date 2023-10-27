<?php

namespace App\Models;

use App\Models\Meal;
use App\Models\Order;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    // data fields declaration
   

    protected $fillable = [
        'name',
        'email',
        'password',
        'gender',
        'image',
        'phone',
        'role',
        'birthdate',
        'session_id',
        'token'

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];




    public function scopeFilter($query, array $filters)
    {
      
        if ($filters['search'] ?? false) {
            $query->where('name', 'like', '%' . request('search') . '%')
                ->orWhere('email', 'like', '%' . request('search') . '%')
                ->orWhere('phone', 'like', '%' . request('search') . '%');
        }
    }

    public function updateDetail(User $user, $data)
    {
        $user->name =  $data['name'];
        $user->email =  $data['email'];
        $user->gender =  $data['gender'];
        $user->phone =  $data['phone'];
        $user->birthdate =  $data['birthdate'];
        $user->update();
        return $user;
    }

    public function register($data)
    {

        $user = new User();
        $user->name =  $data['name'];
        $user->email =  $data['email'];
        $user->password = bcrypt($data['password']);
        $user->save();
        return $user;
    }

    public function LimitLoginAttempt()
    {
        $this->ensureIsNotRateLimited();

        if (!Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey(), 300);

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    public static function informPasswordChange($email)
    {


        $body = " We Are Here To Inform Your Password Has Been Changed Recently Asscociated   
                with " . $email . "!";
        Mail::send('auth.inform-passwordChange', ['body' => $body], function ($message) use ($email) {

            $message->from('noreply@gmail.com', 'Grand Imperial');
            $message->to($email, 'Grand Imperial')
                ->subject('Password Changed!');
        });
    }

    public function logout()
    {
        $user = User::find(auth()->user()->id);
        $user->session_id = null;
        $user->update();
        auth()->logout();
        session()->invalidate();
        session()->regenerateToken();
    }



    // Authenticate User
    public  function login(array $data)
    {
        if (auth()->attempt($data)) {
            //SESSION REGENERATE
            session()->regenerate();

            return true;
        }
        return false;
    }


    //one user has many orders
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }

    //one user has many addresses
    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    //many to many relationship 
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'shopping_carts', 'user_id', 'meal_id')
            ->withPivot('shopping_cart_qty', 'id');
    }

    //one user has many order, one order has many order details
    public function orderDetail()
    {
        return $this->hasManyThrough(
            MealOrderDetail::class,
            Order::class,
            Meal::class,
            'user_id',
            'order_id',
            'meal_order_detail_id'
        );
    }
    
}
