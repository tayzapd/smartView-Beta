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

    protected $with=['city'];

    public function city() 
    {
        return $this->belongsTo(City::class,'city_id','id');
    }

    public function shops()
    {
        return $this->hasMany(Shop::class);
    }
}
