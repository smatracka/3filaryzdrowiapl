/*
  Warnings:

  - You are about to drop the column `channelId` on the `pim_channel_content` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `pim_channel_content` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pim_channel_content` table. All the data in the column will be lost.
  - You are about to drop the column `aiContent` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `channelData` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `cosmeticAttrs` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `deviceAttrs` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `foodAttrs` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `healthRelations` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `inventory` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `logistics` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `priceInfo` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `seo` on the `pim_products` table. All the data in the column will be lost.
  - You are about to drop the column `supplementAttrs` on the `pim_products` table. All the data in the column will be lost.
  - The `status` column on the `pim_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `name` on the `pim_variants` table. All the data in the column will be lost.
  - You are about to drop the `pim_attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pim_attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pim_categories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId,channel]` on the table `pim_channel_content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ean]` on the table `pim_products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attributesMapping` to the `pim_channel_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryMapping` to the `pim_channel_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel` to the `pim_channel_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longDescription` to the `pim_channel_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `pim_channel_content` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `pim_channel_content` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `brand` to the `pim_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `pim_products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SIMPLE', 'VARIANT', 'BUNDLE', 'SERVICE');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'DRAFT', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('SHOP', 'ALLEGRO', 'ERLI', 'AMAZON', 'GMC');

-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED');

-- DropForeignKey
ALTER TABLE "pim_attribute_values" DROP CONSTRAINT "pim_attribute_values_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "pim_attribute_values" DROP CONSTRAINT "pim_attribute_values_productId_fkey";

-- DropForeignKey
ALTER TABLE "pim_attribute_values" DROP CONSTRAINT "pim_attribute_values_variantId_fkey";

-- DropForeignKey
ALTER TABLE "pim_categories" DROP CONSTRAINT "pim_categories_parentId_fkey";

-- DropForeignKey
ALTER TABLE "pim_channel_content" DROP CONSTRAINT "pim_channel_content_productId_fkey";

-- DropForeignKey
ALTER TABLE "pim_products" DROP CONSTRAINT "pim_products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "pim_variants" DROP CONSTRAINT "pim_variants_productId_fkey";

-- DropIndex
DROP INDEX "pim_channel_content_productId_channelId_key";

-- AlterTable
ALTER TABLE "pim_channel_content" DROP COLUMN "channelId",
DROP COLUMN "description",
DROP COLUMN "status",
ADD COLUMN     "attributesMapping" JSONB NOT NULL,
ADD COLUMN     "categoryMapping" TEXT NOT NULL,
ADD COLUMN     "channel" "ChannelType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "legalNotes" TEXT,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "pim_products" DROP COLUMN "aiContent",
DROP COLUMN "categoryId",
DROP COLUMN "channelData",
DROP COLUMN "cosmeticAttrs",
DROP COLUMN "description",
DROP COLUMN "deviceAttrs",
DROP COLUMN "foodAttrs",
DROP COLUMN "healthRelations",
DROP COLUMN "inventory",
DROP COLUMN "logistics",
DROP COLUMN "media",
DROP COLUMN "priceInfo",
DROP COLUMN "seo",
DROP COLUMN "supplementAttrs",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "ean" TEXT,
ADD COLUMN     "type" "ProductType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "pim_variants" DROP COLUMN "name",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "dose" TEXT,
ADD COLUMN     "ean" TEXT,
ADD COLUMN     "gtin" TEXT,
ADD COLUMN     "mpn" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "unitCount" INTEGER,
ADD COLUMN     "volume" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- DropTable
DROP TABLE "pim_attribute_values";

-- DropTable
DROP TABLE "pim_attributes";

-- DropTable
DROP TABLE "pim_categories";

-- CreateTable
CREATE TABLE "pim_supplement_attributes" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "form" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "servingSize" TEXT NOT NULL,
    "flavor" TEXT,
    "dietTypes" TEXT[],
    "allergens" TEXT[],
    "healthBenefits" TEXT[],
    "usageInstructions" TEXT NOT NULL,
    "warnings" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_supplement_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_ingredient_entries" (
    "id" TEXT NOT NULL,
    "supplementId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "dailyValuePercent" DOUBLE PRECISION,
    "form" TEXT,
    "linkedBiomarkers" TEXT[],
    "linkedHealthAreas" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pim_ingredient_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_food_attributes" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "nutritionalValues" JSONB NOT NULL,
    "storage" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),
    "allergens" TEXT[],
    "organic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_food_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_cosmetic_attributes" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "forSkinType" TEXT[],
    "forHairType" TEXT[],
    "application" TEXT NOT NULL,
    "ingredientsINCI" TEXT[],
    "dermatologyTests" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_cosmetic_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_device_attributes" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "materials" TEXT[],
    "warranty" TEXT NOT NULL,
    "includedItems" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_device_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_ai_content" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "features" TEXT[],
    "benefits" TEXT[],
    "aiSummary" TEXT NOT NULL,
    "aiSellingPoints" TEXT[],
    "tone" TEXT NOT NULL,
    "faqs" JSONB NOT NULL,
    "sourceLLM" TEXT NOT NULL,
    "aiVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_ai_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_seo" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "focusKeyword" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "richSnippets" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_media" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "gallery" TEXT[],
    "videos" TEXT[],
    "model3d" TEXT,
    "pdfs" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_logistics" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "hsCode" TEXT,
    "deliveryTime" TEXT NOT NULL,
    "storageCondition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_logistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_price_info" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "retailPrice" DOUBLE PRECISION NOT NULL,
    "suggestedPromoPrice" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'PLN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_price_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_inventory_ref" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "allowBackorder" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_inventory_ref_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_health_relations" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "linkedIngredients" TEXT[],
    "linkedSymptoms" TEXT[],
    "linkedHealthAreas" TEXT[],
    "linkedBiomarkers" TEXT[],
    "contraindications" TEXT[],
    "recommendedForSegments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_health_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pim_versioning" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "lastEditedBy" TEXT NOT NULL,
    "workflowStatus" "WorkflowStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pim_versioning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pim_supplement_attributes_productId_key" ON "pim_supplement_attributes"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_food_attributes_productId_key" ON "pim_food_attributes"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_cosmetic_attributes_productId_key" ON "pim_cosmetic_attributes"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_device_attributes_productId_key" ON "pim_device_attributes"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_ai_content_productId_key" ON "pim_ai_content"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_seo_productId_key" ON "pim_seo"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_seo_slug_key" ON "pim_seo"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pim_media_productId_key" ON "pim_media"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_logistics_productId_key" ON "pim_logistics"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_price_info_productId_key" ON "pim_price_info"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_inventory_ref_productId_key" ON "pim_inventory_ref"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_health_relations_productId_key" ON "pim_health_relations"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_versioning_productId_key" ON "pim_versioning"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "pim_channel_content_productId_channel_key" ON "pim_channel_content"("productId", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "pim_products_ean_key" ON "pim_products"("ean");

-- AddForeignKey
ALTER TABLE "pim_variants" ADD CONSTRAINT "pim_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_supplement_attributes" ADD CONSTRAINT "pim_supplement_attributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_ingredient_entries" ADD CONSTRAINT "pim_ingredient_entries_supplementId_fkey" FOREIGN KEY ("supplementId") REFERENCES "pim_supplement_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_food_attributes" ADD CONSTRAINT "pim_food_attributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_cosmetic_attributes" ADD CONSTRAINT "pim_cosmetic_attributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_device_attributes" ADD CONSTRAINT "pim_device_attributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_ai_content" ADD CONSTRAINT "pim_ai_content_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_channel_content" ADD CONSTRAINT "pim_channel_content_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_seo" ADD CONSTRAINT "pim_seo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_media" ADD CONSTRAINT "pim_media_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_logistics" ADD CONSTRAINT "pim_logistics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_price_info" ADD CONSTRAINT "pim_price_info_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_inventory_ref" ADD CONSTRAINT "pim_inventory_ref_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_health_relations" ADD CONSTRAINT "pim_health_relations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pim_versioning" ADD CONSTRAINT "pim_versioning_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pim_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
