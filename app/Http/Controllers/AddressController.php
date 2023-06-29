<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\State;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repository\AddressRepositoryInterface;

class AddressController extends Controller
{


    private $addressRepositoryInterface;

    public function __construct(AddressRepositoryInterface $addressRepositoryInterface)
    {
        $this->addressRepositoryInterface = $addressRepositoryInterface;
    }

    public function index()
    {
        //return to the address index page to display all addresses belong to the particular user
        return view('address.index', ['addresses' =>  auth()->user()->addresses]);
    }

    public function create()
    {

        return view('address.create', ['areas' =>  State::all()]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([

            'address_username' => 'required',
            'address_userphone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'street' => 'required',
            'area' => 'required',
            'postcode' => 'required|digits:5'


        ], [
            'address_username.required'    => 'User name field is required',
            'address_userphone.required'    => 'User phone field is required',
            'postcode.regex'    => '5 digit for postcode only',
            'address_userphone.regex'    => 'please follow format xxx-xxxxxxxxx',
        ]);


        $data['user_id'] = auth()->id();
        $data['active_flag'] = "N";


        //call address repository interface to create data 
        $this->addressRepositoryInterface->create($data);
        return redirect('/address')->with('successfullyUpdate', true);
    }

    public function update(Request $request, $id)
    {
        

        $address = Address::find($id);
        $data['user_id'] = auth()->id();
        $data['active_flag'] = $address->active_flag;
        $data = $request->validate([

            'address_username' => 'required',
            'address_userphone' => ['required', 'regex:/^[0-9]{3}-[0-9]{7}/'],
            'street' => 'required',
            'area' => 'required',
            'postcode' => 'required|digits:5'


        ], [
            'address_username.required'    => 'User name field is required',
            'address_userphone.required'    => 'User phone field is required',
            'postcode.regex'    => '5 digit for postcode only',
            'address_userphone.regex'    => 'please follow format xxx-xxxxxxxxx',
        ]);

       

        //call address repository interface to update data 
        $this->addressRepositoryInterface->update($address,$data);
        return redirect('/address')->with('successfullyUpdate', true);
    }

    public function delete($id)
    {

        $address = Address::find($id);
        //call address repository interface to delete data 
        $this->addressRepositoryInterface->delete($address);
        return redirect('/address')->with('successfullyUpdate', true);
    }
    public function edit($id)
    {



        $address = Address::find($id);

        // Make sure logged in user is owner
        // Some time user will Try To access through the path which that is not belong to their address
        if ($address->user_id != auth()->id()) {
            abort(403, 'Unauthorized Action');
        }
        return view('address.edit', [
            'address' => $address,
            'areas' =>  State::all()
        ]);
    }

    public function updateSetAsCurrent($id)
    {

        $user = User::find(auth()->user()->id);
        //turn other to not current used
        $allAddress = $user->addresses;


        foreach ($allAddress as $updateAddress) {

            DB::table('addresses')
                ->where('id', $updateAddress->id)
                ->update(['active_flag' => 'N']);
        }

        //turn the particular address to current
        $address = Address::find($id);
        $address['active_flag'] = 'T';

        $address->update();
        return redirect('/address')->with('successfullyUpdate', true);
    }
}
