<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\State;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Session;
use GuzzleHttp\Exception\RequestException;

class GiftController extends Controller
{

    public function index()
    {


        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);

        try {

            $response = $client->get('memberGift', [

                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . auth()->user()->token,
                ],
            ]);

            $memberGifts = json_decode($response->getBody(), true);

            $giftUnderPoint = array();
            foreach ($memberGifts as $memberGift) {
                //only push member gift that are under the user member point in order to let them to redeem
                if (auth()->user()->point >= $memberGift['memberPoint_cost']) {
                    array_push($giftUnderPoint, $memberGift);
                }
            }

            return view('webservices.memberGiftRedeem', ['memberGifts' => $giftUnderPoint]);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $response = $e->getResponse();
            } else {
                dd('Error: ' . $e->getMessage());
            }
        }
    }
    public function store(Request $request)
    {
        $giftID = $request->itemID;
        $giftQty = $request->quantity;
        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout'  => 2.0,
        ]);


        //get the particular gift that member selected
        $response = $client->get('memberGift/' . $giftID, [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ],
        ]);


        $selectedGift = json_decode($response->getBody(), true);



        //return back if user do not have enough member point to check out
        if (auth()->user()->point < $selectedGift['memberPoint_cost'] * $giftQty) {
            return redirect()->back()->with('pointNotEnough', true);
        }
        //update the gift quantity left 
        $response = $client->put('memberGift/' . $giftID, [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ],
            'json' => [
                'product_qty' => $selectedGift['product_qty'] - $giftQty
            ],
        ]);


        //find user
        $user = User::find(auth()->user()->id);
        //update membership point 
        $user->point -= $selectedGift['memberPoint_cost'] * $giftQty;
        $user->update();


        $data = [
            'selectedGift' => $selectedGift,
            'deliveryAddress' => $this->findUserDeliveryAddress(),
            'quantity' => $giftQty
        ];






        $pdf = Pdf::loadView('webservices.receipt-pdf', $data)->setOptions(['defaultFont' => 'sans-serif']);
        return $pdf->download('receipt-pdf.pdf');
    }


    public function findUserDeliveryAddress()
    {


        $user = auth()->user();

        $addresses = $user->addresses;
        foreach ($addresses as $address) {
            if ($address->active_flag == 'T') {

                return $address;
            }
        }
    }
}
