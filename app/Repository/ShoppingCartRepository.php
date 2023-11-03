<?php

namespace App\Repository;

use App\Models\Reservation;
use App\Models\ShoppingCart;
use Illuminate\Support\Facades\DB;
use App\Repository\Base\BaseRepository;
use App\Repository\ShoppingCartRepositoryInterface;

class ShoppingCartRepository extends BaseRepository implements ShoppingCartRepositoryInterface
{
    public function __construct()
    {
     
        parent::__construct(ShoppingCart::class);
     
    }

}