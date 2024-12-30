import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductModal from './ProductModal';

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

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product, index) => (
                    <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={product.imagenes[0]?.img || '/placeholder.jpg'}
                                alt={product.nombre}
                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            
                            {/* Overlay con botón - solo en la parte inferior */}
                            <div className="absolute bottom-0 left-0 right-0">
                                <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button 
                                        onClick={() => handleOpenModal(product)}
                                        className="w-full bg-gray-100/80 backdrop-blur-sm py-3 text-[10px] md:text-xs text-gray-800 font-medium tracking-wider cursor-pointer hover:bg-gray-200/80 transition-colors"
                                    >
                                        MOSTRAR MÁS OPCIONES
                                    </button>
                                </div>
                            </div>

                            {/* Etiqueta de oferta */}
                            {product.act_ofert && product.precio_ofert && (
                                <motion.div 
                                    initial={{ x: 50 }}
                                    animate={{ x: 0 }}
                                    className="absolute -right-2 top-4 bg-red-600 text-white px-4 py-2 text-sm font-bold z-20"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 50%)'
                                    }}
                                >
                                    OFERTA
                                </motion.div>
                            )}
                        </div>

                        <div className="space-y-1 px-2 mt-3">
                            <h3 className="font-medium truncate">{product.nombre}</h3>
                            <div className="flex flex-col">
                                {product.act_ofert && product.precio_ofert ? (
                                    <>
                                        <span className="text-red-500 text-lg font-medium">
                                            ${product.precio_ofert}
                                        </span>
                                        <span className="text-gray-500 text-sm line-through">
                                            ${product.precio_reg}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-gray-600 text-lg">
                                        ${product.precio_reg}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {isModalOpen && selectedProduct && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </div>
    );
} 