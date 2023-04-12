<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Factories\MealFactory;
use App\Factories\Interfaces\MealFactoryInterface;

class MealFactoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(MealFactoryInterface::class, MealFactory::class);
    }
}
?>