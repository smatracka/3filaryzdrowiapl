'use client';

import React, { useState } from 'react';
import { Card, CardContent, Button } from '@/components/ui';
import Link from 'next/link';
import type { Product, ProductStatus, ProductType } from '@/types/admin';

// Mock data
const mockProducts: Product[] = [
    {
        id: '1',
        sku: 'VIT-D3-1000',
        ean: '5901234567890',
        brand: '3 Filary Zdrowia',
        name: 'Witamina D3 1000 IU',
        type: 'SIMPLE',
        status: 'ACTIVE',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date('2024-11-23'),
    },
    {
        id: '2',
        sku: 'MAG-CIT-400',
        ean: '5901234567891',
        brand: '3 Filary Zdrowia',
        name: 'Magnez Cytrynian 400mg',
        type: 'SIMPLE',
        status: 'ACTIVE',
        createdAt: new Date('2024-10-15'),
        updatedAt: new Date('2024-11-22'),
    },
    {
        id: '3',
        sku: 'OMEGA-3-1000',
        brand: '3 Filary Zdrowia',
        name: 'Omega-3 1000mg',
        type: 'VARIANT',
        status: 'DRAFT',
        createdAt: new Date('2024-11-20'),
        updatedAt: new Date('2024-11-21'),
    },
    {
        id: '4',
        sku: 'VIT-C-1000',
        ean: '5901234567892',
        brand: 'Premium Health',
        name: 'Witamina C 1000mg',
        type: 'SIMPLE',
        status: 'ACTIVE',
        createdAt: new Date('2024-09-10'),
        updatedAt: new Date('2024-11-20'),
    },
    {
        id: '5',
        sku: 'PROBIO-MIX',
        brand: '3 Filary Zdrowia',
        name: 'Probiotyk Mix 10 szczepów',
        type: 'SIMPLE',
        status: 'ARCHIVED',
        createdAt: new Date('2024-08-01'),
        updatedAt: new Date('2024-10-15'),
    },
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProductStatus | 'ALL'>('ALL');
    const [typeFilter, setTypeFilter] = useState<ProductType | 'ALL'>('ALL');

    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || product.status === statusFilter;
        const matchesType = typeFilter === 'ALL' || product.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const statusColors: Record<ProductStatus, string> = {
        ACTIVE: 'bg-green-100 text-green-700',
        DRAFT: 'bg-yellow-100 text-yellow-700',
        ARCHIVED: 'bg-gray-100 text-gray-700',
    };

    const statusCounts = {
        ALL: mockProducts.length,
        ACTIVE: mockProducts.filter((p) => p.status === 'ACTIVE').length,
        DRAFT: mockProducts.filter((p) => p.status === 'DRAFT').length,
        ARCHIVED: mockProducts.filter((p) => p.status === 'ARCHIVED').length,
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Produkty</h1>
                    <p className="text-gray-600">{filteredProducts.length} produktów</p>
                </div>
                <Link href="/admin/produkty/nowy">
                    <Button size="lg">
                        ➕ Dodaj produkt
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Szukaj</label>
                            <input
                                type="text"
                                placeholder="SKU, nazwa, marka..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as ProductStatus | 'ALL')}
                            >
                                <option value="ALL">Wszystkie ({statusCounts.ALL})</option>
                                <option value="ACTIVE">Aktywne ({statusCounts.ACTIVE})</option>
                                <option value="DRAFT">Wersje robocze ({statusCounts.DRAFT})</option>
                                <option value="ARCHIVED">Zarchiwizowane ({statusCounts.ARCHIVED})</option>
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Typ</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value as ProductType | 'ALL')}
                            >
                                <option value="ALL">Wszystkie typy</option>
                                <option value="SIMPLE">Prosty</option>
                                <option value="VARIANT">Wariantowy</option>
                                <option value="BUNDLE">Zestaw</option>
                                <option value="SERVICE">Usługa</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        SKU
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nazwa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Marka
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Typ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ostatnia edycja
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Akcje
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-mono text-sm">{product.sku}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                {product.ean && (
                                                    <p className="text-sm text-gray-500">EAN: {product.ean}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm">{product.brand}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm">{product.type}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.updatedAt.toLocaleDateString('pl-PL')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/produkty/${product.id}`}
                                                className="text-primary-600 hover:text-primary-900 mr-4"
                                            >
                                                Edytuj
                                            </Link>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                ⋮
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">Nie znaleziono produktów</p>
                            <Button variant="outline" onClick={() => {
                                setSearchQuery('');
                                setStatusFilter('ALL');
                                setTypeFilter('ALL');
                            }}>
                                Wyczyść filtry
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
