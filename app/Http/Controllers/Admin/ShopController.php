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
        try {
            $shops = Shop::with('shoptype','township')->get();
            if($shops != null){
                return response()->json(['status'=>true,'shops'=>$shops]);
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }
    
    public function create(Request $req)
    {
        
        try {
            $validator = Validator::make($req->all(), [
                'shop_name' => 'required|string|min:3|max:120',
                'address' => 'required|min:6|max:120',
                'phone' => 'required|min:9|max:120',
                'logo_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'shoptype_id' => 'required',
                'township_id' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            if(Gate::allows('admin-auth',Auth::user())) {
                
                if($req->hasFile('logo_image') && $req->hasFile('bg_images')){
                    
                    $image = $req->file('logo_image');
                    $fileName = time() . '_' . $image->getClientOriginalName();
                    
                    $image->move(public_path('images/shop/logo'),$fileName);
                    $shop = new Shop;
                    $shop->logo_image = $fileName;
                    $shop->shop_name = $req->shop_name;
                    $shop->address = $req->address;
                    $shop->phone = $req->phone;
                    $shop->expired_date = DateTime::createFromFormat('Y-m-d',$req->expired_date);
                    $shop->shoptype_id = $req->shoptype_id;
                    $shop->township_id = $req->township_id;
                    $shop->remark = $req->remark;
                    $images = []; 
                    foreach ($req->file('bg_images') as $image) {
                        $path = $image->move(public_path('images/shop/background'),$image->getClientOriginalName());
                        $images[] = basename($path);
                    }
                    $shop->bg_image = serialize($images);
                    if($shop->save()){
                        return response()->json(['status'=>true,"message"=>"Shop Create Successfully!"]);
                    }
                    return response()->json(['status'=>false,"message"=>"Shop Can't Create,Something was wrong!"]);
                }  
    
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }

    }

    public function update(Request $req)
    {    
        try {
            $validator = Validator::make($req->all(), [
                'shop_name' => 'required|string|min:3|max:120',
                'address' => 'required|min:6|max:120',
                'phone' => 'required|min:9|max:120',
                'shoptype_id' => 'required',
                'township_id' => 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
    
            if(!Gate::allows('admin-auth',Auth::user())){
                return response()->json(['status'=>false,"message"=>"Access denied!"]);
            }
    
            $shop = Shop::find($req->id);
    
            if($req->hasFile('logo_image')){
                File::delete(public_path('/images/shop/logo/'.$shop->old_logo));
                $image = $req->file('logo_image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('/images/shop/logo/'),$fileName);
                $shop->logo_image = $fileName; 
            }
            
            $shop->shop_name = $req->shop_name;
            $shop->address = $req->address;
            $shop->phone = $req->phone;
            $shop->expired_date = DateTime::createFromFormat('Y-m-d',$req->expired_date);
            $shop->shoptype_id = $req->shoptype_id;
            $shop->township_id = $req->township_id;
            $shop->remark = $req->remark;
            if($shop->update()){
                return response()->json(['status'=>true,"message"=>"Shop Updated Successfully!"]);
            }
            return response()->json(['status'=>false,"message"=>"Shop Can't Updated,Something was wrong!"]);
    
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }

    }

    public function delete(Request $req)
    {
        try{
            if(Gate::allows('admin-auth',Auth::user())){
                $shop = Shop::find($req->id);
                if($shop->delete()){
                    return response()->json(['status'=>true,'message'=>"Shop move to trash."]);
                }
                return response()->json(['status'=>true,'message'=>"Shop can't move trash!"]);  
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
        
    }

    public function restore(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $shop = Shop::withTrashed()->find($req->shop_id);
                if($shop->restore()){
                    return response()->json(['status'=>true,'message'=>"Shop restored."]);
                }
                return response()->json(['status'=>true,'message'=>"Shop can't restore!"]);   
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }
    
    public function trashshow()
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $shops = Shop::onlyTrashed()->get();
                return response()->json(['status'=>true,'shops'=>$shops]);
                
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }

    public function restoreAll()
    {
        try{
            if(Gate::allows('admin-auth',Auth::user())){
                $shops =Shop::onlyTrashed();
                if($shops->restore()){
                    return response()->json(['status'=>true,'message'=>"All Shops restored."]);
                }
                return response()->json(['status'=>false,'message'=>"Shops can't restore!"]); 
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }

        
    }


}
