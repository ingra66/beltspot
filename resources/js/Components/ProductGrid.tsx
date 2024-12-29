import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductModal from './ProductModal';

interface Product {
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    size?: string;
}

interface ProductGridProps {
    products: Product[];
    showDiscount?: boolean;
}

export default function ProductGrid({ products, showDiscount = false }: ProductGridProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product, index) => (
                    <motion.article 
                        key={index} 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="group relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full aspect-square object-cover"
                            />
                            <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-black/40 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button 
                                        className="w-full text-[10px] md:text-xs text-white font-light tracking-wider cursor-pointer" 
                                        onClick={() => handleOpenModal(product)}
                                    >
                                        MOSTRAR MÁS OPCIONES
                                    </button>
                                </div>
                            </div>

                            {showDiscount && (
                                <div 
                                    className="absolute -right-2 top-4 bg-red-600 text-white px-4 py-2 text-sm font-bold z-20"
                                    style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 50%)'
                                    }}
                                >
                                    15% OFF
                                </div>
                            )}
                        </div>

                        <div className="space-y-1 px-2">
                            <h3 className="text-lg font-medium">{product.title}</h3>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    </motion.article>
                ))}
            </div>

            <ProductModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </>
    );
} 