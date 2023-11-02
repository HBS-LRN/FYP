<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Http\Requests\StoreDeliveryRequest;
use App\Http\Requests\UpdateDeliveryRequest;
use App\Http\Resources\DeliveryResource;
use App\Models\Order;
use App\Models\User;
use App\Repository\DeliveryRepositoryInterface;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
class DeliveryController extends Controller
{
    private $deliveryRepositoryInterface;

    public function __construct(DeliveryRepositoryInterface $deliveryRepositoryInterface)
    {
        $this->deliveryRepositoryInterface = $deliveryRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {

        /** @var \App\Models\Delivery $delivery */
        $delivery = Delivery::where('order_id', $id)->first(); // Use

        return response()->json($delivery);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDeliveryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDeliveryRequest $request)
    {
        $data = $request->validated();
        //call delivery repository interface to create data 
        $delivery = $this->deliveryRepositoryInterface->create($data);
        return response()->json($delivery);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function show(Delivery $delivery)
    {
        return response()->json($delivery);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDeliveryRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDeliveryRequest $request, $id)
    {

        $data = $request->validated();


        /** @var \App\Models\Delivery $delivery */
        $delivery = Delivery::where('order_id', $id)->first();

        //call address repository interface to update data 
        $this->deliveryRepositoryInterface->update($delivery, $data);
        return response()->json($delivery);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function destroy(Delivery $delivery)
    {
        //call address repository interface to delete data 
        $this->deliveryRepositoryInterface->delete($delivery);
    }


    public function updateDelivery(Request $request, $id)
    {
        $data = $request->all();

        /** @var \App\Models\Order $order */
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        /** @var \App\Models\Delivery $delivery */
        $delivery = Delivery::where('order_id', $id)->first();
        $delivery->update(['delivery_man_id' => $data['delivery_man_id']]);

        // Update the order's order_status to the incoming data
        $order->update(['order_status' => $data['status']]);

        return response()->json($order);
    }
   
}
