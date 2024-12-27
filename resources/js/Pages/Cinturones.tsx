'use client'

import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import { Button } from "@/shadcn/ui/button"
import TypeIt from "typeit"
import { motion, AnimatePresence } from 'framer-motion';

interface Belt {
    title: string
    price: string
    description: string
    image: string
    category: string
    size: string
}

export default function Cinturones() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [selectedBelt, setSelectedBelt] = useState<Belt | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const sizes = [90, 95, 100, 105, 110, 115];

    useEffect(() => {
        if (isModalOpen) {
            setShowContent(true);
        }
        return () => {
            setShowContent(false);
        };
    }, [isModalOpen]);

    // Efecto para iniciar TypeIt cuando el modal se abre
    useEffect(() => {
        if (isModalOpen && selectedBelt) {
            new TypeIt("#beltTitle", {
                speed: 50,
                waitUntilVisible: true,
                cursor: false,
            }).go();

            new TypeIt("#beltPrice", {
                speed: 50,
                waitUntilVisible: true,
                startDelay: 500,
                cursor: false,
            }).go();

            new TypeIt("#beltDescription", {
                speed: 50,
                waitUntilVisible: true,
                startDelay: 1000,
                cursor: false,
            }).go();
        }
    }, [isModalOpen, selectedBelt]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const belts = [
        {
            title: "BB Simon Crystal",
            price: "$299.99",
            description: "Cinturón con cristales Swarovski",
            image: "/images/image1.webp",
            category: "Premium",
            size: "100cm"
        },
        {
            title: "BB Simon Black Diamond",
            price: "$279.99",
            description: "Cinturón negro con cristales",
            image: "/images/image1.webp",
            category: "Premium",
            size: "95cm"
        },
        {
            title: "BB Simon Gold Edition",
            price: "$349.99",
            description: "Edición dorada limitada",
            image: "/images/image1.webp",
            category: "Limitada",
            size: "105cm"
        },
        {
            title: "BB Simon Silver Ice",
            price: "$289.99",
            description: "Diseño plateado exclusivo",
            image: "/images/image1.webp",
            category: "Premium",
            size: "100cm"
        },
        {
            title: "BB Simon Royal Blue",
            price: "$319.99",
            description: "Cristales en tonos azules",
            image: "/images/image1.webp",
            category: "Premium",
            size: "95cm"
        }
    ];

    const handleOpenModal = (belt) => {
        setSelectedBelt(belt);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section */}
            <section className="relative h-[60vh]">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(/images/hero-bg.jpg)` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center pt-20 text-white">
                    <span className="text-sm tracking-wider mb-4">COLECCIÓN EXCLUSIVA</span>
                    <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                        Cinturones BB Simon
                    </h1>
                    <p className="max-w-2xl text-lg">
                        Descubre nuestra colección de cinturones con cristales Swarovski
                    </p>
                </div>
            </section>

            {/* Products Grid - Updated to 5 columns */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {belts.map((belt, index) => (
                        <article key={index} className="space-y-3">
                            <div className="group relative overflow-hidden">
                                <img
                                    src={belt.image}
                                    alt={belt.title}
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-black/40 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <span 
                                            className="text-[10px] md:text-xs text-white font-light tracking-wider cursor-pointer" 
                                            onClick={() => handleOpenModal(belt)}
                                        >
                                            MOSTRAR MÁS OPCIONES
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1 px-2">
                                <h3 className="text-lg font-medium">{belt.title}</h3>
                                <p className="text-gray-600">{belt.price}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Modal con animaciones disparejas invertidas */}
            <AnimatePresence>
                {isModalOpen && selectedBelt && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={handleCloseModal} />
                        <motion.div 
                            initial={{ scale: 0.9, y: "-100%" }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: "-100%" }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="relative w-full max-w-5xl overflow-hidden flex"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Image Side - Aparece después */}
                            <motion.div 
                                initial={{ height: "auto", y: "100%" }}
                                animate={{ height: "auto", y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}  // Delay para el contenedor
                                className="w-1/2 bg-gray-200"
                            >
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}  // Delay más largo para la imagen
                                    src={selectedBelt.image}
                                    alt={selectedBelt.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Content Side - Aparece primero */}
                            <motion.div 
                                initial={{ height: "auto", y: "100%" }}
                                animate={{ height: "auto", y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}  // Sin delay inicial
                                className="w-1/2 p-12 bg-white"
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}  // Delay más corto para el contenido
                                >
                                    <div>
                                        <h3 className="text-xs text-gray-500 mb-2">BB SIMON</h3>
                                        <h2 id="beltTitle" className="text-2xl font-medium mb-4">
                                            {selectedBelt.title}
                                        </h2>
                                        <p id="beltPrice" className="text-lg">
                                            {selectedBelt.price}
                                        </p>
                                        <p id="beltDescription" className="text-sm text-gray-500 mt-1">
                                            {selectedBelt.description}
                                        </p>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-sm font-medium mb-4">TAMAÑO DEL CINTURÓN</h3>
                                        <div className="grid grid-cols-4 gap-2">
                                            {sizes.map((size) => (
                                                <motion.button
                                                    key={size}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`py-3 text-sm border ${
                                                        selectedSize === size 
                                                        ? 'border-black bg-black text-white' 
                                                        : 'border-gray-200 hover:border-black'
                                                    }`}
                                                >
                                                    {size}cm
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button 
                                                className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-none"
                                            >
                                                Pagar con Mercado Pago
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Botón de cierre con animación */}
                            <motion.button 
                                onClick={handleCloseModal}
                                className="absolute right-4 top-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                whileHover={{ rotate: 45 }}  // Esto hará que la X gire 45 grados y parezca un +
                                transition={{ duration: 0.2 }}
                            >
                                <X size={24} className="text-gray-600" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}