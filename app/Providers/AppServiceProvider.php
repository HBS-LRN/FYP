<?php

namespace App\Providers;

use App\Repository\UserRepository;
use Illuminate\Pagination\Paginator;
use App\Repository\AddressRepository;
use Illuminate\Support\ServiceProvider;
use App\Repository\UserRepositoryInterface;
use App\Repository\AddressRepositoryInterface;
use App\Factories\Interfaces\MealFactoryInterface;
use App\Factories\MealFactory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(AddressRepositoryInterface::class, AddressRepository::class);
        $this->app->bind(MealFactoryInterface::class, MealFactory::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrap();
    }
}
