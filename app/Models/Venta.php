<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'venta';

    protected $fillable = [
        'id_carr',
        'id_user',
        'metodo_pago',
        'total',
        'fecha_vent',
    ];

    /**
     * Relación con el modelo Carrito.
     */
    public function carrito()
    {
        return $this->belongsTo(Carrito::class, 'id_carr');
    }

    /**
     * Relación con el modelo User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
