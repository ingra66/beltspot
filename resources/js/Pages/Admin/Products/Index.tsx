import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    products: {
        id: number;
        nombre: string;
        stock: number;
        precio_reg: number;
        precio_ofert: number | null;
        ver_act: boolean;
        act_ofert: boolean;
        imagenes: {
            id: number;
            img: string;
        }[];
        categoria: {
            id: number;
            nombre: string;
        };
        subcategoria: {
            id: number;
            nombre: string;
        };
    }[];
}

export default function Index({ products }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    const handleVisibility = (id: number, currentStatus: boolean) => {
        router.put(route('admin.products.update', id), {
            ver_act: !currentStatus
        });
    };

    const filteredProducts = products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Productos" />

            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Productos</h1>
                    <Link
                        href={route('admin.products.create')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors inline-flex items-center"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Nuevo Producto
                    </Link>
                </div>

                {/* Buscador */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-red-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="text-left py-3 px-4 text-white">Imagen</th>
                                    <th className="text-left py-3 px-4 text-white">Nombre</th>
                                    <th className="text-left py-3 px-4 text-white">Categoría</th>
                                    <th className="text-left py-3 px-4 text-white">Subcategoría</th>
                                    <th className="text-left py-3 px-4 text-white">Stock</th>
                                    <th className="text-left py-3 px-4 text-white">Precio</th>
                                    <th className="text-left py-3 px-4 text-white">Visible</th>
                                    <th className="text-left py-3 px-4 text-white">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-zinc-800">
                                        <td className="py-3 px-4">
                                            {product.imagenes[0] && (
                                                <img 
                                                    src={product.imagenes[0].img}
                                                    alt={product.nombre}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-white">{product.nombre}</td>
                                        <td className="py-3 px-4 text-white">
                                            {product.categoria?.nombre}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {product.subcategoria?.nombre}
                                        </td>
                                        <td className="py-3 px-4 text-white">{product.stock}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col">
                                                {product.act_ofert && product.precio_ofert ? (
                                                    <>
                                                        <span className="text-red-500">
                                                            ${product.precio_ofert}
                                                        </span>
                                                        <span className="text-white line-through opacity-75">
                                                            ${product.precio_reg}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-white">
                                                        ${product.precio_reg}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleVisibility(product.id, product.ver_act)}
                                                className={`text-white hover:text-red-500 transition-colors`}
                                            >
                                                {product.ver_act ? (
                                                    <EyeIcon className="w-5 h-5" />
                                                ) : (
                                                    <EyeOffIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('admin.products.edit', product.id)}
                                                    className="text-white hover:text-red-500 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
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