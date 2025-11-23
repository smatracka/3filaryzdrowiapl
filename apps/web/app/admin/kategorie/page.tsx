'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '@/components/ui';
import Link from 'next/link';
import type { Category } from '@/types/admin';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['1', '2', '5', '7']));
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:3001/categories');
                const data = await res.json();

                // Add level property recursively
                const addLevel = (cats: any[], level = 0): Category[] => {
                    return cats.map(cat => ({
                        ...cat,
                        level,
                        isActive: true, // Default for now
                        order: 0, // Default for now
                        children: cat.children ? addLevel(cat.children, level + 1) : []
                    }));
                };

                setCategories(addLevel(data));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

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

    const allCategories = flattenCategories(categories);
    const totalCount = allCategories.length;
    const activeCount = allCategories.filter((c) => c.isActive).length;

    if (loading) {
        return <div className="p-8">Ładowanie...</div>;
    }

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
                        {categories.map((category) => renderCategory(category))}
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
