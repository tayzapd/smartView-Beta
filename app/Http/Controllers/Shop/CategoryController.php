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
        try{
            if(Gate::allows('shop-auth',Auth::user())){
                $user = Auth::user();
                $categories = Category::where('shop_id',$user->shop_id)->paginate(8);
                return response()->json([
                    'status'=>true,
                    'categories'=>$categories
                ]);
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
                    $categories = Category::all();
                    return response()->json(['status'=>true,'message'=>"Category created successfully.","categories"=>$categories]);
                }else {
                    return response()->json(['status'=>false,'message'=>"Category can't created!"]);
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
                        $categories = Category::all();
                        return response()->json(['status'=>true,"Category updated successfully.","categories"=>$categories]);
                    }else {
                        return response()->json(['status'=>false,"Category can't updated!"]);
                    }
                }
            }
        } 
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500);
        }
    }

    public function delete(Request $req)
    {
        try {
            if(Gate::allows('shop-auth',Auth::user())){
                $user = Auth::user();
    
                if($user->shop_id == $req->shop_id)
                {
                    $category = Category::find($req->id);
    
                    if($category->delete())
                    {
                        $categories = Category::all();
                        return response()->json(['status'=>true,'Message'=>"Category Deleted!","categories"=>$categories]);
                    }
                    else
                    {
                        return response()->json(['status'=>false,'Message'=>"Category can't delete!, Try Again"]);
                    }
                }else {
                    return response()->json(['status'=>false,'Message'=>"Category can't delete!, Try Again"]);
                }
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }

    }

    public function restore(Request $req)
    {
        try {
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
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }

    }
}
