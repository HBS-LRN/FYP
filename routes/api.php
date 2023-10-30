<?php

use App\Http\Controllers\AddressController as ControllersAddressController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AllergicController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\ReservationController;
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

});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// ingredient 
Route::get('/ingredients', [IngredientController::class, 'index']);
Route::get('/ingredients/{id}', [IngredientController::class, 'show']);
Route::post('/ingredients', [IngredientController::class, 'store']);
Route::put('/ingredients/{id}', [IngredientController::class, 'update']);
Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy']);


Route::put('/userBMI/{id}', [UserController::class, 'updateBMI']);
Route::post('/verifyEmail', [AuthController::class, 'verifyEmail']);
Route::post('/resetPassword', [UserController::class, 'resetPassword']);
Route::post('/checkExpire', [UserController::class, 'checkExpire']);
