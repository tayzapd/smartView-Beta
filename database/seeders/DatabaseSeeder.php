<?php

namespace Database\Seeders;
use App\Models\Division;
use App\Models\Item;
use App\Models\City;
use App\Models\User;
use App\Models\Shop;
use App\Models\Shoptype;
use App\Models\Township;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $shoptype = new Shoptype();
        $shoptype->name = "XyberAdmin";
        $shoptype->save();
        
        $division = new Division();
        $division->name = "Mandalay";
        $division->save();

        $city = new City();
        $city->name = 'Mandalay';
        $city->division_id = 1;
        $city->save();

        $township = new Township();
        $township->name = "Mandalay";
        $township->city_id = 1; 
        $township->save();


        $shop = new Shop;
        $shop->shop_name = "XyberPlanet";
        $shop->address = "Mandalay 66B-109";
        $shop->phone = "90232323232";
        $shop->bg_image = "test";
        $shop->logo_image = "asf";
        $shop->expired_date = date('Y-m-d');
        $shop->shoptype_id = 1;
        $shop->township_id = 1;
        $shop->save();

        $user = new User();
        $user->shop_id = 1;
        $user->username = "XyberAdmin";
        $user->password = Hash::make('pandar');
        $user->save();

        $role = new Role();
        $role->name = "admin";
        $role->save();

        $role = new Role();
        $role->name = "shop_admin";
        $role->save();

        
        $user = User::find(1);
        $role = Role::find(1);
        $user->assignRole($role);
    }
}
