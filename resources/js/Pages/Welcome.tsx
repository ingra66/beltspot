'use client'

import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import { Button } from "@/shadcn/ui/button"
import { Card, CardContent } from "@/shadcn/ui/card"
import { motion } from "framer-motion";
import { Link } from '@inertiajs/react';
import PageLoader from '@/Components/PageLoader';
import ProductModal from '@/Components/ProductModal';
import { useState } from 'react';

export default function Welcome() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        {
            title: "CINTOS",
            image: "images/cinturones.webp?height=600&width=400",
            background: "bg-black",
            link: route('products.cinturones')
        },
        {
            title: "CADENAS",
            image: "images/cadenas.webp?height=600&width=400",
            background: "bg-black",
            link: route('products.cadenas')
        },
        {
            title: "GORROS",
            image: "images/gorros.jpg?height=600&width=400",
            background: "bg-black",
            link: route('products.gorros')
        }
    ]

    const offerProducts = [
        {
            title: "Cinto Premium BB Simon",
            price: "$259.99",
            description: "Cinturón con cristales Swarovski, edición limitada con 15% de descuento",
            image: "images/cinto1.jpg",
            category: "Oferta Especial",
            size: "100cm"
        },
        {
            title: "Cinto Elegance BB Simon",
            price: "$279.99",
            description: "Diseño exclusivo con cristales premium, ahorra 15% en tu compra",
            image: "images/cinto2.jpg",
            category: "Oferta Especial",
            size: "100cm"
        },
        {
            title: "Cinto Classic BB Simon",
            price: "$239.99",
            description: "Modelo clásico con detalles brillantes, 15% off en tiempo limitado",
            image: "images/cinto3.jpg",
            category: "Oferta Especial",
            size: "100cm"
        },
        {
            title: "Cinto Luxury BB Simon",
            price: "$299.99",
            description: "Edición especial con acabados premium, aprovecha 15% de descuento",
            image: "images/cinto4.jpg",
            category: "Oferta Especial",
            size: "100cm"
        }
    ];

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <Header />

            {/* Hero Section */}
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(images/fondo.jpg)`, backgroundAttachment: "fixed" }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm tracking-wider mb-4"
                    >
                        LUJO ARTESANAL & DISEÑO GÓTICO
                    </motion.h2>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold max-w-4xl mb-8"
                    >
                        Descubre la Exquisita Artesanía en <strong>Cristales Swarovski</strong>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-none"
                            style={{ transition: "background-color 0.4s, transform 0.2s" }}
                        >
                            VER COLECCION
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Product Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-16 max-w-7xl mx-auto">
                {products.map((product, index) => (
                    <Link 
                        key={index} 
                        href={product.link}
                        className="block group relative overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        preserveState={false}
                        preserveScroll={false}
                    >
                        <div className={`relative aspect-[4/5] overflow-hidden ${product.background}`}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:opacity-30" />
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white">
                                <h3 className="text-3xl font-bold tracking-wider text-white">{product.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Brand Description */}
            <div className="bg-black text-white py-20" id="brand-description">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-5xl font-bold mb-8">BELTSPOT</h2>
                    <p className="text-lg mb-8 leading-relaxed text-gray-200">
                        Beltspot es una marca que se especializa en la venta de productos importados a Argentina, 
                        principalmente cintos de cristales Swarovski. Nuestra misión es mostrar lujo y moda moderna 
                        a través de nuestros productos. Además de nuestros icónicos cinturones, ofrecemos una variedad 
                        de artículos como cadenas, gorros y otros accesorios de alta calidad.
                    </p>
                </div>
            </div>

            {/* Ofertas */}
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
                        {offerProducts.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{
                                            background: `
                                                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0%, transparent 8%) 50% 50% / 8% 8%,
                                                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.8) 0%, transparent 8%) 50% 50% / 8% 8%,
                                                radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8) 0%, transparent 8%) 30% 30% / 8% 8%,
                                                radial-gradient(circle at 60% 60%, rgba(255,255,255,0.8) 0%, transparent 8%) 70% 70% / 8% 8%
                                            `,
                                            animation: 'sparkle 2s ease-in-out infinite'
                                        }}
                                    />
                                    
                                    <div 
                                        className="absolute -right-2 top-4 bg-red-600 text-white px-4 py-2 text-sm font-bold z-20"
                                        style={{
                                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 50%)'
                                        }}
                                    >
                                        15% OFF
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <button 
                                            onClick={() => handleOpenModal(item)}
                                            className="w-full py-4 bg-black/70 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-300"
                                        >
                                            MOSTRAR MÁS OPCIONES
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 px-2">
                                    <h3 className="text-lg font-medium">{item.title}</h3>
                                    <p className="text-red-600 font-semibold">{item.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            <ProductModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />

            <Footer />

            <style jsx>{`
                @keyframes sparkle {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    )
}
