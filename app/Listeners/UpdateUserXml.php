<?php

namespace App\Listeners;

use DOMXPath;
use DOMDocument;
use App\Events\UserUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateUserXML
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UserUpdate  $event
     * @return void
     */
    public function handle(UserUpdate $event)
    {
   
        $user = $event->user;
        $xml = new DOMDocument();
        $xml->load(public_path('../app/XML/user/userOrder.xml'));

        $xpath = new DOMXPath($xml);
        $node = $xpath->query("/users/user[@id='$user->id']")->item(0);

        foreach ($node->childNodes as $childNode) {
            if ($childNode->nodeName === 'name') {
                $childNode->nodeValue = $user->name;
            } elseif ($childNode->nodeName === 'email') {
                $childNode->nodeValue = $user->email;
            }
        }
        $xml->formatOutput = true;
        $xml->save(public_path('../app/XML/user/userOrder.xml'));

    }
}
