import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Admin() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="bg-zinc-900 overflow-hidden shadow-lg rounded-lg">
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Widget 1 */}
                        <div className="bg-black p-6 rounded-lg border border-zinc-800">
                            <h3 className="text-2xl font-bold text-white">150</h3>
                            <p className="text-white">Nuevos Pedidos</p>
                        </div>

                        {/* Widget 2 */}
                        <div className="bg-black p-6 rounded-lg border border-zinc-800">
                            <h3 className="text-2xl font-bold text-white">53%</h3>
                            <p className="text-white">Tasa de Conversión</p>
                        </div>

                        {/* Widget 3 */}
                        <div className="bg-black p-6 rounded-lg border border-zinc-800">
                            <h3 className="text-2xl font-bold text-white">44</h3>
                            <p className="text-white">Usuarios Registrados</p>
                        </div>

                        {/* Widget 4 */}
                        <div className="bg-black p-6 rounded-lg border border-zinc-800">
                            <h3 className="text-2xl font-bold text-white">65</h3>
                            <p className="text-white">Productos en Stock</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {/* Últimos Pedidos */}
                        <div className="bg-black p-6 rounded-lg border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-4 text-white">Últimos Pedidos</h3>
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left text-white">ID</th>
                                        <th className="text-left text-white">Cliente</th>
                                        <th className="text-left text-white">Estado</th>
                                        <th className="text-left text-white">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    <tr>
                                        <td>#1</td>
                                        <td>Juan Pérez</td>
                                        <td>
                                            <span className="bg-red-950 text-red-500 px-2 py-1 rounded-full text-sm">
                                                Completado
                                            </span>
                                        </td>
                                        <td>$150.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Productos Más Vendidos */}
                        <div className="bg-black p-6 rounded-lg border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-4 text-white">Productos Más Vendidos</h3>
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left text-white">Producto</th>
                                        <th className="text-left text-white">Ventas</th>
                                        <th className="text-left text-white">Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    <tr>
                                        <td>Cinturón Classic</td>
                                        <td>45</td>
                                        <td>12</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
