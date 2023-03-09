<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Division;
use App\Models\Township;
class City extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'division_id',
        'remark'
    ];
    protected $dates = ['deleted_at'];

    protected $with=['division'];

    public function division()
    {
        return $this->belongsTo(Division::class,'division_id','id');
    }

    public function townships()
    {
        return $this->hasMany(Township::class);
    }
}
