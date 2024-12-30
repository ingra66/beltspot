<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Subcategoria;

class CategoriaSeeder extends Seeder
{
    public function run()
    {
        $categorias = [
            [
                'nombre' => 'Cinturones',
                'subcategorias' => ['Cuero', 'Sintético', 'Deportivo', 'Formal', 'Casual']
            ],
            [
                'nombre' => 'Cadenas',
                'subcategorias' => ['Oro', 'Plata', 'Acero', 'Fantasía', 'Personalizadas']
            ],
            [
                'nombre' => 'Gorros',
                'subcategorias' => ['Beanie', 'Snapback', 'Bucket', 'Deportivos', 'Invierno']
            ],
            [
                'nombre' => 'Relojes',
                'subcategorias' => ['Digital', 'Análogo', 'Smartwatch', 'Deportivo', 'Lujo']
            ],
            [
                'nombre' => 'Accesorios',
                'subcategorias' => ['Billeteras', 'Llaveros', 'Pulseras', 'Anillos', 'Otros']
            ]
        ];

        foreach ($categorias as $cat) {
            $categoria = Categoria::create([
                'nombre' => $cat['nombre']
            ]);

            foreach ($cat['subcategorias'] as $subcat) {
                Subcategoria::create([
                    'nombre' => $subcat,
                    'id_cat' => $categoria->id
                ]);
            }
        }
    }
} 