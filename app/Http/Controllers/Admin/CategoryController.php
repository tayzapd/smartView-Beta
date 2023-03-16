<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function showAll(Request $req)
    {
        return Category::get();
    }
    
    public function showByShop(Request $req)
    {
        return Category::where('shop_id',$req->shop_id)->get();
    }
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
            'remark' => 'required|string',
            'shop_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            $category = new Category;
            $category->name = $req->name;
            $category->remark = $req->remark;
            $category->shop_id = $req->shop_id;
            if($category->save()){
                return response()->json(['status'=>true,'message'=>"Category created successfully."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Category can't created!"]);
            }
        }
    }
    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string',
            'remark' => 'required|string',
            'shop_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            $category = Category::find($req->id);
            $category->name = $req->name;
            $category->shop_id = $req->shop_id;
            $category->remark = $req->remark;
            if($category->update()){
                return response()->json(['status'=>true,'message'=>"Category updated successfully."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Category can't updated!"]);
            }
        }
    }
    public function delete(Request $req)
    {
        $category = Category::find($req->id);
        if($category->delete())
        {
            return response()->json(['status'=>true,'message'=>"Category Deleted!"]);
        }
        else
        {
            return response()->json(['status'=>true,'message'=>"Category can't delete!, Try Again"]);
        }

    }
    public function restore(Request $req)
    {
        $category = Category::withTrashed()->find($req->id);
        if($category->restore()){
            return response()->json(['status'=>true,"Category restored."]);
        }else {
            return response()->json(['status'=>true,"Category can't restore!"]);
        }
    }
}
