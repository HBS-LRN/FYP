<?php

namespace App\Listeners;

use App\Models\User;
use DOMXPath;
use DOMDocument;
use App\Events\UserCreate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateUserXML
{
    /**
     * Create the event listener.
     *
     * @return void
     */

    public function __construct(User $user)
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UserCreate  $event
     * @return void
     */
    public function handle(UserCreate $event)
    {


        $user = $event->user;
        $xml = simplexml_load_file('../app/XML/user/userOrder.xml');

        $newUser  =  $xml->addChild('user');
        $newUser->addAttribute('id', $user->id);
        $newUser->addChild('name', $user->name);
        $newUser->addChild('email', $user->email);

        //write into file
        $xml->asXML(public_path('../app/XML/user/userOrder.xml'));

        //format xml file
        //format XML
        $xmlString = $xml->asXML();
        $dom = new DOMDocument;
        $dom->preserveWhiteSpace = false;
        $dom->loadXML($xmlString);
        $dom->formatOutput = true;
        $xmlStringFormatted = $dom->saveXML();
        file_put_contents('../app/XML/user/userOrder.xml', $xmlStringFormatted);
    }
}
