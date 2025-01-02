import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen: string;
}

interface CartContextType {
    items: CartItem[];
    loading: boolean;
    addToCart: (product: any, quantity: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => void;
    removeItem: (itemId: number) => void;
    refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Cargar carrito desde localStorage al inicio
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
        setLoading(false);
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = async (product: any, quantity: number) => {
        try {
            const newItem: CartItem = {
                id: product.id,
                nombre: product.nombre,
                precio: product.act_ofert ? product.precio_ofert : product.precio_reg,
                cantidad: quantity,
                imagen: product.imagenes[0]?.img || ''
            };

            setItems(currentItems => {
                const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
                
                if (existingItemIndex > -1) {
                    // Actualizar cantidad si el producto ya existe
                    const updatedItems = [...currentItems];
                    updatedItems[existingItemIndex].cantidad += quantity;
                    return updatedItems;
                }
                
                // Agregar nuevo item si no existe
                return [...currentItems, newItem];
            });

        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            throw error;
        }
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        setItems(currentItems => 
            currentItems.map(item => 
                item.id === itemId 
                    ? { ...item, cantidad: quantity }
                    : item
            )
        );
    };

    const removeItem = (itemId: number) => {
        setItems(currentItems => 
            currentItems.filter(item => item.id !== itemId)
        );
    };

    const refreshCart = async () => {
        // Esta función ahora solo actualiza el estado desde localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    };

    return (
        <CartContext.Provider value={{
            items,
            loading,
            addToCart,
            updateQuantity,
            removeItem,
            refreshCart
        }}>
            {children}
        </CartContext.Provider>
    );
} 