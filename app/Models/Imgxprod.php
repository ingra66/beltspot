<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImgXProd extends Model
{
    protected $table = 'imgxprod';

    protected $fillable = [
        'id_prod',
        'img'
    ];

    // Relación con producto
    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class, 'id_prod');
    }
}

