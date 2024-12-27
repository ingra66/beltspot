'use client'

import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { ShoppingCartIcon, MicroscopeIcon as MagnifyingGlassIcon, UserIcon } from 'lucide-react'
import { Button } from "@/shadcn/ui/button"

const navigationLinks = [
    { name: 'INICIO', href: '/inicio' },
    { name: 'SOBRE NOSOTROS', href: '/sobre-nosotros' },
    { name: 'CINTURONES', href: '/cinturones' },
    { name: 'CADENAS', href: '/cadenas' },
    { name: 'GORROS', href: '/gorros' },
    { name: 'ACCESORIOS', href: '/accesorios' }
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
            {/* Welcome Message */}
            <div 
                className={`
                    bg-black text-white text-center py-2 text-sm 
                    transition-all duration-300 
                    ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-8'}
                `}
                aria-hidden={scrolled}
            >
                Bienvenido a Beltspot® - Donde el Lujo se Encuentra con el Estilo
            </div>

            {/* Navbar */}
            <nav
                className={`
                    fixed w-full transition-all duration-300 
                    ${scrolled ? 'top-0' : 'top-8'} 
                    ${isHovered ? 'bg-black' : 'bg-white'}
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="navigation"
            >
                <div className={`w-full border-b transition-all duration-300 ${isHovered ? 'border-white' : 'border-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center py-4">
                            {/* Logo */}
                            <Link 
                                href="/" 
                                className={`text-2xl font-bold ${isHovered ? 'text-white' : 'text-black'}`}
                                aria-label="Beltspot Home"
                            >
                                Beltspot
                            </Link>

                            {/* Navigation Links */}
                            <div className="hidden md:flex flex-1 justify-center space-x-4">
                                {navigationLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`
                                            relative px-4 py-2 transition-colors font-normal hover:font-bold
                                            ${isHovered ? 'text-white' : 'text-black'}
                                            group
                                        `}
                                    >
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                                    </Link>
                                ))}
                            </div>

                            {/* Icons */}
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`transition-all duration-300 rounded-none p-4 ${isHovered ? 'text-white' : 'text-black'} hover:bg-red-600 hover:text-white`}
                                    aria-label="Buscar"
                                >
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`transition-all duration-300 rounded-none p-4 ${isHovered ? 'text-white' : 'text-black'} hover:bg-red-600 hover:text-white`}
                                    aria-label="Cuenta de usuario"
                                >
                                    <UserIcon className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`transition-all duration-300 rounded-none p-4 ${isHovered ? 'text-white' : 'text-black'} hover:bg-red-600 hover:text-white`}
                                    aria-label="Carrito de compras"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}