<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|min:6|max:120',
            'password' => 'required',
            'shop_id'  => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status'=>false,'token'=>NULL]);
        }

        $check = Auth::attempt(['username' => $request->username, 'password' => $request->password]);
        if($check){
            $user = User::find(Auth::id());
            if($user->shop_id == $request->shop_id)
            {
                return response()->json(['status'=>true,'token'=>$user->createToken($request->password)->plainTextToken]);
            }
        }
        
        return response()->json(['status'=>false,'token'=>NULL]);
        
    }
}
