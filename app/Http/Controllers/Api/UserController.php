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
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail; 
use App\Mail\VerifyAccountMail;


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

        //call user repository interface to create data 
        $newUser = $this->userRepositoryInterface->create($data);
        return response(new UserResource($newUser), 201);
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
            // Define Basal Metabolic Rate calculation formulas based on gender
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

        // Explicitly cast height and weight to float
        $height = (float) $data['height'];
        $weight = (float) $data['weight'];
        $defaultGender = 'Male';
        // Pass the user's gender, height, and weight to the bmr function
        $this->calculateBMR($defaultGender, $height, $weight, $user);

        // Pass the user's height and weight to the bmi function
        $this->calculateBMI($weight, $height, $user);
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
    public function deactivatedCustomer()
    {

        // Retrieve all deactivated user 
        $deactivateUser = User::where('active_member', 'N')->get();
        return response()->json($deactivateUser);
    }

    public function createCustomer(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'required|string|regex:/^\d{3}-\d{7}$/',
            'gender' => 'required|in:Male,Female', // Assuming gender can only be Male or Female
            'birthdate' => 'required|date',
            'password' => 'required|string|min:8', // You might want to customize the password validation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        // Create the user without a password
        $user = User::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'gender' => $request->input('gender'),
            'email' => $request->input('email'),
            'birthdate' => $request->input('birthdate'),
            'role' => 0,
            'password' => bcrypt($request->input('password')),
            'active_member' =>'N'
        ]);

        // Send verification email
        $this->sendVerificationEmail($user);

        // You can customize the response as needed
        return response(new UserResource($user), 201);
    }
    public function createStaff(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'required|string|regex:/^\d{3}-\d{7}$/',
            'gender' => 'required|in:Male,Female', // Assuming gender can only be Male or Female
            'role' => 'required',
            'birthdate' => 'required|date',
            'password' => 'required|string|min:8', // You might want to customize the password validation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        // Create the user without a password
        $user = User::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'gender' => $request->input('gender'),
            'email' => $request->input('email'),
            'birthdate' => $request->input('birthdate'),
            'role' => $request->input('role'),
            'password' => bcrypt($request->input('password')),
            'active_member' =>'N'
        ]);

        // Send verification email
        $this->sendVerificationEmail($user);

        // You can customize the response as needed
        return response(new UserResource($user), 201);
    }

    /**
     * Send verification email to the user.
     *
     * @param \App\Models\User $user
     */
    private function sendVerificationEmail(User $user)
    {

        // Send the verification email
        Mail::to($user->email)->send(new VerifyAccountMail($user));
    }

    public function showUser($id)
    {
        try {
            $user = User::findOrFail($id);

            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    public function checkEmailExists(Request $request)
    {
        $email = $request->input('email');

        // Check if the email already exists in the database
        $exists = User::where('email', $email)->exists();

        return response()->json(['exists' => $exists]);
    }
    public function verifyAccount(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Validate request data
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Generate a new verification token
        $verificationToken = Str::random(40);

        // Update user's record with the new data and verification token
        $user->update([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'password' => bcrypt($request->input('password')),
            'active_member' =>'Y',
            'token' => $verificationToken,
        ]);


        // Update user's verification status
        $user->update(['verified_at' => now(), 'verification_token' => null]);

        return response()->json(['message' => 'Account verified successfully'], 200);
    }
    public function getStaffByRoles()
    {
        try {
            // Define the roles you want to retrieve (1, 2, 3 in this example)
            $targetRoles = [1, 2, 3];

            // Query users based on roles
            $staffMembers = User::whereIn('role', $targetRoles)->get();

            return response()->json(['staffMembers' => $staffMembers], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving staff members', 'error' => $e->getMessage()], 500);
        }
    }
    public function deleteUser($id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Delete the user
            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting user', 'error' => $e->getMessage()], 500);
        }
    }

    public function listOutStaff($searchQuery)
    {
        try {

            // Build the query to retrieve staff and admin users
            $query = User::whereIn('role', [1, 2, 3]);

            if($searchQuery!=null){
                $query->where('name', 'like', '%' . $searchQuery . '%');
            }
            
            // Execute the query and get the results
            $users = $query->get();

            // Return the users as JSON
            return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            // Log the error or handle it as needed
            return response()->json(['message' => 'Error retrieving staff members', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAlluser()
    {
        try {
            // Retrieve all users with role 0 (assuming 0 corresponds to customers)
            $customers = User::where('role', 0)->get();
    
            return response()->json(['customers' => $customers], 200);
        } catch (\Exception $e) {
            // Log the error or handle it as needed
            return response()->json(['message' => 'Error retrieving customers', 'error' => $e->getMessage()], 500);
        }
    }

    public function filterUsers($filterdata)
    {
        try {
            $decodedData = json_decode(urldecode($filterdata), true);
            // return response()->json(['filteredUsers' => $decodedData['name']], 200);
            // Get the search queries from the request
            $nameQuery = $decodedData['name'];
            $emailQuery = $decodedData['email'];
            $phoneQuery = $decodedData['phone'];
            // return response()->json(['filteredUsers' => $filterdata], 200);
          
            $query = User::where('role', 0);

            // Apply filters based on name, phone, and email
            if ($nameQuery) {
                $query->where('name', 'like', '%' . $nameQuery . '%');
            }

            if ($emailQuery) {
                $query->where('email', 'like', '%' . $emailQuery . '%');
            }

            if ($phoneQuery) {
                $query->where('phone', 'like', '%' . $phoneQuery . '%');
            }

            // Execute the query and get the results
            $filteredUsers = $query->get();

            // Return the filtered users as JSON
            return response()->json(['filteredUsers' => $filteredUsers], 200);
        } catch (\Exception $e) {
            // Log the error or handle it as needed
            return response()->json(['message' => 'Error filtering users', 'error' => $e->getMessage()], 500);
        }
    }
    public function updateStaff(Request $request, $id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'phone' => 'required|string|regex:/^\d{3}-\d{7}$/',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
           
            // Update the user
            $user->update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
            ]);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $relativePath = $this->saveImage($image);
                $user->update(['image' => $relativePath]);
            }
            return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating user', 'error' => $e->getMessage()], 500);
        }
    }

    public function changeStaffPassword(Request $request, $id)
    {
        try {
            // Find the staff member by ID
            $staffMember = User::findOrFail($id);

            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'newPassword' => 'required|string|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            // Update the staff member's password
            $staffMember->update([
                'password' => Hash::make($request->input('newPassword')),
            ]);

            return response()->json(['message' => 'Password changed successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error changing password', 'error' => $e->getMessage()], 500);
        }
    }


    
}
