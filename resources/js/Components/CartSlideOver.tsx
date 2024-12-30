import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from "@/shadcn/ui/button";

interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen: string;
}

interface CartSlideOverProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
}

export default function CartSlideOver({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartSlideOverProps) {
    const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-50"
                        onClick={onClose}
                    />

                    {/* Cart panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-lg font-medium">Carrito</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Cart items */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {items.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">
                                        Tu carrito está vacío
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                            <img 
                                                src={item.imagen} 
                                                alt={item.nombre}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.nombre}</h3>
                                                <p className="text-gray-600">${item.precio}</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <button 
                                                        onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                        disabled={item.cantidad <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span>{item.cantidad}</span>
                                                    <button 
                                                        onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => onRemoveItem(item.id)}
                                                className="p-2 hover:bg-gray-100 rounded"
                                            >
                                                <Trash2 className="w-5 h-5 text-red-500" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            <div className="border-t p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Total</span>
                                    <span className="font-medium">${total.toFixed(2)}</span>
                                </div>
                                <Button 
                                    className="w-full h-12 bg-black hover:bg-gray-800 text-white"
                                    disabled={items.length === 0}
                                >
                                    Finalizar compra
                                </Button>
                                <Button 
                                    className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white"
                                    disabled={items.length === 0}
                                >
                                    Pagar con Mercado Pago
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
} 