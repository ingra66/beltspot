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
                        <li><Link href="/inicio" className="hover:underline text-sm">INICIO</Link></li>
                        <li><Link href="/sobre-nosotros" className="hover:underline text-sm">SOBRE NOSOTROS</Link></li>
                        <li><Link href="/cinturones" className="hover:underline text-sm">CINTURONES</Link></li>
                        <li><Link href="/cadenas" className="hover:underline text-sm">CADENAS</Link></li>
                        <li><Link href="/gorros" className="hover:underline text-sm">GORROS</Link></li>
                        <li><Link href="/accesorios" className="hover:underline text-sm">ACCESORIOS</Link></li>
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
                        <li><Link href="/buscar" className="hover:underline text-sm">Buscar</Link></li>
                        <li><Link href="/sobre-nosotros" className="hover:underline text-sm">Sobre Beltspot</Link></li>
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
                                className="flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                            />
                            <button className="ml-2 px-4">→</button>
                        </div>
                        <p className="text-sm">Solicita tu membresía gratuita para recibir ofertas exclusivas, noticias y eventos.</p>
                        <div className="flex space-x-4 mt-4">
                            <Link 
                                href="#" 
                                className="text-white hover:bg-red-600 p-2 transition-colors duration-300"
                            >
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link 
                                href="#" 
                                className="text-white hover:bg-red-600 p-2 transition-colors duration-300"
                            >
                                <Instagram className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

