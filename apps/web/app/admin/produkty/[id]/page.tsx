'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import Link from 'next/link';
import type { Product } from '@/types/admin';

// Mock data - same as in list
const mockProduct: Product = {
    id: '1',
    sku: 'VIT-D3-1000',
    ean: '5901234567890',
    brand: '3 Filary Zdrowia',
    name: 'Witamina D3 1000 IU',
    type: 'SIMPLE',
    status: 'ACTIVE',
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-23'),
    supplementAttrs: {
        id: 's1',
        form: 'capsules',
        servings: 120,
        servingSize: '1 kapsułka',
        flavor: '',
        dietTypes: ['Wegańskie', 'Bezglutenowe'],
        allergens: [],
        healthBenefits: ['Wsparcie układu odpornościowego', 'Zdrowe kości'],
        usageInstructions: 'Przyjmować 1 kapsułkę dziennie podczas posiłku',
        warnings: 'Nie przekraczać zalecanej dawki',
        ingredients: [
            {
                id: 'i1',
                name: 'Witamina D3 (cholekalcyferol)',
                dosage: '1000 IU (25 mcg)',
                dailyValuePercent: 500,
                form: 'cholekalcyferol',
                linkedBiomarkers: ['vit_d_25oh'],
                linkedHealthAreas: ['IMMUNITY', 'BONES'],
            },
        ],
    },
    priceInfo: {
        id: 'p1',
        retailPrice: 49.99,
        suggestedPromoPrice: 39.99,
        currency: 'PLN',
    },
    media: {
        id: 'm1',
        mainImage: '/products/vit-d3-main.jpg',
        gallery: ['/products/vit-d3-1.jpg', '/products/vit-d3-2.jpg'],
        videos: [],
        pdfs: ['/products/vit-d3-cert.pdf'],
    },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [isEditing, setIsEditing] = useState(false);
    const product = mockProduct; // In real app: fetch by params.id

    const handleDelete = () => {
        if (confirm('Czy na pewno chcesz zarchiwizować ten produkt?')) {
            alert('Produkt zarchiwizowany! (mock)');
            // TODO: API call
        }
    };

    const handleDuplicate = () => {
        alert('Produkt zduplikowany! (mock)');
        // TODO: API call
    };

    const statusColors: Record<string, string> = {
        ACTIVE: 'bg-green-100 text-green-700',
        DRAFT: 'bg-yellow-100 text-yellow-700',
        ARCHIVED: 'bg-gray-100 text-gray-700',
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <Link href="/admin/produkty" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
                    ← Powrót do listy
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[product.status]}`}>
                                {product.status}
                            </span>
                        </div>
                        <p className="text-gray-600">SKU: {product.sku} | EAN: {product.ean}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={`/admin/produkty/${product.id}/edytuj`}>
                            <Button>✏️ Edytuj</Button>
                        </Link>
                        <Button variant="outline" onClick={handleDuplicate}>
                            📋 Duplikuj
                        </Button>
                        <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                            🗑️ Archiwizuj
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Podstawowe informacje</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Marka</p>
                                    <p className="font-medium">{product.brand}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Typ</p>
                                    <p className="font-medium">{product.type}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Utworzono</p>
                                    <p className="font-medium">{product.createdAt.toLocaleDateString('pl-PL')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Ostatnia edycja</p>
                                    <p className="font-medium">{product.updatedAt.toLocaleDateString('pl-PL')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Supplement Attributes */}
                    {product.supplementAttrs && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Atrybuty suplementu</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Forma</p>
                                        <p className="font-medium capitalize">{product.supplementAttrs.form}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Porcje</p>
                                        <p className="font-medium">{product.supplementAttrs.servings}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Wielkość porcji</p>
                                        <p className="font-medium">{product.supplementAttrs.servingSize}</p>
                                    </div>
                                    {product.supplementAttrs.flavor && (
                                        <div>
                                            <p className="text-sm text-gray-600">Smak</p>
                                            <p className="font-medium">{product.supplementAttrs.flavor}</p>
                                        </div>
                                    )}
                                </div>

                                {product.supplementAttrs.dietTypes.length > 0 && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Typy diety</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.supplementAttrs.dietTypes.map((diet) => (
                                                <span key={diet} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                                    {diet}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.supplementAttrs.allergens.length > 0 && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Alergeny</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.supplementAttrs.allergens.map((allergen) => (
                                                <span key={allergen} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                                    {allergen}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Sposób użycia</p>
                                    <p className="text-sm">{product.supplementAttrs.usageInstructions}</p>
                                </div>

                                {product.supplementAttrs.warnings && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Ostrzeżenia</p>
                                        <p className="text-sm text-orange-600">{product.supplementAttrs.warnings}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Ingredients */}
                    {product.supplementAttrs && product.supplementAttrs.ingredients.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Składniki ({product.supplementAttrs.ingredients.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {product.supplementAttrs.ingredients.map((ingredient, index) => (
                                        <div key={ingredient.id} className="border rounded-lg p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-medium">{ingredient.name}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {ingredient.dosage}
                                                        {ingredient.dailyValuePercent && ` (${ingredient.dailyValuePercent}% RWS)`}
                                                    </p>
                                                    {ingredient.form && (
                                                        <p className="text-xs text-gray-500">Forma: {ingredient.form}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {ingredient.linkedBiomarkers.length > 0 && (
                                                <div className="mb-2">
                                                    <p className="text-xs text-gray-600 mb-1">Biomarkery:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {ingredient.linkedBiomarkers.map((biomarker) => (
                                                            <span key={biomarker} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                                                                {biomarker}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {ingredient.linkedHealthAreas.length > 0 && (
                                                <div>
                                                    <p className="text-xs text-gray-600 mb-1">Obszary zdrowia:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {ingredient.linkedHealthAreas.map((area) => (
                                                            <span key={area} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                                                {area}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Price Info */}
                    {product.priceInfo && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Cena</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm text-gray-600">Cena detaliczna</p>
                                        <p className="text-2xl font-bold">{product.priceInfo.retailPrice} {product.priceInfo.currency}</p>
                                    </div>
                                    {product.priceInfo.suggestedPromoPrice && (
                                        <div>
                                            <p className="text-sm text-gray-600">Cena promocyjna</p>
                                            <p className="text-xl font-bold text-red-600">
                                                {product.priceInfo.suggestedPromoPrice} {product.priceInfo.currency}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Media */}
                    {product.media && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Media</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Główne zdjęcie</p>
                                        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">🖼️ {product.media.mainImage}</span>
                                        </div>
                                    </div>
                                    {product.media.gallery.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Galeria ({product.media.gallery.length})</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {product.media.gallery.map((img, i) => (
                                                    <div key={i} className="h-20 bg-gray-200 rounded flex items-center justify-center">
                                                        <span className="text-xs text-gray-500">📷</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {product.media.pdfs.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Dokumenty ({product.media.pdfs.length})</p>
                                            {product.media.pdfs.map((pdf, i) => (
                                                <div key={i} className="text-sm text-primary-600">📄 {pdf}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Szybkie akcje</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                📊 Zobacz w sklepie
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                📡 Synchronizuj kanały
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                🤖 Generuj opis AI
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
