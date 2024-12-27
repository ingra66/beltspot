'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import { Button } from "@/shadcn/ui/button"
import AOS from 'aos'
import 'aos/dist/aos.css'
import TypeIt from "typeit"

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

    // Inicializar AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

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

            {/* Modal con animación AOS */}
            {isModalOpen && selectedBelt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={handleCloseModal} />
                    <div 
                        data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom"
                        className="relative w-full max-w-5xl bg-white"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={handleCloseModal}
                            className="absolute right-4 top-4 z-10 p-2"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex">
                            {/* Image Side */}
                            <div className="w-1/2">
                                <img
                                    src={selectedBelt.image}
                                    alt={selectedBelt.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content Side con TypeIt */}
                            <div className="w-1/2 p-12">
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
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`py-3 text-sm border ${
                                                    selectedSize === size 
                                                    ? 'border-black bg-black text-white' 
                                                    : 'border-gray-200 hover:border-black'
                                                }`}
                                            >
                                                {size}cm
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button 
                                        className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-none"
                                    >
                                        Pagar con Mercado Pago
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}