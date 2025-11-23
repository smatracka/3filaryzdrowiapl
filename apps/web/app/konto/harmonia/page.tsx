import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import Link from 'next/link';

export default function HarmoniaPage() {
    const healthScores = [
        { name: 'Ogólny stan zdrowia', score: 85, color: 'bg-green-500' },
        { name: 'Układ odpornościowy', score: 72, color: 'bg-blue-500' },
        { name: 'Metabolizm', score: 68, color: 'bg-yellow-500' },
        { name: 'Stres i sen', score: 55, color: 'bg-orange-500' },
    ];

    const recommendations = [
        {
            title: 'Witamina D3 + K2',
            reason: 'Niski poziom witaminy D (18 ng/ml)',
            priority: 'Wysoki',
            price: '49.99 zł',
        },
        {
            title: 'Magnez + B6',
            reason: 'Podwyższony poziom stresu',
            priority: 'Średni',
            price: '39.99 zł',
        },
        {
            title: 'Omega-3',
            reason: 'Wsparcie układu sercowo-naczyniowego',
            priority: 'Średni',
            price: '59.99 zł',
        },
    ];

    const biomarkers = [
        { name: 'Witamina D', value: '18 ng/ml', status: 'low', optimal: '30-50 ng/ml' },
        { name: 'Magnez', value: '1.8 mg/dL', status: 'normal', optimal: '1.7-2.2 mg/dL' },
        { name: 'Cholesterol', value: '195 mg/dL', status: 'normal', optimal: '<200 mg/dL' },
        { name: 'Glukoza', value: '92 mg/dL', status: 'normal', optimal: '70-100 mg/dL' },
    ];

    const priorityColors: Record<string, string> = {
        'Wysoki': 'bg-red-100 text-red-700',
        'Średni': 'bg-yellow-100 text-yellow-700',
        'Niski': 'bg-green-100 text-green-700',
    };

    const statusColors: Record<string, string> = {
        'low': 'text-red-600',
        'normal': 'text-green-600',
        'high': 'text-orange-600',
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
                                        <Link href="/konto/zamowienia" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Zamówienia
                                        </Link>
                                        <Link href="/konto/adresy" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Adresy
                                        </Link>
                                        <Link href="/konto/harmonia" className="block px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
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
                        <div className="lg:col-span-3 space-y-6">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8">
                                <h1 className="text-3xl font-bold mb-2">Harmonia 360°</h1>
                                <p className="text-primary-100">Twój osobisty asystent zdrowia oparty na AI</p>
                            </div>

                            {/* Health Scores */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Twoje wyniki zdrowotne</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {healthScores.map((item) => (
                                            <div key={item.name} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                    <span className="text-sm font-bold">{item.score}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`${item.color} h-2 rounded-full transition-all`}
                                                        style={{ width: `${item.score}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <Button variant="outline" className="w-full">
                                            Zaktualizuj dane zdrowotne
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Biomarkers */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Twoje biomarkery</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {biomarkers.map((marker) => (
                                            <div key={marker.name} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                                                <div>
                                                    <p className="font-medium">{marker.name}</p>
                                                    <p className="text-sm text-gray-600">Optymalnie: {marker.optimal}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-bold ${statusColors[marker.status]}`}>
                                                        {marker.value}
                                                    </p>
                                                    <p className="text-xs text-gray-500 capitalize">{marker.status}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <Button variant="outline" className="w-full">
                                            Dodaj nowe badanie
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AI Recommendations */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rekomendacje AI dla Ciebie</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recommendations.map((rec, index) => (
                                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                                                        <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[rec.priority]}`}>
                                                        {rec.priority}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <span className="text-xl font-bold text-primary-600">{rec.price}</span>
                                                    <Button size="sm">Dodaj do koszyka</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quiz CTA */}
                            <Card className="bg-primary-50 border-primary-200">
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">Nie wypełniłeś jeszcze quizu zdrowotnego?</h3>
                                    <p className="text-gray-700 mb-4">
                                        Odpowiedz na kilka pytań, a AI pomoże Ci dobrać idealne suplementy
                                    </p>
                                    <Button size="lg">Rozpocznij quiz (5 min)</Button>
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
