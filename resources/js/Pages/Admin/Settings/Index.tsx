import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Save, Mail, Globe, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

interface Settings {
    site_name: string;
    email_contact: string;
    phone: string;
    address: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
    shipping_cost: number;
    min_purchase_free_shipping: number;
    maintenance_mode: boolean;
}

export default function Settings({ settings }: { settings: Settings }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: settings?.site_name || '',
        email_contact: settings?.email_contact || '',
        phone: settings?.phone || '',
        address: settings?.address || '',
        facebook_url: settings?.facebook_url || '',
        instagram_url: settings?.instagram_url || '',
        twitter_url: settings?.twitter_url || '',
        shipping_cost: settings?.shipping_cost || 0,
        min_purchase_free_shipping: settings?.min_purchase_free_shipping || 0,
        maintenance_mode: settings?.maintenance_mode || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout>
            <Head title="Configuración" />

            <div className="container mx-auto py-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-white">Configuración del Sitio</h1>

                    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg shadow p-6 border border-zinc-800">
                        {/* Información General */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                                <Globe className="mr-2" /> Información General
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Nombre del Sitio
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white"
                                        value={data.site_name}
                                        onChange={e => setData('site_name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Modo Mantenimiento
                                    </label>
                                    <input
                                        type="checkbox"
                                        checked={data.maintenance_mode}
                                        onChange={e => setData('maintenance_mode', e.target.checked)}
                                        className="form-checkbox bg-black border-zinc-800"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Información de Contacto */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                                <Mail className="mr-2" /> Información de Contacto
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Email de Contacto
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white"
                                        value={data.email_contact}
                                        onChange={e => setData('email_contact', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Redes Sociales */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-white">Redes Sociales</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Facebook, Instagram, Twitter inputs */}
                            </div>
                        </div>

                        {/* Configuración de Envíos */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-white">Configuración de Envíos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Costo de Envío Base
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white"
                                        value={data.shipping_cost}
                                        onChange={e => setData('shipping_cost', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Mínimo para Envío Gratis
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-white"
                                        value={data.min_purchase_free_shipping}
                                        onChange={e => setData('min_purchase_free_shipping', Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center"
                                disabled={processing}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
} 