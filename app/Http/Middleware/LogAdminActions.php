<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LogAdminActions
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Only log actions for authenticated admins
        
            $adminId = Auth::user()->id;
            $action = $request->method();
            $tableName = $request->segment(2);
            $rowId = $request->segment(3);
            $oldData = '';
            $newData = '';
            $logMessage = "Admin #{$adminId} {$action} on {$tableName} #{$rowId}";

            if ($request->isMethod('PUT') || $request->isMethod('PATCH')) {
                $oldData = json_encode($request->input('old_data'));
                $newData = json_encode($request->input('new_data'));
                $logMessage .= " (old: {$oldData}, new: {$newData})";
            }

            Log::info($logMessage, [
                'admin_id' => $adminId,
                'action' => $action,
                'table_name' => $tableName,
                'row_id' => $rowId,
                'old_data' => $oldData,
                'new_data' => $newData,
            ]);
        

        return $response;
    }
}