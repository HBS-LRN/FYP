<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('loginRequest');
        }
    }
    protected $session;
    protected $timeout = 1200;

    public function __construct(Store $session)
    {
        $this->session = $session;
    }

    public function handle($request, Closure $next, ...$guards)
    {
        if (Auth::check()) {
            if (!session('lastActivityTime')) {
                $this->session->put('lastActivityTime', time());
            } elseif (time() - $this->session->get('lastActivityTime') > $this->timeout) {
                $this->session->forget('lastActivityTime');

                $user = User::find(auth()->user()->id);
                $user->session_id = null;
                $user->update();
                

                auth()->logout();
                session()->invalidate();
                session()->regenerateToken();
               
                return redirect()->route('login')->with('sessionTimeOut', 'Your session has expired due to inactivity.');;
            }
        }
        $this->session->put('lastActivityTime', time());


        return $next($request);
    }
}
