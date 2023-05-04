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
use App\Http\Controllers\FreeGiftController;
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




Route::group(['middleware' => 'isAdmin'], function () {

   //protected route!!!!!!!!!!!
   //only admin access path!!!!!!!!!




   //Show inventory report
   Route::get('/inventoryReport', [MealController::class, 'showInventoryReport']);

   //Show inventory detail report
   Route::get('/inventoryReportDetail/{id}', [MealController::class, 'showInventoryReportDetail']);

   //Show graph report(xml)
   Route::get('/graphReport/xml', [CategoryController::class, 'generateXml']); /* showGraphReport  */

   //Show graph report
   Route::get('/graphReport', [CategoryController::class, 'showGraphReport']); /* showGraphReport  */

   //Show Customer List 
   Route::get('/customerReport', [UserController::class, 'showCustReport']);

   //Show Customer List 
   Route::get('/customer', [UserController::class, 'listOutCustomers']);

   //Show Customer List 
   Route::get('/customer/create', [UserController::class, 'createCustomer']);
   Route::post('/customer/store', [UserController::class, 'storeCustomer']);
   //edit user data
   Route::get('/customer/edit/{id}', [UserController::class, 'editCustomer']);
   Route::put('/customer/edit/{id}', [UserController::class, 'updateCustomer']);
   Route::get('/customer/delete/{id}', [UserController::class, 'deleteCustomer']);


   //Show Staff List 
   Route::get('/staff', [UserController::class, 'listOutStaff']);

   //Show Staff List 
   Route::get('/staff/create', [UserController::class, 'createStaff']);
   Route::post('/staff/store', [UserController::class, 'storeStaff']);
   //edit user data
   Route::get('/staff/edit/{id}', [UserController::class, 'editStaff']);
   Route::put('/staff/edit/{id}', [UserController::class, 'updateStaff']);
   Route::get('/staff/delete/{id}', [UserController::class, 'deleteStaff']);
});


Route::group(['middleware' => 'isStaff'], function () {
 
   //protected route!!!!
   //only staff able to access 



   // Show admin meal list 
   Route::get('/meal/adshow', [MealController::class, 'adshow']); /* adshow */  // if xml page is 'showListOfMeals'

   // Show Meal Create Form
   Route::get('/meal/xml', [MealController::class, 'generateXml']);

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

   //show meal inventory page
   Route::get('/showInventory', [MealController::class, 'inventory']);

   //show edit meal inventory page
   Route::get('/editInventory/{id}', [MealController::class, 'showEditInventory']);

   //update inventory
   Route::post('/updateInventory/{id}', [MealController::class, 'updateInventory']);

   //show meal rating page
   Route::get('/mealRating', [OrderController::class, 'showMealRating']);

   //show edit meal rating page 
   Route::get('/mealRating/edit/{id}', [OrderController::class, 'showEditMealRating']);

   //update meal rating (reply comment)
   Route::put('/mealRating/update', [OrderController::class, 'updateMealRating']);


   //Show user order List 
   Route::get('/userOrderDetail/{id}', [UserController::class, 'showCustOrderDetail']);

   //check authorized password
   Route::get('/checkPassword/{id}', [UserController::class, 'checkPassword']);
});
//proctected route

Route::middleware(['middleware' => 'RequireLogin'])->middleware(['middleware' => 'auth'])->group(function () {




   //protected route!!!!!!!!!!!
   //only authenticated access path!!!!!!!!!

   // Store shopping cart Data
   Route::post('/shoppingCart', [ShoppingCartController::class, 'store']);

   //show shopping cart
   Route::get('/shoppingCart', [ShoppingCartController::class, 'index']);

   //delete shopping cart
   Route::get('/deleteShoppingCart/{id}', [ShoppingCartController::class, 'delete']);

   //show customer purchase status
   Route::get('/checkout', [ShoppingCartController::class, 'checkout']);
   Route::post('/redirectToPay', [ShoppingCartController::class, 'redirectToPay']);
   // Update User password
   Route::get('/usersPass', [Usercontroller::class, 'show']);

   // Chnage User password
   Route::post('/users/changePass', [Usercontroller::class, 'updatePassword']);

   //edit customer profile
   Route::post('/profile/edit', [UserController::class, 'update']);
   // Log User Out
   Route::get('/logout', [UserController::class, 'logout']);
   // show customer account


   Route::get('/dashboard', [UserController::class, 'dashboard']);

   // show customer account

   Route::get('/profile', [UserController::class, 'profile']);

   // All Address
   Route::get('/address', [AddressController::class, 'index'])->name('address');
   // Create New adress
   Route::post('/address/store', [AddressController::class, 'store']);
   // Show Create Form
   Route::get('/address/create', [AddressController::class, 'create']);

   // Show Create Form
   Route::get('/addresseEdit/{id}', [AddressController::class, 'edit']);

   // Update address
   Route::put('/address/{id}', [AddressController::class, 'update']);
   // delete address
   Route::get('/address/{id}/delete', [AddressController::class, 'delete']);
   // Update address as set as current address
   Route::put('/address/{id}/update', [AddressController::class, 'updateSetAsCurrent']);




   //show customer purchase status
   Route::get('/purchase', [OrderController::class, 'show']);
});


  // Create New User
  Route::post('/users', [UserController::class, 'store']);
  Route::post('/register', [UserController::class, 'store']);
