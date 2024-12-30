<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function cinturones()
    {
        $products = Producto::with(['imagenes', 'categoria', 'subcategoria'])
            ->whereHas('categoria', function($query) {
                $query->where('nombre', 'Cinturones');
            })
            ->where('ver_act', true)
            ->get();
        
        return Inertia::render('Products/Cinturones', [
            'products' => $products
        ]);
    }

    public function cadenas()
    {
        $products = Producto::with(['imagenes', 'categoria', 'subcategoria'])
            ->whereHas('categoria', function($query) {
                $query->where('nombre', 'Cadenas');
            })
            ->where('ver_act', true)
            ->get();
        
        return Inertia::render('Products/Cadenas', [
            'products' => $products
        ]);
    }

    public function otros()
    {
        $products = Producto::with(['imagenes', 'categoria', 'subcategoria'])
            ->whereHas('categoria', function($query) {
                $query->whereNotIn('nombre', ['Cinturones', 'Cadenas', 'Gorros'])
                    ->where('ver_act', true);
            })
            ->where('ver_act', true)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Products/Otros', [
            'products' => $products
        ]);
    }

    public function gorros()
    {
        $products = Producto::with(['imagenes', 'categoria', 'subcategoria'])
            ->whereHas('categoria', function($query) {
                $query->where('nombre', 'Gorros');
            })
            ->where('ver_act', true)
            ->get();
        
        return Inertia::render('Products/Gorros', [
            'products' => $products
        ]);
    }

    public function getOffersProducts()
    {
        $products = Producto::with(['imagenes', 'categoria', 'subcategoria'])
            ->where('ver_act', true)
            ->where('act_ofert', true)
            ->whereNotNull('precio_ofert')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return $products;
    }

    // Métodos similares para gorros y otros...
} 