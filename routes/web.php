<?php

use App\Models\Voucher;
use App\Models\Category;
use App\Models\ShoppingCart;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GiftController;
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




Route::get('/category/create', [CategoryController::class, 'create'])->middleware('isAdmin');;


// Store category Data
Route::post('/category/store', [CategoryController::class, 'store']);

 // Show admin meal list 
 Route::get('/meal/adshow', [MealController::class, 'adshow']);


// Show Meal Create Form
Route::get('/meal/create', [MealController::class, 'create']);

// Store Meal Data
Route::post('/meal/store', [MealController::class, 'store']);

 // Show update meal form
Route::get('/meal/upshow/{id}', [MealController::class, 'upshow']);

 //Update meal
Route::post('/mealupdate/{id}', [MealController::class, 'update']);

//Delete meal
Route::get('/deleteMeal/{id}', [MealController::class, 'delete']);

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

//show meal inventory page
Route::get('/showInventory', [MealController::class, 'inventory']);

//show edit meal inventory page
Route::get('/editInventory/{id}', [MealController::class, 'showEditInventory']);

//update inventory
Route::post('/updateInventory/{id}', [MealController::class, 'updateInventory']);

//show meal rating page
Route::get('/mealRating', [OrderController::class, 'showMealRating']);

//show edit meal rating page 
Route::get('/editMealRating/{id}', [OrderController::class, 'showEditMealRating']);

// Store shopping cart Data
Route::post('/shoppingCart', [ShoppingCartController::class, 'store']);

//show shopping cart
Route::get('/shoppingCart', [ShoppingCartController::class, 'index'])->middleware('auth');

//delete shopping cart
Route::get('/deleteShoppingCart/{id}', [ShoppingCartController::class, 'delete'])->middleware('auth');

//show customer purchase status
Route::get('/checkout', [ShoppingCartController::class, 'checkout'])->middleware('auth');
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




//show customer purchase status
Route::get('/purchase', [OrderController::class, 'show'])->middleware('auth');;

//update customer comment 
Route::post('/comment', [OrderController::class, 'comment']);


// web service
Route::get('/memberPoint', [UserController::class, 'showPoint'])->middleware('auth');
//web servcie
Route::get('/voucher', [VoucherController::class, 'show'])->middleware('auth');
//web servcie
Route::get('/voucher/{id}', [VoucherController::class, 'store']);
Route::post('/update/voucher', [VoucherController::class, 'update']);

Route::get('/webServiceRegister', [VoucherController::class, 'storeWebServiceClient']);

Route::get('/gift', [GiftController::class, 'index']);
Route::post('/gift/store', [GiftController::class, 'store']);

   

// Show Meal Create Form
Route::get('/staffDashboard', [UserController::class, 'showDashboard']);

Route::get("/contactUs", function(){
    return view("static.contactus");
 });

 Route::get("/aboutUs", function(){
    return view("static.aboutus");
 });
 Route::get("/FAQ", function(){
    return view("static.FAQ");
 });
//Show User List 
 Route::get('/customer', [UserController::class, 'listOutCustomers']);

 //edit user data
 Route::get('/customer/edit/{id}', [UserController::class, 'editCustomer']);
 Route::PUT('/customer/edit/{id}', [UserController::class, 'updateCustomer']);



 