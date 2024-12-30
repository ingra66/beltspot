<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;

    protected $table = 'carrito';

    protected $fillable = [
        'id_user',
        'fech_inicio',
        'fech_actu',
        'estado',
        'metodo_pago',
        'precio_total',
    ];

    /**
     * Relación con los productos en el carrito.
     */
    public function productos()
    {
        return $this->hasMany(Prodxcarr::class, 'id_carr');
    }

    /**
     * Relación con el usuario dueño del carrito.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    
    /**
    * Relación con la tabla Venta.
    */
    public function ventas()
    {
        return $this->hasOne(Venta::class, 'id_carr');
    }

}
