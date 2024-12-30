'use client'

import { useState, useEffect } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { ShoppingCartIcon, SearchIcon, UserIcon, LogOutIcon } from 'lucide-react'
import { Button } from "@/shadcn/ui/button"

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            is_admin: boolean;
        } | null;
    };
}

const navigationLinks = [
    { name: 'INICIO', href: '/' },
    { name: 'SOBRE NOSOTROS', href: '/#brand-description' },
    { name: 'CINTURONES', href: route('products.cinturones') },
    { name: 'CADENAS', href: route('products.cadenas') },
    { name: 'GORROS', href: route('products.gorros') },
    { name: 'OTROS', href: route('products.otros') }
]

export default function Header() {
    const { auth } = usePage<PageProps>().props
    const [scrolled, setScrolled] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.includes('#')) {
            e.preventDefault();
            
            if (window.location.pathname !== '/') {
                router.visit('/', {
                    onSuccess: () => {
                        setTimeout(() => {
                            const elementId = href.split('#')[1];
                            const element = document.getElementById(elementId);
                            
                            if (element) {
                                const headerOffset = 100;
                                const elementPosition = element.getBoundingClientRect().top;
                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }, 100);
                    }
                });
            } else {
                const elementId = href.split('#')[1];
                const element = document.getElementById(elementId);
                
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                <div 
                    className={`bg-black text-white text-center py-3 text-sm transition-all duration-300 
                        ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-10'}`}
                    aria-hidden={scrolled}
                >
                    Bienvenido a Beltspot® - Donde el Lujo se Encuentra con el Estilo
                </div>

                <nav
                    className={`fixed w-full transition-all duration-300 
                        ${scrolled ? 'top-0' : 'top-10'} 
                        ${isHovered ? 'bg-black' : 'bg-white'}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    role="navigation"
                >
                    <div className={`w-full border-b transition-all duration-300 ${isHovered ? 'border-white' : 'border-transparent'}`}>
                        <div className="max-w-6xl mx-auto px-4">
                            <div className="flex justify-between items-center py-3">
                                <div className="w-[120px]"></div>

                                <Link 
                                    href="/" 
                                    className="text-4xl"
                                    style={{ 
                                        fontFamily: 'Blue Goblet Alternate One, cursive',
                                        letterSpacing: '2px',
                                        color: isHovered ? 'white' : 'black',
                                        transition: 'all 0.3s ease',
                                        textTransform: 'lowercase'
                                    }}
                                    aria-label="Beltspot Home"
                                >
                                    beltspot
                                </Link>

                                <div className="flex items-center space-x-4 w-[120px] justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center
                                            ${isHovered ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-600 hover:text-white'}`}
                                        aria-label="Buscar"
                                    >
                                        <SearchIcon className="w-6 h-6" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center
                                            ${isHovered ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-600 hover:text-white'}`}
                                        aria-label="Carrito de compras"
                                    >
                                        <ShoppingCartIcon className="w-6 h-6" />
                                    </Button>

                                    {auth.user ? (
                                        !auth.user.is_admin ? (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center
                                                    ${isHovered ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-600 hover:text-white'}`}
                                                aria-label="Cerrar sesión"
                                                onClick={() => router.post(route('logout'))}
                                            >
                                                <LogOutIcon className="w-6 h-6" />
                                            </Button>
                                        ) : null
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center
                                                ${isHovered ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-600 hover:text-white'}`}
                                            onClick={() => router.visit('/login')}
                                            aria-label="Cuenta de usuario"
                                        >
                                            <UserIcon className="w-6 h-6" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div 
                                className={`transition-all duration-300 
                                    ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}
                            >
                                <div className="flex justify-center space-x-10 py-2">
                                    {navigationLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={(e) => handleSmoothScroll(e, link.href)}
                                            className={`relative px-2 py-2 transition-colors text-sm font-normal hover:font-bold ${isHovered ? 'text-white' : 'text-black'} group`}
                                        >
                                            {link.name}
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
