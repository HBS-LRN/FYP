<?php

namespace App\Repository;

use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use App\Repository\Base\BaseRepository;
use App\Repository\ReservationRepositoryInterface;

class ReservationRepository extends BaseRepository implements ReservationRepositoryInterface
{
    public function __construct()
    {
     
        parent::__construct(Reservation::class);
     
    }

}