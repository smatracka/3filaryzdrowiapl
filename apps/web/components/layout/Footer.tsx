import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">3 Filary Zdrowia</h3>
                        <p className="text-sm">
                            Twoje zdrowie w centrum uwagi. Suplementy, kosmetyki i zdrowa żywność.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Sklep</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/produkty" className="hover:text-white transition">Wszystkie produkty</Link></li>
                            <li><Link href="/kategorie" className="hover:text-white transition">Kategorie</Link></li>
                            <li><Link href="/nowosci" className="hover:text-white transition">Nowości</Link></li>
                            <li><Link href="/promocje" className="hover:text-white transition">Promocje</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Pomoc</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/kontakt" className="hover:text-white transition">Kontakt</Link></li>
                            <li><Link href="/dostawa" className="hover:text-white transition">Dostawa</Link></li>
                            <li><Link href="/zwroty" className="hover:text-white transition">Zwroty</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Informacje</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/o-nas" className="hover:text-white transition">O nas</Link></li>
                            <li><Link href="/regulamin" className="hover:text-white transition">Regulamin</Link></li>
                            <li><Link href="/polityka-prywatnosci" className="hover:text-white transition">Polityka prywatności</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} 3 Filary Zdrowia. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
};
