<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StaffMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        if(Auth::check()){

            //admin role == 2
            //staff role == 1
            //user role == 0
            
            if(Auth::user()-> role =='2' || Auth::user()-> role =='1'){

                return $next($request);
            }else{

               
                return redirect('/nonAuthenticated')-> with('message','Access Denied as you are not Staff');
            }
        }else{
            return redirect('/loginRequest')-> with('message','Login to access the website info');
        }
        
        return $next($request);
      
    }
}
