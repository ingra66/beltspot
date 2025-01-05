'use client'

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';
import Hero from '../Components/Home/Hero';
import ProductShowcase from '../Components/Home/ProductShowcase';
import BrandDescription from '../Components/Home/BrandDescription';
import OffersSection from '../Components/Home/OffersSection';
import ProductModal from '@/Components/ProductModal';
import { Product } from '@/Components/Home/types';

interface Props {
    offerProducts: Product[];
}

export default function Welcome({ offerProducts }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <Helmet>
                <title>Beltspot - Tienda de Cinturones y Accesorios</title>
                <meta name="description" content="Descubre nuestra colección exclusiva de cinturones BB Simon, cadenas y accesorios de lujo." />
                <meta name="keywords" content="cinturones, BB Simon, cadenas, gorros, accesorios, lujo, moda" />
                <meta property="og:title" content="Beltspot - Tienda de Cinturones y Accesorios" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
            </Helmet>
            
            <Header />
            <Hero />
            <ProductShowcase />
            <BrandDescription />
            <OffersSection products={offerProducts} onProductClick={handleOpenModal} />
            
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
            
            <Footer />
        </div>
    );
}
