<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\CategoryController; 

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('login', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest')->name('login');

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


Route::middleware(['auth', 'admin'])->group(function () {
    // Ruta principal del admin que usará Admin.tsx
    Route::get('/admin', function () {
        return Inertia::render('Admin');
    })->name('admin.dashboard');

    // Rutas del CRUD de usuarios
    Route::resource('admin/users', UserController::class)->names([
        'index' => 'admin.users.index',
        'create' => 'admin.users.create',
        'store' => 'admin.users.store',
        'edit' => 'admin.users.edit',
        'update' => 'admin.users.update',
        'destroy' => 'admin.users.destroy',
    ]);

    // Rutas de administración de categorías
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::resource('admin/categories', CategoryController::class)->names([
            'index' => 'admin.categories.index',
            'create' => 'admin.categories.create',
            'store' => 'admin.categories.store',
            'edit' => 'admin.categories.edit',
            'update' => 'admin.categories.update',
            'destroy' => 'admin.categories.destroy',
        ]);
    });

    // Ruta de logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

require __DIR__ . '/auth.php';

