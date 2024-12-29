import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Button } from "@/shadcn/ui/button";
import { useEffect, useState } from 'react';

interface Belt {
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    size: string;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Belt | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [showFullImage, setShowFullImage] = useState(false);
    const sizes = [90, 95, 100, 105, 110, 115];

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-black/50" 
                        onClick={onClose} 
                    />
                    <div className="relative w-[90%] md:w-auto overflow-hidden flex flex-col md:flex-row">
                        {/* Image Side */}
                        <motion.div 
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ 
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.1 
                            }}
                            className="relative w-full md:w-auto bg-white group cursor-pointer overflow-hidden"
                            onClick={() => setShowFullImage(true)}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-[250px] md:h-auto md:max-h-[80vh] object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div 
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ 
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.2
                            }}
                            className="w-full md:w-[400px] bg-gray-200 overflow-hidden"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="p-4 md:p-8"
                            >
                                <div>
                                    <h3 className="text-xs text-gray-600 mb-2">BB SIMON</h3>
                                    <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-900">
                                        {product.title}
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-900">
                                        {product.price}
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-6 md:mt-8">
                                    <h3 className="text-sm font-medium mb-3 text-gray-900">TAMAÑO DEL CINTURÓN</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {sizes.map((size) => (
                                            <motion.button
                                                key={size}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedSize(size)}
                                                className={`py-2 md:py-3 text-xs md:text-sm border ${
                                                    selectedSize === size 
                                                    ? 'border-black bg-black text-white' 
                                                    : 'border-gray-300 hover:border-gray-400 bg-white'
                                                }`}
                                            >
                                                {size}cm
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-8">
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

                        {/* Close button */}
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            onClick={onClose}
                            className="absolute right-2 top-2 md:right-4 md:top-4 z-10 p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
                            whileHover={{ rotate: 90 }}
                        >
                            <X size={20} className="text-gray-600" />
                        </motion.button>
                    </div>

                    {/* Full image modal */}
                    <AnimatePresence>
                        {showFullImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
                                onClick={() => setShowFullImage(false)}
                            >
                                <motion.img
                                    initial={{ scale: 0.9, y: 50 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 50 }}
                                    transition={{ duration: 0.8 }}
                                    src={product.image}
                                    alt={product.title}
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