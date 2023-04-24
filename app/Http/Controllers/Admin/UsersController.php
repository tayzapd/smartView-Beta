<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function show(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $users = User::with('shop:id,shop_name')->role('shop_admin')->get();
                if($users)
                {
                    return response()->json(['status'=>true,'users'=>$users]);
                }
                return response()->json(['status'=>false,"Message"=>"Can't get data because server network error!"]);
            }
        }

        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }


    public function add(Request $req)
    {
        try {
            $validator = Validator::make($req->all(), [
                'shop_id' => 'required',
                'username' => 'required|string',
                'password' => 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            
            if(Gate::allows('admin-auth',Auth::user())){
                $user = User::where('username',$req->username)->first();
                if($user == null)
                {
                    $user = new User;
                    $user->shop_id = $req->shop_id;
                    $user->username = $req->username;
                    $user->password = Hash::make($req->password);
                    $user->remark = " ";
                    if($user->save())
                    {
                        $user->assignRole('shop_admin');
                        return response()->json(['status'=>true,'Message'=>"User Successfully Created!"]);
                    }
                    return response()->json(['status'=>true,'Message'=>"Can't Created New User."]);
                    
                }
                return response()->json(['status'=>true,'Message'=>"The username already exit, can't add new."]);
                
            }
        }

        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
        

    }
    public function update(Request $req)
    {
        try {
            $validator = Validator::make($req->all(), [
                'shop_id' => 'required',
                'username' => 'required|string',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            if(Gate::allows('admin-auth',Auth::user())){
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
                return response()->json(['status'=>true,'Message'=>"Can't Edit User"]);
                
            }
        }

        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }

    }
    public function delete(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $user = User::find($req->id);
                if($user->delete())
                {
                    return response()->json(['status'=>true,'message'=>"User Deleted!"]);
                }
                return response()->json(['status'=>true,'message'=>"User can't delete!, Try Again"]);
                
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }


    }
    public function restore(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $user = User::withTrashed()->find($req->id);
                if($user->restore()){
                    return response()->json(['status'=>true,'message'=>"Item restored."]);
                }
                return response()->json(['status'=>true,'message'=>"Item can't restore!"]);
                
            }
        }

        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }

    public function trashshow()
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $users = User::onlyTrashed()->get();
                return response()->json(['status'=>true,'users'=>$users]);
                
            }
        }

        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }

    public function restoreAll(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $users =User::onlyTrashed();
                if($users->restore()){
                    return response()->json(['status'=>true,'message'=>"All Users restored."]);
                }
                return response()->json(['status'=>false,'message'=>"Users can't restore!"]);
                
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
        
    }
}
