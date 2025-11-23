import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent } from '@/components/ui';

export default function ProductsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-600 mb-6">
                        <a href="/" className="hover:text-primary-600">Home</a>
                        <span className="mx-2">/</span>
                        <span>Produkty</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside className="lg:col-span-1">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">Filtry</h3>

                                    {/* Category Filter */}
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-3">Kategoria</h4>
                                        <div className="space-y-2">
                                            {['Suplementy', 'Kosmetyki', 'Zdrowa żywność', 'Witaminy'].map((cat) => (
                                                <label key={cat} className="flex items-center">
                                                    <input type="checkbox" className="mr-2" />
                                                    <span className="text-sm">{cat}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-3">Cena</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                <span className="text-sm">Do 50 zł</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                <span className="text-sm">50 - 100 zł</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                <span className="text-sm">Powyżej 100 zł</span>
                                            </label>
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full">
                                        Wyczyść filtry
                                    </Button>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {/* Toolbar */}
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-gray-600">Znaleziono <strong>24 produkty</strong></p>
                                <select className="border border-gray-300 rounded-lg px-4 py-2">
                                    <option>Sortuj: Najnowsze</option>
                                    <option>Cena: rosnąco</option>
                                    <option>Cena: malejąco</option>
                                    <option>Nazwa: A-Z</option>
                                </select>
                            </div>

                            {/* Products */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <Card key={i} className="hover:shadow-lg transition cursor-pointer">
                                        <CardContent className="p-4">
                                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                                            <h3 className="font-semibold mb-2">Produkt {i + 1}</h3>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                Krótki opis produktu który może być dłuższy
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-xl font-bold text-primary-600">99.99 zł</span>
                                                    {i % 3 === 0 && (
                                                        <span className="block text-sm text-gray-500 line-through">129.99 zł</span>
                                                    )}
                                                </div>
                                                <Button size="sm">Dodaj</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-8 gap-2">
                                <Button variant="outline" size="sm">Poprzednia</Button>
                                <Button variant="primary" size="sm">1</Button>
                                <Button variant="outline" size="sm">2</Button>
                                <Button variant="outline" size="sm">3</Button>
                                <Button variant="outline" size="sm">Następna</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
