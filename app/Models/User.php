<?php

namespace App\Models;

use App\Models\Meal;
use App\Models\Order;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
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
    protected $fillable = [
        'name',
        'email',
        'password',
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




    public static function logout()
    {

        $user = User::find(auth()->user()->id);
        $user->session_id = null;
        $user->update();
        auth()->logout();
        session()->invalidate();
        //this one can write in the document
        session()->regenerateToken();
      
        
    }
    // Authenticate User
    public static function login(array $data)
    {



        if (auth()->attempt($data)) {
            //this one cna write in the document, refer to the lecture slide
            session()->regenerate();

            return true;
        }

        return false;
    }


    public function addresses()
    {

        return $this->hasMany(Address::class);
    }

    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'shopping_carts', 'user_id', 'meal_id')->withPivot('shopping_cart_qty', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }

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
