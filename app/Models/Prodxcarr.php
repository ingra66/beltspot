<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodxcarr extends Model
{
    use HasFactory;

    protected $table = 'prodxcarr';

    protected $fillable = [
        'id_prod',
        'id_carr',
        'cantidad',
        'precio',
    ];

    /**
     * Relación con el modelo Producto.
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_prod');
    }

    /**
     * Relación con el modelo Carrito.
     */
    public function carrito()
    {
        return $this->belongsTo(Carrito::class, 'id_carr');
    }
}

