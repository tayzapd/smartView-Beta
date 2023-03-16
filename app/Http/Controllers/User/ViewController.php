<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Shop;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function items(Request $req)
    {

        $shopId = $req->id;
        $items = Item::whereHas('category', function ($query) use ($shopId) {
                        $query->where('shop_id', $shopId);
                    })
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
        $shopId = $req->id;
        $name   = $req->name;
        $cate_id   = $req->cate_id;
        $items = Item::whereHas('category', function ($query) use ($shopId,$cate_id) {
                        $query->where('shop_id', $shopId);
                        $query->where('id', $cate_id);
                    })
                    ->where('name',$name)
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

    public function getShop(Request $req)
    {
        $shop = Shop::where('id',$req->id)
                    ->with('categories','type','township')
                    ->first();
        return response()->json(['status'=>true,'shop'=>$shop]);
    }
}
