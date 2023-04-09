<?php

namespace App\Listeners;

use DOMXPath;
use DOMDocument;
use App\Events\UserDelete;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class DeleteUserXML
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
     * @param  \App\Events\UserDelete  $event
     * @return void
     */
    public function handle(UserDelete $event)
    {

        $user = $event->user;
        // Load the XML file
        $xml = new DOMDocument();
        $xml->load(public_path('../app/XML/user/userOrder.xml'));

        // Find the user node to delete from the XML file based on the user ID
        $xpath = new DOMXPath($xml);
        $node = $xpath->query("/users/user[@id='$user->id']")->item(0);

        if ($node) {
            // Delete the user node from the XML file
            $node->parentNode->removeChild($node);

            $xml->formatOutput = true;
            // Save the updated XML file
            $xml->save(public_path('../app/XML/user/userOrder.xml'));
        }
    }
}
