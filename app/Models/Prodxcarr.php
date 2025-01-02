<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProdXCarr extends Model
{
    protected $table = 'prodxcarr';

    protected $fillable = [
        'id_prod',
        'id_carr',
        'cantidad',
        'precio'
    ];

    protected $casts = [
        'precio' => 'decimal:2'
    ];

    public function carrito(): BelongsTo
    {
        return $this->belongsTo(Carrito::class, 'id_carr');
    }

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class, 'id_prod');
    }
}

