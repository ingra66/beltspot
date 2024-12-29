import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface Category {
    id: number;
    nombre: string;
    img: string | null;
    subcategorias: {
        id: number;
        nombre: string;
        img: string | null;
    }[];
}

export default function Index({ categories }: { categories: Category[] }) {
    return (
        <AdminLayout>
            <Head title="Categorías" />

            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Categorías</h1>
                    <Link
                        href={route('admin.categories.create')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors inline-flex items-center"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Nueva Categoría
                    </Link>
                </div>

                <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="text-left py-3 px-4 text-white">Nombre</th>
                                    <th className="text-left py-3 px-4 text-white">Imagen</th>
                                    <th className="text-left py-3 px-4 text-white">Subcategorías</th>
                                    <th className="text-left py-3 px-4 text-white">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="border-b border-zinc-800">
                                        <td className="py-3 px-4 text-white">{category.nombre}</td>
                                        <td className="py-3 px-4 text-white">
                                            {category.img && (
                                                <img 
                                                    src={category.img.startsWith('http') ? category.img : `/${category.img.replace(/^\//, '')}`}
                                                    alt={category.nombre}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {category.subcategorias.length}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('admin.categories.edit', category.id)}
                                                    className="text-white hover:text-red-500 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('¿Estás seguro de eliminar esta categoría?')) {
                                                            router.delete(route('admin.categories.destroy', category.id));
                                                        }
                                                    }}
                                                    className="text-white hover:text-red-500 transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 