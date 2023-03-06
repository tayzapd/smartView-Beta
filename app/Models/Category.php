<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Item;
use App\Models\Shop;
class Category extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
