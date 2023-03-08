<?php

namespace App\Repository;

use App\Models\Address;
use Illuminate\Support\Facades\DB;
use App\Repository\AddressRepositoryInterface;

class AddressRepository extends BaseRepository implements AddressRepositoryInterface
{
    public function __construct()
    {
     
        parent::__construct(Address::class);
     
    }

}