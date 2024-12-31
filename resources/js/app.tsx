import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { router } from '@inertiajs/react';
import PageLoader from '@/Components/PageLoader';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

let root: any = null;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        if (!root) {
            root = createRoot(el);
        }
        root.render(<App {...props} />);
    },
    progress: {
        color: '#000',
    },
});

// Para el loader, usar un enfoque diferente
const loaderContainer = document.getElementById('page-loader') || (() => {
    const el = document.createElement('div');
    el.id = 'page-loader';
    document.body.appendChild(el);
    return el;
})();

let loaderRoot: any = null;

const showLoader = () => {
    if (!loaderRoot) {
        loaderRoot = createRoot(loaderContainer);
    }
    loaderRoot.render(<PageLoader />);
};

const hideLoader = () => {
    if (loaderRoot) {
        loaderRoot.unmount();
        loaderRoot = null;
    }
};

router.on('start', showLoader);
router.on('finish', hideLoader);
