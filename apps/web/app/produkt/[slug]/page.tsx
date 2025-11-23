import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent } from '@/components/ui';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-600 mb-6">
                        <a href="/" className="hover:text-primary-600">Home</a>
                        <span className="mx-2">/</span>
                        <a href="/produkty" className="hover:text-primary-600">Produkty</a>
                        <span className="mx-2">/</span>
                        <span>Nazwa produktu</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        {/* Product Images */}
                        <div>
                            <div className="w-full h-96 bg-gray-200 rounded-lg mb-4"></div>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-full h-24 bg-gray-200 rounded-lg cursor-pointer hover:opacity-75"></div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <h1 className="text-3xl font-bold mb-4">Nazwa Produktu</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    <span className="text-yellow-400">★★★★★</span>
                                    <span className="text-sm text-gray-600 ml-2">(24 opinie)</span>
                                </div>
                                <span className="text-sm text-green-600 font-medium">✓ Dostępny</span>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-bold text-primary-600">99.99 zł</span>
                                    <span className="text-xl text-gray-500 line-through">129.99 zł</span>
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                        -23%
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Opis</h3>
                                <p className="text-gray-700">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block font-semibold mb-2">Ilość</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button className="px-4 py-2 hover:bg-gray-100">-</button>
                                        <span className="px-4 py-2 border-x border-gray-300">1</span>
                                        <button className="px-4 py-2 hover:bg-gray-100">+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mb-6">
                                <Button size="lg" className="flex-1">
                                    Dodaj do koszyka
                                </Button>
                                <Button size="lg" variant="outline">
                                    ♥
                                </Button>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-3">Informacje</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex justify-between">
                                        <span>SKU:</span>
                                        <span className="font-medium">PROD-001</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Kategoria:</span>
                                        <span className="font-medium">Suplementy</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Dostawa:</span>
                                        <span className="font-medium">2-3 dni robocze</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Podobne produkty</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="hover:shadow-lg transition">
                                    <CardContent className="p-4">
                                        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                                        <h3 className="font-semibold mb-2">Produkt {i}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-primary-600">99.99 zł</span>
                                            <Button size="sm">Dodaj</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
