<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Producto extends Model
{
    protected $table = 'productos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'categoria',
        'subcategoria',
        'stock',
        'precio_reg',
        'precio_ofert',
        'ver_act',
        'act_ofert'
    ];

    protected $casts = [
        'ver_act' => 'boolean',
        'act_ofert' => 'boolean',
        'precio_reg' => 'decimal:2',
        'precio_ofert' => 'decimal:2',
    ];

    // Relación con imágenes
    public function imagenes(): HasMany
    {
        return $this->hasMany(ImgXProd::class, 'id_prod');
    }

    // Relación con categoría
    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class, 'categoria');
    }

    // Relación con subcategoría
    public function subcategoria(): BelongsTo
    {
        return $this->belongsTo(Subcategoria::class, 'subcategoria');
    }
}
