import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent, Input } from '@/components/ui';
import Link from 'next/link';

export default function ProfilePage() {
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
                                        <Link href="/konto/profil" className="block px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
                                            Mój profil
                                        </Link>
                                        <Link href="/konto/zamowienia" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
                            <Card>
                                <CardContent className="p-8">
                                    <h1 className="text-2xl font-bold mb-6">Mój profil</h1>

                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="Imię"
                                                defaultValue="Jan"
                                            />
                                            <Input
                                                label="Nazwisko"
                                                defaultValue="Kowalski"
                                            />
                                        </div>

                                        <Input
                                            label="Email"
                                            type="email"
                                            defaultValue="jan@example.com"
                                        />

                                        <Input
                                            label="Telefon"
                                            type="tel"
                                            defaultValue="+48 123 456 789"
                                        />

                                        <div className="border-t pt-6">
                                            <h3 className="font-semibold mb-4">Zmiana hasła</h3>
                                            <div className="space-y-4">
                                                <Input
                                                    label="Obecne hasło"
                                                    type="password"
                                                />
                                                <Input
                                                    label="Nowe hasło"
                                                    type="password"
                                                />
                                                <Input
                                                    label="Potwierdź nowe hasło"
                                                    type="password"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button type="submit">
                                                Zapisz zmiany
                                            </Button>
                                            <Button type="button" variant="outline">
                                                Anuluj
                                            </Button>
                                        </div>
                                    </form>
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
