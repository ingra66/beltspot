import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Subcategory {
    id: number;
    nombre: string;
}

interface Category {
    id: number;
    nombre: string;
    img: string | null;
    subcategorias: Subcategory[];
}

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: category.nombre,
        img: null as File | null,
        _method: 'PUT',
        subcategorias: category.subcategorias.map(sub => ({
            id: sub.id,
            nombre: sub.nombre
        }))
    });

    const [preview, setPreview] = useState<string | null>(
        category.img ? (
            category.img.startsWith('http') ? category.img : `/${category.img.replace(/^\//, '')}`
        ) : null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('img', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const addSubcategoria = () => {
        setData('subcategorias', [...data.subcategorias, { id: 0, nombre: '' }]);
    };

    const removeSubcategoria = (index: number) => {
        const newSubcategorias = data.subcategorias.filter((_, i) => i !== index);
        setData('subcategorias', newSubcategorias);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.update', category.id), {
            forceFormData: true,
            preserveScroll: true
        });
    };

    return (
        <AdminLayout>
            <Head title="Editar Categoría" />

            <div className="container mx-auto py-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-white">Editar Categoría</h1>

                    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg shadow p-6 border border-zinc-800">
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.nombre}
                                onChange={e => setData('nombre', e.target.value)}
                            />
                            {errors.nombre && (
                                <div className="text-red-500 text-xs mt-1">{errors.nombre}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Imagen de Categoría
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-white"
                            />
                            {preview && (
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="mt-2 w-32 h-32 object-cover rounded"
                                />
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-white text-sm font-bold">
                                    Subcategorías
                                </label>
                                <button
                                    type="button"
                                    onClick={addSubcategoria}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    + Añadir Subcategoría
                                </button>
                            </div>

                            {data.subcategorias.map((sub, index) => (
                                <div key={index} className="mb-4 p-4 border border-zinc-800 rounded">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white">Subcategoría {index + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSubcategoria(index)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                            value={sub.nombre}
                                            onChange={e => {
                                                const newSubcategorias = [...data.subcategorias];
                                                newSubcategorias[index] = {
                                                    ...newSubcategorias[index],
                                                    nombre: e.target.value
                                                };
                                                setData('subcategorias', newSubcategorias);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-end">
                            <Link
                                href={route('admin.categories.index')}
                                className="text-white hover:text-red-500 mr-4"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                disabled={processing}
                            >
                                Actualizar Categoría
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
} 