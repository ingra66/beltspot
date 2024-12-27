import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AdminLayout>
            <Head title="Crear Usuario" />

            <div className="container mx-auto py-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-white">Crear Usuario</h1>

                    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg shadow p-6 border border-zinc-800">
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && (
                                <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-red-500"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox bg-black border-zinc-800 text-red-600 focus:ring-red-500"
                                    checked={data.is_admin}
                                    onChange={e => setData('is_admin', e.target.checked)}
                                />
                                <span className="ml-2 text-white">Es administrador</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end">
                            <a
                                href={route('admin.users.index')}
                                className="text-white hover:text-red-500 mr-4"
                            >
                                Cancelar
                            </a>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                disabled={processing}
                            >
                                Crear Usuario
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
} 