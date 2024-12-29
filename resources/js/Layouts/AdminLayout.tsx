import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { LogOutIcon } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <nav className="bg-black border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href={route('admin.dashboard')}>
                                    <span className="text-xl font-bold text-white">BeltSpot Admin</span>
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden space-x-8 sm:ml-10 sm:flex items-center">
                                <Link
                                    href={route('admin.categories.index')}
                                    className="text-white hover:text-red-500 transition-colors px-4 py-2"
                                >
                                    CATEGORÍAS
                                </Link>

                                <Link
                                    href={route('admin.dashboard')}
                                    className="text-white hover:text-red-500 transition-colors px-4 py-2"
                                >
                                    VENTAS
                                </Link>

                                <Link
                                    href={route('admin.users.index')}
                                    className="text-white hover:text-red-500 transition-colors px-4 py-2"
                                >
                                    USUARIOS
                                </Link>

                                <Link
                                    href={route('admin.dashboard')}
                                    className="text-white hover:text-red-500 transition-colors px-4 py-2"
                                >
                                    CONFIGURACIÓN
                                </Link>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-red-500 transition-colors p-2 rounded-full"
                                aria-label="Cerrar sesión"
                            >
                                <LogOutIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
