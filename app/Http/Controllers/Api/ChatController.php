<?php

namespace App\Http\Controllers\Api;

use App\Events\MyEvent;
use App\Events\NewChatMessage;
use App\Events\PusherBroadcast;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Http\Requests\StoreChatRequest;
use App\Http\Requests\UpdateChatRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chats = Chat::all();
        return response()->json($chats);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreChatRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreChatRequest $request)
    {
        $data = $request->validated();

        $chat = new Chat();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
            $chat->image =  $data['image'];
        }
        if (isset($data['admin_id'])) {
            $chat->admin_id = $data['admin_id'];
        }

        $chat->message = $data['message'];
        $chat->date = $data['date'];
        $chat->time = $data['time'];
        $chat->user_id = $data['user_id'];
        $chat->save();

        // when having new message, using brodcast events to others 
        broadcast(new NewChatMessage($chat))->toOthers();

        return response()->json($chat);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {


        //if it is admin id
        if ($id == 1) {
            $chats = Chat::all();
            return response()->json($chats);
        } else {
            // Retrieve all chats where user_id is equal to $id
            $chats = Chat::where('user_id', $id)
                ->orWhere('admin_id', $id)
                ->get();

            return response()->json($chats);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateChatRequest  $request
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateChatRequest $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chat $chat)
    {
        //
    }
    public function customerChats()
    {
        // Group the chats by user_id and retrieve the latest message for each user
        $latestChats = Chat::with('user')
            ->where('user_id', '<>', 1) // Exclude records with user_id = 1
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get()
            ->groupBy('user_id')
            ->map(function ($group) {
                $latestMessage = $group->first();
                $unseenCount = $group->where('seen', 'N')->count();

                return [
                    'latestMessage' => $latestMessage,
                    'unseenCount' => $unseenCount,
                ];
            });

        return response()->json($latestChats->values());
    }

    public function customerChat($id)
    {
        // Group the chats by user_id and retrieve the latest message for each user
        $latestChats = Chat::with('user')
            ->where('admin_id', $id)
            ->where('user_id', 1)
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get()
            ->groupBy('user_id')
            ->map(function ($group) {
                $latestMessage = $group->first();
                $unseenCount = $group->where('seen', 'N')->count();

                return [

                    $unseenCount
                ];
            });

        return response()->json($latestChats->values());
    }
    public function customerSeens(Request $request)
    {
        $data = $request->all();

        /** @var \App\Models\User $user */
        $user = User::find($data['user_id']);

        //get all user chats
        $allChats = $user->chats;


        foreach ($allChats as $chat) {

            DB::table('chats')
                ->where('id', $chat->id)
                ->update(['seen' => 'Y']);
        }
        return $user->chats;
    }
    public function customerSeen(Request $request)
    {
        $data = $request->all();
    
        /** @var \App\Models\User $user */
        $user = User::find($data['user_id']);
    
        // Update seen status for all chats
        DB::table('chats')
            ->where('admin_id', $user->id)
            ->update(['seen' => 'Y']);
    
        // Retrieve all chats after updating seen status
        $allChats = Chat::where('user_id', $user->id)->get();
    
        return response()->json($allChats);
    }
    public function getUnseenChats()
    {
        try {
            // Retrieve unseen chats where admin_id is 1
            $unseenChats = Chat::with(['user' => function ($query) {
                $query->select('id', 'name', 'image'); // Add any other user fields you want
            }])
                ->where('admin_id', 1)
                ->where('seen', 'N')
                ->get();
    
            return response()->json($unseenChats);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Failed to retrieve unseen chats'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

}
