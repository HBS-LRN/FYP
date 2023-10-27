<?php

use App\Http\Controllers\Api\AllergicController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
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




Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Route::get('/user/{id}', [AuthController::class, 'authenticateUser']);
    Route::get('/shoppingCart/{id}', [AuthController::class, 'shoppingCart']);
    Route::apiResource('/users', UserController::class);
});


// Route::middleware('auth:sanctum')->apiResource('/users', UserController::class);
Route::middleware('auth:sanctum')->get('/user/{id}',[AuthController::class, 'authenticateUser']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('/allergic', AllergicController::class);
Route::put('/userBMI/{id}', [UserController::class, 'updateBMI']);
Route::post('/verifyEmail', [AuthController::class, 'verifyEmail']);
Route::post('/resetPassword', [UserController::class, 'resetPassword']);
Route::post('/checkExpire', [UserController::class, 'checkExpire']);