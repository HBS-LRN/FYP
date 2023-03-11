<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\State;
use GuzzleHttp\Client;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use GuzzleHttp\Exception\RequestException;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Voucher::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($voucherID)
    {

        $user = User::find(auth()->user()->id);


        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout'  => 2.0,
        ]);

        $response = $client->get('users', [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ],
        ]);
        $webServiceClients = json_decode($response->getBody(), true);



        $registeredClient = false;
        foreach ($webServiceClients as $webServiceClient) {

            if ($webServiceClient['email'] == auth()->user()->email) {
                $registeredClient = true;
            }
        }


        if ($registeredClient) {




            $response = $client->post('voucherDetail', [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . auth()->user()->token,
                ],
                'json' => [
                    'user_email' => auth()->user()->email,
                    'voucher_id' => $voucherID,
                ],
            ]);

            $body = $response->getBody();
            return redirect()->back();
        } else {

            return redirect()->back()->with('redeemUnsuccessful', true);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function show()
    {

        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);

        try {
            $response = $client->request('GET', 'vouchers');
            $response = $client->get('vouchers', [

                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . auth()->user()->token,
                ],
            ]);
            $vouchers = json_decode($response->getBody(), true);



            $response = $client->get('voucherDetail', [

                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . auth()->user()->token,
                ]


            ]);

            $claimVouchers = json_decode($response->getBody(), true);


            return view('webservices.voucherRedeem', ['vouchers' => $vouchers, 'claimVouchers' => $claimVouchers]);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $response = $e->getResponse();
            } else {
                dd('Error: ' . $e->getMessage());
            }
        }
    }





    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Voucher::destroy($id);
    }

    public function update(Request $request)
    {
        $voucherID = $request->input('voucher');




        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout'  => 2.0,
        ]);


        $response = $client->get('vouchers/' . $voucherID, [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ],
        ]);
        $selectedVoucher = json_decode($response->getBody(), true);




        //use get method to get the current used voucher percentage to minus the price
        $promoteDeliveryFee = $this->findDeliveryFee() - ($this->findDeliveryFee() *  $selectedVoucher['percentage'] / 100);

        //update voucher that user own's detail
        $this->updateUserVoucherDetail($voucherID);
        Session::put('promoteDeliveryFee',  number_format((float)$promoteDeliveryFee, 2, '.', ''));
        return redirect()->back()->with('successfullyPromoteUpdate', true);
    }


    public function updateUserVoucherDetail($voucherID)
    {



        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);
        //get vouchers details api through webservices through the bearer token 
        $response = $client->get('voucherDetail', [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]


        ]);

        $claimedVouchers = json_decode($response->getBody(), true);


        foreach ($claimedVouchers as $claimedVoucher) {
            if ($claimedVoucher['user_email'] == auth()->user()->email && $claimedVoucher['voucher_id'] == $voucherID) {

                //update voucher detail to current used
                $response = $client->put('voucherDetail/' . $claimedVoucher['id'], [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Bearer ' . auth()->user()->token,
                    ],
                    'json' => [
                        'current_used' => 'Y'
                    ],
                ]);


                Session::put('voucherID', $claimedVoucher['voucher_id']);
                Session::put('voucher', $claimedVoucher['id']);
            } else if ($claimedVoucher['user_email'] == auth()->user()->email) {
                //update voucher detail to not current used
                $response = $client->put('voucherDetail/' . $claimedVoucher['id'], [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Bearer ' . auth()->user()->token,
                    ],
                    'json' => [
                        'current_used' => 'N'
                    ],
                ]);
            }
            $body = $response->getBody();
        }
    }

    public function storeWebServiceClient()
    {

        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout'  => 2.0,
        ]);





        $response = $client->post('users', [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ],
            'json' => [
                'email' => auth()->user()->email,
                'name' => auth()->user()->name,
                'password' => auth()->user()->password,
            ],
        ]);


        return redirect()->back()->with('successfulStoreClient', true);
    }

    public function findDeliveryFee()
    {


        $user = auth()->user();
        $states = State::all();
        $addresses = $user->addresses;
        $addressFee = 0;
        foreach ($addresses as $address) {
            if ($address->active_flag == 'T') {

                foreach ($states as $state) {
                    if ($address->area == $state->state_name)
                        $addressFee = $state->delivery_fee;
                }
            }
        }
        return $addressFee;
    }
}
