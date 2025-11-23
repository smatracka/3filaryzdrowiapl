'use client';

import React, { useState } from 'react';
import { Card, CardContent, Button } from '@/components/ui';
import Link from 'next/link';
import type { Product, ProductStatus, ProductType } from '@/types/admin';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProductStatus | 'ALL'>('ALL');
    const [typeFilter, setTypeFilter] = useState<ProductType | 'ALL'>('ALL');

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:3002/products');
                if (!res.ok) throw new Error('Failed to fetch products');
                const response = await res.json();
                // Product Service returns {data, total, skip, take}
                setProducts(response.data || response);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = statusFilter === 'ALL' || product.status === statusFilter;
        // const matchesType = typeFilter === 'ALL' || product.type === typeFilter; // Type is not yet populated in import

        return matchesSearch && matchesStatus;
    });

    const statusColors: Record<string, string> = {
        active: 'bg-green-100 text-green-700',
        draft: 'bg-yellow-100 text-yellow-700',
        archived: 'bg-gray-100 text-gray-700',
    };

    const statusCounts = {
        ALL: products.length,
        ACTIVE: products.filter((p) => p.status === 'active').length,
        DRAFT: products.filter((p) => p.status === 'draft').length,
        ARCHIVED: products.filter((p) => p.status === 'archived').length,
    };

    if (loading) return <div className="p-8">Ładowanie produktów...</div>;
    if (error) return <div className="p-8 text-red-500">Błąd: {error}</div>;

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
                                <option value="active">Aktywne ({statusCounts.ACTIVE})</option>
                                <option value="draft">Wersje robocze ({statusCounts.DRAFT})</option>
                                <option value="archived">Zarchiwizowane ({statusCounts.ARCHIVED})</option>
                            </select>
                        </div>

                        {/* Type Filter - Disabled for now as import defaults to SIMPLE */}
                        {/* 
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
                        */}
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
                                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Typ
                                    </th> */}
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
                                            <span className="text-sm">{product.brand || '-'}</span>
                                        </td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm">{product.type}</span>
                                        </td> */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[product.status] || 'bg-gray-100'}`}>
                                                {product.status === 'active' ? 'AKTYWNY' : product.status === 'draft' ? 'SZKIC' : 'ARCHIWUM'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(product.updatedAt).toLocaleDateString('pl-PL')}
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
