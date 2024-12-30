<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin');
    }

    public function catalog()
    {
        return Inertia::render('Admin/Catalog');
    }

    public function sales()
    {
        return Inertia::render('Admin/Sales');
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }
} 