<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id');

            $table->double('order_total', 15, 2);
            $table->double('delivery_fee', 15, 2);
            $table->string('order_status');
            $table->string('payment_status');
            $table->string('payment_method');
            $table->date('order_date');
            $table->string('cust_email')->nullable();
            $table->string('cust_name')->nullable();
            $table->string('cust_contact')->nullable();


           
            $table->timestamps();

            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
