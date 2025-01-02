import { useContext } from 'react';
import { CartContext } from '@/Contexts/CartContext';

export function useCart() {
    const context = useContext(CartContext);
    
    if (context === undefined) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    
    return context;
} 