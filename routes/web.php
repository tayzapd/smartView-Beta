<?php

use Illuminate\Support\Facades\Route;


use App\Models\Item;


Route::get('/{any}', function(){
    return view('welcome');
})->where('any', '.*');

