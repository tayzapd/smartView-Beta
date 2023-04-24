<?php

namespace App\Http\Controllers\Admin;

use App\Models\Shop;
use App\Models\Shoptype;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ShopTypeController extends Controller
{
    public function show(Request $req)
    {
        
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                return ShopType::orderBy('id','DESC')->get();
            }
        } catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }

    }
    
    public function create(Request $req)
    {
        try {
            $validator = Validator::make($req->all(), [
                'name' => 'required|string|min:3|max:120',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            if(Gate::allows('admin-auth',Auth::user())) {
                $shop_type = new ShopType;
                $shop_type->name = $req->name;
                $shop_type->remark = $req->remark;
                if($shop_type->save()){
                    return response()->json(['status'=>true,'message'=>"Shop Type created successfully."]);
                }
                
                return response()->json(['status'=>false,"Shop Type can't created!"]);
                
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
                'id'=> 'required',
                'name' => 'required|string|min:3|max:120',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()],400);
            }
            if(Gate::allows('admin-auth',Auth::user())) {
                $shop_type = ShopType::find($req->id);
                $shop_type->name = $req->name;
                $shop_type->remark = $req->remark;
                if($shop_type->update()){
                    return response()->json(['status'=>true,'message'=>"Shop Type updated successfully."]);
                }
                
                return response()->json(['status'=>false,'message'=>"Shop Type can't updated!"]);
                
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }


    public function delete(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $shop_type = ShopType::find($req->id);
                if($shop_type->delete())
                {
                    return response()->json(['status'=>true,'message'=>"ShopType Deleted!"]);
                }
                return response()->json(['status'=>true,'Message'=>"ShopType can't delete!, Try Again"]);
                
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
                $shoptypes = ShopType::onlyTrashed()->get();
                return response()->json(['status'=>true,'shoptypes'=>$shoptypes]);
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
                $shop_type = ShopType::withTrashed()->find($req->id);
                if($shop_type->restore()){
                    return response()->json(['status'=>true,'message'=>"ShopType restored."]);
                }
                
                return response()->json(['status'=>true,'message'=>"ShopType can't restore!"]);
                
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
        
    }

    public function restoreAll(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $shoptypes =Shoptype::onlyTrashed();
                if($shoptypes->restore()){
                    return response()->json(['status'=>true,'message'=>"All Shoptypes restored."]);
                }
                
                return response()->json(['status'=>false,'message'=>"Shoptypes can't restore!"]);
                
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
        
    }
}
