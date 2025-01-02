'use client'

import { useState, useEffect } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { ShoppingCartIcon, SearchIcon, UserIcon, LogOutIcon, X } from 'lucide-react'
import { Button } from "@/shadcn/ui/button"
import ProductModal from '@/Components/ProductModal'
import CartSlideOver from '@/Components/CartSlideOver'

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
    const [cartItems, setCartItems] = useState<CartItem[]>([])

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
            <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                {isSearchOpen ? (
                    <div className="w-full bg-white border-b animate-slideDown origin-top">
                        <div className="max-w-6xl mx-auto h-auto px-4">
                            <div className="flex items-center justify-between h-16">
                                <Link 
                                    href="/" 
                                    className="text-3xl font-blue-goblet opacity-0 animate-fadeIn"
                                    style={{ 
                                        letterSpacing: '2px',
                                        animationDelay: '150ms',
                                        animationFillMode: 'forwards'
                                    }}
                                >
                                    beltspot
                                </Link>
                                
                                <div className="flex-1 flex items-center mx-8 opacity-0 animate-fadeIn relative"
                                    style={{ 
                                        animationDelay: '300ms',
                                        animationFillMode: 'forwards'
                                    }}>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Buscar productos..."
                                        className="w-full bg-transparent px-4 py-2 focus:outline-none text-black"
                                        autoFocus
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setIsSearchOpen(false)
                                        setSearchQuery('')
                                        setSearchResults([])
                                    }}
                                    className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 animate-fadeIn"
                                    style={{ 
                                        animationDelay: '450ms',
                                        animationFillMode: 'forwards'
                                    }}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Resultados de búsqueda */}
                            <div className="max-h-[70vh] overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <div className="py-4 border-t">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {searchResults.map((product) => (
                                                <div
                                                    key={product.id}
                                                    onClick={() => handleProductClick(product)}
                                                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors duration-200"
                                                >
                                                    <img
                                                        src={product.imagenes[0]?.img}
                                                        alt={product.nombre}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <div>
                                                        <h3 className="font-medium text-sm">{product.nombre}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            ${product.act_ofert ? product.precio_ofert : product.precio_reg}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : searchQuery.length > 0 && (
                                    <div className="py-8 text-center text-gray-500">
                                        No se encontraron resultados para "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
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
                                                className={`transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center
                                                    ${isHovered ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-600 hover:text-white'}`}
                                                onClick={() => setIsCartOpen(true)}
                                                aria-label="Carrito de compras"
                                            >
                                                <ShoppingCartIcon className="w-6 h-6" />
                                                {cartItems.length > 0 && (
                                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                        {cartItems.length}
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
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />

            <style jsx>{`
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