Route::get('/category/create', [CategoryController::class, 'create']);
// Store category Data
Route::post('/category/store', [CategoryController::class, 'store']);
// Show All category Data
Route::get('/category/show', [CategoryController::class, 'show']);

Route::get('/accessDenied', [UserController::class, 'accessDenied']);
Route::get('/nonAuthenticated', [UserController::class, 'nonAuthenticate']);


//search meal
Route::get('/search', [MealController::class, 'search']);

// Store All Meal Data
Route::get('/meal/{meal}', [MealController::class, 'index']);

//show pop up meal with route
Route::get('/mealpopups/{id}', [MealController::class, 'mealPopUp'])->name('popUpMeal');

//show pop up meal
Route::get('/mealpopup/{meal}', [MealController::class, 'show']);

//log
Route::get('/log',[MealController::class, 'log']);


//show list of orders
Route::get('/showOrders', [OrderController::class, 'showOrders']);

//show order's order details
Route::get('/orderDetails/show/{id}', [OrderController::class, 'showOrderDetails']);
Route::get('/orderDetails/show/{id}', [OrderController::class, 'showOrderDetails'])->name('orderDetails.show');

//Change order and order details to delivering status
Route::get('/order/updateDelivering/{id}', [OrderController::class, 'updateDeliveryClick'])->name('order.Delivering');

//Change order and order details to completed status
Route::get('/order/updateCompleted/{id}', [OrderController::class, 'updateCompletedClick'])->name('order.Completed');

// Show Login Form
Route::get('/login', [UserController::class, 'login'])->name('login');

Route::post('/login', [UserController::class, 'authenticate']);

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










// Route::group(['middleware' => ['transaction.limit']], function () {
   
// });
Route::get('/publicBankLogin', function () {
   return view('payment.publicBankLogin');
});
//show customer publicBank login page
Route::post('/purchase/publicBankLogin/checkID', [OrderController::class, 'publicBankCheckUserID'])->middleware('transaction.limit');


Route::get('/publicBank/password', function () {
   return view('payment.publicBankPassword');
});
Route::post('/purchase/publicBankLogin/passwordCheck', [OrderController::class, 'publicBankCheckPassword']);
Route::get('/publicBank/PayConfirmSession', function () {
   return view('payment.publicBankConfirmSession');
});
Route::get("/publicBank/PaySuccess",function(){
   return view('payment.publicBankPaySuccessful');
});
Route::post(
   '/publicBank/checkPAC',
   [OrderController::class, 'publicCheckPAC']
);
Route::post(
   '/publicBank/continue',function(){
      return redirect('purchase');
   }
);
//show list of order(xml)
Route::get('/listOfOrder/xml', [OrderController::class, 'generateXml']);

//show list of customer
Route::get('/listOfOrder', [OrderController::class, 'showListOfOrder']);

//update customer comment 
Route::post('/comment', [OrderController::class, 'comment']);


// web service
Route::get('/memberPoint', [UserController::class, 'showPoint'])->middleware('auth');


//web servcie
Route::get('/voucher', [VoucherController::class, 'showAllVouchers'])->middleware('auth');
//web servcie
Route::get('/voucher/{id}', [VoucherController::class, 'store']);
Route::post('/update/voucher', [VoucherController::class, 'update']);

Route::get('/webServiceRegister', [VoucherController::class, 'storeWebServiceClient']);

Route::get('/gift', [GiftController::class, 'index']);
Route::post('/gift/store', [GiftController::class, 'store']);

//web service (free gift)
Route::get('/freeGiftInfo', [FreeGiftController::class, 'index']);

// Show Meal Create Form
Route::get('/staffDashboard', [UserController::class, 'showDashboard']);

Route::get("/contactUs", function () {
   return view("static.contactus");
});

Route::get("/aboutUs", function () {
   return view("static.aboutus");
});
Route::get("/FAQ", function () {
   return view("static.FAQ");
});

 //testing custom error page
//  Route::get("/500", function(){
//    return view('errors.500', [
//       'code' => '500',
//       'message'=> ''
//   ]);
// });
