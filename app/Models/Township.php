<?php

namespace App\Models;

use App\Models\City;
use App\Models\Shop;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Township extends Model
{
    use HasFactory;
    use SoftDeletes,CascadeSoftDeletes;

    protected $cascadeDeletes = ['shops'];

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
