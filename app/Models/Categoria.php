<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = ['nombre', 'img'];

    public function subcategorias()
    {
        return $this->hasMany(Subcategoria::class, 'id_cat');
    }
}
