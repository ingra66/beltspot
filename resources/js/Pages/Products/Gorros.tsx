'use client'

import { Head } from '@inertiajs/react'
import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import ProductGrid from '@/Components/ProductGrid'
import { caps } from './products'  // Importamos las gorras del archivo products.ts

export default function Gorros() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Gorros - BeltSpot" />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh]">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(/images/caps-hero.jpg)` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center pt-20 text-white">
                    <span className="text-sm tracking-wider mb-4">COLECCIÓN EXCLUSIVA</span>
                    <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                        Gorras New Era
                    </h1>
                    <p className="max-w-2xl text-lg">
                        Descubre nuestra colección de gorras originales New Era
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <ProductGrid products={caps} />
            </section>

            <Footer />
        </div>
    );
} 