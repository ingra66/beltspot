export interface Product {
    id: string;
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    size?: string;
}

export const belts: Product[] = [
    {
        id: 'belt-1',
        title: "BB Simon Crystal",
        price: "75.000 ARS",
        description: "Cinturón con cristales Swarovski. Diseño exclusivo con detalles brillantes. Hebilla de alta calidad.",
        image: "/images/belts/belt1.webp",
        category: "Premium",
        size: "100cm"
    },
    // Agrega más cinturones
];

export const caps: Product[] = [
    {
        id: 'cap-1',
        title: "New Era Yankees",
        price: "45.000 ARS",
        description: "Gorra New Era NY Yankees. 59FIFTY Fitted. Material premium. Bordado de alta calidad. Ajuste perfecto.",
        image: "/images/caps/cap1.webp",
        category: "Premium",
        size: "7 1/4"
    },
    // Agrega más gorras
];

export const chains: Product[] = [
    {
        id: 'chain-1',
        title: "Cuban Link Diamond",
        price: "120.000 ARS",
        description: "Cadena Cuban Link con diamantes. Oro 18k. Diseño premium. Cierre de seguridad.",
        image: "/images/chains/chain1.webp",
        category: "Premium",
        size: "20\""
    },
    // Agrega más cadenas
];

export const others: Product[] = [
    {
        id: 'other-1',
        title: "Lentes Ray-Ban",
        price: "85.000 ARS",
        description: "Lentes Ray-Ban Aviator Classic. Montura dorada. Cristales polarizados. Protección UV400.",
        image: "/images/others/rayban1.webp",
        category: "Premium",
        size: "58mm"
    },
    // Agrega más productos
]; 