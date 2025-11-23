import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const storePrisma = new PrismaClient();
const PIM_API_URL = 'http://localhost:3001';

async function syncProducts() {
  console.log('Fetching products from PIM API...');
  
  const response = await fetch(`${PIM_API_URL}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from PIM API: ${response.statusText}`);
  }
  
  const pimProducts = await response.json() as any[];
  console.log(`Found ${pimProducts.length} products in PIM`);

  let synced = 0;
  let skipped = 0;

  for (const pimProduct of pimProducts) {
    try {
      // Extract price from priceInfo JSON
      const priceInfo = pimProduct.priceInfo || {};
      const price = priceInfo?.retailPrice ? parseFloat(priceInfo.retailPrice) : 0;

      // Extract main image from media JSON
      const media = pimProduct.media || {};
      const images = media?.mainImage 
        ? [media.mainImage, ...(media.gallery || [])]
        : [];

      // Create slug from name
      const slug = pimProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      await storePrisma.storeProduct.upsert({
        where: { pimId: pimProduct.id },
        update: {
          sku: pimProduct.sku,
          name: pimProduct.name,
          slug,
          description: pimProduct.description,
          price,
          images,
          attributes: {
            supplementAttrs: pimProduct.supplementAttrs,
            aiContent: pimProduct.aiContent,
            logistics: pimProduct.logistics,
          },
          isAvailable: pimProduct.status === 'active',
          stockStatus: pimProduct.status === 'active' ? 'in_stock' : 'out_of_stock',
        },
        create: {
          pimId: pimProduct.id,
          sku: pimProduct.sku,
          name: pimProduct.name,
          slug,
          description: pimProduct.description,
          price,
          images,
          attributes: {
            supplementAttrs: pimProduct.supplementAttrs,
            aiContent: pimProduct.aiContent,
            logistics: pimProduct.logistics,
          },
          isAvailable: pimProduct.status === 'active',
          stockStatus: pimProduct.status === 'active' ? 'in_stock' : 'out_of_stock',
        },
      });

      synced++;
      if (synced % 50 === 0) process.stdout.write('.');
    } catch (error) {
      console.error(`Failed to sync product ${pimProduct.sku}:`, error);
      skipped++;
    }
  }

  console.log(`\n\nSync complete!`);
  console.log(`Synced: ${synced}`);
  console.log(`Skipped: ${skipped}`);
}

syncProducts()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await storePrisma.$disconnect();
  });
