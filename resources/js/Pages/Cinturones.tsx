'use client'

import { useState, useEffect } from 'react'
import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import ProductModal from '@/Components/ProductModal'
import { motion } from 'framer-motion'
import { Head } from '@inertiajs/react'

interface Belt {
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    size: string;
}

export default function Cinturones() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBelt, setSelectedBelt] = useState<Belt | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const belts = [
        {
            title: "BB Simon Crystal",
            price: "75.000 ARS",
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

    const handleOpenModal = (belt: Belt) => {
        setSelectedBelt(belt);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Cinturones - BeltSpot" />
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

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {belts.map((belt, index) => (
                        <motion.article 
                            key={index} 
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
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
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Modal Component */}
            <ProductModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedBelt}
            />

            <Footer />
        </div>
    );
}