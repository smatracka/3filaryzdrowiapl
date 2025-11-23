import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent, Input } from '@/components/ui';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 flex items-center justify-center py-12">
                <div className="w-full max-w-md px-4">
                    <Card>
                        <CardContent className="p-8">
                            <h1 className="text-2xl font-bold text-center mb-6">Utwórz konto</h1>

                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Imię"
                                        placeholder="Jan"
                                        required
                                    />
                                    <Input
                                        label="Nazwisko"
                                        placeholder="Kowalski"
                                        required
                                    />
                                </div>

                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="jan@example.com"
                                    required
                                />

                                <Input
                                    label="Hasło"
                                    type="password"
                                    placeholder="••••••••"
                                    helperText="Min. 8 znaków"
                                    required
                                />

                                <Input
                                    label="Potwierdź hasło"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />

                                <div className="flex items-start">
                                    <input type="checkbox" className="mt-1 mr-2" required />
                                    <span className="text-sm text-gray-600">
                                        Akceptuję{' '}
                                        <Link href="/regulamin" className="text-primary-600 hover:text-primary-700">
                                            Regulamin
                                        </Link>
                                        {' '}i{' '}
                                        <Link href="/polityka-prywatnosci" className="text-primary-600 hover:text-primary-700">
                                            Politykę Prywatności
                                        </Link>
                                    </span>
                                </div>

                                <div className="flex items-start">
                                    <input type="checkbox" className="mt-1 mr-2" />
                                    <span className="text-sm text-gray-600">
                                        Chcę otrzymywać newsletter z ofertami i poradami zdrowotnymi
                                    </span>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Zarejestruj się
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Masz już konto?{' '}
                                <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Zaloguj się
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
