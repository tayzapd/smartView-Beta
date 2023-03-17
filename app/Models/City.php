<?php

namespace App\Models;

use App\Models\Division;
use App\Models\Township;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends Model
{
    use HasFactory;
    use SoftDeletes,CascadeSoftDeletes;
    protected $fillable = [
        'name',
        'division_id',
        'remark'
    ];

    protected $cascadeDeletes = ['townships'];

    protected $dates = ['deleted_at'];

    protected $with=['division'];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function townships()
    {
        return $this->hasMany(Township::class);
    }
}
