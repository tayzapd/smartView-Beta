<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Category;
use App\Models\Shoptype;
use App\Models\Township;
use App\Models\Item;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Shop extends Model
{
    use HasFactory;
    use SoftDeletes,CascadeSoftDeletes;

    protected $cascadeDeletes = ['shops'];

    protected $dates = ['deleted_at'];

    protected $with=['shoptype','township'];

    
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
    public function type()
    {
        return $this->belongsTo(Shoptype::class);
    }

    public function township()
    {
        return $this->belongsTo(Township::class,'township_id','id');
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function shoptype(){
        return $this->belongsTo(Shoptype::class,'shoptype_id','id');
    }
}
