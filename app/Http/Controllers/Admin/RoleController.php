<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{


    public function createRole(Request $req)
    {
        $have = Role::where('name',$req)->first();
        if($have == NULL){
            $role = new Role;
            $role->name = $req->name;
            if($role->save())
            {
                return response()->json(['status'=>true,"message"=>"Role created Successfully!"]);
            }else {
                return response()->json(['status'=>true,"message"=>"Role can't created !"]);
            }
        }else {
            return response()->json(['status'=>true,"message"=>"Role is already have?"]);
        }
    }


    public function createPermission(Request $req)
    {
        $have = Permission::where('name',$req)->first();
        if($have == NULL){
            $permission = new Permission;
            $permission->name = $req->name;
            if($permission->save())
            {
                return response()->json(['status'=>true,"message"=>"Permission created Successfully!"]);
            }else {
                return response()->json(['status'=>false,"message"=>"Permission can't created !"]);
            }
        }else {
            return response()->json(['status'=>false,"message"=>"Permission is already have?"]);
        }
    }


    public function setRoleToUser(Request $req)
    {
        $user = User::find($req->user_id);
        $role = Role::find($req->role_id);
        if($user->assignRole($role)){
            return response()->json(['status'=>true,"message"=>"Role assigned to user successfully!"],200);
        }else {
            return response()->json(['status'=>false,"message"=>"Role can't assigned to user! !"],500);
        }

    }


     public function setPermissionToUser(Request $req)
    {
        $user_id = $req->user_id;
        $permission_id = $req->permission_id;

        $user = User::find($user_id);
        $permission = Permission::find($permission_id);

        $user->assignPermission($permission);

        if ($user->hasPermissionTo($permission->name)) {
            return response()->json([
                'status'=>true,
                'message' => 'Permission assigned to user successfully'
            ], 200);
        } else {
            return response()->json([
                'status'=>false,
                'message' => 'Failed to assign permission to user'
            ], 500);
        }
    }


    public function setPermissionToRole(Request $req)
    {
        $role_id = $req->role_id;
        $permission_id = $req->permission_id;

         $role = Role::find($role_id);
         $permission = Permission::find($permission_id);

        $role->syncPermissions($permission);

        if ($role->hasPermissionTo($permission->name)) {
            return response()->json([
                'status'=>true,
                'message' => 'Permission assigned to role successfully'
            ], 200);
        } else {
            return response()->json([
                'status'=>false,
                'message' => 'Failed to assign permission to role'
            ], 500);
        }
    }


    public function deleteRole(Request $req)
    {
        $role_id = $req->role_id;
        $role = Role::find($role_id);

        if ($role) {
            $role->delete();
            return response()->json([
                'status'=>true,
                'message' => 'Role deleted successfully'], 200);
        } else {
            return response()->json([
                'status'=>false
                ,'message' => 'Role not found'], 404);
        }
    }


    public function deletePermission(Request $req)
    {
        $permission_id = $req->permission_id;
        $permission = Permission::find($permission_id);

        if ($permission) {
            $permission->delete();
            return response()->json([
                'status'=>true,
                'message' => 'Permission deleted successfully'], 200);
        } else {
            return response()->json([
                'status'=>false
                ,'message' => 'Permission not found'], 404);
        }
    }


    public function revokeRoleFromUser(Request $req)
    {
        $user_id = $req->user_id;
        $role_id = $req->role_id;

        $user = User::find($user_id);
        $role = Role::find($role_id);

        if ($user->hasRole($role)) {
            $user->removeRole($role);
            return response()->json(['status' => true, 'message' => 'Role revoked from user']);
        } else {
            return response()->json(['status' => false, 'message' => 'User does not have the role']);
        }
    }


    public function revokePermissionFromUser(Request $req)
    {
        $user_id = $req->user_id;
        $permission_id = $req->permission_id;

        $user = User::find($user_id);
        $permission = Permission::find($permission_id);

        if ($user->hasPermissionTo($permission)) {
            $user->revokePermissionTo($permission);
            return response()->json(['status' => true, 'message' => 'Permission revoked from user']);
        } else {
            return response()->json(['status' => false, 'message' => 'User does not have the permission']);
        }
    }


    public function revokePermissionFromRole(Request $req)
    {
        $role_id = $req->role_id;
        $permission_id = $req->permission_id;

        $role = Role::find($role_id);
        $permission = Permission::find($permission_id);

        if ($role->hasPermissionTo($permission)) {
            $role->revokePermissionTo($permission);
            return response()->json(['status' => true, 'message' => 'Permission revoked from role']);
        } else {
            return response()->json(['status' => false, 'message' => 'Role does not have the permission']);
        }
    }



}
