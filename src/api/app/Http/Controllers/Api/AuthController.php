<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    public function create() 
    {
        return $this->sendError(
            'Authorization Required', 
            [],
            401,
        );
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate(); 
            return redirect()->intended(route('api.logedin')); 
        }

        return $this->sendError(
            'Login Failed',
            ['error' => 'Unauthorized'],
            401,
        );
    }

    /**
     * returns response after login redirect
     * 
     * route: get('/api/loggedin')
     * @return \Illuminate\Http\JsonResponse
     */
    public function loggedIn(Request $request)
    {
        return $this->sendResponse(
            'User Aleady Logged In',
            ['message' => 'User Aleady Logged In'],
        );
    }
}
