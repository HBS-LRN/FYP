<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
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
    public function store(Request $request)
    {

        //validation
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'qty' => 'required',
            'image' => 'required',
        ]);


        return Voucher::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'qty' => $request->qty,
            'image' => $request->image


        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Voucher::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $voucher = Voucher::find($id);
        $voucher->update($request->all());
        return $voucher;
    }

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

    public function search($name)
    {
        return Voucher::where('name', 'like', '%' . $name . '%')->get();
    }

    public function showVoucher()
    {

        return view('webservices.voucherRedeem');
        $response = Http::get('https://api.jsonbin.io/v3/b/63fe2217ebd26539d086e978');
    
        $jsonData = $response->json();
          
        dd($jsonData);

        // $response = Http::get('http://localhost:8000/api/vouchers');
        // dd($response);
        $client = new Client(['base_uri' => 'http://localhost:8000/api/',
        'timeout'  => 2.0,'connect_timeout' => 5,'read_timeout' => 2,]);

        try {
            
            $response = $client->request('GET', 'vouchers');
            
            dd($response);
           
            $data = json_decode($response->getBody(), true);
            dd($data);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $response = $e->getResponse();
                $statusCode = $response->getStatusCode();
                $reasonPhrase = $response->getReasonPhrase();
                dd("Error $statusCode: $reasonPhrase");
            } else {
                dd('Error: ' . $e->getMessage());
            }
        }
       
      
        $data = json_decode($response->getBody(), true);

        dd($data);
        return view('webservices.voucher', [


            'grandVouchers' => $data

        ]);
      
    }
}
