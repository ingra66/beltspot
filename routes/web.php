<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta principal con nombre 'home'
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Rutas de productos
Route::get('/cinturones', function () {
    return Inertia::render('Products/Cinturones');
})->name('products.cinturones');

Route::get('/cadenas', function () {
    return Inertia::render('Products/Cadenas');
})->name('products.cadenas');

Route::get('/gorros', function () {
    return Inertia::render('Products/Gorros');
})->name('products.gorros');

Route::get('/otros', function () {
    return Inertia::render('Products/Otros');
})->name('products.otros');

require __DIR__ . '/auth.php';
