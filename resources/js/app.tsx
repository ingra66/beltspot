import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { router } from '@inertiajs/react';
import { HelmetProvider } from 'react-helmet-async';
import PageLoader from '@/Components/PageLoader';
import { CartProvider } from '@/Contexts/CartContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Crear un elemento para el loader
const loaderElement = document.createElement('div');
loaderElement.id = 'loader';
document.body.appendChild(loaderElement);

// Crear una única instancia de root para el loader
const loaderRoot = createRoot(loaderElement);

// Función para mostrar/ocultar el loader usando PageLoader
const showLoader = (show: boolean) => {
    if (show) {
        loaderRoot.render(<PageLoader />);
    } else {
        loaderRoot.render(null);
    }
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        return pages[`./Pages/${name}.tsx`]
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <HelmetProvider>
                <CartProvider>
                    <App {...props} />
                </CartProvider>
            </HelmetProvider>
        );
    },
    progress: {
        delay: 250,
        color: '#29d',
        includeCSS: true,
        showSpinner: true,
    },
});

// Agregar eventos para mostrar/ocultar el loader
document.addEventListener('inertia:start', () => showLoader(true));
document.addEventListener('inertia:finish', () => showLoader(false));
