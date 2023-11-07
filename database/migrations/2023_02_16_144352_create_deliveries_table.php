<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id');
            $table->integer('delivery_man_id')->nullable();
            $table->string('username');
            $table->string('userphone');
            $table->double('longitude')->nullable();
            $table->double('latitude')->nullable();
            $table->double('accuracy')->nullable();
            $table->string('street');
            $table->string('city');
            $table->string('state');
            $table->integer('postcode');

            $table->timestamps();

            // $table->foreign('order_id')
            // ->references('id')
            // ->on('orders')
            // ->onDelete('cascade');
            // $table->foreign('delivery_man_id')
            // ->references('id')
            // ->on('users')
            // ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}
