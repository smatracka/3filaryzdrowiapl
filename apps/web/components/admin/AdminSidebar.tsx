import React from 'react';
import Link from 'next/link';

interface AdminSidebarProps {
    currentPath?: string;
}

export function AdminSidebar({ currentPath }: AdminSidebarProps) {
    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Produkty', path: '/admin/produkty', icon: '📦' },
        { name: 'Kategorie', path: '/admin/kategorie', icon: '🏷️' },
        { name: 'Atrybuty', path: '/admin/atrybuty', icon: '⚙️' },
        { name: 'Kanały', path: '/admin/kanaly', icon: '📡' },
        { name: 'Biomarkery', path: '/admin/biomarkery', icon: '🧬' },
        { name: 'Ustawienia', path: '/admin/ustawienia', icon: '🔧' },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <span>←</span>
                    <span>Powrót do sklepu</span>
                </Link>
            </div>
        </aside>
    );
}
