<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $offerProducts = Producto::with(['imagenes', 'categoria', 'subcategoria'])
            ->where('ver_act', true)
            ->where('act_ofert', true)
            ->whereNotNull('precio_ofert')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Welcome', [
            'offerProducts' => $offerProducts
        ]);
    }
} 