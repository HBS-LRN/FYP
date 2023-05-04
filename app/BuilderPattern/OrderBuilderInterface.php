<?php

namespace App\BuilderPattern;

use App\Models\Order;

interface OrderBuilderInterface
{
    public function withUserId(int $userId): OrderBuilderInterface;
    
    public function withOrderTotal(float $orderTotal): OrderBuilderInterface;
    
    public function withDeliveryFee(float $deliveryFee): OrderBuilderInterface;
    
    public function withOrderStatus(string $orderStatus): OrderBuilderInterface;
    
    public function withPaymentStatus(string $paymentStatus): OrderBuilderInterface;
    
    public function withPaymentMethod(string $paymentMethod): OrderBuilderInterface;
    
    public function withOrderDate(string $orderDate): OrderBuilderInterface;
    
    public function build(): Order;
}
