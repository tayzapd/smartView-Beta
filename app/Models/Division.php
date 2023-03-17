<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Division extends Model
{
    use HasFactory;
    use SoftDeletes,CascadeSoftDeletes;
    protected $cascadeDeletes = ['cities'];
    protected $dates = ['deleted_at'];


    public function cities()
    {
        return $this->hasMany(City::class);
    }

}
