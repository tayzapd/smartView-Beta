<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\Shop;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use  Illuminate\Support\Facades\Gate; 

class ItemController extends Controller
{
    public function show()
    {
        try {
            if(Gate::allows('shop-auth',Auth::user())){
                $shopId = Auth::user()->shop_id; // or whatever the ID of the shop you're interested in is
                $items = Item::whereHas('category', function ($query) use ($shopId) {
                                $query->where('shop_id', $shopId);
                            })
                            ->with('category:id,name')
                            ->get();
        
                foreach ($items as $item) {
                    $item->name = $item->name;
                    $images = @unserialize($item->images); // Unserialize the images field
                    $item->images = $images; // Assign the unserialized array to the images field
                }
        
                if($items != null){
                    return response()->json(['status'=>true,'items'=>$items,Auth::user()]);
                }
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }
        
    }

    public function showOne(Request $req)
    {
        try {
            if(Gate::allows('shop-auth',Auth::user())){
                $shopId = Auth::user()->shop_id; 
                $item = Item::whereHas('category', function ($query) use ($shopId) {
                                $query->where('shop_id', $shopId);
                            })
                            ->with('category:id,name')
                            ->first();
                $item = Item::find($req->id);
                return $item;
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }
        

    }

    public function create(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'price' => 'required|numeric',
                'is_available' => 'required',
                'privacy' => 'required|in:public,private',
                'images'=>'array',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required|string',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            if(Gate::allows('shop-auth',Auth::user())){
                $item = new Item;
                $item->name = $request->name;
                $item->price = $request->price;
                $item->currency = "MMK";
                $item->is_available = json_decode($request->is_available);
                $item->privacy = $request->privacy;
                $item->tag = $request->tag;
                $item->special_range = date('Y-m-d');
                $item->view = 0;
                $item->category_id = $request->category_id;
                $item->description = $request->description;
                $item->remark = $request->remark;
        
    
                $images = [];
            
                foreach ($request->file('images') as $image) {
                    $path = $image->move(public_path('images/shop/item'),$image->getClientOriginalName());
                    $images[] = basename($path);
                }
    
                $item->images = serialize($images);
        
                if($item->save()){
                    return response()->json(['message' => 'Item created successfully'], 201);
                }
    
                return response()->json(['message' => "Item can't created"], 505);
                
            }
        }

        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }


    }

    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'price' => 'required|numeric',
                'is_available' => 'required',
                'privacy' => 'required|in:public,private',
                'tag' => 'required|string',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'special_range' => 'required|date_format:Y-m-d',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required|string',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            if(Gate::allows('shop-auth',Auth::user())){
                $item = Item::findOrFail($request->id);
                $item->name = $request->name;
                $item->price = $request->price;
                $item->is_available = $request->is_available;
                $item->privacy = $request->privacy;
                $item->tag = $request->tag;
                $item->special_range = $request->special_range;
                $item->category_id = $request->category_id;
                $item->description = $request->description;
                $item->remark = $request->remark;
        
                if ($request->hasFile('images')) {
                    $images = unserialize($item->images);
                    foreach ($images as $image) {
                        Storage::delete('public/images/'.$image);
                    }
        
                    $images = [];
                    foreach ($request->images as $image) {
                        $path = $image->store('public/images');
                        $images[] = basename($path);
                    }
                    $item->images = serialize($images);
                }
        
                if($item->update()){
                    return response()->json(['message' => 'Item updated successfully'], 200);
                }else {
                    return response()->json(['message' => "Item can't updated"], 505);
                }
            }
        }

        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }

    }


    public function delete($id)
    {
        try {
            if(Gate::allows('shop-auth',Auth::user())){
                $item = Item::findOrFail($id);
                $item->delete();
                return response()->json(['message' => 'Item deleted successfully'], 200);
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }
    }

    public function restore($id)
    {
        try{
            if(Gate::allows('shop-auth',Auth::user())){
                $item = Item::onlyTrashed()->findOrFail($id);
                $item->restore();
        
                return response()->json(['message' => 'Item restored successfully'], 200);
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"],500); 
        }
        
    }

}
