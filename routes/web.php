<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\WelcomeController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('login', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest')->name('login');

// Rutas de productos
Route::get('/cinturones', [ProductController::class, 'cinturones'])
    ->name('products.cinturones');

Route::get('/cadenas', [ProductController::class, 'cadenas'])
    ->name('products.cadenas');

Route::get('/gorros', [ProductController::class, 'gorros'])
    ->name('products.gorros');

Route::get('/otros', [ProductController::class, 'otros'])
    ->name('products.otros');


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

    Route::resource('admin/products', AdminProductController::class)->names([
        'index' => 'admin.products.index',
        'create' => 'admin.products.create',
        'store' => 'admin.products.store',
        'edit' => 'admin.products.edit',
        'update' => 'admin.products.update',
        'destroy' => 'admin.products.destroy',
    ]);

    Route::get('admin/settings', [SettingsController::class, 'index'])
        ->name('admin.settings.index');
    Route::post('admin/settings', [SettingsController::class, 'update'])
        ->name('admin.settings.update');

    // Ruta de logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::post(
        'admin/products/{product}/remove-image/{image}',
        [ProductController::class, 'removeImage']
    )
        ->name('admin.products.remove-image');
});

require __DIR__ . '/auth.php';

