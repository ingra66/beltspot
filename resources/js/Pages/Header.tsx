'use client'

import { useState, useEffect } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { ShoppingCartIcon, SearchIcon, UserIcon, LogOutIcon, X } from 'lucide-react'
import { Button } from "@/shadcn/ui/button"
import ProductModal from '@/Components/ProductModal'
import CartSlideOver from '@/Components/CartSlideOver'
import { Helmet } from 'react-helmet-async'
import { useCart } from "@/Hooks/useCart";
import SearchOverlay from '@/Components/SearchOverlay';

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

interface Product {
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
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { items } = useCart();

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

    const handleSearch = async (value: string) => {
        if (value.trim().length > 0) {
            try {
                console.log('Buscando:', value); // Debug
                const response = await fetch(`/api/search?query=${encodeURIComponent(value)}`);
                
                if (!response.ok) {
                    console.error('Error en la respuesta:', response.status);
                    throw new Error('Error en la búsqueda');
                }
                
                const data = await response.json();
                console.log('Resultados de búsqueda:', data); // Debug
                setSearchResults(data);
            } catch (error) {
                console.error('Error en la búsqueda:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch(searchQuery)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [searchQuery])

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
        setIsSearchOpen(false) // Cerrar la búsqueda al abrir el modal
    }

    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(items => 
            items.map(item => 
                item.id === id ? { ...item, cantidad: quantity } : item
            )
        );
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#000000" />
            </Helmet>
            <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                {!isSearchOpen && (
                    <>
                        {/* Banner superior */}
                        <div 
                            className={`bg-black text-white text-center py-3 text-sm transition-all duration-300 
                                ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-10'}`}
                            aria-hidden={scrolled}
                        >
                            Bienvenido a Beltspot® - Donde el Lujo se Encuentra con el Estilo
                        </div>

                        {/* Navegación principal */}
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
                                                onClick={() => setIsSearchOpen(true)}
                                                aria-label="Buscar"
                                            >
                                                <SearchIcon className="w-6 h-6" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center relative
                                                    ${isHovered ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-600 hover:text-white'}`}
                                                onClick={() => setIsCartOpen(true)}
                                                aria-label="Carrito de compras"
                                            >
                                                <ShoppingCartIcon className="w-6 h-6" />
                                                {items.length > 0 && (
                                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                        {items.length}
                                                    </span>
                                                )}
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
                    </>
                )}

                {/* Componente de búsqueda */}
                <SearchOverlay
                    isOpen={isSearchOpen}
                    onClose={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        setSearchResults([]);
                    }}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchResults={searchResults}
                    onProductClick={handleProductClick}
                />
            </header>

            {/* Modal de producto */}
            {selectedProduct && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedProduct(null)
                    }}
                    product={selectedProduct}
                />
            )}

            <CartSlideOver
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </>
    )
}
