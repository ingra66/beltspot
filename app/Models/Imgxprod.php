<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imgxprod extends Model
{
    use HasFactory;

    protected $table = 'imgxprod';

    // Campos asignables de manera masiva
    protected $fillable = [
        'id_prod',
        'img',
    ];

    /**
     * Relación con el modelo Producto.
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_prod');
    }
}

