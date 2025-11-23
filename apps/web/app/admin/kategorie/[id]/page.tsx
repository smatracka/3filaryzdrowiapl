'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import Link from 'next/link';
import type { Category } from '@/types/admin';

// Mock category data
const mockCategory: Category = {
    id: '3',
    name: 'Witamina D',
    slug: 'witamina-d',
    description: 'Suplementy witaminy D dla zdrowia kości i odporności',
    parentId: '2',
    level: 2,
    order: 1,
    isActive: true,
    productCount: 12,
    seoTitle: 'Witamina D - Suplementy | 3 Filary Zdrowia',
    metaDescription: 'Najlepsze suplementy witaminy D3. Wsparcie dla kości, odporności i zdrowia.',
    image: '/images/categories/witamina-d.jpg',
    icon: '☀️',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-20'),
};

const mockCategories: Category[] = [
    { id: '1', name: 'Suplementy', slug: 'suplementy', level: 0, order: 1, isActive: true, productCount: 156, createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Suplementy > Witaminy', slug: 'witaminy', level: 1, order: 1, isActive: true, productCount: 45, createdAt: new Date(), updatedAt: new Date() },
    { id: '5', name: 'Suplementy > Minerały', slug: 'mineraly', level: 1, order: 2, isActive: true, productCount: 38, createdAt: new Date(), updatedAt: new Date() },
    { id: '7', name: 'Kosmetyki', slug: 'kosmetyki', level: 0, order: 2, isActive: true, productCount: 67, createdAt: new Date(), updatedAt: new Date() },
];

export default function EditCategoryPage({ params }: { params: { id: string } }) {
    const [formData, setFormData] = useState({
        name: mockCategory.name,
        slug: mockCategory.slug,
        description: mockCategory.description || '',
        parentId: mockCategory.parentId || '',
        isActive: mockCategory.isActive,
        order: mockCategory.order,
        seoTitle: mockCategory.seoTitle || '',
        metaDescription: mockCategory.metaDescription || '',
        image: mockCategory.image || '',
        icon: mockCategory.icon || '',
    });

    const updateField = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        console.log('Updating category:', formData);
        alert('Kategoria zaktualizowana! (mock)');
        // TODO: API call
    };

    const handleDelete = () => {
        if (confirm('Czy na pewno chcesz usunąć tę kategorię?')) {
            alert('Kategoria usunięta! (mock)');
            // TODO: API call
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link href="/admin/kategorie" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
                    ← Powrót do listy
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Edytuj kategorię</h1>
                        <p className="text-gray-600">{mockCategory.productCount} produktów w tej kategorii</p>
                    </div>
                    <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                        🗑️ Usuń kategorię
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Podstawowe informacje</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="Nazwa kategorii *"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                        />

                        <Input
                            label="Slug (URL) *"
                            value={formData.slug}
                            onChange={(e) => updateField('slug', e.target.value)}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">Opis</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Kategoria nadrzędna</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                value={formData.parentId}
                                onChange={(e) => updateField('parentId', e.target.value)}
                            >
                                <option value="">Brak (kategoria główna)</option>
                                {mockCategories.filter((c) => c.id !== params.id).map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Kolejność</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.order}
                                    onChange={(e) => updateField('order', parseInt(e.target.value))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <label className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => updateField('isActive', e.target.checked)}
                                    />
                                    <span>Aktywna</span>
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* SEO */}
                <Card>
                    <CardHeader>
                        <CardTitle>SEO</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="Tytuł SEO"
                            value={formData.seoTitle}
                            onChange={(e) => updateField('seoTitle', e.target.value)}
                            helperText="Maksymalnie 60 znaków"
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">Meta Description</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                                value={formData.metaDescription}
                                onChange={(e) => updateField('metaDescription', e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Maksymalnie 155 znaków</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Media */}
                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="URL obrazka"
                            value={formData.image}
                            onChange={(e) => updateField('image', e.target.value)}
                        />

                        <Input
                            label="Ikona (emoji lub URL)"
                            value={formData.icon}
                            onChange={(e) => updateField('icon', e.target.value)}
                        />

                        {formData.icon && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Podgląd:</span>
                                <span className="text-2xl">{formData.icon}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Link href="/admin/kategorie">
                        <Button variant="outline">Anuluj</Button>
                    </Link>
                    <Button onClick={handleSubmit}>💾 Zapisz zmiany</Button>
                </div>
            </div>
        </div>
    );
}
