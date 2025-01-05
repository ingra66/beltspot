'use client'

import { Head } from '@inertiajs/react'
import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import ProductGrid from '@/Components/ProductGrid'
import { Helmet } from 'react-helmet-async'

interface Props {
    products: Product[];
    category: {
        name: string;
        title: string;
        description: string;
        keywords: string[];
        heroImage: string;
        heroSubtitle: string;
        route: string;
    };
}

export default function ProductPage({ products, category }: Props) {
    const hasProducts = products && products.length > 0;
    
    console.log('Products:', products);

    return (
        <>
            <Helmet>
                <title>{category.title} - Beltspot</title>
                <meta name="description" content={category.description} />
                <meta name="keywords" content={category.keywords.join(', ')} />
                
                {/* Open Graph */}
                <meta property="og:title" content={`${category.title} - Beltspot`} />
                <meta property="og:description" content={category.description} />
                <meta property="og:type" content="product.group" />
                <meta property="og:image" content={category.heroImage} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${category.title} - Beltspot`} />
                <meta name="twitter:description" content={category.description} />
                <meta name="twitter:image" content={category.heroImage} />
                
                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": category.title,
                        "description": category.description,
                        "url": window.location.href,
                        "image": category.heroImage
                    })}
                </script>
            </Helmet>

            <div className="min-h-screen bg-white">
                <Head title={`${category.name} - BeltSpot`} />
                <Header />

                <section className="relative h-[60vh] mt-[120px]">
                    <div 
                        className="absolute inset-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${category.heroImage})` }}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="relative h-full flex flex-col items-center justify-center text-center text-white">
                        <span className="text-sm tracking-wider mb-4">COLECCIÓN EXCLUSIVA</span>
                        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                            {category.name}
                        </h1>
                        <p className="max-w-2xl text-lg">
                            {category.heroSubtitle}
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 py-16">
                    {hasProducts ? (
                        <ProductGrid products={products} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No hay productos disponibles en este momento.</p>
                        </div>
                    )}
                </section>

                <Footer />
            </div>
        </>
    );
} 