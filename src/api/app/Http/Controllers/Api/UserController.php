<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{
    public function index()
    {
        $users = User::all();
        return $this->sendResponse('Successfully fetched', $users);
    }

    public function create (Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ];

        $data = request()->all();
        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', [$validator->errors()]);
        }        

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($request->password),
        ]);

        if ($user->save()) {
            return $this->sendResponse('User Created', [$user]);
        }
    }
}
