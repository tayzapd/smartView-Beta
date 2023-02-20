<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Models\Shop;
use app\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Nette\Utils\Image;
class ShopController extends Controller
{
    public function show()
    {
        $shop = Shop::find(Auth::user()->shop_id);
        if($shop != null){
            return response()->json(['status'=>true,'shop'=>$shop]);
        }
    }

    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'shop_name' => 'required|min:6|max:120',
            'address' => 'required|min:6|max:120',
            'phone' => 'required|min:9|max:120',
            'logo_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['status'=>false,'Message'=>'Please ']);
        }else {
            $user = Auth::user();
            $shop = Shop::find($user->shop_id);
            $shop->shop_name = $req->shop_name;
            $shop->address = $req->address;
            $shop->phone = $req->phone;
            $shop->expired_date  = $req->expired_date;
            $shop->shoptype_id = $req->shoptype_id;
            $shop->township_id = $req->township_id;
            if($req->file('logo_image')){
                $image = $req->file('logo_image');
                $image = Image::make($image)->resize(640, 480);
                $image->strip();
                $path = $image->save(public_path('shop/logos/' . time() . '.' . $image->extension));
                if($path){
                    $shop->logo_image = public_path('shop/logos/' . time() . '.' . $image->extension);
                }
            }
            if($shop->update()){
                return response()->json(['status'=>true,"Message"=>"Shop Updated Successfully!"]);
            }else {
                return response()->json(['status'=>false,"Message"=>"Shop Can't Updated,Something was wrong!"]);
            }

        }


    }
}
