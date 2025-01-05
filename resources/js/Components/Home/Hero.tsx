import { motion } from "framer-motion";
import { Button } from "@/shadcn/ui/button";

export default function Hero() {
    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(images/fondo.jpg)`, backgroundAttachment: "fixed" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-sm tracking-wider mb-4"
                >
                    HANDMADE MEETS LUXURY
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold max-w-4xl mb-8"
                >
                    Discover the Exquisite Craftsmanship of BB Simon Belts
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-none"
                    >
                        VIEW COLLECTION
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}