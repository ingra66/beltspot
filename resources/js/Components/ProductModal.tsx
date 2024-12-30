import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Button } from "@/shadcn/ui/button";
import { useEffect, useState } from 'react';

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

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    const [showFullImage, setShowFullImage] = useState(false);
    
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/50" 
                        onClick={onClose} 
                    />
                    <div className="relative w-[90%] md:w-auto overflow-hidden flex flex-col md:flex-row">
                        {/* Lado de la imagen */}
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                mass: 1.2
                            }}
                            className="relative w-full md:w-auto bg-white group cursor-pointer overflow-hidden"
                            onClick={() => setShowFullImage(true)}
                        >
                            <motion.img
                                src={product.imagenes[0]?.img}
                                alt={product.nombre}
                                className="w-full h-[250px] md:h-auto md:max-h-[80vh] object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                            </div>
                        </motion.div>

                        {/* Lado del contenido */}
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                mass: 1.2,
                                delay: 0.1
                            }}
                            className="w-full md:w-[400px] bg-gray-200 overflow-hidden"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 md:p-8"
                            >
                                <div>
                                    <h3 className="text-xs text-gray-600 mb-2">BB SIMON</h3>
                                    
                                    <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-900">
                                        {product.nombre}
                                    </h2>
                                    
                                    {product.act_ofert && product.precio_ofert ? (
                                        <>
                                            <p className="text-base md:text-lg text-red-500">
                                                ARS ${product.precio_ofert}
                                            </p>
                                            <p className="text-gray-500 line-through">
                                                ARS ${product.precio_reg}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-base md:text-lg text-gray-900">
                                            ARS ${product.precio_reg}
                                        </p>
                                    )}
                                    
                                    <p className="text-xs md:text-sm text-gray-600 mt-4">
                                        {product.descripcion}
                                    </p>
                                </div>

                                <div className="mt-6 md:mt-8 space-y-4">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button 
                                            className="w-full h-10 md:h-12 bg-white hover:bg-gray-50 text-black border-2 border-black rounded-none text-sm md:text-base"
                                        >
                                            Añadir al carrito
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button 
                                            className="w-full h-10 md:h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-none text-sm md:text-base"
                                        >
                                            Pagar con Mercado Pago
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Botón de cerrar */}
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={onClose}
                            className="absolute right-2 top-2 md:right-4 md:top-4 z-10 p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
                            whileHover={{ rotate: 90, transition: { duration: 0.2 } }}
                        >
                            <X size={20} className="text-gray-600" />
                        </motion.button>
                    </div>

                    {/* Modal de imagen completa */}
                    <AnimatePresence>
                        {showFullImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
                                onClick={() => setShowFullImage(false)}
                            >
                                <motion.img
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    src={product.imagenes[0]?.img}
                                    alt={product.nombre}
                                    className="max-w-full max-h-[90vh] object-contain"
                                    onClick={e => e.stopPropagation()}
                                />
                                <button 
                                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                                    onClick={() => setShowFullImage(false)}
                                >
                                    <X size={32} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );
}