import { motion } from "framer-motion";
import { Product } from "./types";

interface Props {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export default function OffersSection({ products, onProductClick }: Props) {
    return (
        <div className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    OFERTAS
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products?.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden">
                                {product.imagenes && product.imagenes.length > 0 ? (
                                    <img
                                        src={product.imagenes[0].img}
                                        alt={product.nombre}
                                        className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">Sin imagen</span>
                                    </div>
                                )}

                                {product.act_ofert && (
                                    <div
                                        className="absolute -right-2 top-4 bg-red-600 text-white px-4 py-2 text-sm font-bold z-20"
                                        style={{
                                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 50%)'
                                        }}
                                    >
                                        {Math.round(((product.precio_reg - product.precio_ofert) / product.precio_reg) * 100)}% OFF
                                    </div>
                                )}

                                <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button
                                        onClick={() => onProductClick(product)}
                                        className="w-full py-4 bg-black/70 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-300"
                                    >
                                        MOSTRAR MÁS OPCIONES
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 px-2">
                                <h3 className="text-lg font-medium">{product.nombre}</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-red-600 font-semibold text-lg">
                                        ${product.precio_ofert}
                                    </p>
                                    <p className="text-gray-500 line-through text-sm">
                                        ${product.precio_reg}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}