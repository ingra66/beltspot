<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    protected $redirectTo = '/admin';

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ], [
                'email.required' => 'El correo electrónico es requerido.',
                'email.email' => 'El correo electrónico debe ser válido.',
                'password.required' => 'La contraseña es requerida.',
            ]);

            if (!Auth::attempt($request->only('email', 'password'))) {
                \Log::info('Intento de login fallido para: ' . $request->email);
                
                return response()->json([
                    'errors' => [
                        'email' => ['Las credenciales ingresadas son incorrectas.']
                    ]
                ], 422);
            }

            $request->session()->regenerate();
            \Log::info('Login exitoso para: ' . $request->email);

            if (Auth::user()->is_admin) {
                return redirect()->intended('/admin');
            }

            return redirect()->intended('/');
        } catch (\Exception $e) {
            \Log::error('Error inesperado: ' . $e->getMessage());
            return response()->json([
                'errors' => [
                    'email' => ['Error al procesar la solicitud.']
                ]
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
