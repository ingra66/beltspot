<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($category)
    {
        $categoryConfig = config("categories.{$category}");
        
        if (!$categoryConfig) {
            abort(404);
        }

        if ($category === 'otros') {
            // Obtener IDs de las categorías principales que queremos excluir
            $excludeCategoryIds = Categoria::whereIn('nombre', ['Cinturones', 'Cadenas', 'Gorros'])
                ->pluck('id');

            // Obtener productos que NO estén en esas categorías
            $products = Producto::whereNotIn('categoria', $excludeCategoryIds)
                ->where('ver_act', true)
                ->with(['imagenes'])
                ->get();
        } else {
            // Lógica original para las demás categorías
            $categoriaId = Categoria::where('nombre', 'like', '%' . ucfirst($category) . '%')
                ->first()
                ->id;

            $products = Producto::where('categoria', $categoriaId)
                ->where('ver_act', true)
                ->with(['imagenes'])
                ->get();
        }

        return Inertia::render('Products/ProductPage', [
            'products' => $products,
            'category' => $categoryConfig
        ]);
    }
} 