<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ShopController extends Controller
{
    public function show()
    {
        try{
            if(Gate::allows('shop-auth',Auth::user())){
                $shop = Shop::find(Auth::user()->shop_id);
                if($shop != null){
                    return response()->json(['status'=>true,'shop'=>$shop]);
                }
            }
        } 
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }
    }

    public function update(Request $req)
    {
        try{
            $validator = Validator::make($req->all(), [
                'shop_name' => 'required|min:3|max:120',
                'address' => 'required|min:6|max:120',
                'phone' => 'required|min:9|max:120',
            ]);
            // 'logo_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            if ($validator->fails()) {
                return response()->json(['status'=>false,'Message'=>'Please ']);
            }
            
            if(Gate::allows('shop-auth',Auth::user())){
                
                $user = Auth::user();
                $shop = Shop::find($user->shop_id);
                $shop->shop_name = $req->shop_name;
                $shop->address = $req->address;
                $shop->phone = $req->phone;
                if($req->file('logo_image')){
                    $image = $req->file('logo_image');
                    $path = $image->move(public_path('images/shop/logo/'),$shop->id."_".$image->getClientOriginalName());
                    if($path){
                        $shop->logo_image = $shop->id."_".$image->getClientOriginalName();
                    }
                }
                if($shop->update()){
                    return response()->json(['status'=>true,"Message"=>"Shop Updated Successfully!","shop"=>$shop]);
                }else {
                    return response()->json(['status'=>false,"Message"=>"Shop Can't Updated,Something was wrong!"]);
                }
    
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }
    }
}
