'use client'

import { useState, useEffect } from 'react'
import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import { Button } from "@/shadcn/ui/button"
import { X } from 'lucide-react'

export default function Cinturones() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [selectedBelt, setSelectedBelt] = useState(null);

    useEffect(() => {
        let timer;
        if (isModalOpen) {
            timer = setTimeout(() => {
                setShowContent(true);
            }, 500);
        }
        return () => {
            clearTimeout(timer);
            setShowContent(false);
        };
    }, [isModalOpen]);

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
            title: "Gothic Dark",
            price: "$259.99",
            description: "Diseño gótico exclusivo",
            image: "/images/belt2.jpg",
            category: "Colección Dark",
            size: "95cm"
        },
        {
            title: "Royal Crown",
            price: "$329.99",
            description: "Edición limitada corona",
            image: "/images/belt3.jpg",
            category: "Limitada",
            size: "105cm"
        },
        // Puedes agregar más cinturones aquí
    ];

    const handleOpenModal = (belt) => {
        setSelectedBelt(belt);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setShowContent(false);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300);
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

            {/* Modal con un solo botón */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                    onClick={handleCloseModal}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <div 
                        className="relative w-full max-w-4xl bg-white overflow-hidden"
                        style={{
                            height: '90vh',
                            animation: 'expandUp 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                            transformOrigin: 'bottom'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Botón X para cerrar */}
                        <button 
                            onClick={handleCloseModal}
                            className="absolute right-4 top-4 z-10 p-2 hover:bg-gray-100"
                        >
                            <X size={24} className="text-gray-600" />
                        </button>

                        <div 
                            className={`h-full transition-opacity duration-300 ${
                                showContent ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="flex h-full flex-col md:flex-row">
                                {/* Image Side */}
                                <div className="w-full md:w-1/2 h-1/2 md:h-full">
                                    <img
                                        src={selectedBelt?.image}
                                        alt={selectedBelt?.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">
                                                {selectedBelt?.title}
                                            </h2>
                                            <p className="text-xl text-gray-900">
                                                {selectedBelt?.price}
                                            </p>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <p className="text-gray-600">
                                                {selectedBelt?.description}
                                            </p>
                                            <div className="text-sm text-gray-500">
                                                <span>Tamaño: {selectedBelt?.size}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {/* Solo botón de Mercado Pago */}
                                        <Button 
                                            className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white text-base font-medium rounded-none" 
                                        >
                                            Pagar con Mercado Pago
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes expandUp {
                    0% {
                        transform: translateY(100%) scaleY(0.1);
                    }
                    100% {
                        transform: translateY(0) scaleY(1);
                    }
                }
            `}</style>

            <Footer />
        </div>
    );
}