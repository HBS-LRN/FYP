<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    
    /**
     * A basic unit test .
     *
     * @return void
     */
    private $user;
    public function setUp(): void
    {

        parent::setUp();
        $this->user = new User();
    }

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register()
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test1@example.com',
            'password' => 'nNneeE445567&a',
            'password_confirmation' => 'nNneeE445567&a',

        ];
        $user = new User();
        $newUser = $user->register($data);
        $this->assertEquals('Test User', $newUser['name']);
    }

    public function test_login_screen_can_be_rendered()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen()
    {

        $data = [
            'email' => 'foyotee@gmail.com',
            'password' => 'nNneeE445567&a555',
        ];

        $user = new User();
        $this->assertTrue($user->login($data));
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $data = [
            'email' => 'foyotee@gmail.com',
            'password' => 'invalidPassword',
        ];

        $this->assertFalse($user->login($data));
    }
    public function test_users_can_not_authenticate_with_invalid_email()
    {
        $user = User::factory()->create();

        $data = [
            'email' => 'test1@gmail.com',
            'password' => 'nNneeE445567&a',
        ];

        $this->assertFalse($user->login($data));
    }

    public function test_new_users_can_update()
    {
        $data = [
            "id" => 8,
            "_token" => "GizGVzug6T7tAVXimS8k4pJsKI8blD6EBaLOQPY7",
            "name" => "Update User",
            "email" => "foyotee@gmail.com",
            "phone" => "011-63951578",
            "gender" => "Female",
            "birthdate" => "2002-03-02",
        ];
        $instance = new User();
        $user = User::find($data['id']);
        $updateUser =  $instance->updateDetail($user, $data);
        $this->assertEquals('Update User',  $updateUser['name']);
    }
}
