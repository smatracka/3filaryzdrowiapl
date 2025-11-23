// Admin types based on Prisma schema from product_info.md

export type ProductType = 'SIMPLE' | 'VARIANT' | 'BUNDLE' | 'SERVICE';
export type ProductStatus = 'active' | 'draft' | 'archived';
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
    retailPrice: string;
    suggestedPromoPrice: string;
    currency: string;
}

export interface Logistics {
    weight: string;
    height: string;
    width: string;
    depth: string;
    deliveryTime: string;
}

export interface ChannelData {
    shop: ChannelContent;
    allegro: ChannelContent;
    erli: ChannelContent;
    amazon: ChannelContent;
    gmc: ChannelContent;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    parentId?: string | null;
    level?: number; // Frontend helper
    children?: Category[];
    _count?: {
        products: number;
    };

    description?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    socialTitle?: string;
    socialDescription?: string;
    canonicalUrl?: string;

    createdAt: Date;
    updatedAt: Date;
}
