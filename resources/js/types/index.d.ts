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
    descripcion: string | null;
    categoria: number;
    subcategoria: number;
    stock: number;
    precio_reg: number;
    precio_ofert: number | null;
    ver_act: boolean;
    act_ofert: boolean;
    imagenes: {
        id: number;
        img: string;
    }[];
    created_at: string;
    updated_at: string;
}
