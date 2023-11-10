<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Allergic;
use App\Http\Requests\StoreAllergicRequest;
use App\Http\Requests\UpdateAllergicRequest;
use App\Http\Resources\AllergicResource;
use App\Models\User;

class AllergicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Allergic::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAllergicRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAllergicRequest $request)
    {
        $data = $request->validated();
      
        $allergic = Allergic::create($data);

        return response(new AllergicResource($allergic) , 201);
    }

  
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { 
        
        /** @var \App\Models\User $user */
        $user = User::find($id); 


          // Check if the address exists
          if (!$user) {
            return response(['message' => 'User Not Found'], 404);
        }

        return response()->json($user->allergics);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAllergicRequest  $request
     * @param  \App\Models\Allergic  $allergic
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAllergicRequest $request, Allergic $allergic)
    {
        
        $data = $request->validated();
        $allergic->update($data);

        return response()->json($allergic);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Allergic  $allergic
     * @return \Illuminate\Http\Response
     */
    public function destroy(Allergic $allergic)
    {
        $allergic->delete();

        return response("", 204);
    }
}
