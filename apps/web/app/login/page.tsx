import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent, Input } from '@/components/ui';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 flex items-center justify-center py-12">
                <div className="w-full max-w-md px-4">
                    <Card>
                        <CardContent className="p-8">
                            <h1 className="text-2xl font-bold text-center mb-6">Zaloguj się</h1>

                            <form className="space-y-4">
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
                                    required
                                />

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>Zapamiętaj mnie</span>
                                    </label>
                                    <Link href="/reset-hasla" className="text-primary-600 hover:text-primary-700">
                                        Zapomniałeś hasła?
                                    </Link>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Zaloguj się
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Nie masz konta?{' '}
                                <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Zarejestruj się
                                </Link>
                            </div>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Lub zaloguj się przez</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="w-full">
                                        Google
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Facebook
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
