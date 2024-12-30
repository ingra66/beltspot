<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\ProdXCarr;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarritoController extends Controller
{
    public function getCart()
    {
        $carrito = Carrito::where('id_user', Auth::id())
            ->where('estado', 'activo')
            ->with(['items.producto.imagenes'])
            ->first();

        if (!$carrito) {
            return response()->json([
                'items' => []
            ]);
        }

        $items = $carrito->items->map(function ($item) {
            return [
                'id' => $item->id,
                'nombre' => $item->producto->nombre,
                'precio' => $item->precio,
                'cantidad' => $item->cantidad,
                'imagen' => $item->producto->imagenes->first()->img ?? null
            ];
        });

        return response()->json([
            'items' => $items
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1'
        ]);

        $carrito = Carrito::firstOrCreate(
            [
                'id_user' => Auth::id(),
                'estado' => 'activo'
            ],
            [
                'fech_inicio' => now(),
                'fech_actu' => now()
            ]
        );

        $producto = Producto::findOrFail($request->producto_id);

        $item = ProdXCarr::updateOrCreate(
            [
                'id_carr' => $carrito->id,
                'id_prod' => $producto->id
            ],
            [
                'cantidad' => $request->cantidad,
                'precio' => $producto->act_ofert ? $producto->precio_ofert : $producto->precio_reg
            ]
        );

        $this->updateCartTotal($carrito);

        return response()->json([
            'message' => 'Producto agregado al carrito'
        ]);
    }

    public function updateQuantity(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:prodxcarr,id',
            'cantidad' => 'required|integer|min:1'
        ]);

        $item = ProdXCarr::findOrFail($request->item_id);
        $item->cantidad = $request->cantidad;
        $item->save();

        $this->updateCartTotal($item->carrito);

        return response()->json([
            'message' => 'Cantidad actualizada'
        ]);
    }

    public function removeItem(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:prodxcarr,id'
        ]);

        $item = ProdXCarr::findOrFail($request->item_id);
        $carrito = $item->carrito;
        $item->delete();

        $this->updateCartTotal($carrito);

        return response()->json([
            'message' => 'Producto eliminado del carrito'
        ]);
    }

    private function updateCartTotal(Carrito $carrito)
    {
        $total = $carrito->items->sum(function ($item) {
            return $item->precio * $item->cantidad;
        });

        $carrito->precio_total = $total;
        $carrito->fech_actu = now();
        $carrito->save();
    }
} 