import { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onError: (errors) => {
                console.log('Errores recibidos:', errors); // Para debugging
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen flex flex-col mt-[20px]">
            <Head title="Login" />
            <Header />
            
            <main className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 mt-[120px]">
                <div className="max-w-md w-full space-y-8 py-12">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Login
                        </h1>
                        <p className="mt-2 text-gray-600">
                            ¿No tienes una cuenta? {' '}
                            <Link href="/register" className="text-black hover:underline">
                                Crear cuenta
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="space-y-4">
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
                                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>

                            <div>
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-gray-600 hover:underline"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-32 bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                                >
                                    INICIAR SESIÓN
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
