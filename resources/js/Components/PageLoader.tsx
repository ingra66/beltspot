import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
            <img 
                src="/images/logo.png" 
                alt="BeltSpot" 
                className="w-32 h-32 animate-blink"
            />
        </div>
    );
} 