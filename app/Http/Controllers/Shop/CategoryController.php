<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{


    public function show(Request $req)
    {
        $user = Auth::user();
        $categories = Category::where('shop_id',$user->shop_id)->get();
        return response()->json([
            'status'=>true,
            'categories'=>$categories
        ]);
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
                return response()->json(['status'=>true,"Category created successfully."]);
            }else {
                return response()->json(['status'=>true,"Category can't created!"]);
            }
        }
    }

    public function update(Request $req)
    {
        $user = Auth::user();
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string',
            'remark' => 'required|string',
            'shop_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            if($user->shop_id == $req->shop_id)
            {
                $category = Category::find($req->id);
                $category->name = $req->name;
                $category->remark = $req->remark;
                if($category->update()){
                    return response()->json(['status'=>true,"Category updated successfully."]);
                }else {
                    return response()->json(['status'=>true,"Category can't updated!"]);
                }
            }
        }
    }

    public function delete(Request $req)
    {
        $user = Auth::user();
        
        if($user->shop_id == $req->shop_id)
        {
            $category = Category::find($req->id);
            if($category->delete())
            {
                return response()->json(['status'=>true,'Message'=>"Category Deleted!"]);
            }
            else
            {
                return response()->json(['status'=>true,'Message'=>"Category can't delete!, Try Again"]);
            }
        }else {
            return response()->json(['status'=>true,'Message'=>"Category can't delete!, Try Again"]);
        }
    }

    public function restore(Request $req)
    {
        $user = Auth::user();
        if($user->shop_id == $req->shop_id)
        {
            $category = Category::withTrashed()->find($req->id);
            if($category->restore()){
                return response()->json(['status'=>true,"Category restored."]);
            }else {
                return response()->json(['status'=>true,"Category can't restore!"]);
            }
        }else {
            return response()->json(['status'=>true,"Category can't restore!"]);
        }
    }
}