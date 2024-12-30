import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex flex-col mt-[20px]">
            <Head title="Recuperar Contraseña" />
            <Header />
            
            <main className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 mt-[120px]">
                <div className="max-w-md w-full space-y-8 py-12">
                    <div>
                        <h1 className="text-3xl font-bold">Recuperar contraseña</h1>
                        <p className="mt-4 text-gray-600">
                            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                    </div>

                    {status && <div className="bg-green-50 text-green-600 p-4 rounded-md">{status}</div>}

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

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-40 bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                                >
                                    ENVIAR ENLACE
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
