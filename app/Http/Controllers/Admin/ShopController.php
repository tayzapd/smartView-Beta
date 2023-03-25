<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use League\CommonMark\Extension\CommonMark\Node\Inline\Image;
class ShopController extends Controller
{
    public function show()
    {
        $shops = Shop::with('shoptype','township')->get();
        if($shops != null){
            return response()->json(['status'=>true,'shops'=>$shops]);
        }
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
        }
        if(Gate::allows('admin-auth',Auth::user())) {
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
                    return response()->json(['status'=>true,"message"=>"Shop Create Successfully!"]);
                }else {
                    return response()->json(['status'=>false,"message"=>"Shop Can't Create,Something was wrong!"]);
                }


            }  

        }

    }

    public function update(Request $req)
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
        }
        if(!Gate::allows('admin-auth',Auth::user())){
            return response()->json(['status'=>false,"message"=>"Access denied!"]);
        }
        if($req->hasFile('logo_image')){
            $shop = Shop::find($req->id);
            File::delete(public_path('/images/shop/logo/'.$shop->logo_image));
            $image = $req->file('logo_image');
            $fileName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('/images/shop/logo/'),$fileName);
            $shop->logo_image = $fileName;
            $shop->shop_name = $req->shop_name;
            $shop->address = $req->address;
            $shop->phone = $req->phone;
            $shop->expired_date = DateTime::createFromFormat('Y-m-d',$req->expired_date);
            $shop->shoptype_id = $req->shoptype_id;
            $shop->township_id = $req->township_id;
            $shop->remark = $req->remark;
            if($shop->update()){
                
            }
            return response()->json(['status'=>false,"message"=>"Shop Can't Updated,Something was wrong!"]);
        }else{
            $shop = Shop::find($req->id);
            $shop->logo_image = $req->logo_image;
            $shop->shop_name = $req->shop_name;
            $shop->address = $req->address;
            $shop->phone = $req->phone;
            $shop->expired_date = DateTime::createFromFormat('Y-m-d',$req->expired_date);
            $shop->shoptype_id = $req->shoptype_id;
            $shop->township_id = $req->township_id;
            $shop->remark = $req->remark;
            if($shop->update()){
                return response()->json(['status'=>true,"message"=>"Shop Updated Successfully!"]);
            }else {
                return response()->json(['status'=>false,"message"=>"Shop Can't Updated,Something was wrong!"]);
            }
        }

    }

    public function delete(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shop = Shop::find($req->id);
            if($shop->delete()){
                return response()->json(['status'=>true,'message'=>"Shop move to trash."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Shop can't move trash!"]);
            }
        }
    }

    public function restore(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shop = Shop::withTrashed()->find($req->shop_id);
            if($shop->restore()){
                return response()->json(['status'=>true,'message'=>"Shop restored."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Shop can't restore!"]);
            }
        }
    }

    public function trashshow()
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shops = Shop::onlyTrashed()->get();
            return response()->json(['status'=>true,'shops'=>$shops]);
            
        }
    }

    public function restoreAll(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shops =Shop::onlyTrashed();
            if($shops->restore()){
                return response()->json(['status'=>true,'message'=>"All Shops restored."]);
            }else {
                return response()->json(['status'=>false,'message'=>"Shops can't restore!"]);
            }
        }
        
    }
}
