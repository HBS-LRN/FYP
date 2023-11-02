<?php

namespace App\Repository;

use App\Models\Delivery;
use Illuminate\Support\Facades\DB;
use App\Repository\Base\BaseRepository;
use App\Repository\DeliveryRepositoryInterface;

class DeliveryRepository extends BaseRepository implements DeliveryRepositoryInterface
{
    public function __construct()
    {
     
        parent::__construct(Delivery::class);
     
    }

}