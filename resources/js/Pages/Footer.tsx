import { Link } from '@inertiajs/react'
import { Instagram, Facebook } from 'lucide-react'
import { Button } from "@/shadcn/ui/button"

export default function Footer() {
    return (
        <footer className="bg-black text-white w-full py-16 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12">
                {/* SHOP Column */}
                <div>
                    <h3 className="text-sm font-medium mb-4">SHOP</h3>
                    <ul className="space-y-3">
                        <li><Link href="/" className="hover:underline text-sm">INICIO</Link></li>
                        <li><Link href="/#brand-description" className="hover:underline text-sm">SOBRE NOSOTROS</Link></li>
                        <li><Link href={route('products.cinturones')} className="hover:underline text-sm">CINTURONES</Link></li>
                        <li><Link href={route('products.cadenas')} className="hover:underline text-sm">CADENAS</Link></li>
                        <li><Link href={route('products.gorros')} className="hover:underline text-sm">GORROS</Link></li>
                        <li><Link href={route('products.otros')} className="hover:underline text-sm">OTROS</Link></li>
                    </ul>
                </div>

                {/* EXPLORE Column */}
                <div>
                    <h3 className="text-sm font-medium mb-4">EXPLORAR</h3>
                    <ul className="space-y-3">
                        <li><Link href="/aviso-legal" className="hover:underline text-sm">Aviso Legal</Link></li>
                        <li><Link href="/politica-privacidad" className="hover:underline text-sm">Política de Privacidad</Link></li>
                        <li><Link href="/terminos-servicio" className="hover:underline text-sm">Términos de Servicio</Link></li>
                        <li><Link href="/contacto" className="hover:underline text-sm">Contacto</Link></li>
                    </ul>
                </div>

                {/* MORE Column */}
                <div>
                    <h3 className="text-sm font-medium mb-4">MÁS</h3>
                    <ul className="space-y-3">
                        <li><Link href="/profile" className="hover:underline text-sm">Mi Cuenta</Link></li>
                        <li><Link href="/cart" className="hover:underline text-sm">Carrito</Link></li>
                        <li><Link href="/wishlist" className="hover:underline text-sm">Lista de Deseos</Link></li>
                        <li><Link href="/orders" className="hover:underline text-sm">Mis Pedidos</Link></li>
                    </ul>
                </div>

                {/* JOIN VIP CLUB Column */}
                <div>
                    <h3 className="text-sm font-medium mb-4">ÚNETE AL CLUB VIP DE BELTSPOT</h3>
                    <div className="flex flex-col space-y-4">
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Ingresa tu email aquí"
                                className="flex-1 px-3 py-2 bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                            />
                            <button className="ml-2 px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors">
                                →
                            </button>
                        </div>
                        <p className="text-sm text-gray-400">
                            Solicita tu membresía gratuita para recibir ofertas exclusivas, noticias y eventos.
                        </p>
                        <div className="flex items-center space-x-4 mt-4">
                            <Link 
                                href="https://facebook.com" 
                                target="_blank"
                                className="p-2 hover:bg-red-600/90 transition-colors duration-300"
                            >
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link 
                                href="https://instagram.com" 
                                target="_blank"
                                className="p-2 hover:bg-red-600/90 transition-colors duration-300"
                            >
                                <Instagram className="w-6 h-6" />
                            </Link>
                            <Link href="/" className="ml-4">
                                <img 
                                    src="/images/logo.png" 
                                    alt="Beltspot Logo" 
                                    className="h-12 w-auto animate-spin-slow"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </footer>
    )
}

