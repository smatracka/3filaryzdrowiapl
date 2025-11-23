'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import Link from 'next/link';
import type { ProductType, ProductStatus } from '@/types/admin';

interface FormData {
    sku: string;
    ean: string;
    brand: string;
    name: string;
    type: ProductType;
    status: ProductStatus;
    form: string;
    servings: number;
    servingSize: string;
    flavor: string;
    dietTypes: string[];
    allergens: string[];
    usageInstructions: string;
    warnings: string;
    ingredients: Array<{
        id?: string;
        name: string;
        dosage: string;
        dailyValuePercent: number;
        form: string;
        linkedBiomarkers: string[];
        linkedHealthAreas: string[];
    }>;
}

const HEALTH_AREAS = ['ENERGY', 'SLEEP', 'STRESS', 'IMMUNITY', 'CARDIO', 'BRAIN', 'BONES', 'DIGESTION', 'MOOD'];
const BIOMARKERS = ['magnesium_serum', 'vit_d_25oh', 'iron_serum', 'b12_serum', 'folate_serum', 'omega3_index', 'crp', 'cortisol'];

export default function EditProductPage({ params }: { params: { id: string } }) {
    // Mock existing product data
    const [formData, setFormData] = useState<FormData>({
        sku: 'VIT-D3-1000',
        ean: '5901234567890',
        brand: '3 Filary Zdrowia',
        name: 'Witamina D3 1000 IU',
        type: 'SIMPLE',
        status: 'ACTIVE',
        form: 'capsules',
        servings: 120,
        servingSize: '1 kapsułka',
        flavor: '',
        dietTypes: ['Wegańskie', 'Bezglutenowe'],
        allergens: [],
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
    });

    const [currentTab, setCurrentTab] = useState<'basic' | 'attributes' | 'ingredients'>('basic');

    const updateField = (field: keyof FormData, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [
                ...formData.ingredients,
                {
                    name: '',
                    dosage: '',
                    dailyValuePercent: 0,
                    form: '',
                    linkedBiomarkers: [],
                    linkedHealthAreas: [],
                },
            ],
        });
    };

    const updateIngredient = (index: number, field: string, value: any) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const removeIngredient = (index: number) => {
        setFormData({
            ...formData,
            ingredients: formData.ingredients.filter((_, i) => i !== index),
        });
    };

    const toggleArrayValue = (field: keyof FormData, value: string) => {
        const currentArray = formData[field] as string[];
        const newArray = currentArray.includes(value)
            ? currentArray.filter((v) => v !== value)
            : [...currentArray, value];
        updateField(field, newArray);
    };

    const toggleIngredientBiomarker = (ingredientIndex: number, biomarker: string) => {
        const ingredient = formData.ingredients[ingredientIndex];
        const newBiomarkers = ingredient.linkedBiomarkers.includes(biomarker)
            ? ingredient.linkedBiomarkers.filter((b) => b !== biomarker)
            : [...ingredient.linkedBiomarkers, biomarker];
        updateIngredient(ingredientIndex, 'linkedBiomarkers', newBiomarkers);
    };

    const toggleIngredientHealthArea = (ingredientIndex: number, area: string) => {
        const ingredient = formData.ingredients[ingredientIndex];
        const newAreas = ingredient.linkedHealthAreas.includes(area)
            ? ingredient.linkedHealthAreas.filter((a) => a !== area)
            : [...ingredient.linkedHealthAreas, area];
        updateIngredient(ingredientIndex, 'linkedHealthAreas', newAreas);
    };

    const handleSubmit = () => {
        console.log('Updating product:', formData);
        alert('Produkt zaktualizowany! (mock)');
        // TODO: API call
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link href={`/admin/produkty/${params.id}`} className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
                    ← Powrót do produktu
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Edytuj produkt</h1>
                        <p className="text-gray-600">SKU: {formData.sku}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={`/admin/produkty/${params.id}`}>
                            <Button variant="outline">Anuluj</Button>
                        </Link>
                        <Button onClick={handleSubmit}>💾 Zapisz zmiany</Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b">
                <div className="flex gap-6">
                    <button
                        onClick={() => setCurrentTab('basic')}
                        className={`pb-3 px-2 border-b-2 transition ${currentTab === 'basic'
                                ? 'border-primary-600 text-primary-600 font-medium'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Podstawowe info
                    </button>
                    <button
                        onClick={() => setCurrentTab('attributes')}
                        className={`pb-3 px-2 border-b-2 transition ${currentTab === 'attributes'
                                ? 'border-primary-600 text-primary-600 font-medium'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Atrybuty suplementu
                    </button>
                    <button
                        onClick={() => setCurrentTab('ingredients')}
                        className={`pb-3 px-2 border-b-2 transition ${currentTab === 'ingredients'
                                ? 'border-primary-600 text-primary-600 font-medium'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Składniki ({formData.ingredients.length})
                    </button>
                </div>
            </div>

            {/* Tab: Basic Info */}
            {currentTab === 'basic' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Podstawowe informacje</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="SKU *"
                                value={formData.sku}
                                onChange={(e) => updateField('sku', e.target.value)}
                            />
                            <Input
                                label="EAN"
                                value={formData.ean}
                                onChange={(e) => updateField('ean', e.target.value)}
                            />
                        </div>

                        <Input
                            label="Nazwa produktu *"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                        />

                        <Input
                            label="Marka *"
                            value={formData.brand}
                            onChange={(e) => updateField('brand', e.target.value)}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Typ produktu *</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.type}
                                    onChange={(e) => updateField('type', e.target.value)}
                                >
                                    <option value="SIMPLE">Prosty</option>
                                    <option value="VARIANT">Wariantowy</option>
                                    <option value="BUNDLE">Zestaw</option>
                                    <option value="SERVICE">Usługa</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Status *</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.status}
                                    onChange={(e) => updateField('status', e.target.value)}
                                >
                                    <option value="DRAFT">Wersja robocza</option>
                                    <option value="ACTIVE">Aktywny</option>
                                    <option value="ARCHIVED">Zarchiwizowany</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tab: Supplement Attributes */}
            {currentTab === 'attributes' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Atrybuty suplementu</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Forma *</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={formData.form}
                                    onChange={(e) => updateField('form', e.target.value)}
                                >
                                    <option value="capsules">Kapsułki</option>
                                    <option value="tablets">Tabletki</option>
                                    <option value="powder">Proszek</option>
                                    <option value="liquid">Płyn</option>
                                    <option value="gummies">Żelki</option>
                                </select>
                            </div>

                            <Input
                                label="Smak"
                                value={formData.flavor}
                                onChange={(e) => updateField('flavor', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Liczba porcji *"
                                type="number"
                                value={formData.servings}
                                onChange={(e) => updateField('servings', parseInt(e.target.value))}
                            />
                            <Input
                                label="Wielkość porcji *"
                                value={formData.servingSize}
                                onChange={(e) => updateField('servingSize', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Typy diety</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Wegańskie', 'Wegetariańskie', 'Bezglutenowe', 'Bez laktozy', 'Keto', 'Paleo'].map((diet) => (
                                    <label key={diet} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.dietTypes.includes(diet)}
                                            onChange={() => toggleArrayValue('dietTypes', diet)}
                                        />
                                        <span className="text-sm">{diet}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Alergeny</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Gluten', 'Laktoza', 'Soja', 'Orzechy', 'Ryby', 'Jaja'].map((allergen) => (
                                    <label key={allergen} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.allergens.includes(allergen)}
                                            onChange={() => toggleArrayValue('allergens', allergen)}
                                        />
                                        <span className="text-sm">{allergen}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Sposób użycia *</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                                value={formData.usageInstructions}
                                onChange={(e) => updateField('usageInstructions', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Ostrzeżenia</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                                value={formData.warnings}
                                onChange={(e) => updateField('warnings', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tab: Ingredients */}
            {currentTab === 'ingredients' && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Składniki</CardTitle>
                            <Button onClick={addIngredient} size="sm">
                                ➕ Dodaj składnik
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {formData.ingredients.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p className="mb-4">Brak składników</p>
                                <Button onClick={addIngredient} variant="outline">
                                    Dodaj pierwszy składnik
                                </Button>
                            </div>
                        )}

                        {formData.ingredients.map((ingredient, index) => (
                            <div key={ingredient.id || index} className="border rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">Składnik #{index + 1}</h4>
                                    <button
                                        onClick={() => removeIngredient(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        🗑️ Usuń
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nazwa składnika *"
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        value={ingredient.name}
                                        onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Dawka (np. 400mg)"
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        value={ingredient.dosage}
                                        onChange={(e) => updateIngredient(index, 'dosage', e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        placeholder="% RWS"
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        value={ingredient.dailyValuePercent}
                                        onChange={(e) => updateIngredient(index, 'dailyValuePercent', parseFloat(e.target.value))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Forma (np. cytrynian)"
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        value={ingredient.form}
                                        onChange={(e) => updateIngredient(index, 'form', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Powiązane biomarkery</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {BIOMARKERS.map((biomarker) => (
                                            <label key={biomarker} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={ingredient.linkedBiomarkers.includes(biomarker)}
                                                    onChange={() => toggleIngredientBiomarker(index, biomarker)}
                                                />
                                                <span className="text-xs">{biomarker}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Obszary zdrowia</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {HEALTH_AREAS.map((area) => (
                                            <label key={area} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={ingredient.linkedHealthAreas.includes(area)}
                                                    onChange={() => toggleIngredientHealthArea(index, area)}
                                                />
                                                <span className="text-xs">{area}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end gap-3 mt-8">
                <Link href={`/admin/produkty/${params.id}`}>
                    <Button variant="outline">Anuluj</Button>
                </Link>
                <Button onClick={handleSubmit}>💾 Zapisz zmiany</Button>
            </div>
        </div>
    );
}
