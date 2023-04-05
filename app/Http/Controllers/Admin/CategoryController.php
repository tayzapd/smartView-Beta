<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function showAll(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            return Category::get();
        }
        
    }
    
    public function showByShop(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            return Category::where('shop_id',$req->shop_id)->get();
        }
        
    }
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|min:3|max:120',
            'shop_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        if(Gate::allows('admin-auth',Auth::user())) {
            $category = new Category;
            $category->name = $req->name;
            $category->remark = $req->remark;
            $category->shop_id = $req->shop_id;
            if($category->save()){
                return response()->json(['status'=>true,'message'=>"Category created successfully."]);
            }
            
            return response()->json(['status'=>true,'message'=>"Category can't created!"]);
            
        }
    }
    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string|min:3|max:120',
            'shop_id' => 'required',
            'remark'=>'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        if(Gate::allows('admin-auth',Auth::user())) {
            $category = Category::find($req->id);
            $category->name = $req->name;
            $category->shop_id = $req->shop_id;
            $category->remark = $req->remark;
            if($category->update()){
                return response()->json(['status'=>true,'message'=>"Category updated successfully."]);
            }
            
            return response()->json(['status'=>true,'message'=>"Category can't updated!"]);
            
        }
    }

    public function trashshow()
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $categories = Category::onlyTrashed()->get();
            return response()->json(['status'=>true,'categories'=>$categories]);
            
        }
    }

    public function delete(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $category = Category::find($req->id);
            if($category->delete())
            {
                return response()->json(['status'=>true,'message'=>"Category Deleted!"]);
            }
            return response()->json(['status'=>true,'message'=>"Category can't delete!, Try Again"]);
            
        }
        

    }
    
    public function restore(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $category = Category::withTrashed()->find($req->id);
            if($category->restore()){
                return response()->json(['status'=>true,'message'=>"Category restored."]);
            }
            
            return response()->json(['status'=>true,'message'=>"Category can't restore!"]);
            
        }
        
    }

    public function restoreAll(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $categories = Category::onlyTrashed();
            if($categories->restore()){
                return response()->json(['status'=>true,'message'=>"All Categories restored."]);
            }
            
            return response()->json(['status'=>false,'message'=>"Category can't restore!"]);
            
        }
        
    }
}
