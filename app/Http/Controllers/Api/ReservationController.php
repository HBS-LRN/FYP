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
use Illuminate\Support\Facades\Mail; 
use App\Mail\ReservationMail;
use Illuminate\Support\Facades\Validator;
use App\Models\Table;

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

    public function getAllReservation()
    {
        try {
            // Fetch all reservations
            $reservations = Reservation::all();

            // You can customize the response structure based on your needs
            return response()->json(['reservations' => $reservations], 200);
        } catch (\Exception $e) {
            // Handle the exception as needed
            return response()->json(['message' => 'Error fetching reservations', 'error' => $e->getMessage()], 500);
        }
    }

    public function staffAddReservation (StoreReservationRequest $request)
    {
        $data = $request->validated();
      
        // Call the reservation repository interface to create data
        $returnReservation = $this->reservationRepositoryInterface->create($data);

        // Check if cust_email is not null, then send an email
        if ($data['cust_email'] !== null) {
            $this->sendReservationEmail($data);
        }

        return response()->json($returnReservation,);
    }

    private function sendReservationEmail(array $data)
    {
        Mail::to($data['cust_email'])->send(new ReservationMail($data));
    }
   
    public function updateReservationTable(Request $request, $reservationId)
{
    // Step 1: Manually perform validation
    $validator = Validator::make($request->all(), [
        'table_id' => 'required|exists:tables,id',
        'reservation_date' => 'required|date',
        'reservation_time' => 'required',
        'pax' => 'required|integer',
        
        // Add other validation rules as needed
    ]);

    // Step 2: Check if validation fails
    if ($validator->fails()) {
        return response()->json(['message' => $validator->errors()], 400);
    }

    // Step 3: Find the reservation
    $reservation = Reservation::find($reservationId);

    // Step 4: Check if reservation exists
    if (!$reservation) {
        return response()->json(['message' => 'Reservation not found'], 404);
    }

    // Step 5: Check if the new table exists
    $newTable = Table::find($request->input('table_id'));

    if (!$newTable) {
        return response()->json(['message' => 'New table not found'], 404);
    }

    // Step 6: Check if reservation for new table exists at the given date and time
    $existingReservation = Reservation::where('table_id', $newTable->id)
        ->where('reservation_date', $request->input('reservation_date'))
        ->where('reservation_time', $request->input('reservation_time'))
        ->first();

    if ($existingReservation) {
        $tableswitch = Table::find($reservation->table_id);
        if ($existingReservation->pax > $tableswitch->seat_capacity) {
            return response()->json(['message' => 'over the available seat_capacity'], 404);
        }
        
        $existingReservation->table_id = $reservation->table_id;
        if($existingReservation->cust_email!=null){
            $this->sendReservationEmail($existingReservation->toArray());
        }
        $existingReservation->save();
    }

    // Step 7: Update the reservation
    $reservation->table_id = $newTable->id;
    $reservation->pax = $request->input('pax');
    if($reservation->cust_email!=null){
        $this->sendReservationEmail($reservation->toArray());
    }
    $reservation->save();

    return response()->json(['message' => 'Reservation table updated successfully']);
}
public function deleteReservation($id)
{
    // Step 1: Find the reservation
    $reservation = Reservation::find($id);

    // Step 2: Check if reservation exists
    if (!$reservation) {
        return response()->json(['message' => 'Reservation not found'], 404);
    }
    $reservation->delete();

    // You can add additional logic here, such as sending a confirmation email or performing other actions.

    return response()->json(['message' => 'Reservation deleted successfully']);
   
   
}


}
