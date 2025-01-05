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
    console.log('ProductGrid received products:', products); // Para debugging
    
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
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={product.imagenes[0]?.img || '/placeholder.jpg'}
                                alt={product.nombre}
                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            
                            {/* Overlay con botón */}
                            <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <button 
                                    onClick={() => handleOpenModal(product)}
                                    className="w-full py-4 bg-black/70 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-300"
                                >
                                    MOSTRAR MÁS OPCIONES
                                </button>
                            </div>

                            {/* Etiqueta de oferta */}
                            {product.act_ofert && product.precio_ofert && (
                                <div 
                                    className="absolute -right-2 top-4 bg-red-600 text-white px-4 py-2 text-sm font-bold z-20"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 50%)'
                                    }}
                                >
                                    {Math.round(((product.precio_reg - product.precio_ofert) / product.precio_reg) * 100)}% OFF
                                </div>
                            )}
                        </div>

                        <div className="mt-4 px-2">
                            <h3 className="text-lg font-medium truncate">{product.nombre}</h3>
                            <div className="flex items-center gap-2">
                                {product.act_ofert && product.precio_ofert ? (
                                    <>
                                        <span className="text-red-600 font-semibold text-lg">
                                            ${product.precio_ofert}
                                        </span>
                                        <span className="text-gray-500 line-through text-sm">
                                            ${product.precio_reg}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-gray-600 text-lg font-semibold">
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