import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
            <div className="flex flex-col items-center">
                <img 
                    src="/images/logo.png" 
                    alt="BeltSpot" 
                    className="w-48 h-48 animate-blink"
                />
            </div>
        </div>
    );
} 