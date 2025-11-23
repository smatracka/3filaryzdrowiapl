import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { label: 'Wszystkie produkty', value: '247', change: '+12', color: 'bg-blue-500' },
        { label: 'Aktywne', value: '189', change: '+8', color: 'bg-green-500' },
        { label: 'Wersje robocze', value: '42', change: '+4', color: 'bg-yellow-500' },
        { label: 'Zarchiwizowane', value: '16', change: '0', color: 'bg-gray-500' },
    ];

    const recentProducts = [
        { id: '1', sku: 'VIT-D3-1000', name: 'Witamina D3 1000 IU', status: 'DRAFT', updatedAt: '2024-11-23' },
        { id: '2', sku: 'MAG-CIT-400', name: 'Magnez Cytrynian 400mg', status: 'ACTIVE', updatedAt: '2024-11-22' },
        { id: '3', sku: 'OMEGA-3-1000', name: 'Omega-3 1000mg', status: 'ACTIVE', updatedAt: '2024-11-21' },
        { id: '4', sku: 'VIT-C-1000', name: 'Witamina C 1000mg', status: 'REVIEW', updatedAt: '2024-11-20' },
    ];

    const channelStatus = [
        { channel: 'Sklep', synced: 189, pending: 12, error: 0 },
        { channel: 'Allegro', synced: 156, pending: 8, error: 2 },
        { channel: 'Erli', synced: 142, pending: 15, error: 1 },
        { channel: 'Amazon', synced: 98, pending: 5, error: 0 },
    ];

    const statusColors: Record<string, string> = {
        'ACTIVE': 'bg-green-100 text-green-700',
        'DRAFT': 'bg-yellow-100 text-yellow-700',
        'REVIEW': 'bg-blue-100 text-blue-700',
        'ARCHIVED': 'bg-gray-100 text-gray-700',
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-600">Przegląd systemu PIM</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <p className="text-sm text-green-600 mt-1">{stat.change} w tym miesiącu</p>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-lg`}></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ostatnio edytowane produkty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/admin/produkty/${product.id}`}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                                >
                                    <div>
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                                            {product.status}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">{product.updatedAt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Link href="/admin/produkty" className="block mt-4 text-center text-primary-600 hover:text-primary-700">
                            Zobacz wszystkie produkty →
                        </Link>
                    </CardContent>
                </Card>

                {/* Channel Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status synchronizacji kanałów</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {channelStatus.map((channel) => (
                                <div key={channel.channel} className="border-b pb-4 last:border-b-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium">{channel.channel}</p>
                                        <p className="text-sm text-gray-600">{channel.synced} zsynchronizowanych</p>
                                    </div>
                                    <div className="flex gap-4 text-sm">
                                        <span className="text-yellow-600">⏳ {channel.pending} oczekujących</span>
                                        {channel.error > 0 && (
                                            <span className="text-red-600">❌ {channel.error} błędów</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/admin/kanaly" className="block mt-4 text-center text-primary-600 hover:text-primary-700">
                            Zarządzaj kanałami →
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Szybkie akcje</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href="/admin/produkty/nowy"
                                className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-center"
                            >
                                <div className="text-4xl mb-2">➕</div>
                                <p className="font-medium">Dodaj produkt</p>
                            </Link>
                            <Link
                                href="/admin/produkty?status=DRAFT"
                                className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-center"
                            >
                                <div className="text-4xl mb-2">📝</div>
                                <p className="font-medium">Wersje robocze</p>
                            </Link>
                            <Link
                                href="/admin/biomarkery"
                                className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-center"
                            >
                                <div className="text-4xl mb-2">🧬</div>
                                <p className="font-medium">Biomarkery</p>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
