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

        $shopId = $req->id; // or whatever the ID of the shop you're interested in is
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

        foreach ($items as $item) {
            $images = @unserialize($item->images); // Unserialize the images field
            $item->images = $images; // Assign the unserialized array to the images field
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
