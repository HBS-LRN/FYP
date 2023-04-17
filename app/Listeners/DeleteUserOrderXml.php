<?php

namespace App\Listeners;

use DOMXPath;
use DOMDocument;
use App\Models\Order;
use App\Events\UserOrderDelete;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class DeleteUserOrderXml
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
     * @param  \App\Events\UserOrderDelete  $event
     * @return void
     */
    public function handle(UserOrderDelete $event)
    {

        $user = $event->user;
        $orders = Order::where('user_id', $user->id)->get();
        

        // Load the XML file
        $xml = new DOMDocument();
        $xml->load(public_path('../app/XML/meal/graphReport.xml'));

        // Find the order node to delete order from the XML file based on the order ID
        $xpath = new DOMXPath($xml);
        
        foreach($orders as $order){
        $node = $xpath->query("/orders/order[@id='$order->id']")->item(0);
     
        if ($node) {
            // Delete the order node from the XML file
            $node->parentNode->removeChild($node);
          
        }
        }
        $xml->formatOutput = true;
        // Save the updated XML file
        $xml->save(public_path('../app/XML/meal/graphReport.xml'));
    }
}
