// Admin types based on Prisma schema from product_info.md

export type ProductType = 'SIMPLE' | 'VARIANT' | 'BUNDLE' | 'SERVICE';
export type ProductStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
export type ChannelType = 'SHOP' | 'ALLEGRO' | 'ERLI' | 'AMAZON' | 'GMC';
export type WorkflowStatus = 'DRAFT' | 'REVIEW' | 'APPROVED';

export interface Product {
    id: string;
    sku: string;
    ean?: string;
    brand: string;
    name: string;
    type: ProductType;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;

    // Relations
    supplementAttrs?: SupplementAttributes;
    channels?: ChannelContent[];
    seo?: SEO;
    health?: HealthRelations;
    media?: Media;
    priceInfo?: PriceInfo;
    logistics?: Logistics;
}

export interface SupplementAttributes {
    id: string;
    form: string;
    servings: number;
    servingSize: string;
    flavor?: string;
    dietTypes: string[];
    allergens: string[];
    healthBenefits: string[];
    usageInstructions: string;
    warnings: string;
    ingredients: IngredientEntry[];
}

export interface IngredientEntry {
    id: string;
    name: string;
    dosage: string;
    dailyValuePercent?: number;
    form?: string;
    linkedBiomarkers: string[];
    linkedHealthAreas: string[];
}

export interface ChannelContent {
    id: string;
    channel: ChannelType;
    title: string;
    shortDescription: string;
    longDescription: string;
    bulletPoints: string[];
    keywords: string[];
    categoryMapping: string;
}

export interface SEO {
    id: string;
    focusKeyword: string;
    seoTitle: string;
    metaDescription: string;
    slug: string;
    imageAlt: string;
}

export interface HealthRelations {
    id: string;
    linkedIngredients: string[];
    linkedSymptoms: string[];
    linkedHealthAreas: string[];
    linkedBiomarkers: string[];
    contraindications: string[];
    recommendedForSegments: string[];
}

export interface Media {
    id: string;
    mainImage: string;
    gallery: string[];
    videos: string[];
    pdfs: string[];
}

export interface PriceInfo {
    id: string;
    retailPrice: number;
    suggestedPromoPrice?: number;
    currency: string;
}

export interface Logistics {
    id: string;
    weight: number;
    height: number;
    width: number;
    depth: number;
    hsCode?: string;
    deliveryTime: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
    parent?: Category;
    children?: Category[];
    level: number;
    order: number;
    isActive: boolean;
    productCount: number;

    // SEO
    seoTitle?: string;
    metaDescription?: string;

    // Media
    image?: string;
    icon?: string;

    createdAt: Date;
    updatedAt: Date;
}
