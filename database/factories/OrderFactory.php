<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        {
            return [
                'orderTotal' => $this->faker->randomDigit(),
                'customer_id' => 1,
                'paymentMethod' => "public bank",
                'deliveryFee' => $this->faker->randomDigit(),
                'orderStatus' => "success",
              'orderStatus' => "delivering",
              'paymentStatus' => "success",
              'orderDate' => $this->faker->date(),
               
            ];
        }
    }
}
