import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex flex-col mt-[20px]">
            <Head title="Registro" />
            <Header />
            
            <main className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 mt-[120px]">
                <div className="max-w-md w-full space-y-8 py-12">
                    <div>
                        <h1 className="text-3xl font-bold">Crear cuenta</h1>
                        <p className="mt-2 text-gray-600">
                            ¿Ya tienes una cuenta? {' '}
                            <Link href={route('login')} className="text-black hover:underline">
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Nombre completo"
                                    className={`w-full px-3 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {Array.isArray(errors.name) ? errors.name[0] : errors.name}
                                    </div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="Correo electrónico"
                                    className={`w-full px-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                                    </div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Contraseña"
                                    className={`w-full px-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {Array.isArray(errors.password) ? errors.password[0] : errors.password}
                                    </div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    placeholder="Confirmar contraseña"
                                    className={`w-full px-3 py-3 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-32 bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                                >
                                    REGISTRARSE
                                </button>

                                <Link
                                    href="/"
                                    className="text-black hover:underline"
                                >
                                    Volver a la tienda
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
