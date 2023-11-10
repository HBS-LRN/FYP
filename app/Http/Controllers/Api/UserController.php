<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use App\Repository\UserRepositoryInterface;
use DateTime;

class UserController extends Controller
{

    //using user repository 
    private $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['image'])) {
            try {
                $relativePath = $this->saveImage($data['image']);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 400);
            }
            $data['image'] = $relativePath;
        }

        $user->update($data);


        // Pass the user's gender, height, and weight to the bmr function
        $this->calculateBMR($data['gender'], $data['height'], $data['weight'], $user);
        // Pass the user's , height, and weight to the bmi function
        $this->calculateBMI($data['weight'], $data['height'], $user);
        return response()->json($user);
    }



    public function calculateBMI($weight, $height, User $user)
    {
        // Ensure that height is in meters
        $heightInMeters = $height / 100;

        // Calculate BMI
        $bmi = $weight / ($heightInMeters * $heightInMeters);

        // Update the user's BMR field
        $user->update(['BMI' => $bmi]);
    }
    public function calculateBMR($gender, $height, $weight, User $user)
    {
        // Check if the user has a gender, height, and weight
        if ($gender && $height && $weight) {
            // Define calorie calculation formulas based on gender
            $calorie = ($gender === 'Male')
                ? 66.5 + (13.75 * $weight) + (5.003 * $height) - (6.75 * $this->age($user->birthdate))
                : 655.1 + (9.563 * $weight) + (1.850 * $height) - (4.676 * $this->age($user->birthdate));

            // Update the user's BMR field
            $user->update(['BMR' => $calorie]);
        }
    }

    public function age($birthdate)
    {
        // Calculate the user's age based on birthdate
        $birthDate = new DateTime($birthdate);
        $currentDate = new DateTime('now');
        $age = $currentDate->diff($birthDate)->y;

        return $age;
    }

    //update the user password
    public function updatePassword(Request $request)
    {
        $request->validate([
            'currentPass' => 'required',
            'password' => ['required', 'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ], 'confirmed'],
        ]);

        $user = User::find($request['id']);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $success = $this->userRepositoryInterface->updatePassword($user, $request['currentPass'], $request['password']);

        if ($success) {
            return response(new UserResource($user), 201);
        } else {
            return response()->json(['message' => 'Invalid current password'], 401);
        }
    }

    public function updateBMI(Request $request, $id)
    {

        /** @var \App\Models\User $user */
        $user = User::find($id);
        $data = $request->all();
        $user->update($data);

        return new UserResource($user);
    }



    public function checkExpire(Request $request)
    {
        $check_token = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if ($check_token) {
            $created_at = Carbon::parse($check_token->created_at);
            $now = Carbon::now();

            if ($created_at->diffInSeconds($now) > 50) {
                // // the link will be expired if the time taken is too long 
                DB::table('password_resets')->where('token', $request->token)->delete();

                return response([
                    'message' => 'Link Expired!'
                ], 401);
            }
        }
    }

    public function resetPassword(Request $request)
    {


        $data =  $request->validate([
            'email' => 'required',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
                    ->numbers()
            ]
        ]);

        // Find the user by user_id
        /** @var \App\Models\User $user */
        $user = User::where('email', $data['email'])->first();

        // Check if the user exists
        if (!$user) {
            return response(['message' => 'Email not found'], 404);
        }


        // // Update the user's password
        // $user->password = bcrypt($request->input('password'));
        // $user->save();


        if (Hash::check($request->password, $user->password)) {

            //prevent password reused 
            return response([
                'message' => 'Password Reused! Change Other Password'
            ], 401);
        } else {
            //update user password if successfully 
            User::where('email', $request->email)->update([
                'password' => Hash::make($request->password)
            ]);
            DB::table('password_resets')->where([
                'email' => $request->email
            ])->delete();

            //inform user their password has been changed using email
            User::informPasswordChange($request->email);

            return response(new UserResource($user), 201);
        }
    }
    public function shoppingCart(Request $request, $id)
    {
        /** @var \App\Models\User $user */
        $user = User::find($id);
        return response($user->meals);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }


    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('Invalid image type');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
