<?php

use Illuminate\Support\Facades\Route;


use App\Models\Item;


// Route::get('/{any}', function(){
//     return view('welcome');
// })->where('any', '.*');

Route::get('/test',function(){
    return Item::join('categories', 'categories.id', '=', 'items.category_id')
            ->where('categories.shop_id', '=', 1)
            ->get();
});
