<?php

namespace App\Http\Controllers\Admin;

use App\Models\Shop;
use App\Models\ShopType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class ShopTypeController extends Controller
{
    public function show(Request $req)
    {
        
        return ShopType::get(['id','name','remark']);

    }
    
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
            'remark' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
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
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            $shop_type = ShopType::find($req->id);
            $shop_type->name = $req->name;
            $shop_type->remark = $req->remark;
            if($shop_type->update()){
                return response()->json(['status'=>true,"Shop Type updated successfully."]);
            }else {
                return response()->json(['status'=>true,"Shop Type can't updated!"]);
            }
        }
    }
    public function delete(Request $req)
    {
        $shop_type = ShopType::find($req->id);
        if($shop_type->delete())
        {
            return response()->json(['status'=>true,'Message'=>"ShopType Deleted!"]);
        }
        else
        {
            return response()->json(['status'=>true,'Message'=>"ShopType can't delete!, Try Again"]);
        }

    }
    public function trashshow(){
        $shoptypes = ShopType::onlyTrashed()->get();
        return response()->json(['status'=>true,'shoptypes'=>$shoptypes]);


    }
    public function restore($id)
    {
        $shop_type = ShopType::withTrashed()->find($id);
        if($shop_type->restore()){
            return response()->json(['status'=>true,"ShopType restored."]);
        }else {
            return response()->json(['status'=>true,"ShopType can't restore!"]);
        }
    }
}
