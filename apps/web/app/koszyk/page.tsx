import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';

export default function CartPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Koszyk</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardContent className="p-6">
                                    {/* Cart Item */}
                                    {[1, 2].map((i) => (
                                        <div key={i} className="flex gap-4 pb-6 mb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
                                            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">Produkt {i}</h3>
                                                <p className="text-sm text-gray-600 mb-2">SKU: PROD-00{i}</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button className="px-3 py-1 hover:bg-gray-100">-</button>
                                                        <span className="px-3 py-1 border-x border-gray-300">1</span>
                                                        <button className="px-3 py-1 hover:bg-gray-100">+</button>
                                                    </div>
                                                    <button className="text-red-600 hover:text-red-700 text-sm">Usuń</button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-primary-600">99.99 zł</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">Podsumowanie</h3>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Produkty (2)</span>
                                            <span className="font-medium">199.98 zł</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Dostawa</span>
                                            <span className="font-medium">15.00 zł</span>
                                        </div>
                                        <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                            <span>Razem</span>
                                            <span className="text-primary-600">214.98 zł</span>
                                        </div>
                                    </div>
                                    <Link href="/checkout">
                                        <Button size="lg" className="w-full">
                                            Przejdź do kasy
                                        </Button>
                                    </Link>
                                    <Link href="/produkty">
                                        <Button size="lg" variant="outline" className="w-full mt-3">
                                            Kontynuuj zakupy
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
