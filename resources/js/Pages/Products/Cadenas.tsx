'use client'

import { Head } from '@inertiajs/react'
import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import ProductGrid from '@/Components/ProductGrid'
import { Helmet } from 'react-helmet-async'

interface Props {
    products: {
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
    }[];
}

export default function Cadenas({ products }: Props) {
    return (
        <>
            <Helmet>
                <title>Cadenas Premium - Beltspot</title>
                <meta name="description" content="Explora nuestra colección exclusiva de cadenas de alta calidad." />
                <meta name="keywords" content="cadenas, joyería, accesorios, lujo" />
            </Helmet>
            <div className="min-h-screen bg-white">
                <Head title="Cadenas - BeltSpot" />
                <Header />

                <section className="relative h-[60vh] mt-[120px]">
                    <div 
                        className="absolute inset-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url(/images/chains-hero.jpg)` }}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="relative h-full flex flex-col items-center justify-center text-center text-white">
                        <span className="text-sm tracking-wider mb-4">COLECCIÓN EXCLUSIVA</span>
                        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                            Cadenas Premium
                        </h1>
                        <p className="max-w-2xl text-lg">
                            Descubre nuestra colección de cadenas de alta calidad
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 py-16">
                    <ProductGrid products={products} />
                </section>

                <Footer />
            </div>
        </>
    );
} 