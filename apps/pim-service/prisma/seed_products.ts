import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const INPUT_JSON = '../../../docs/products_full.json'; // Relative to apps/pim-service/prisma/

function detectBrand(row: any): string {
    for (let i = 1; i <= 10; i++) {
        const nameCol = `Nazwa atrybutu ${i}`;
        const valCol = `Wartości atrybutu ${i}`;
        const name = row[nameCol]?.toString().trim();
        const val = row[valCol]?.toString().trim();
        if (!name || !val) continue;
        if (['producent', 'marka'].includes(name.toLowerCase())) {
            return val;
        }
    }
    return '';
}

function detectForm(row: any): string {
    const candidates = ['forma', 'postać', 'konsystencja'];
    for (let i = 1; i <= 10; i++) {
        const nameCol = `Nazwa atrybutu ${i}`;
        const valCol = `Wartości atrybutu ${i}`;
        const name = row[nameCol]?.toString().trim().toLowerCase();
        const val = row[valCol]?.toString().trim();
        if (!name || !val) continue;
        if (candidates.includes(name)) return val;
    }
    return '';
}

function detectFlavor(row: any): string {
    const candidates = ['smak', 'aromat'];
    for (let i = 1; i <= 10; i++) {
        const nameCol = `Nazwa atrybutu ${i}`;
        const valCol = `Wartości atrybutu ${i}`;
        const name = row[nameCol]?.toString().trim().toLowerCase();
        const val = row[valCol]?.toString().trim();
        if (!name || !val) continue;
        if (candidates.includes(name)) return val;
    }
    return '';
}

function detectProductType(typ: string): string {
    typ = (typ || '').toLowerCase();
    if (typ === 'simple') return 'SIMPLE';
    if (typ === 'variable' || typ === 'variation') return 'VARIANT';
    return 'SIMPLE';
}

function detectStatus(opublikowano: any): string {
    return opublikowano?.toString().trim() === '1' ? 'active' : 'draft';
}

function splitImages(obrazki: string | undefined): { main: string; gallery: string[] } {
    if (!obrazki) return { main: '', gallery: [] };
    const parts = obrazki.split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length === 0) return { main: '', gallery: [] };
    return { main: parts[0], gallery: parts.slice(1) };
}

function buildChannelEmpty() {
    return {
        title: '',
        shortDescription: '',
        longDescription: '',
        bulletPoints: [] as string[],
        legalNotes: '',
        keywords: [] as string[],
        categoryMapping: '',
        attributesMapping: {},
    };
}

async function main() {
    const jsonPath = path.resolve(__dirname, INPUT_JSON);

    if (!fs.existsSync(jsonPath)) {
        console.error(`JSON file not found at: ${jsonPath}`);
        return;
    }

    console.log(`Reading products from: ${jsonPath}`);
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const products = JSON.parse(rawData);

    console.log(`Found ${products.length} products in JSON.`);

    let count = 0;

    for (const row of products) {
        const { main, gallery } = splitImages(row['Obrazki']);
        const supplementIngredients = row['Pola: sklad'] || row['Pola: skladniki'] || '';
        const usage = row['Pola: sposob_uzycia'] || '';

        const sku = row['SKU'] || `GEN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const name = row['Nazwa'] || 'Unnamed Product';

        // Construct JSON objects
        const supplementAttrs = {
            form: detectForm(row),
            servings: row['Pola: wystarcza_na_x_dni'] || '',
            servingSize: row['Pola: zalecana_porcja_dzienna'] || '',
            flavor: detectFlavor(row),
            dietTypes: [],
            allergens: [],
            healthBenefits: [],
            usageInstructions: usage,
            warnings: row['Pola: srodki_ostroznosci'] || '',
            ingredients: supplementIngredients ? { raw: supplementIngredients.toString() } : { raw: '' }
        };

        const foodAttrs = {
            nutritionalValues: {},
            storage: row['Pola: przechowywanie'] || '',
            expiry: '',
            allergens: [],
            organic: ''
        };

        const media = {
            mainImage: main,
            gallery: gallery,
            videos: [],
            model3d: '',
            pdfs: []
        };

        const logistics = {
            weight: row['Waga (kg)'] || '',
            height: row['Wysokość (cm)'] || '',
            width: row['Szerokość (cm)'] || '',
            depth: row['Długość (cm)'] || '',
            hsCode: '',
            deliveryTime: row['Pola: wysylka'] || '',
            storageCondition: ''
        };

        const priceInfo = {
            retailPrice: row['Cena'] || '',
            suggestedPromoPrice: row['Cena promocyjna'] || '',
            currency: 'PLN'
        };

        const aiContent = {
            shortDescription: row['Krótki opis'] || '',
            longDescription: row['Opis'] || '',
            features: [],
            benefits: [],
            aiSummary: '',
            aiSellingPoints: [],
            tone: '',
            faqs: [],
            sourceLLM: '',
            aiVersion: ''
        };

        const channelData = {
            shop: buildChannelEmpty(),
            allegro: buildChannelEmpty(),
            erli: buildChannelEmpty(),
            amazon: buildChannelEmpty(),
            gmc: buildChannelEmpty()
        };

        // console.log(`Upserting product: ${name} (${sku})`);

        try {
            await prisma.product.upsert({
                where: { sku: sku },
                update: {
                    name: name,
                    description: row['Opis'] || '',
                    status: detectStatus(row['Opublikowano']),
                    supplementAttrs: supplementAttrs,
                    foodAttrs: foodAttrs,
                    media: media,
                    logistics: logistics,
                    priceInfo: priceInfo,
                    aiContent: aiContent,
                    channelData: channelData,
                },
                create: {
                    sku: sku,
                    name: name,
                    description: row['Opis'] || '',
                    status: detectStatus(row['Opublikowano']),
                    supplementAttrs: supplementAttrs,
                    foodAttrs: foodAttrs,
                    media: media,
                    logistics: logistics,
                    priceInfo: priceInfo,
                    aiContent: aiContent,
                    channelData: channelData,
                },
            });
            count++;
            if (count % 50 === 0) process.stdout.write('.');
        } catch (error) {
            console.error(`Failed to upsert product ${sku}:`, error);
        }
    }

    console.log(`\nImported ${count} products.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
