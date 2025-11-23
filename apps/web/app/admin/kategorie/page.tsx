'use client';

import React, { useState } from 'react';
import { Card, CardContent, Button } from '@/components/ui';
import Link from 'next/link';
import type { Category } from '@/types/admin';

// Mock hierarchical category data
const mockCategories: Category[] = [
    {
        id: '1',
        name: 'Suplementy',
        slug: 'suplementy',
        description: 'Suplementy diety',
        level: 0,
        order: 1,
        isActive: true,
        productCount: 156,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-11-20'),
        children: [
            {
                id: '2',
                name: 'Witaminy',
                slug: 'witaminy',
                parentId: '1',
                level: 1,
                order: 1,
                isActive: true,
                productCount: 45,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-11-20'),
                children: [
                    {
                        id: '3',
                        name: 'Witamina D',
                        slug: 'witamina-d',
                        parentId: '2',
                        level: 2,
                        order: 1,
                        isActive: true,
                        productCount: 12,
                        createdAt: new Date('2024-01-01'),
                        updatedAt: new Date('2024-11-20'),
                    },
                    {
                        id: '4',
                        name: 'Witamina C',
                        slug: 'witamina-c',
                        parentId: '2',
                        level: 2,
                        order: 2,
                        isActive: true,
                        productCount: 15,
                        createdAt: new Date('2024-01-01'),
                        updatedAt: new Date('2024-11-20'),
                    },
                ],
            },
            {
                id: '5',
                name: 'Minerały',
                slug: 'mineraly',
                parentId: '1',
                level: 1,
                order: 2,
                isActive: true,
                productCount: 38,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-11-20'),
                children: [
                    {
                        id: '6',
                        name: 'Magnez',
                        slug: 'magnez',
                        parentId: '5',
                        level: 2,
                        order: 1,
                        isActive: true,
                        productCount: 18,
                        createdAt: new Date('2024-01-01'),
                        updatedAt: new Date('2024-11-20'),
                    },
                ],
            },
        ],
    },
    {
        id: '7',
        name: 'Kosmetyki',
        slug: 'kosmetyki',
        description: 'Kosmetyki naturalne',
        level: 0,
        order: 2,
        isActive: true,
        productCount: 67,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-11-20'),
        children: [
            {
                id: '8',
                name: 'Pielęgnacja twarzy',
                slug: 'pielegnacja-twarzy',
                parentId: '7',
                level: 1,
                order: 1,
                isActive: true,
                productCount: 34,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-11-20'),
            },
        ],
    },
    {
        id: '9',
        name: 'Zdrowa żywność',
        slug: 'zdrowa-zywnosc',
        level: 0,
        order: 3,
        isActive: false,
        productCount: 24,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-11-20'),
    },
];

export default function CategoriesPage() {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['1', '2', '5', '7']));
    const [searchQuery, setSearchQuery] = useState('');

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedIds(newExpanded);
    };

    const renderCategory = (category: Category) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedIds.has(category.id);
        const indent = category.level * 40;

        return (
            <div key={category.id}>
                <div
                    className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 border-b"
                    style={{ paddingLeft: `${indent + 16}px` }}
                >
                    <div className="flex items-center gap-3 flex-1">
                        {hasChildren ? (
                            <button
                                onClick={() => toggleExpand(category.id)}
                                className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
                            >
                                {isExpanded ? '▼' : '▶'}
                            </button>
                        ) : (
                            <div className="w-6"></div>
                        )}

                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/admin/kategorie/${category.id}`}
                                    className="font-medium hover:text-primary-600"
                                >
                                    {category.name}
                                </Link>
                                {!category.isActive && (
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                                        Nieaktywna
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">/{category.slug}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-sm text-gray-600">{category.productCount} produktów</span>
                        <div className="flex gap-2">
                            <Link href={`/admin/kategorie/${category.id}`}>
                                <button className="text-sm text-primary-600 hover:text-primary-700">
                                    Edytuj
                                </button>
                            </Link>
                            <button className="text-sm text-gray-600 hover:text-gray-900">
                                ⋮
                            </button>
                        </div>
                    </div>
                </div>

                {hasChildren && isExpanded && category.children!.map((child) => renderCategory(child))}
            </div>
        );
    };

    const flattenCategories = (categories: Category[]): Category[] => {
        let result: Category[] = [];
        categories.forEach((cat) => {
            result.push(cat);
            if (cat.children) {
                result = result.concat(flattenCategories(cat.children));
            }
        });
        return result;
    };

    const allCategories = flattenCategories(mockCategories);
    const totalCount = allCategories.length;
    const activeCount = allCategories.filter((c) => c.isActive).length;

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Kategorie</h1>
                    <p className="text-gray-600">
                        {totalCount} kategorii ({activeCount} aktywnych)
                    </p>
                </div>
                <Link href="/admin/kategorie/nowa">
                    <Button size="lg">➕ Dodaj kategorię</Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-600">Wszystkie</p>
                        <p className="text-2xl font-bold">{totalCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-600">Aktywne</p>
                        <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-600">Nieaktywne</p>
                        <p className="text-2xl font-bold text-gray-600">{totalCount - activeCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-600">Produkty</p>
                        <p className="text-2xl font-bold">{allCategories.reduce((sum, c) => sum + c.productCount, 0)}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <input
                        type="text"
                        placeholder="Szukaj kategorii..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </CardContent>
            </Card>

            {/* Category Tree */}
            <Card>
                <CardContent className="p-0">
                    <div className="border-b px-4 py-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Nazwa kategorii</span>
                            <span className="font-medium">Produkty</span>
                        </div>
                    </div>
                    <div>
                        {mockCategories.map((category) => renderCategory(category))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 flex gap-4">
                <Button variant="outline" onClick={() => setExpandedIds(new Set(allCategories.map((c) => c.id)))}>
                    Rozwiń wszystkie
                </Button>
                <Button variant="outline" onClick={() => setExpandedIds(new Set())}>
                    Zwiń wszystkie
                </Button>
            </div>
        </div>
    );
}
