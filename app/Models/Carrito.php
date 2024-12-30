<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carrito extends Model
{
    protected $table = 'carrito';

    protected $fillable = [
        'id_user',
        'fech_inicio',
        'fech_actu',
        'estado',
        'metodo_pago',
        'precio_total'
    ];

    protected $casts = [
        'fech_inicio' => 'datetime',
        'fech_actu' => 'datetime',
        'precio_total' => 'decimal:2'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function items(): HasMany
    {
        return $this->hasMany(ProdXCarr::class, 'id_carr');
    }
}
