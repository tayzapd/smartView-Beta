<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{

    public function show() 
    {
        if(Gate::allows('shop-auth',Auth::user())){
            $shop_id = Auth::user()->shop_id;
            $users = User::where('shop_id',$shop_id)->get();
            return response()->json(['users'=>$users]);
        }
        
    }
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
            'password' => 'required',
        ]);

        $owner = User::find(Auth::id());
        $shop_id = $owner->shop_id;

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        if(Gate::allows('shop-auth',Auth::user())) {
            if($owner->hasRole('shop_owner'))
            {
                $user = User::where('username',$req->username)->first();
                if($user == null)
                {
                    $user = new User;
                    $user->shop_id = $shop_id;
                    $user->username = $req->username;
                    $user->password = Hash::make($req->password);
                    if($user->save())
                    {
                        $role = Role::find($req->role_id);
                        if($user->assignRole($role)){
                            return response()->json(['status'=>true,'Message'=>"User Successfully Created!"]);
                        }else
                        {
                            return response()->json(['status'=>true,'Message'=>"Can't Created New User."]);
                        }
                        
                    }
                    else
                    {
                        return response()->json(['status'=>true,'Message'=>"Can't Created New User."]);
                    }
                }
                else
                {
                    return response()->json(['status'=>true,'Message'=>"The username already exit, can't add new."]);
                }
            }
        }

    }


    public function delete(Request $req)
    {
        if(Gate::allows('shop-auth',Auth::user())){
            $owner = User::find(Auth::id());
            $user = User::find($req->user_id);
            if($owner->shop_id == $user->shop_id && $owner->hasRole('shop_owner'))
            {
                if($user->delete())
                {
                    return response()->json(['status'=>true,'message'=>"User successfully deleted!"]);
                }
                else {
                    return response()->json(['status'=>false,'message'=>"User can't delete!"]);
                }
            }else {
                return response()->json(['status'=>false,'message'=>"User can't delete!"]);
            }
        }
        
    }



    public function edit(Request $req)
    {
        $owner = User::find(Auth::id());

        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        if(Gate::allows('shop-auth',Auth::user())) {
            $user = User::find($req->id);
            if($owner->shop_id == $user->shop_id && $owner->hasRole('shop_admin') )
            {
                $user->shop_id = $owner->shop_id;
                $user->username = $req->username;
                if($req->password!=''){
                    $user->password = Hash::make($req->password);
                }
                if($user->update())
                {
                    return response()->json(['status'=>true,'Message'=>"User Edited!"]);
                }
                else
                {
                    return response()->json(['status'=>true,'Message'=>"Can't Edit User"]);
                }
            }
        }

    }



    public function restore(Request $req)
    {
        if(Gate::allows('shop-auth',Auth::user())){
            $owner = User::find(Auth::id());
            if($owner->hasRole('shop_admin'))
            {
                $shop = User::withTrashed()->find($req->shop_id);
                if($shop->restore()){
                    return response()->json(['status'=>true,"Item restored."]);
                }else {
                    return response()->json(['status'=>true,"Item can't restore!"]);
                }
            }else {
                return response()->json(['status'=>true,"Item can't restore!"]);
            }
        }
       
    }
}
