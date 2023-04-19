<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Models\Address;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;


class AddressTest extends TestCase
{
     /**
     * A basic feature test example.
     *
     * @return void
     */
    private $address;

    public function setUp(): void 
    {
        parent::setUp();
        $this->address = new Address();
    }

    public function test_add_new_address()
    {
        $response = $this->get('/address/create');

        $response->assertStatus(500);
    }

    public function test_add_new_address_can_be_added(){
        $data = [
            'user_id' => 13,
            'address_username' => 'HOO BUNG SENG', 
            'address_userphone' => '011-61975140',
            'street' => 'NO 37 LOT 4345',
            'area' => 'Selangor',
            'postcode'=>41200,
            'active_flag' => 'N'
          ];
          $address = new Address();
          $newAddress = $address->add($data);
          $this->assertEquals(13,$newAddress['user_id']);
       }

}
