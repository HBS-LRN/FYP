<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StaffActiveFeed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;
class StaffActiveFeedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   

    public function index()
    {
        try {
            // Retrieve all staff active feeds created today
            $thisMonth = now()->format('m');
            $staffActiveFeeds = StaffActiveFeed::whereMonth('created_at', $thisMonth)->get();
    
            // Format the response data
            $formattedData = $staffActiveFeeds->map(function ($feed) {
                return [
                    'id' => $feed->id, // Include the id
                    'userId' => $feed->user_id,
                    'action' => $feed->Action,
                    'actionIcon' => $feed->ActionIcon,
                    'date' => date('d M, Y', strtotime($feed->created_at)),
                    'time' => Carbon::parse($feed->created_at)->timezone('Asia/Kuala_Lumpur')->format('h:i a'), // Adjust to Malaysia time zone
                ];
            });
    
            return response()->json([
                'staffActiveFeeds' => $formattedData,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to retrieve staff active feeds' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
    public function show($id)
    {
        try {
            // Retrieve the staff active feed by ID
            $staffActiveFeed = StaffActiveFeed::findOrFail($id);
    
            // Format the response data
            $formattedData = [
                'id' => $staffActiveFeed->id, // Include the id
                'userId' => $staffActiveFeed->user_id,
                'action' => $staffActiveFeed->Action,
                'actionIcon' => $staffActiveFeed->ActionIcon,
                'date' => date('d M, Y', strtotime($staffActiveFeed->created_at)),
                'time' => Carbon::parse($staffActiveFeed->created_at)->timezone('Asia/Kuala_Lumpur')->format('h:i a'), // Adjust to Malaysia time zone
            ];
    
            return response()->json([
                'staffActiveFeed' => $formattedData,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Staff active feed not found' . $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }
    


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Validate the request data as needed
            $validatedData = $request->validate([
                'user_id' => 'required|exists:users,id',
                'Action' => 'required|string',
                'ActionIcon' => 'required|string',
            ]);

            // Create a new staff active feed
            $staffActiveFeed = StaffActiveFeed::create($validatedData);

            return response()->json([
                'staffActiveFeed' => $staffActiveFeed,
                'message' => 'Staff active feed created successfully',
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to create staff active feed' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
