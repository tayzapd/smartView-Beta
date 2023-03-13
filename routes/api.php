<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\CityController as AdminCityController;
use App\Http\Controllers\Admin\DivisionController as AdminDivisionController;
use App\Http\Controllers\Admin\ShopController as AdminShopController;
use App\Http\Controllers\Admin\TownshipController as AdminTownShipController;
use App\Http\Controllers\Admin\UsersController as AdminUserController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\ShopTypeController as AdminShopTypeController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Shop\CategoryController;
use App\Http\Controllers\Shop\ItemController;
use App\Http\Controllers\Shop\UserController;
use App\Http\Controllers\Shop\ShopController;
use App\Http\Controllers\User\ViewController;
use App\Models\Division;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(AuthController::class)->group(function(){
    Route::post('/login',"login");
    Route::post('admin/login','AdminLogin');
});
Route::prefix('user')->group(function(){
    Route::prefix('shop')->controller(ViewController::class)->group(function(){
        Route::post('info','getShop');
        Route::post('items','items');
    });

    Route::prefix('items')->controller(ViewController::class)->group(function(){
        Route::post('get','get');
    });
});



Route::prefix('admin')->group(function(){
    
    Route::prefix('shoptypes')->controller(AdminShopTypeController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::delete('delete/{id}','delete');
        Route::get('trashshow','trashshow');
        Route::post('restore/{id}','restore');
    });

    Route::prefix('divisions')->controller(AdminDivisionController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('cities')->controller(AdminCityController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('townships')->controller(AdminTownshipController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('shops')->controller(AdminShopController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('categories')->controller(AdminCategoryController::class)->group(function() {
        Route::post('showAll','showAll');
        Route::post('show','showByShop');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('items')->controller(AdminItemController::class)->group(function() {
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });
});


Route::prefix('shop')->middleware('auth:sanctum')->group(function(){
    
    Route::prefix('items')->controller(ItemController::class)->group(function(){
        Route::post('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('info')->controller(ShopController::class)->group(function(){
        Route::post('show','show');
        Route::post('update','update');
    });

    Route::prefix('category')->controller(CategoryController::class)->group(function(){

        Route::get('show','show');
        Route::post('create','create');
        Route::post('update','update');
        Route::post('delete','delete');
        Route::post('restore','restore');
    });

    Route::prefix('users')->controller(UserController::class)->group(function(){
        Route::post('show','show');
    });

    
});