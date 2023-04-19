<?php

use App\Models\City;
use App\Models\Division;
use Illuminate\Support\Facades\Route;


use App\Models\Item;
use App\Models\User;
use App\Models\Shop;
use App\Models\Shoptype;
use App\Models\Township;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;


// Route::get('/{any}', function(){
//     return view('welcome');
// })->where('any', '.*');



Route::get('/setup',function () {

<<<<<<< HEAD
    // $shoptype = new Shoptype();
    // $shoptype->name = "XyberAdmin";
    // $shoptype->save();
    
    // $division = new Division();
    // $division->name = "Mandalay";
    // $division->save();

    // $city = new City();
    // $city->name = 'Mandalay';
    // $city->division_id = 1;
    // $city->save();

    // $township = new Township();
    // $township->name = "Mandalay";
    // $township->city_id = 1; 
    // $township->save();


    // $shop = new Shop;
    // $shop->shop_name = "XyberPlanet";
    // $shop->address = "Mandalay 66B-109";
    // $shop->phone = "90232323232";
    // $shop->bg_image = "test";
    // $shop->logo_image = "asf";
    // $shop->expired_date = date('Y-m-d');
    // $shop->shoptype_id = 1;
    // $shop->township_id = 1;
    // $shop->save();

    // $user = new User();
    // $user->shop_id = 1;
    // $user->username = "XyberAdmin";
    // $user->password = Hash::make('pandar');
    // $user->save();

    // $role = new Role();
    // $role->name = "admin";
    // $role->save();

    // $role = new Role();
    // $role->name = "shop_admin";
    // $role->save();

    
    // $user = User::find(1);
    // $role = Role::find(1);
    // $user->assignRole($role);

    $check = Auth::attempt(['username'=>'XyberAdmin', 'password'=>'pandar']);
    // Find Admin User
    $user = User::find(Auth::id());

    // validate user is admin user ? 
    if($check && $user->shop_id == 1 && $user->hasRole('admin')){
        return response()->json(['status'=>true,'token'=>$user->createToken('pandar')]);
    }
    return response()->json(['status'=>false,'token'=>NULL]);
=======
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
>>>>>>> refs/remotes/origin/main

    
});

