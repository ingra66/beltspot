<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Producto;
use App\Http\Controllers\CarritoController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/search', function (Request $request) {
    $query = $request->input('query');

    return Producto::where(function ($q) use ($query) {
        $q->where('nombre', 'LIKE', '%' . $query . '%')
            ->orWhere('descripcion', 'LIKE', '%' . $query . '%')
            ->orWhereHas('categoria', function ($q) use ($query) {
                $q->where('nombre', 'LIKE', '%' . $query . '%');
            })
            ->orWhereHas('subcategoria', function ($q) use ($query) {
                $q->where('nombre', 'LIKE', '%' . $query . '%');
            });
    })
        ->where('ver_act', true)
        ->with(['categoria', 'subcategoria', 'imagenes'])
        ->limit(6)
        ->get();
});

// Rutas protegidas del carrito
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CarritoController::class, 'getCart']);
    Route::post('/cart/add', [CarritoController::class, 'addToCart']);
    Route::put('/cart/update-quantity', [CarritoController::class, 'updateQuantity']);
    Route::delete('/cart/remove-item', [CarritoController::class, 'removeItem']);
});