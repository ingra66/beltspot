<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'img'];

    // Relación con Subcategorias
    public function subcategorias()
    {
        return $this->hasMany(Subcategoria::class, 'id_cat');
    }
    public function productos()
    {
        return $this->hasMany(Producto::class, 'categoria');
    }
}
