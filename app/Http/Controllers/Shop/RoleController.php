<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
     public function assginRoleToUser(Request $req)
     {
        $owner = Auth::user();
        $user = User::find($req->user_id);
        $role = Role::find($req->role_id);
        if($user->assignRole($role)){

            return response()->json([
                'status'=>true,"
                message"=>"Role assigned to user successfully!"
            ],200);

        }else {

            return response()->json([
                'status'=>false,
                "message"=>"Role can't assigned to user! !"
            ],500);
        }
     }
    
     public function revokeRoleFromUser(Request $req)
     {
        $owner = Auth::user();
        $user = User::find($req->user_id);
        $role = Role::find($req->role_id);
        if ($user->hasRole($role)){
            $user->removeRole($role);

            return response()->json([
                'status' => true, 
                'message' => 'Role revoked from user'
            ]);

        } else {

            return response()->json([
                'status' => false,
                 'message' => 'User does not have the role'
            ]);
            
        }
      } 

     public function syncRoleToUser(Request $req)
     {
        $owner = Auth::user();
        $user = User::find($req->user_id);
        $role = Role::find($req->role_id);

        if ($user->syncRoles($role)) {
            return response()->json([
                'status' => true,
                'message' => 'Role Sync to user'
            ]);

        } else {

            return response()->json([
                'status' => false, 
                'message' => 'User does change the role'
            ]);
        }
     }
}
