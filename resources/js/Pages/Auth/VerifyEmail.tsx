import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    return (
        <div className="min-h-screen flex flex-col mt-[20px]">
            <Head title="Verificar Email" />
            <Header />
            
            <main className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 mt-[120px]">
                <div className="max-w-md w-full space-y-8 py-12">
                    <div>
                        <h1 className="text-3xl font-bold">Verificar email</h1>
                        <p className="mt-4 text-gray-600">
                            Gracias por registrarte. Antes de comenzar, ¿podrías verificar tu dirección de correo electrónico 
                            haciendo clic en el enlace que te acabamos de enviar? Si no recibiste el correo, con gusto te 
                            enviaremos otro.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-md">
                            Se ha enviado un nuevo enlace de verificación a tu correo electrónico.
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                post(route('verification.send'));
                            }}
                            disabled={processing}
                            className="w-48 bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                        >
                            REENVIAR EMAIL
                        </button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-black hover:underline"
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
