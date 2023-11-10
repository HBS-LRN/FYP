<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('gender')->nullable();
            $table->string('image')->nullable();
            $table->string('phone')->nullable();
            $table->integer('role')->default('0');
            $table->string('birthdate')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('active_member')->default('Y');
            $table->string('password');
            $table->string('session_id')->nullable();
            $table->string('token')->nullable();
            $table->integer('point')->nullable();
            $table->double('height')->nullable();
            $table->double('weight')->nullable();
            $table->double('BMR')->nullable();
            $table->double('BMI')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
