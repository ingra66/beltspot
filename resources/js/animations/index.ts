// Animaciones básicas
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
};

export const slideInRight = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { type: "spring", damping: 20, stiffness: 100 }
};

export const slideInUp = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
    transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1.2
    }
};

export const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
};

// Animaciones de hover
export const hoverScale = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
};

export const hoverRotate = {
    whileHover: { rotate: 90 },
    transition: { duration: 0.2 }
};

// Animaciones para imágenes
export const imageZoom = {
    initial: { scale: 0.9, y: 20 },
    animate: { scale: 1, y: 0 },
    exit: { scale: 0.9, y: 20 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
};

// Animaciones para scroll
export const scrollReveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

// Animaciones para grid
export const gridItemFadeIn = (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.1 }
});

export const slideInDown = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
    transition: { type: "spring", damping: 20, stiffness: 100 }
};

// Animaciones para SearchOverlay
export const searchOverlayAnimation = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.2 }
};

export const searchResultsAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.1 }
};

export const searchItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { 
        opacity: 1, 
        y: 0
    },
    transition: { duration: 0.2 }
};

export const searchOverlayBackdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
};

