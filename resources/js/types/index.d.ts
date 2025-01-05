export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio_reg: number;
    precio_ofert: number | null;
    act_ofert: boolean;
    ver_act: boolean;
    stock: number;
    categoria: {
        id: number;
        nombre: string;
    };
    subcategoria: {
        id: number;
        nombre: string;
    };
    imagenes: {
        id: number;
        img: string;
    }[];
}
