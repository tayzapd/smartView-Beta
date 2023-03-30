<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Shop;
use App\Models\Category;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function items(Request $req)
    {

        $shopId = $req->id;
        $items = Item::whereHas('category', function ($query) use ($shopId) {
                        $query->where('shop_id', $shopId);
                    })
                    ->where('is_available','1')
                    ->with('category:id,name')
                    ->get();

        foreach ($items as $item) {
            $item->name = $item->name;
            $images = @unserialize($item->images); 
            $item->images = $images;
        }

        if($items != null){
            return response()->json(['status'=>true,'items'=>$items]);
        }
    }

    public function itemsSearchByName(Request $req)
    {
        $shopId = $req->shop_id;
        $name   = $req->name;
        $items = Item::whereHas('category', function ($query) use ($shopId) {
                        $query->where('shop_id', $shopId);
                    })
                    ->where('name','LIKE','%'.$name.'%')
                    ->with('category:id,name')
                    ->get();

        foreach ($items as $item) {
            $item->name = $item->name;
            $images = @unserialize($item->images); 
            $item->images = $images;
        }

        if($items != null){
            return response()->json(['status'=>true,'items'=>$items]);
        }
    }

    public function itemsSearchByCategory(Request $req)
    {
        $cate_id= $req->cate_id;
        $items = Item::where('category_id',$cate_id)
                        ->with('category:id,name')
                        ->get();

        foreach ($items as $item) {
            $item->name = $item->name;
            $images = @unserialize($item->images); 
            $item->images = $images;
        }

        if($items != null){
            return response()->json(['status'=>true,'items'=>$items]);
        }
    }

    public function showAll(Request $req)
    {
        $categories =  Category::where('shop_id',$req->shop_id)->get();
        return response()->json([
            'status'=>true,
            'categories'=>$categories

        ]);
    }
    public function getShop(Request $req)
    {
        $shop = Shop::where('id',$req->id)
                    ->with('categories','type','township')
                    ->first();
        $shop->bg_image = @unserialize($shop->bg_image);
        return response()->json(['status'=>true,'shop'=>$shop]);
    }
}
