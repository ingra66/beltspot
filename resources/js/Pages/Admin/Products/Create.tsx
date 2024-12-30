import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { XIcon } from 'lucide-react';

interface Props {
    categories: {
        id: number;
        nombre: string;
        subcategorias: {
            id: number;
            nombre: string;
        }[];
    }[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        categoria: '',
        subcategoria: '',
        stock: '',
        precio_reg: '',
        precio_ofert: '',
        ver_act: true,
        act_ofert: false,
        imagenes: [] as File[]
    });

    const [previews, setPreviews] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData('imagenes', files);
            
            // Crear URLs de preview
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => {
                // Limpiar URLs anteriores
                prev.forEach(url => URL.revokeObjectURL(url));
                return newPreviews;
            });
        }
    };

    const removeImage = (index: number) => {
        const newFiles = [...data.imagenes];
        newFiles.splice(index, 1);
        setData('imagenes', newFiles);

        setPreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index]);
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout>
            <Head title="Crear Producto" />

            <div className="container mx-auto py-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-white">Crear Producto</h1>

                    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg shadow p-6 border border-zinc-800">
                        {/* Nombre */}
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

                        {/* Descripción */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Descripción
                            </label>
                            <textarea
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                rows={4}
                                value={data.descripcion}
                                onChange={e => setData('descripcion', e.target.value)}
                            />
                            {errors.descripcion && (
                                <div className="text-red-500 text-xs mt-1">{errors.descripcion}</div>
                            )}
                        </div>

                        {/* Categoría */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Categoría
                            </label>
                            <select
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.categoria}
                                onChange={e => {
                                    setData('categoria', e.target.value);
                                    setSelectedCategory(Number(e.target.value));
                                    setData('subcategoria', '');
                                }}
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.categoria && (
                                <div className="text-red-500 text-xs mt-1">{errors.categoria}</div>
                            )}
                        </div>

                        {/* Subcategoría */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Subcategoría
                            </label>
                            <select
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.subcategoria}
                                onChange={e => setData('subcategoria', e.target.value)}
                                disabled={!selectedCategory}
                            >
                                <option value="">Seleccionar subcategoría</option>
                                {selectedCategory && categories
                                    .find(cat => cat.id === selectedCategory)
                                    ?.subcategorias.map(sub => (
                                        <option key={sub.id} value={sub.id}>
                                            {sub.nombre}
                                        </option>
                                    ))}
                            </select>
                            {errors.subcategoria && (
                                <div className="text-red-500 text-xs mt-1">{errors.subcategoria}</div>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Stock
                            </label>
                            <input
                                type="number"
                                min="0"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                            />
                            {errors.stock && (
                                <div className="text-red-500 text-xs mt-1">{errors.stock}</div>
                            )}
                        </div>

                        {/* Precio Regular */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Precio Regular
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.precio_reg}
                                onChange={e => setData('precio_reg', e.target.value)}
                            />
                            {errors.precio_reg && (
                                <div className="text-red-500 text-xs mt-1">{errors.precio_reg}</div>
                            )}
                        </div>

                        {/* Precio Oferta */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Precio Oferta
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.precio_ofert}
                                onChange={e => setData('precio_ofert', e.target.value)}
                            />
                            {errors.precio_ofert && (
                                <div className="text-red-500 text-xs mt-1">{errors.precio_ofert}</div>
                            )}
                        </div>

                        {/* Checkboxes */}
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-red-600 bg-black border-zinc-800 rounded focus:ring-red-500"
                                    checked={data.ver_act}
                                    onChange={e => setData('ver_act', e.target.checked)}
                                />
                                <label className="ml-2 text-white text-sm">
                                    Producto visible
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-red-600 bg-black border-zinc-800 rounded focus:ring-red-500"
                                    checked={data.act_ofert}
                                    onChange={e => setData('act_ofert', e.target.checked)}
                                />
                                <label className="ml-2 text-white text-sm">
                                    Activar precio de oferta
                                </label>
                            </div>
                        </div>

                        {/* Imágenes */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Imágenes
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-white"
                            />
                            {errors.imagenes && (
                                <div className="text-red-500 text-xs mt-1">{errors.imagenes}</div>
                            )}
                            
                            {/* Preview de imágenes */}
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-24 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                                        >
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex items-center justify-end">
                            <a
                                href={route('admin.products.index')}
                                className="text-white hover:text-red-500 mr-4"
                            >
                                Cancelar
                            </a>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                disabled={processing}
                            >
                                Crear Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
} 