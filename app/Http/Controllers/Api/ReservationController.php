<?php

namespace App\Http\Controllers\Api;

use App\Events\NewReservationBrodcast;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\User;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Repository\ReservationRepositoryInterface;
use Illuminate\Http\Request;

class ReservationController extends Controller
{

    private $reservationRepositoryInterface;

    public function __construct(ReservationRepositoryInterface $reservationRepositoryInterface)
    {
        $this->reservationRepositoryInterface = $reservationRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        /** @var \App\Models\User $user */
        $user = User::find($id);
        return response()->json($user->tables);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReservationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReservationRequest $request)
    {
        $data = $request->validated();

      
        broadcast(new NewReservationBrodcast($data))->toOthers();
        //call address repository interface to create data 
        $returnReservation = $this->reservationRepositoryInterface->create($data);
        return response()->json($returnReservation);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReservationRequest  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {


        //call reservation repository interface to delete data 
        $this->reservationRepositoryInterface->delete($reservation);

        return response("", 204);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function specificReservation(Request $request)
    {
        // Retrieve reservations using the where clause with multiple conditions
        $reservations = Reservation::where('reservation_date', $request->input('reservation_date'))
            ->where('reservation_time', $request->input('reservation_time'))
            ->get();

        return response()->json($reservations);
    }
}
