<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Item;
use App\Models\Shop;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Category extends Model
{
    use HasFactory;
    use SoftDeletes,CascadeSoftDeletes;

    protected $cascadeDeletes = ['items'];

    protected $dates = ['deleted_at'];

    protected $with = ['shop'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class,'shop_id','id');
    }
}
