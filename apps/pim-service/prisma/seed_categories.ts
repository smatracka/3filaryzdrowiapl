import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Path relative to apps/pim-service/prisma/
const jsonPath = path.resolve(__dirname, '../../../docs/categories_full_tree.json');

async function seed() {
    console.log('Reading categories from:', jsonPath);

    if (!fs.existsSync(jsonPath)) {
        console.error('File not found:', jsonPath);
        process.exit(1);
    }

    const data = fs.readFileSync(jsonPath, 'utf-8');
    const categories = JSON.parse(data);

    console.log(`Found ${categories.length} top-level categories.`);

    for (const category of categories) {
        await createCategory(category, null);
    }

    console.log('Seeding completed.');
}

async function createCategory(data: any, parentId: string | null) {
    console.log(`Upserting category: ${data.name} (${data.slug})`);

    const category = await prisma.category.upsert({
        where: { slug: data.slug },
        update: {
            name: data.name,
            description: data.description,
            seoTitle: data.yoast_seo_title,
            seoDescription: data.yoast_meta_description,
            seoKeywords: data.yoast_focus_keyword,
            socialTitle: data.facebook_title,
            socialDescription: data.facebook_description,
            canonicalUrl: data.canonical_url,
            parentId: parentId,
        },
        create: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            seoTitle: data.yoast_seo_title,
            seoDescription: data.yoast_meta_description,
            seoKeywords: data.yoast_focus_keyword,
            socialTitle: data.facebook_title,
            socialDescription: data.facebook_description,
            canonicalUrl: data.canonical_url,
            parentId: parentId,
        },
    });

    if (data.children && data.children.length > 0) {
        for (const child of data.children) {
            await createCategory(child, category.id);
        }
    }
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
