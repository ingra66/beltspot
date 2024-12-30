<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategoria extends Model
{
    protected $fillable = ['nombre', 'id_cat'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_cat');
    }
}
