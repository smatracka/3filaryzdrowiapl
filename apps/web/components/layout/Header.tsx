import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
                        <span className="text-xl font-bold text-gray-900">3 Filary Zdrowia</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/produkty" className="text-gray-700 hover:text-primary-600 transition">
                            Produkty
                        </Link>
                        <Link href="/kategorie" className="text-gray-700 hover:text-primary-600 transition">
                            Kategorie
                        </Link>
                        <Link href="/harmonia" className="text-gray-700 hover:text-primary-600 transition">
                            Harmonia 360°
                        </Link>
                        <Link href="/blog" className="text-gray-700 hover:text-primary-600 transition">
                            Blog
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-primary-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <Link href="/konto" className="text-gray-700 hover:text-primary-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                        <Link href="/koszyk" className="relative text-gray-700 hover:text-primary-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
