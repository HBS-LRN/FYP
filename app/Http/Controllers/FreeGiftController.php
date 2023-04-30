<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;


class FreeGiftController extends Controller
{
    
    public function index(){
        $client = new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'timeout' => 30, // Increase the timeout value to 30 seconds (default is 5 seconds)
        ]);


        //get all free gifts api through webservices through the bearer token 
        $response = $client->get('freegifts', [

            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . auth()->user()->token,
            ]

        ]);
        $freeGifts = json_decode($response->getBody(), true);

    
    return view('webservices.freeGiftInfo', [
        'freeGifts'=> $freeGifts
    ]);
    }
}
