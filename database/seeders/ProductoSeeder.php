<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Categoria;

class ProductoSeeder extends Seeder
{
    public function run()
    {
        $categorias = Categoria::with('subcategorias')->get();

        foreach ($categorias as $categoria) {
            for ($i = 1; $i <= 5; $i++) {
                $subcategoria = $categoria->subcategorias->random();
                
                Producto::create([
                    'nombre' => "{$categoria->nombre} Premium {$i}",
                    'descripcion' => "Descripción detallada del {$categoria->nombre} Premium {$i}",
                    'categoria' => $categoria->id,
                    'subcategoria' => $subcategoria->id,
                    'stock' => rand(10, 100),
                    'precio_reg' => rand(2000, 10000),
                    'precio_ofert' => rand(1500, 8000),
                    'ver_act' => true,
                    'act_ofert' => (bool)rand(0, 1)
                ]);
            }
        }
    }
} 