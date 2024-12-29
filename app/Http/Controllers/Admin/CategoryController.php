<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Subcategoria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Categoria::with('subcategorias')->get();
        
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'img' => 'nullable|image|max:2048',
            'subcategorias.*.nombre' => 'required|string|max:255',
        ]);

        $category = new Categoria();
        $category->nombre = $request->nombre;

        if ($request->hasFile('img')) {
            $path = $request->file('img')->store('public/categorias');
            $category->img = Storage::url($path);
        }

        $category->save();

        if ($request->has('subcategorias')) {
            foreach ($request->subcategorias as $subData) {
                Subcategoria::create([
                    'id_cat' => $category->id,
                    'nombre' => $subData['nombre']
                ]);
            }
        }

        return redirect()->route('admin.categories.index')
            ->with('message', 'Categoría creada exitosamente');
    }

    public function edit(Categoria $category)
    {
        $category->load('subcategorias');
        
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Categoria $category)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'img' => 'nullable|image|max:2048',
            'subcategorias.*.nombre' => 'required|string|max:255',
        ]);

        $category->nombre = $request->nombre;

        if ($request->hasFile('img')) {
            if ($category->img) {
                Storage::delete(str_replace('/storage/', 'public/', $category->img));
            }
            
            $path = $request->file('img')->store('public/categorias');
            $category->img = Storage::url($path);
        }

        $category->save();

        // Actualizar subcategorías
        $currentSubcategorias = $category->subcategorias->pluck('id')->toArray();
        $newSubcategorias = collect($request->subcategorias)->pluck('id')->filter()->toArray();
        
        // Eliminar subcategorías que ya no existen
        $toDelete = array_diff($currentSubcategorias, $newSubcategorias);
        Subcategoria::whereIn('id', $toDelete)->delete();

        // Actualizar o crear subcategorías
        foreach ($request->subcategorias as $subData) {
            if (isset($subData['id']) && $subData['id'] > 0) {
                Subcategoria::where('id', $subData['id'])->update([
                    'nombre' => $subData['nombre']
                ]);
            } else {
                Subcategoria::create([
                    'id_cat' => $category->id,
                    'nombre' => $subData['nombre']
                ]);
            }
        }

        return redirect()->route('admin.categories.index')
            ->with('message', 'Categoría actualizada exitosamente');
    }

    public function destroy(Categoria $category)
    {
        // Eliminar imágenes
        if ($category->img) {
            Storage::delete(str_replace('/storage/', 'public/', $category->img));
        }

        foreach ($category->subcategorias as $subcategoria) {
            if ($subcategoria->img) {
                Storage::delete(str_replace('/storage/', 'public/', $subcategoria->img));
            }
        }

        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('message', 'Categoría eliminada exitosamente');
    }
} 