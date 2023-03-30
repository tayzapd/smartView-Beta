<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
class CategoryController extends Controller
{


    public function show(Request $req)
    {
        if(Gate::allows('shop-auth',Auth::user())){
            $user = Auth::user();
            $categories = Category::where('shop_id',$user->shop_id)->paginate(8);
            return response()->json([
                'status'=>true,
                'categories'=>$categories
            ]);
        }
    }
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        if(Gate::allows('shop-auth',Auth::user())) {
            $category = new Category;
            $category->name = $req->name;
            $category->remark = $req->remark;
            $category->shop_id = Auth::user()->shop_id;
            if($category->save()){
                return response()->json(['status'=>true,'message'=>"Category created successfully."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Category can't created!"]);
            }
        }
    }

    public function update(Request $req)
    {
        $user = Auth::user();
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string',
            'shop_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        
        if(Gate::allows('shop-auth',Auth::user())){
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
        if(Gate::allows('shop-auth',Auth::user())){
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
        
    }

    public function restore(Request $req)
    {
        if(Gate::allows('shop-auth',Auth::user())){
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
}
