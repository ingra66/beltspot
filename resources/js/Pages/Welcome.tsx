'use client'

import { Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { ShoppingCartIcon, MicroscopeIcon as MagnifyingGlassIcon, UserIcon } from 'lucide-react'
import { Button } from "@/shadcn/ui/button"
import { Card, CardContent } from "@/shadcn/ui/card"

export default function Welcome() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const products = [
        {
            title: "ICONIC",
            subtitle: "BELTS",
            description: "Iconic BB Simon Belts",
            image: "images/image2.png?height=600&width=400",
            background: "bg-black"
        },
        {
            title: "SLING",
            subtitle: "BAGS",
            description: "BAGS Sling Bags",
            image: "images/image1.webp?height=600&width=400",
            background: "bg-gray-100"
        },
        {
            title: "LARGE",
            subtitle: "BACKPACKS",
            description: "BAGS Large Backpacks",
            image: "images/image1.webp?height=600&width=400",
            background: "bg-black"
        }
    ]

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Combined Header and Navbar */}
            <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                {/* Welcome Message */}
                <div className={`bg-black text-white text-center py-2 text-sm transition-all duration-300 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-8'
                    }`}>
                    Bienvenido a Beltspot® - Donde el Lujo se Encuentra con el Estilo
                </div>

                {/* Navbar */}
                <nav className={`bg-white shadow-md fixed w-full transition-all duration-300 ${scrolled ? 'top-0' : 'top-8'}`}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center py-4">
                            {/* Logo */}
                            <Link href="/" className="text-2xl font-bold">
                                Beltspot®
                            </Link>

                            {/* Navigation Links */}
                            <div className="hidden md:flex space-x-8 text-sm">
                                {['INICIO',
                                    'SOBRE NOSOTROS',
                                    'CINTURONES',
                                    'CADENAS',
                                    'GORROS',
                                    'ACCESORIOS'].map((item) => (
                                        <Link
                                            key={item}
                                            href={`/${item.toLowerCase().replace(' ', '-')}`}
                                            className="hover:text-red-600 transition-colors py-2 px-4 hover:bg-red-50 w-full text-center block"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                            </div>

                            {/* Icons */}
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    <UserIcon className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Hero Section */}
            <div className="relative h-screen">
                {/* Hero Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                    style={{ backgroundImage: `url(images/fondo.jpg)` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white">
                    <h2 className="text-sm tracking-wider mb-4">LUJO ARTESANAL & DISEÑO GÓTICO</h2>
                    <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                        Descubre la Exquisita Artesanía en Cristales Swarovski
                    </h1>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-none"
                    >
                        VER COLECCION
                    </Button>
                </div>
            </div>

            {/* Product Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-16 max-w-7xl mx-auto">
                {products.map((product, index) => (
                    <Card key={index} className="group relative overflow-hidden border-0 rounded-none">
                        <CardContent className={`p-0 relative aspect-[4/5] overflow-hidden ${product.background}`}>
                            <img
                                src={product.image}
                                alt={product.description}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-0" />
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                                <h3 className="text-3xl font-bold mb-2">{product.title}</h3>
                                <p className="text-4xl font-light mb-4">{product.subtitle}</p>
                                <span className="text-sm tracking-wider underline transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {product.description}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}