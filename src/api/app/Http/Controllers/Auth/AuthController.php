<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    /**
     * creates a new user
     * 
     * route: post('/api/user/register')
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create() 
    {
        return $this->sendError(
            'Authorization Required', 
            [],
            401,
        );
    }

    /**
     * logs in user
     * 
     * route: post('/api/login')
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate(); 
            return redirect()->intended(route('api.loggedin')); 
        }

        return $this->sendError(
            'Login Failed',
            ['error' => 'Unauthorized'],
            401,
        );
    }

    /**
     * logs out user
     * 
     * route: post('/api/logout')
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->sendResponse(
            'User Logged Out',
            ['message' => 'User Logged Out'],
        );
    }

    /**
     * returns response after login redirect
     * 
     * route: get('/api/loggedin')
     * @return \Illuminate\Http\JsonResponse
     */
    public function loggedIn()
    {
        return $this->sendResponse(
            'User Aleady Logged In',
            ['message' => 'User Aleady Logged In'],
        );
    }
}
