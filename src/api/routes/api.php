<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::post(('/user/register'), [UserController::class, 'create'])->name('api.user.create');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/loggedin', [AuthController::class, 'loggedin'])->name('api.loggedin');
    Route::get('/users', [UserController::class, 'index'])->name('users');
});