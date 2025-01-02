import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import { Button } from "@/shadcn/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { 
    searchOverlayAnimation, 
    searchResultsAnimation, 
    searchItemAnimation
} from '@/animations';

interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio_reg: number;
    precio_ofert: number | null;
    act_ofert: boolean;
    ver_act: boolean;
    stock: number;
    categoria: {
        id: number;
        nombre: string;
    };
    subcategoria: {
        id: number;
        nombre: string;
    };
    imagenes: {
        id: number;
        img: string;
    }[];
}

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: Product[];
    onProductClick: (product: Product) => void;
}

export default function SearchOverlay({
    isOpen,
    onClose,
    searchQuery,
    setSearchQuery,
    searchResults,
    onProductClick
}: SearchOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        {...searchOverlayAnimation}
                        className="fixed top-0 left-0 right-0 bg-white z-50 border-b shadow-lg"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex items-center justify-between mb-6">
                                <Link 
                                    href="/" 
                                    className="text-3xl font-blue-goblet"
                                    style={{ letterSpacing: '2px' }}
                                >
                                    beltspot
                                </Link>

                                <div className="flex-1 flex items-center mx-8 relative">
                                    <div className="w-full bg-[#f8f8f8] relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Buscar productos..."
                                            className="w-full px-4 py-2 focus:outline-none text-black bg-transparent caret-gray-400"
                                            autoFocus
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClose}
                                    className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <motion.div 
                                {...searchResultsAnimation}
                                className="max-h-[60vh] overflow-y-auto"
                            >
                                {searchResults.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {searchResults.map((product) => (
                                            <motion.div
                                                key={product.id}
                                                {...searchItemAnimation}
                                                onClick={() => onProductClick(product)}
                                                className="flex items-center space-x-4 p-3 cursor-pointer rounded-lg transition-all duration-200 bg-[#fafafa] hover:bg-[#e0e0e0]"
                                            >
                                                <img
                                                    src={product.imagenes[0]?.img}
                                                    alt={product.nombre}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-sm">{product.nombre}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        ${product.act_ofert ? product.precio_ofert : product.precio_reg}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : searchQuery.length > 0 && (
                                    <motion.div 
                                        {...searchResultsAnimation}
                                        className="py-8 text-center text-gray-500"
                                    >
                                        No se encontraron resultados para "{searchQuery}"
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                    
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={onClose}
                    />
                </>
            )}
        </AnimatePresence>
    );
} 