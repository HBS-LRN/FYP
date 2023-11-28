<?php

use App\Http\Controllers\AddressController as ControllersAddressController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AllergicController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DeliveryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\MealController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ContactUsController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\ShoppingCartController;
use App\Http\Controllers\Api\TableReservationController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::group(['middleware' => ['bearer_token']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Route::get('/user/{id}', [AuthController::class, 'authenticateUser']);
    Route::get('/shoppingCart/{id}', [AuthController::class, 'shoppingCart']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/addresses', AddressController::class);
    Route::post('/changePassword', [Usercontroller::class, 'updatePassword']);
    Route::get('/userAddress/{id}', [AddressController::class, 'index']);
    Route::post('/setCurrentUseAddress', [AddressController::class, 'updateSetAsCurrent']);
    Route::get('/state', [AddressController::class, 'getStates']);
    Route::apiResource('/allergic', AllergicController::class);
    Route::get('/tables', [TableReservationController::class, 'index']);
    Route::apiResource('/reservations', ReservationController::class);
    Route::post('/reservation', [ReservationController::class, 'specificReservation']);
    Route::get('/userReservations/{id}', [ReservationController::class, 'index']);
    Route::apiResource('/delivery', DeliveryController::class);
    Route::get('/userDelivery/{id}', [DeliveryController::class, 'index']);
    Route::get('/userOrder/{id}', [OrderController::class, 'userOrder']);
    Route::get('/userDelivery', [OrderController::class, 'userDelivery']);
    Route::put('/updateDeliveryStatus/{id}', [DeliveryController::class, 'updateDelivery']);
    Route::get('/completeDelivery/{id}', [OrderController::class, 'completedDelivery']);
    Route::apiResource('/shoppingCart', ShoppingCartController::class);
    Route::get('/currentAddress/{id}', [AddressController::class, 'getCurrentAddress']);
    Route::apiResource('/order', OrderController::class);
    Route::get('/showOrderStatus/{id}', [OrderController::class, 'showOrderStatus']);
    Route::post('/rating', [OrderController::class, 'storeRating']);
    Route::get('/userShoppingCart/{id}', [ShoppingCartController::class, 'show']);
    Route::get('/showRating', [MealController::class, 'showRating']);
    Route::get('/showRating/{id}', [MealController::class, 'showRatingForm']);
    Route::post('/submitRating', [MealController::class, 'submitRating']);
    Route::apiResource('/chat', ChatController::class);
    
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('/users', UserController::class);
Route::apiResource('/contactus', ContactUsController::class);

Route::get('/searchMeal/{search}',[MealController::class, 'searchMeal']);
// ingredient 
Route::get('/ingredients', [IngredientController::class, 'index']);
Route::get('/ingredients/{id}', [IngredientController::class, 'show']);
Route::post('/ingredients', [IngredientController::class, 'store']);
Route::put('/ingredients/{id}', [IngredientController::class, 'update']);
Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy']);

//category
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/category/{id}', [CategoryController::class, 'show']);
Route::post('/category', [CategoryController::class, 'store']);
Route::post('/updateCategory', [CategoryController::class, 'update']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

//ingredientMeal
// Route::get('/ingredientMeal',[IngredientMealController::class, 'index']);
// Route::post('/ingredientMeal', [IngredientMealController::class, 'store']);
// Route::put('/ingredientMeal/{id}', [IngredientMealController::class, 'update']);
// Route::delete('/ingredientMeal/{id}', [IngredientMealController::class, 'destroy']);

//meal
Route::get('/meal',[MealController::class, 'index']);
Route::get('/meal/{id}',[MealController::class, 'show']);
Route::post('/meal', [MealController::class, 'store']);
Route::post('/updateMeal/{id}', [MealController::class, 'update']);
Route::delete('/meal/{id}', [MealController::class, 'destroy']);
Route::get('/mealSearch',[MealController::class, 'adminSearchMeals']);
Route::get('/getMealIngredient/{id}',[MealController::class, 'getMealIngredient']);
Route::get('/getMealOrder/{id}',[MealController::class, 'getMealOrderDetail']);
Route::put('/mealOrderDetail/{id}', [MealController::class, 'updateMealOrderDetail']);

//admin customer
Route::post('/createUser', [UserController::class, 'createCustomer']);
Route::get('/getUser/{id}',[UserController::class, 'showUser']);
Route::post('/varifyAccount/{id}', [UserController::class, 'verifyAccount']);

//customer order
Route::get('/customerOrder', [OrderController::class, 'index']);
Route::get('/searchCustomerOrder', [OrderController::class, 'searchCustomerOrderList']);
Route::delete('/deleteCustomerOrders/{orderId}', [OrderController::class, 'deleteCustomerOrder']);
Route::get('/mealOrderDetails/{orderId}', [OrderController::class, 'showMealOrderDetails']);
Route::post('/updateOrderDetail/{orderId}', [OrderController::class, 'updateCustomerOrder']);

Route::get('/showCategoryMeal/{id}', [MealController::class, 'showCategoryMeal']);

Route::apiResource('/allergic', AllergicController::class);
Route::put('/userBMI/{id}', [UserController::class, 'updateBMI']);


Route::put('/userBMI/{id}', [UserController::class, 'updateBMI']);
Route::post('/verifyEmail', [AuthController::class, 'verifyEmail']);
Route::post('/resetPassword', [UserController::class, 'resetPassword']);
Route::post('/checkExpire', [UserController::class, 'checkExpire']);
