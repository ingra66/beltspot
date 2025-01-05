import { motion } from "framer-motion";

export default function BrandDescription() {
    return (
        <div className="bg-black text-white py-20" id="brand-description">
            <div className="max-w-4xl mx-auto text-center px-4">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <img
                        src="/images/logo.png"
                        alt="Beltspot Logo"
                        className="h-16 w-auto"
                    />
                    <h2 className="text-5xl font-bold font-blue-goblet">beltspot</h2>
                </div>
                <p className="text-lg mb-8 leading-relaxed text-gray-200">
                    Beltspot es una marca que se especializa en la venta de productos importados a Argentina,
                    principalmente cintos de cristales Swarovski. Nuestra misión es mostrar lujo y moda moderna
                    a través de nuestros productos. Además de nuestros icónicos cinturones, ofrecemos una variedad
                    de artículos como cadenas, gorros y otros accesorios de alta calidad.
                </p>
            </div>
        </div>
    );
}