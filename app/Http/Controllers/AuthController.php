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
            if($user->shop_id == $request->shop_id && $user->hasRole('shop_admin'))
            {
                return response()->json(['status'=>true,'token'=>$user->createToken($request->password)->plainTextToken]);
            }
        }
        
        return response()->json(['status'=>false,'token'=>NULL]);
        
    }

    public function AdminLogin(Request $req)
    {
        // validator 
        $validator = Validator::make($req->all() , [
            'username' => 'required|min:6|max:120',
            'password' => 'required',
            'shop_id'  => 'required'
        ]);

        // validator fail 
        if($validator->fails()){
            return response()->json(['status'=>false,'token'=>NULL]);
        }
        // Auth
        $check = Auth::attempt(['username'=>$req->username, 'password'=>$req->password]);
        // Find Admin User
        $user = User::find(Auth::id());


        // validate user is admin user ? 
        if($check && $user->shop_id == 1 && $user->hasRole('admin')){
            $token = $user->createToken($req->password)->plainTextToken;
            return response()->json(['status'=>true,'token'=>$token]);
        }
        return response()->json(['status'=>false,'token'=>NULL]);
        
    }
}
