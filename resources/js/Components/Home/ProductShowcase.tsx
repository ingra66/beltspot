import { Link } from '@inertiajs/react';
import { motion } from "framer-motion";

export default function ProductShowcase() {
    const products = [
        {
            title: "CINTOS",
            image: "images/cinturones.webp?height=600&width=400",
            background: "bg-black",
            href: '/productos/cinturones'
        },
        {
            title: "CADENAS",
            image: "images/cadenas.webp?height=600&width=400",
            background: "bg-black",
            href: '/productos/cadenas'
        },
        {
            title: "GORROS",
            image: "images/gorros.jpg?height=600&width=400",
            background: "bg-black",
            href: '/productos/gorros'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-16 max-w-7xl mx-auto">
            {products.map((product, index) => (
                <Link
                    key={index}
                    href={product.href}
                    className="block group relative overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                    <div className={`relative aspect-[4/5] overflow-hidden ${product.background}`}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:opacity-30" />
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white">
                            <h3 className="text-3xl font-bold tracking-wider text-white">{product.title}</h3>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}