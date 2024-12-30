import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { router } from '@inertiajs/react';
import PageLoader from '@/Components/PageLoader';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

// Elemento para el loader
const loaderElement = document.createElement('div');
loaderElement.id = 'page-loader';
document.body.appendChild(loaderElement);

const showLoader = () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        const root = createRoot(loader);
        root.render(<PageLoader />);
    }
};

const hideLoader = () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.innerHTML = '';
    }
};

// Eventos del router
router.on('start', () => {
    showLoader();
});

router.on('finish', () => {
    hideLoader();
});
