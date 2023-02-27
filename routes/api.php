<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(AuthController::class)->group(function(){
    Route::post('/login',"login");
});

Route::prefix('admin')->group(function(){
    
    Route::prefix('shoptypes')->controller(ShopTypeController::class)->group(function() {
        Route::get('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::delete('delete/{id}','delete');
        Route::get('trashshow','trashshow');
        Route::post('restore/{id}','restore');
    });

    Route::prefix('divisions')->controller(DivisionController::class)->group(function() {
        Route::get('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('cities')->controller(CityController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('townships')->controller(TownshipController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('shops')->controller(ShopController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('categories')->controller(CategoryController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('items')->controller(ItemController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });
});





