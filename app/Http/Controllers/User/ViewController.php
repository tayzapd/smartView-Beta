<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function items(Request $req)
    {
        $items = Item::join('categories', 'categories.id', '=', 'items.category_id')
            ->where('categories.shop_id', '=', $req->id)
            ->with('category:id,name')
            ->get();
        return response()->json(['status'=>true,'items'=>$items]);
    }
}
