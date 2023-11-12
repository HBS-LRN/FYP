<?php

namespace App\Http\Controllers\Api;

use App\Events\MyEvent;
use App\Events\NewChatMessage;
use App\Events\PusherBroadcast;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Http\Requests\StoreChatRequest;
use App\Http\Requests\UpdateChatRequest;


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
}
