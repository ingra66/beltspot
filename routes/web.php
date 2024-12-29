<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('login', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest')->name('login');

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

    // Ruta de logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

Route::get('/cinturones', function () {
    return Inertia::render('Cinturones');
})->name('products.belts');

require __DIR__.'/auth.php';

