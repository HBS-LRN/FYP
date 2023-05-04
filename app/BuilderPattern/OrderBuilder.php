<?php 

namespace App\BuilderPattern;

use App\Models\Order;

class OrderBuilder implements OrderBuilderInterface{

    protected $order;

    public function __construct(){
        $this->order = new Order();
    }

    public function withUserId(int $userId): OrderBuilder
    {
        $this->order->user_id = $userId;
        return $this;
    }

    public function withOrderTotal(float $orderTotal): OrderBuilder
    {
        $this->order->order_total = $orderTotal;
        return $this;
    }

    public function withDeliveryFee(float $deliveryFee): OrderBuilder
    {
        $this->order->delivery_fee = $deliveryFee;
        return $this;
    }

    public function withOrderStatus(string $orderStatus): OrderBuilder
    {
        $this->order->order_status = $orderStatus;
        return $this;
    }

    public function withPaymentStatus(string $paymentStatus): OrderBuilder
    {
        $this->order->payment_status = $paymentStatus;
        return $this;
    }

    public function withPaymentMethod(string $paymentMethod): OrderBuilder
    {
        $this->order->payment_method = $paymentMethod;
        return $this;
    }

    public function withOrderDate(string $orderDate): OrderBuilder
    {
        $this->order->order_date = $orderDate;
        return $this;
    }

    public function build(): Order
    {
        return $this->order;
    }


}
