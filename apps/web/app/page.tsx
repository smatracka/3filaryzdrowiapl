import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Twoje zdrowie w centrum uwagi
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Odkryj najlepsze suplementy, kosmetyki i zdrową żywność.
                Personalizowane rekomendacje dzięki Harmonia 360°.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary">
                  Odkryj produkty
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                  Harmonia 360°
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Kategorie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Suplementy', 'Kosmetyki', 'Zdrowa żywność'].map((category) => (
                <Card key={category} className="hover:shadow-lg transition cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">{category}</h3>
                    <p className="text-gray-600 mb-4">
                      Odkryj naszą ofertę {category.toLowerCase()}
                    </p>
                    <Link href={`/kategorie/${category.toLowerCase()}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      Zobacz więcej →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Polecane produkty</h2>
              <Link href="/produkty" className="text-primary-600 hover:text-primary-700 font-medium">
                Zobacz wszystkie →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="hover:shadow-lg transition">
                  <CardContent className="p-4">
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-semibold mb-2">Produkt {i}</h3>
                    <p className="text-sm text-gray-600 mb-4">Krótki opis produktu</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary-600">99.99 zł</span>
                      <Button size="sm">Dodaj</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Harmonia 360 CTA */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Harmonia 360°</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Personalizowane rekomendacje suplementów na podstawie Twoich biomarkerów i stylu życia
            </p>
            <Button size="lg">Rozpocznij quiz zdrowotny</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
