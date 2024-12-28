import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        router.on('start', () => {
            setIsLoading(true);
            // Tiempo de carga reducido a 500ms
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        });

        return () => {
            router.off('start');
        };
    }, []);

    if (!isLoading) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
                duration: 0.8,
                ease: "easeInOut"
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center min-h-screen w-full"
            style={{ 
                background: `
                    radial-gradient(circle at 0 0, rgba(0,0,0,0.4) 0%, transparent 70%),
                    radial-gradient(circle at 100% 0, rgba(0,0,0,0.4) 0%, transparent 70%),
                    radial-gradient(circle at 0 100%, rgba(0,0,0,0.4) 0%, transparent 70%),
                    radial-gradient(circle at 100% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)
                `
            }}
        >
            {/* Logo animado */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                }}
            >
                <motion.img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-64 h-64 object-contain"
                    animate={{
                        opacity: [1, 0.5, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </motion.div>
    );
} 