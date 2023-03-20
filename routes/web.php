<?php

use Illuminate\Support\Facades\Route;


use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
Route::get('/{any}', function(){
    return view('welcome');
})->where('any', '.*');

use Illuminate\Support\Facades\Auth;


Route::get('/setup',function () {
    // Role Insert 
    // $roles = array(
    //     array('name'=>'admin'),
    //     array('name'=>'shop_admin'),
    // );

    // Role::insert($roles);

    // $user = User::find(1);
    // $role = Role::find(1);
    // $user->assignRole($role);

        $check = Auth::attempt(['username'=>'Xyber@Admin007', 'password'=>'pandar']);
        // Find Admin User
        $user = User::find(Auth::id());

        // validate user is admin user ? 
        if($check && $user->shop_id == 1 && $user->hasRole('admin')){
            return response()->json(['status'=>true,'token'=>$user->createToken('pandar')]);
        }
        return response()->json(['status'=>false,'token'=>NULL]);

    
});