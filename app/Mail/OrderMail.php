<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order; // You can pass the order data to the view
    public $meal;
    /**
     * Create a new message instance.
     *
     * @param $order
     */
    public function __construct(array $order,array $meal)
    {
        $this->order = $order;
        $this->meal = $meal;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('noreply@gmail.com', 'Grand Imperial')
                    ->subject('Order Confirmation')
                    ->view('order');
    }
}
