<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShoppingCart;
use App\Http\Requests\StoreShoppingCartRequest;
use App\Http\Requests\UpdateShoppingCartRequest;
use App\Models\User;
use App\Repository\ShoppingCartRepositoryInterface;

class ShoppingCartController extends Controller
{

    private $shoppingCartRepositoryInterface;

    public function __construct(ShoppingCartRepositoryInterface $shoppingCartRepositoryInterface)
    {
        $this->shoppingCartRepositoryInterface = $shoppingCartRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreShoppingCartRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreShoppingCartRequest $request)
    {

        $data = $request->validated();
        $shoppingCart = $this->shoppingCartRepositoryInterface->create($data);
        /** @var \App\Models\User $user */
        $user =  User::find($data['user_id']);

        return response()->json($user->meals->count());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        /** @var \App\Models\User $user */
        $user = User::find($id);
        return response()->json($user->meals);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateShoppingCartRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateShoppingCartRequest $request,  $id)
    {


        $data = $request->validated();

        /** @var \App\Models\ShoppingCart $shoppingCart */
        $shoppingCart = ShoppingCart::find($id);
        // Check if the address exists
        if (!$shoppingCart) {
            return response(['message' => 'Shopping Cart not found'], 404);
        }

        //call address repository interface to update data 
        $this->shoppingCartRepositoryInterface->update($shoppingCart, $data);
        return response()->json($shoppingCart);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ShoppingCart  $shoppingCart
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShoppingCart $shoppingCart)
    {

        //call address repository interface to delete data 
        $this->shoppingCartRepositoryInterface->delete($shoppingCart);
        return response("", 204);
    }
}
