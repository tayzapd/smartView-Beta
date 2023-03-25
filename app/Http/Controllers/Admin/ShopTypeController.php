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
        
        if(Gate::allows('admin-auth',Auth::user())){
            return ShopType::get(['id','name','remark']);
        }

    }
    
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
            'remark' => 'required|string'
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
            }else {
                return response()->json(['status'=>false,"Shop Type can't created!"]);
            }
        }
    }
    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string',
            'remark' => 'required|string'
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
            }else {
                return response()->json(['status'=>false,'message'=>"Shop Type can't updated!"]);
            }
        }
    }
    public function delete(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shop_type = ShopType::find($req->id);
            if($shop_type->delete())
            {
                return response()->json(['status'=>true,'message'=>"ShopType Deleted!"]);
            }
            else
            {
                return response()->json(['status'=>true,'Message'=>"ShopType can't delete!, Try Again"]);
            }
        }
        

    }
    public function trashshow()
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shoptypes = ShopType::onlyTrashed()->get();
            return response()->json(['status'=>true,'shoptypes'=>$shoptypes]);
        }
        


    }
    public function restore(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shop_type = ShopType::withTrashed()->find($req->id);
            if($shop_type->restore()){
                return response()->json(['status'=>true,'message'=>"ShopType restored."]);
            }else {
                return response()->json(['status'=>true,'message'=>"ShopType can't restore!"]);
            }
        }
        
    }

    public function restoreAll(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $shoptypes =Shoptype::onlyTrashed();
            if($shoptypes->restore()){
                return response()->json(['status'=>true,'message'=>"All Shoptypes restored."]);
            }else {
                return response()->json(['status'=>false,'message'=>"Shoptypes can't restore!"]);
            }
        }
        
    }
}
