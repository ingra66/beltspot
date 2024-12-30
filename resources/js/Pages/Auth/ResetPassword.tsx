import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.update'));
    };

    return (
        <div className="min-h-screen flex flex-col mt-[20px]">
            <Head title="Restablecer Contraseña" />
            <Header />
            
            <main className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 mt-[120px]">
                <div className="max-w-md w-full space-y-8 py-12">
                    <div>
                        <h1 className="text-3xl font-bold">Restablecer contraseña</h1>
                        <p className="mt-4 text-gray-600">
                            Por favor, ingresa tu nueva contraseña.
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
                                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-black"
                                />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Nueva contraseña"
                                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-black"
                                />
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    placeholder="Confirmar nueva contraseña"
                                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-black"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-48 bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                                >
                                    RESTABLECER CONTRASEÑA
                                </button>

                                <Link
                                    href={route('login')}
                                    className="text-black hover:underline"
                                >
                                    Volver al login
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
