<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class TransactionLimitMiddleware
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
        
        $user_id = $request->input('user_id'); // or any other account identifier
        $limit = 3; // number of transactions allowed per day
        $period = 60 * 24; // period in minutes (1 day = 24 hours)
        
        $transactions = Session::get('transactions', []);
        $time = time();
        $count = 0;

        // count the number of transactions for the current account in the current period
        foreach ($transactions as $transaction) {
            if ($transaction['user_id'] == $user_id && $transaction['time'] >= $time - $period * 60) {
                $count++;
            }
        }

        if ($count >= $limit) {
            // if the limit has been reached, redirect to a page to ask for the user's payment account
            return back()->withErrors(['user_id' => 'You have reached the daily transaction limit for this account. Please use a different account or contact support.'])->onlyInput('user_id');
        }

        // add the current transaction to the list of transactions
        $transactions[] = [
            'user_id' => $user_id,
            'time' => $time,
        ];

        Session::put('transactions', $transactions);

        return $next($request);

    }
}
