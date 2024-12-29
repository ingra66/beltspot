<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategoria extends Model
{
    use HasFactory;

    protected $fillable = ['id_cat', 'img'];

    // Relación con Categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_cat');
    }

    // Relación con Productos
    public function productos()
    {
        return $this->hasMany(Producto::class, 'subcategoria');
    }
}
