'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import Link from 'next/link';
import type { Category } from '@/types/admin';

// Mock categories for parent selection
const mockCategories: Category[] = [
    { id: '1', name: 'Suplementy', slug: 'suplementy', level: 0, order: 1, isActive: true, productCount: 156, createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Suplementy > Witaminy', slug: 'witaminy', level: 1, order: 1, isActive: true, productCount: 45, createdAt: new Date(), updatedAt: new Date() },
    { id: '5', name: 'Suplementy > Minerały', slug: 'mineraly', level: 1, order: 2, isActive: true, productCount: 38, createdAt: new Date(), updatedAt: new Date() },
    { id: '7', name: 'Kosmetyki', slug: 'kosmetyki', level: 0, order: 2, isActive: true, productCount: 67, createdAt: new Date(), updatedAt: new Date() },
];

export default function NewCategoryPage() {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        parentId: '',
        isActive: true,
        order: 1,
        seoTitle: '',
        metaDescription: '',
        image: '',
        icon: '',
    });

    const updateField = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });

        // Auto-generate slug from name
        if (field === 'name' && !formData.slug) {
            const slug = value
                .toLowerCase()
                .replace(/ą/g, 'a')
                .replace(/ć/g, 'c')
                .replace(/ę/g, 'e')
                .replace(/ł/g, 'l')
                .replace(/ń/g, 'n')
                .replace(/ó/g, 'o')
                .replace(/ś/g, 's')
                .replace(/ź|ż/g, 'z')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            setFormData({ ...formData, name: value, slug });
        }
    };

    const handleSubmit = () => {
        console.log('Creating category:', formData);
        alert('Kategoria utworzona! (mock)');
        // TODO: API call
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link href="/admin/kategorie" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
                    ← Powrót do listy
                </Link>
                <h1 className="text-3xl font-bold mb-2">Nowa kategoria</h1>
                <p className="text-gray-600">Dodaj nową kategorię produktów</p>
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
                            placeholder="np. Witaminy"
                        />

                        <Input
                            label="Slug (URL) *"
                            value={formData.slug}
                            onChange={(e) => updateField('slug', e.target.value)}
                            placeholder="witaminy"
                            helperText="Automatycznie generowany z nazwy"
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">Opis</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                placeholder="Krótki opis kategorii..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Kategoria nadrzędna</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={formData.parentId}
                                onChange={(e) => updateField('parentId', e.target.value)}
                            >
                                <option value="">Brak (kategoria główna)</option>
                                {mockCategories.map((cat) => (
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
                            placeholder="np. Witaminy - Suplementy diety | 3 Filary Zdrowia"
                            helperText="Maksymalnie 60 znaków"
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">Meta Description</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                                value={formData.metaDescription}
                                onChange={(e) => updateField('metaDescription', e.target.value)}
                                placeholder="Krótki opis dla wyszukiwarek..."
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
                            placeholder="/images/categories/witaminy.jpg"
                        />

                        <Input
                            label="Ikona (emoji lub URL)"
                            value={formData.icon}
                            onChange={(e) => updateField('icon', e.target.value)}
                            placeholder="💊"
                        />
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Link href="/admin/kategorie">
                        <Button variant="outline">Anuluj</Button>
                    </Link>
                    <Button onClick={handleSubmit}>💾 Zapisz kategorię</Button>
                </div>
            </div>
        </div>
    );
}
