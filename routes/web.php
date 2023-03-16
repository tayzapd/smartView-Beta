<?php

use Illuminate\Support\Facades\Route;


use App\Models\Item;
use Illuminate\Support\Facades\Hash;
Route::get('/{any}', function(){
    return view('welcome');
})->where('any', '.*');
