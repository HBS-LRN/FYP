<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {  
    if ($exception instanceof ModelNotFoundException) {

        return response()->view('errors.404', [
            'code'=>404,
            'message'=>'The requested resource was not found.'
        ], 404);
    }

    if ($exception instanceof NotFoundHttpException) {
        $code = $exception->getStatusCode();
        $message = Response::$statusTexts[$code];

        return response()->view('errors.404', [
            'code'=>$code,
            'message'=>$message
        ], $code);
    }

    if ($this->isHttpException($exception) && $exception->getStatusCode() === Response::HTTP_INTERNAL_SERVER_ERROR) {
        $code = $exception -> getStatusCode();
        $message = Response::$statusTexts[$code];

        return response()->view('errors.500', [
            '$code'=>$code,
            'message'=>$message
        ],$code);
    }

    if ($exception instanceof ValidationException) {
        return new JsonResponse([
            'message' => 'The given data was invalid',
            'errors' => $exception->errors(),
        ], 422);
    }

    if ($exception instanceof MethodNotAllowedHttpException) {
        return new JsonResponse([
            'message' => 'The requested method is not supported for this resource',
        ], 405);
    }

    //authorization exception ( when user try to access resources they are not authorized to access)
    if ($exception instanceof AuthorizationException) {
        return response()->json(['error' => 'Forbidden'], 403);
    }

    //when database query fails
    if ($exception instanceof QueryException) {
        return response()->json(['error' => 'Database error'], 500);
    }

    //when database error occur
    if ($exception instanceof PDOException) {
        return response()->json(['error' => 'Database error'], 500);
    }
    return parent::render($request, $exception);
    }
}
