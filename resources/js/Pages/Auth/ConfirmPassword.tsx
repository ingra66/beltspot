import { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <div className="min-h-screen flex flex-col mt-[20px]">
            <Head title="Confirmar Contraseña" />
            <Header />
            
            <main className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 mt-[120px]">
                <div className="max-w-md w-full space-y-8 py-12">
                    <div>
                        <h1 className="text-3xl font-bold">Confirmar contraseña</h1>
                        <p className="mt-4 text-gray-600">
                            Esta es un área segura de la aplicación. Por favor, confirma tu contraseña antes de continuar.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Contraseña"
                                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-black"
                                    autoFocus
                                />
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-40 bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                                >
                                    CONFIRMAR
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
