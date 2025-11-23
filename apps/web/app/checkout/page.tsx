import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent, Input } from '@/components/ui';

export default function CheckoutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Finalizacja zamówienia</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Address */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">Adres dostawy</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input label="Imię" placeholder="Jan" />
                                        <Input label="Nazwisko" placeholder="Kowalski" />
                                        <Input label="Email" type="email" placeholder="jan@example.com" className="md:col-span-2" />
                                        <Input label="Telefon" placeholder="+48 123 456 789" className="md:col-span-2" />
                                        <Input label="Ulica i numer" placeholder="ul. Przykładowa 123" className="md:col-span-2" />
                                        <Input label="Kod pocztowy" placeholder="00-000" />
                                        <Input label="Miasto" placeholder="Warszawa" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Shipping Method */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">Metoda dostawy</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Kurier DPD', price: '15.00 zł', time: '2-3 dni' },
                                            { name: 'InPost Paczkomaty', price: '12.00 zł', time: '1-2 dni' },
                                            { name: 'Poczta Polska', price: '10.00 zł', time: '3-5 dni' },
                                        ].map((method) => (
                                            <label key={method.name} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-600">
                                                <div className="flex items-center">
                                                    <input type="radio" name="shipping" className="mr-3" />
                                                    <div>
                                                        <p className="font-medium">{method.name}</p>
                                                        <p className="text-sm text-gray-600">{method.time}</p>
                                                    </div>
                                                </div>
                                                <span className="font-semibold">{method.price}</span>
                                            </label>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Method */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">Metoda płatności</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Przelewy24', desc: 'Szybkie płatności online' },
                                            { name: 'Karta kredytowa', desc: 'Visa, Mastercard' },
                                            { name: 'Przelew tradycyjny', desc: '7 dni na wpłatę' },
                                        ].map((method) => (
                                            <label key={method.name} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-600">
                                                <input type="radio" name="payment" className="mr-3" />
                                                <div>
                                                    <p className="font-medium">{method.name}</p>
                                                    <p className="text-sm text-gray-600">{method.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-4">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">Twoje zamówienie</h3>

                                    {/* Items */}
                                    <div className="space-y-3 mb-4 pb-4 border-b">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-gray-600">Produkt {i} × 1</span>
                                                <span className="font-medium">99.99 zł</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Summary */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Produkty</span>
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

                                    <Button size="lg" className="w-full">
                                        Zamawiam i płacę
                                    </Button>

                                    <p className="text-xs text-gray-600 mt-4 text-center">
                                        Klikając "Zamawiam i płacę" akceptujesz{' '}
                                        <a href="/regulamin" className="text-primary-600 hover:underline">Regulamin</a>
                                    </p>
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
