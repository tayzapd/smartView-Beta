<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\City;
use App\Models\Shop;
use Illuminate\Database\Eloquent\SoftDeletes;
class Township extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function city() 
    {
        return $this->belongsTo(City::class);
    }

    public function shops()
    {
        return $this->hasMany(Shop::class);
    }
}
