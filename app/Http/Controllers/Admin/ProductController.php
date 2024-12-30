<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\ImgXProd;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Producto::with(['imagenes', 'categoria', 'subcategoria'])->get();
        $categories = Categoria::with('subcategorias')->get();
        
        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        $categories = Categoria::with('subcategorias')->get();
        
        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'required|exists:categorias,id',
            'subcategoria' => 'required|exists:subcategorias,id',
            'stock' => 'required|integer|min:0',
            'precio_reg' => 'required|numeric|min:0',
            'precio_ofert' => 'nullable|numeric|min:0',
            'imagenes.*' => 'image|max:2048'
        ]);

        $product = Producto::create($request->except('imagenes'));

        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $image) {
                $path = $image->store('public/productos');
                $product->imagenes()->create([
                    'img' => Storage::url($path)
                ]);
            }
        }

        return redirect()->route('admin.products.index');
    }

    public function edit(Producto $product)
    {
        $categories = Categoria::with('subcategorias')->get();
        
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load('imagenes'),
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Producto $product)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'required|exists:categorias,id',
            'subcategoria' => 'required|exists:subcategorias,id',
            'stock' => 'required|integer|min:0',
            'precio_reg' => 'required|numeric|min:0',
            'precio_ofert' => 'nullable|numeric|min:0',
            'imagenes.*' => 'image|max:2048'
        ]);

        $product->update($request->except('imagenes'));

        if ($request->hasFile('imagenes')) {
            // Eliminar imágenes anteriores
            foreach ($product->imagenes as $image) {
                Storage::delete(str_replace('/storage', 'public', $image->img));
                $image->delete();
            }

            // Guardar nuevas imágenes
            foreach ($request->file('imagenes') as $image) {
                $path = $image->store('public/productos');
                $product->imagenes()->create([
                    'img' => Storage::url($path)
                ]);
            }
        }

        return redirect()->route('admin.products.index');
    }

    public function destroy(Producto $product)
    {
        // Eliminar imágenes
        foreach ($product->imagenes as $image) {
            Storage::delete(str_replace('/storage', 'public', $image->img));
        }
        
        $product->delete();
        
        return redirect()->route('admin.products.index');
    }

    public function removeImage(Producto $product, ImgXProd $image)
    {
        if ($image->id_prod !== $product->id) {
            abort(403);
        }

        try {
            // Eliminar el archivo físico
            Storage::delete(str_replace('/storage', 'public', $image->img));
            
            // Eliminar el registro de la base de datos
            $image->delete();

            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'No se pudo eliminar la imagen');
        }
    }
    
} 