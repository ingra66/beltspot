import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { AnimatePresence } from 'framer-motion';
import PageLoader from './Components/PageLoader';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - My App`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const app = (
            <AnimatePresence mode="wait">
                <PageLoader key="loader" />
                <App {...props} />
            </AnimatePresence>
        );

        root.render(app);
    },
    progress: {
        color: '#4B5563',
        showSpinner: false,
    },
});
