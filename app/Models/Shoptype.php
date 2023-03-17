<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shoptype extends Model
{
    use HasFactory;
    use SoftDeletes,CascadeSoftDeletes;

    protected $cascadeDeletes = ['shops'];

    protected $dates = ['deleted_at'];

    public function shops()
    {
        return $this->hasMany(Shop::class);
    }
}
