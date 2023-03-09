<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use League\CommonMark\Extension\CommonMark\Node\Inline\Image;
class ShopController extends Controller
{
    public function show()
    {
        $shops = Shop::get();
        if($shops != null){
            return response()->json(['status'=>true,'shops'=>$shops]);
        }
    }
    
    public function index(){
        return "hi";
    }
    
    public function create(Request $req)
    {
        
        $validator = Validator::make($req->all(), [
            'shop_name' => 'required|min:6|max:120',
            'address' => 'required|min:6|max:120',
            'phone' => 'required|min:9|max:120',
            'logo_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'shoptype_id' => 'required',
            'township_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'Message'=>'Please ']);
        }else {
            if($req->hasFile('logo_image')){
                $image = $req->file('logo_image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                
                $image->move(public_path('shoplogo'),$fileName);
                
                $shop = new Shop;
                // $shop->logo_image = $req->file('logo_image')->getClientOriginalName();
                $shop->logo_image = $fileName;
                $shop->shop_name = $req->shop_name;
                $shop->address = $req->address;
                $shop->phone = $req->phone;
                $shop->expired_date = DateTime::createFromFormat('Y-m-d',$req->expired_date);
                $shop->shoptype_id = $req->shoptype_id;
                $shop->township_id = $req->township_id;
                $shop->remark = $req->remark;
                
                if($shop->save()){
                    return response()->json(['status'=>true,"Message"=>"Shop Create Successfully!"]);
                }else {
                    return response()->json(['status'=>false,"Message"=>"Shop Can't Create,Something was wrong!"]);
                }


            }  

        }

    }

    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'shop_id' => 'required',
            'shop_name' => 'required|min:6|max:120',
            'address' => 'required|min:6|max:120',
            'phone' => 'required|min:9|max:120',
            'logo_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'shoptype_id' => 'required',
            'township_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status'=>false,'Message'=>'Please ']);
        }else {
            $shop = Shop::find($req->shop_id);
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

    public function delete(Request $req)
    {
        $shop = Shop::find($req->shop_id);
        if($shop->delete()){
            return response()->json(['status'=>true,"Item move to trash."]);
        }else {
            return response()->json(['status'=>true,"Item can't move trash!"]);
        }
    }

    public function restore(Request $req)
    {
        $shop = Shop::withTrashed()->find($req->shop_id);
        if($shop->restore()){
            return response()->json(['status'=>true,"Item restored."]);
        }else {
            return response()->json(['status'=>true,"Item can't restore!"]);
        }
    }
}
