<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Repository\AddressRepositoryInterface;
use App\Http\Requests\UpdateAddressRequest;
use App\Http\Requests\StoreAddressRequest;
use App\Models\Address;
use App\Models\State;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $addressRepositoryInterface;

    public function __construct(AddressRepositoryInterface $addressRepositoryInterface)
    {
        $this->addressRepositoryInterface = $addressRepositoryInterface;
    }
    public function index($id)
    {

        /** @var \App\Models\User $user */
        $user = User::find($id);
        return response()->json($user->addresses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreAddressRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAddressRequest $request)
    {
        $data = $request->validated();
        $data['active_flag'] = "N";

        //call address repository interface to create data 
        $address = $this->addressRepositoryInterface->create($data);
        return response()->json($address);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {


        /** @var \App\Models\Address $address */
        $address = Address::find($id);


        // Check if the address exists
        if (!$address) {
            return response(['message' => 'Address not found'], 404);
        }

        return response()->json($address);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateAddressRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAddressRequest $request, $id)
    {


        $data = $request->validated();

        /** @var \App\Models\Address $address */
        $address = Address::find($id);
        // Check if the address exists
        if (!$address) {
            return response(['message' => 'Address not found'], 404);
        }

        //call address repository interface to update data 
        $this->addressRepositoryInterface->update($address, $data);
        return response()->json($address);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /** @var \App\Models\Address $address */
        $address = Address::find($id);

        //call address repository interface to delete data 
        $this->addressRepositoryInterface->delete($address);

        return response("", 204);
    }

    public function updateSetAsCurrent(Request $request)
    {

        $data = $request->all();

        /** @var \App\Models\User $user */
        $user = User::find($data['user_id']);

        //get all user address
        $allAddress = $user->addresses;


        foreach ($allAddress as $updateAddress) {

            DB::table('addresses')
                ->where('id', $updateAddress->id)
                ->update(['active_flag' => 'N']);
        }

        //turn the particular address to current
        $address = Address::find($data['address_id']);
        $address['active_flag'] = 'T';
        $address->update();

        /** @var \App\Models\Address $addresses */
        $addresses = Address::where('user_id', $user->id)->get();

        return response()->json($addresses);
    }
    public function getStates()
    {


        /** @var \App\Models\State $state */
        $state = State::all();



        return response()->json($state);
    }



    public function getCurrentAddress($id)
    {
        /** @var \App\Models\User $user */
        $user = User::find($id);

        // Retrieve the user's addresses where the active_flag is 'T'
        $currentAddress = $user->addresses->where('active_flag', 'T')->first();


        return response()->json($currentAddress);
       
    }
}
