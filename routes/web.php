<?php

use App\Models\Voucher;
use App\Models\Category;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\ShoppingCart;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MealController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShoppingCartController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




//home
Route::get('/', [CategoryController::class, 'index']);




Route::get('/category/create', [CategoryController::class, 'create']);


// Store category Data
Route::post('/category/store', [CategoryController::class, 'store']);



// Show Meal Create Form
Route::get('/meal/create', [MealController::class, 'create']);

// Store Meal Data
Route::post('/meal/store', [MealController::class, 'store']);


// Show All category Data
Route::get('/category/show', [CategoryController::class, 'show']);
// show category Data
Route::get('/accessDenied', [UserController::class, 'accessDenied']);

//search meal
Route::get('/search', [MealController::class, 'search']);


// Store All Meal Data
Route::get('/meal/{meal}', [MealController::class, 'index']);

//show pop up meal with route
Route::get('/mealpopups/{id}', [MealController::class, 'mealPopUp'])->name('popUpMeal');

//show pop up meal
Route::get('/mealpopup/{meal}', [MealController::class, 'show']);

// Store shopping cart Data
Route::post('/shoppingCart', [ShoppingCartController::class, 'store']);

//show shopping cart
Route::get('/shoppingCart', [ShoppingCartController::class, 'index'])->middleware('auth');

//delete shopping cart
Route::get('/deleteShoppingCart/{id}', [ShoppingCartController::class, 'delete'])->middleware('auth');

//show customer purchase status
Route::get('/checkout', [ShoppingCartController::class, 'checkout']);
Route::post('/redirectToPay', [ShoppingCartController::class, 'redirectToPay']);

// Show Login Form
Route::get('/login', [UserController::class, 'login'])->name('login');



// Show Login Form
Route::get('/loginRequest', [UserController::class, 'requestLogin'])->name('loginRequest');

// Log In User
Route::post('/users/authenticate', [UserController::class, 'authenticate']);

Route::get('/password/forget', [UserController::class, 'showForgetForm'])->name('user.password.form');

Route::post('/password/forget', [UserController::class, 'sendResetLink']);

Route::get('/password/{token}', [UserController::class, 'showResetForm'])->name('user.reset.password.form');
Route::post('/password/reset', [UserController::class, 'resetPassword']);

// Show Register/Create Form
Route::get('/register', [UserController::class, 'create']);



// Update User password
Route::get('/usersPass', [Usercontroller::class, 'show'])->middleware('auth');

// Chnage User password
Route::post('/users/changePass', [Usercontroller::class, 'updatePassword'])->middleware('auth');

// Create New User
Route::post('/users', [UserController::class, 'store']);
//edit customer profile
Route::post('/profile/edit', [UserController::class, 'update'])->middleware('auth');
// Log User Out
Route::get('/logout', [UserController::class, 'logout'])->middleware('auth');
// show customer account
Route::get('/dashboard', [UserController::class, 'dashboard'])->middleware('auth');

// show customer account
Route::get('/profile', [UserController::class, 'profile'])->middleware('auth');

// All Address
Route::get('/address', [AddressController::class, 'index'])->name('address')->middleware('auth');
// Create New adress
Route::post('/address/store', [AddressController::class, 'store'])->middleware('auth');
// Show Create Form
Route::get('/address/create', [AddressController::class, 'create'])->middleware('auth');

// Show Create Form
Route::get('/addresseEdit/{id}', [AddressController::class, 'edit'])->middleware('auth');

// Update address
Route::put('/address/{id}', [AddressController::class, 'update'])->middleware('auth');
// delete address
Route::get('/address/{id}/delete', [AddressController::class, 'delete'])->middleware('auth');
// Update address as set as current address
Route::put('/address/{id}/update', [AddressController::class, 'updateSetAsCurrent'])->middleware('auth');

// delete address
Route::get('/memberPoint', [UserController::class, 'showPoint'])->middleware('auth');


//show customer purchase status
Route::get('/purchase', [OrderController::class, 'show']);

//update customer comment 
Route::post('/comment', [OrderController::class, 'comment']);


//web servcie
Route::get('/voucher', [VoucherController::class, 'showVoucher']);


Route::get('/invoice-pdf', function () {
    // return view('invoice-pdf');

    $pdf = Pdf::loadView('invoice-pdf')->setOptions(['defaultFont' => 'sans-serif']);;
    return $pdf->download('invoice-pdf.pdf');
});



// Show Meal Create Form
Route::get('/staffDashboard', [UserController::class, 'showDashboard']);