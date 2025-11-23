import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';

export default function OrdersPage() {
    const orders = [
        { id: '#12345', date: '2024-11-20', status: 'Dostarczone', total: '299.99 zł', items: 3 },
        { id: '#12344', date: '2024-11-15', status: 'W drodze', total: '149.99 zł', items: 2 },
        { id: '#12343', date: '2024-11-10', status: 'Zrealizowane', total: '89.99 zł', items: 1 },
    ];

    const statusColors: Record<string, string> = {
        'Dostarczone': 'bg-green-100 text-green-700',
        'W drodze': 'bg-blue-100 text-blue-700',
        'Zrealizowane': 'bg-gray-100 text-gray-700',
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <Card>
                                <CardContent className="p-6">
                                    <nav className="space-y-2">
                                        <Link href="/konto/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Mój profil
                                        </Link>
                                        <Link href="/konto/zamowienia" className="block px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
                                            Zamówienia
                                        </Link>
                                        <Link href="/konto/adresy" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Adresy
                                        </Link>
                                        <Link href="/konto/harmonia" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Harmonia 360°
                                        </Link>
                                        <Link href="/konto/ustawienia" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Ustawienia
                                        </Link>
                                        <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                                            Wyloguj się
                                        </button>
                                    </nav>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <h1 className="text-2xl font-bold mb-6">Moje zamówienia</h1>

                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <Card key={order.id} className="hover:shadow-lg transition">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-4 mb-2">
                                                        <h3 className="font-semibold text-lg">{order.id}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        Data: {order.date} • {order.items} {order.items === 1 ? 'produkt' : 'produkty'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-600">Suma</p>
                                                        <p className="text-xl font-bold text-primary-600">{order.total}</p>
                                                    </div>
                                                    <Button variant="outline">
                                                        Szczegóły
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {orders.length === 0 && (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <p className="text-gray-600 mb-4">Nie masz jeszcze żadnych zamówień</p>
                                        <Link href="/produkty">
                                            <Button>Rozpocznij zakupy</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
