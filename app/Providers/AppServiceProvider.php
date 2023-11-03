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
use App\Models\Reservation;
use App\Repository\DeliveryRepository;
use App\Repository\DeliveryRepositoryInterface;
use App\Repository\OrderRepository;
use App\Repository\OrderRepositoryInterface;
use App\Repository\ReservationRepository;
use App\Repository\ReservationRepositoryInterface;
use App\Repository\ShoppingCartRepository;
use App\Repository\ShoppingCartRepositoryInterface;

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
        $this->app->bind(ReservationRepositoryInterface::class, ReservationRepository::class);
        $this->app->bind(DeliveryRepositoryInterface::class, DeliveryRepository::class);
        $this->app->bind(OrderRepositoryInterface::class, OrderRepository::class);
        $this->app->bind(ShoppingCartRepositoryInterface::class, ShoppingCartRepository::class);
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
