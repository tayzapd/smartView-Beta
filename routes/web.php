<?php

use Illuminate\Support\Facades\Route;


use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
Route::get('/{any}', function(){
    return view('welcome');
})->where('any', '.*');



Route::get('/setup',function () {

    $user = User::find(2);
    $role = Role::find(2);
    $user->assignRole($role);
    

    

        // $check = Auth::attempt(['username'=>'DefaultAdmin', 'password'=>123456]);
//         // // Find Admin User
        // $user = User::find(Auth::id());

//         // // validate user is admin user ? 
        // if($user->shop_id == 1 && $user->hasRole('admin')){
        //     return response()->json(['status'=>true,'token'=>$user->createToken('admin')]);
        // }
        // return response()->json(['status'=>false,'token'=>NULL]);

    
});

