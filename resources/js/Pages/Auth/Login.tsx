import { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Pages/Header';
import Footer from '@/Pages/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Intentando login con:', { email: data.email });
        
        post(route('login'), {
            onError: (errors) => {
                console.log('🔴 Error en la autenticación:', errors);
                console.log('Estado del formulario:', { data, errors });
                reset('password');
            },
            onSuccess: (response) => {
                if (response?.errors) {
                    console.log('🔴 Error en la autenticación:', response.errors);
                } else {
                    console.log('🟢 Login exitoso');
                }
            },
            onFinish: (response) => {
                if (response?.errors) {
                    console.log('🔴 Respuesta con errores:', response.errors);
                } else {
                    console.log('🔵 Respuesta del servidor:', response);
                }
            },
            preserveScroll: true,
            preserveState: true
        });
    };

    return (
        <div className="min-h-screen flex flex-col mt-[20px]">
            <Head title="Login" />
            <Header />
            
            <main className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 mt-[120px]">
                <div className="max-w-md w-full space-y-8 py-12">
                    <div>
                        <h1 className="text-3xl font-bold">Login</h1>
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
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-sm mt-1"
                                    >
                                        {errors.email}
                                    </motion.div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Contraseña"
                                    className={`w-full px-3 py-3 border transition-colors duration-200 ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:border-black`}
                                />
                                <AnimatePresence>
                                    {errors.password && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-red-500 text-sm mt-1"
                                        >
                                            {Array.isArray(errors.password) ? errors.password[0] : errors.password}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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
                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-32 bg-black text-white py-3 transition-all duration-200 ${
                                        processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                                    }`}
                                >
                                    {processing ? 'CARGANDO...' : 'INICIAR SESIÓN'}
                                </motion.button>

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
