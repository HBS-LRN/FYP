<?php

namespace App\Repository;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use App\Repository\Base\BaseRepository;
use App\Repository\OrderRepositoryInterface;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
    public function __construct()
    {
     
        parent::__construct(Order::class);
     
    }

}