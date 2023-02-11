<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function show(Request $req)
    {
        $db = User::all();
        if($db)
        {
            return response()->json(['status'=>true,'data'=>$db]);
        }else {
            return response()->json(['status'=>false,"Message"=>"Can't get data because server network error!"]);
        }
    }
    public function add(Request $req)
    {
        $user = User::where('username',$req->username)->first();
        if($user == null)
        {
            $db = new User;
            $db->username = $req->username;
            $db->password = Hash::make($req->password);
            if($db->save())
            {
                return response()->json(['status'=>true,'Message'=>"User Successfully Created!"]);
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
    public function edit(Request $req)
    {
        $user = User::find($req->id);
        $user->shop_id = $req->shop_id;
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
    public function delete(Request $req)
    {
        $user = User::find($req->id);
        if($user->delete())
        {
            return response()->json(['status'=>true,'Message'=>"User Deleted!"]);
        }
        else
        {
            return response()->json(['status'=>true,'Message'=>"User can't delete!, Try Again"]);
        }
    }
}
