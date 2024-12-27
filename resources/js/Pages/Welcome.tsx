'use client'

import Header from '@/Pages/Header'
import Footer from '@/Pages/Footer'
import { Button } from "@/shadcn/ui/button"
import { Card, CardContent } from "@/shadcn/ui/card"

export default function Welcome() {
    const products = [
        { title: "CINTOS", description: "Iconic BB Simon Belts", image: "images/image2.png?height=600&width=400", background: "bg-black" },
        { title: "CADENAS", description: "BAGS Sling Bags", image: "images/image1.webp?height=600&width=400", background: "bg-gray-100" },
        { title: "GORROS", description: "BAGS Large Backpacks", image: "images/image1.webp?height=600&width=400", background: "bg-black" }
    ]

    return (
        <div className="min-h-screen bg-white text-black">
            <Header />

            {/* Hero Section */}
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(images/fondo.jpg)` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white">
                    <h2 className="text-sm tracking-wider mb-4">LUJO ARTESANAL & DISEÑO GÓTICO</h2>
                    <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                        Descubre la Exquisita Artesanía en Cristales Swarovski
                    </h1>
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-none">
                        VER COLECCION
                    </Button>
                </div>
            </div>

            {/* Product Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-16 max-w-7xl mx-auto">
                {products.map((product, index) => (
                    <Card key={index} className="group relative overflow-hidden border-0 rounded-none transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <CardContent className={`p-0 relative aspect-[4/5] overflow-hidden ${product.background}`}>
                            <img
                                src={product.image}
                                alt={product.description}
                                className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-0" />
                            <div className={`absolute inset-0 flex flex-col items-center justify-end p-6 ${index === 1 ? 'text-black' : 'text-white'}`}>
                                <h3 className="text-3xl font-bold mb-2">{product.title}</h3>
                                <span className="text-sm tracking-wider underline transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {product.description}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Brand Description */}
            <div className="bg-black text-white py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-5xl font-bold mb-8">BELTSPOT</h2>
                    <p className="text-lg mb-8">
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
                    <h2 className="text-4xl font-bold text-center mb-12">OFERTAS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { discount: 20, image: 'images/belt-display.webp?height=400&width=300' },
                            { discount: 30, image: '/placeholder.svg?height=400&width=300' },
                            { discount: 15, image: '/placeholder.svg?height=400&width=300' },
                            { discount: 25, image: '/placeholder.svg?height=400&width=300' },
                        ].map((item, index) => (
                            <div key={index} className="group relative overflow-hidden">
                                <img 
                                    src={item.image}
                                    alt={`Oferta ${index + 1}`}
                                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                                    {item.discount}% OFF
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-full bg-black/10 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <button 
                                        onClick={() => {/* Aquí tu lógica para ver detalles */}}
                                        className="w-full h-0 group-hover:h-full bg-gray-200/40 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center cursor-pointer hover:bg-gray-200/50"
                                    >
                                        <span className="text-BLACK font-bold">MOSTRAR MAS OPCIONES</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
