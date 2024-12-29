<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'categoria',
        'subcategoria',
        'nombre',
        'descripcion',
        'stock',
        'ver_act',
        'precio_reg',
        'precio_ofert',
        'act_ofert',
    ];

    // Relación con Categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria');
    }

    // Relación con Subcategoría
    public function subcategoria()
    {
        return $this->belongsTo(Subcategoria::class, 'subcategoria');
    }

    public function carrito()
{
    return $this->hasMany(Prodxcarr::class, 'id_prod');
}
}
