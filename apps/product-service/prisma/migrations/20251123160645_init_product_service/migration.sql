-- CreateTable
CREATE TABLE "store_products" (
    "id" TEXT NOT NULL,
    "pimId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'PLN',
    "categoryId" TEXT,
    "images" TEXT[],
    "attributes" JSONB,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "stockStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_categories" (
    "id" TEXT NOT NULL,
    "pimId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "parentId" TEXT,
    "description" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "canonicalUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "store_products_pimId_key" ON "store_products"("pimId");

-- CreateIndex
CREATE UNIQUE INDEX "store_products_sku_key" ON "store_products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "store_products_slug_key" ON "store_products"("slug");

-- CreateIndex
CREATE INDEX "store_products_categoryId_idx" ON "store_products"("categoryId");

-- CreateIndex
CREATE INDEX "store_products_price_idx" ON "store_products"("price");

-- CreateIndex
CREATE UNIQUE INDEX "store_categories_pimId_key" ON "store_categories"("pimId");

-- CreateIndex
CREATE UNIQUE INDEX "store_categories_slug_key" ON "store_categories"("slug");

-- AddForeignKey
ALTER TABLE "store_products" ADD CONSTRAINT "store_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "store_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_categories" ADD CONSTRAINT "store_categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "store_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
