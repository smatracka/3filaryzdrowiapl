-- CreateTable
CREATE TABLE "pim_products" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplementAttrs" JSONB,
    "foodAttrs" JSONB,
    "cosmeticAttrs" JSONB,
    "deviceAttrs" JSONB,
    "aiContent" JSONB,
    "seo" JSONB,
    "media" JSONB,
    "logistics" JSONB,
    "priceInfo" JSONB,
    "inventory" JSONB,
    "healthRelations" JSONB,
    "channelData" JSONB,

    CONSTRAINT "pim_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_variants" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "parentId" TEXT,
    "description" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "socialTitle" TEXT,
    "socialDescription" TEXT,
    "canonicalUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_attributes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "options" TEXT[],

    CONSTRAINT "pim_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_attribute_values" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "attributeId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "pim_attribute_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_channel_content" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "bulletPoints" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'draft',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_channel_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pim_products_sku_key" ON "pim_products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "pim_variants_sku_key" ON "pim_variants"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "pim_categories_slug_key" ON "pim_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pim_attributes_name_key" ON "pim_attributes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pim_channel_content_productId_channelId_key" ON "pim_channel_content"("productId", "channelId");

-- AddForeignKey
ALTER TABLE "pim_products" ADD CONSTRAINT "pim_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "pim_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_variants" ADD CONSTRAINT "pim_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_categories" ADD CONSTRAINT "pim_categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "pim_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_attribute_values" ADD CONSTRAINT "pim_attribute_values_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_attribute_values" ADD CONSTRAINT "pim_attribute_values_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "pim_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_attribute_values" ADD CONSTRAINT "pim_attribute_values_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "pim_attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_channel_content" ADD CONSTRAINT "pim_channel_content_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
