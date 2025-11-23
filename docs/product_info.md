
## 1️⃣ Prisma schema dla PIM (PostgreSQL)

Plik: `prisma/schema.prisma` (albo `services/pim/prisma/schema.prisma`)

```prisma
// datasource & generator dostosuj do swojej konfiguracji
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id         String           @id @default(cuid())
  sku        String           @unique
  ean        String?          @unique
  brand      String
  name       String
  type       ProductType
  status     ProductStatus    @default(DRAFT)
  createdAt  DateTime         @default(now())
  updatedAt  DateTime         @updatedAt

  variants   ProductVariant[]
  // one-to-one attributes (opcjonalne)
  supplementAttrs SupplementAttributes?
  foodAttrs       FoodAttributes?
  cosmeticAttrs   CosmeticAttributes?
  deviceAttrs     DeviceAttributes?

  aiContent   AIContent?
  seo         SEO?
  media       Media?
  logistics   Logistics?
  priceInfo   PriceInfo?
  inventoryRef InventoryRef?
  health      HealthRelations?

  channels    ChannelContent[]
  versioning  Versioning?
}

model ProductVariant {
  id         String        @id @default(cuid())
  productId  String
  product    Product       @relation(fields: [productId], references: [id])

  sku        String        @unique
  ean        String?
  size       String?
  dose       String?
  weight     Float?
  volume     Float?
  color      String?
  unitCount  Int?
  gtin       String?
  mpn        String?
  status     ProductStatus @default(ACTIVE)
}

model SupplementAttributes {
  id            String   @id @default(cuid())
  productId     String   @unique
  product       Product  @relation(fields: [productId], references: [id])

  form          String
  servings      Int
  servingSize   String
  flavor        String?
  dietTypes     String[]      // wegańskie, bezglutenowe itp.
  allergens     String[]
  healthBenefits String[]
  usageInstructions String
  warnings      String

  ingredients   IngredientEntry[]
}

model IngredientEntry {
  id               String   @id @default(cuid())
  supplementId     String
  supplement       SupplementAttributes @relation(fields: [supplementId], references: [id])

  name             String
  dosage           String
  dailyValuePercent Float?
  form             String?
  linkedBiomarkers  String[]   // np. ["magnesium","sleep_score"]
  linkedHealthAreas String[]   // np. ["SLEEP","STRESS"]
}

model FoodAttributes {
  id            String   @id @default(cuid())
  productId     String   @unique
  product       Product  @relation(fields: [productId], references: [id])

  nutritionalValues Json      // { kcal, protein, fat, carbs... }
  storage         String
  expiry          DateTime
  allergens       String[]
  organic         Boolean
}

model CosmeticAttributes {
  id            String   @id @default(cuid())
  productId     String   @unique
  product       Product  @relation(fields: [productId], references: [id])

  forSkinType    String[]
  forHairType    String[]
  application    String
  ingredientsINCI String[]
  dermatologyTests String?
}

model DeviceAttributes {
  id            String   @id @default(cuid())
  productId     String   @unique
  product       Product  @relation(fields: [productId], references: [id])

  model         String
  power         String
  materials     String[]
  warranty      String
  includedItems String[]
}

model AIContent {
  id                String    @id @default(cuid())
  productId         String    @unique
  product           Product   @relation(fields: [productId], references: [id])

  shortDescription  String
  longDescription   String
  features          String[]
  benefits          String[]
  aiSummary         String
  aiSellingPoints   String[]
  tone              String
  faqs              Json      // array of {question,answer}
  sourceLLM         String
  aiVersion         String
}

model ChannelContent {
  id               String   @id @default(cuid())
  productId        String
  product          Product  @relation(fields: [productId], references: [id])

  channel          ChannelType
  title            String
  shortDescription String
  longDescription  String
  bulletPoints     String[]
  legalNotes       String?
  keywords         String[]
  categoryMapping  String
  attributesMapping Json     // { allegroParamId: value }
}

model SEO {
  id              String   @id @default(cuid())
  productId       String   @unique
  product         Product  @relation(fields: [productId], references: [id])

  focusKeyword    String
  seoTitle        String
  metaDescription String
  slug            String    @unique
  imageAlt        String
  richSnippets    Json      // structured data
}

model Media {
  id         String   @id @default(cuid())
  productId  String   @unique
  product    Product  @relation(fields: [productId], references: [id])

  mainImage  String
  gallery    String[]
  videos     String[]
  model3d    String?
  pdfs       String[]
}

model Logistics {
  id             String   @id @default(cuid())
  productId      String   @unique
  product        Product  @relation(fields: [productId], references: [id])

  weight         Float
  height         Float
  width          Float
  depth          Float
  hsCode         String?
  deliveryTime   String
  storageCondition String?
}

model PriceInfo {
  id             String   @id @default(cuid())
  productId      String   @unique
  product        Product  @relation(fields: [productId], references: [id])

  retailPrice    Float
  suggestedPromoPrice Float?
  currency       String   @default("PLN")
}

model InventoryRef {
  id             String   @id @default(cuid())
  productId      String   @unique
  product        Product  @relation(fields: [productId], references: [id])

  sku            String
  allowBackorder Boolean  @default(false)
}

model HealthRelations {
  id                     String   @id @default(cuid())
  productId              String   @unique
  product                Product  @relation(fields: [productId], references: [id])

  linkedIngredients      String[]
  linkedSymptoms         String[]
  linkedHealthAreas      String[]   // ["ENERGY","SLEEP","STRESS"...]
  linkedBiomarkers       String[]   // ID z biomarker_meta.yaml
  contraindications      String[]
  recommendedForSegments String[]   // np. ["SLEEP_LOW","IMMUNITY_LOW"]
}

model Versioning {
  id            String   @id @default(cuid())
  productId     String   @unique
  product       Product  @relation(fields: [productId], references: [id])

  version       Int      @default(1)
  lastEditedBy  String
  workflowStatus WorkflowStatus @default(DRAFT)
}

enum ProductType {
  SIMPLE
  VARIANT
  BUNDLE
  SERVICE
}

enum ProductStatus {
  ACTIVE
  DRAFT
  ARCHIVED
}

enum ChannelType {
  SHOP
  ALLEGRO
  ERLI
  AMAZON
  GMC
}

enum WorkflowStatus {
  DRAFT
  REVIEW
  APPROVED
}
```

---

## 2️⃣ GraphQL Types + NestJS DTO

Zakładamy `@nestjs/graphql`.

### 2.1 GraphQL Types (skrót – core + channel + health)

```ts
// pim.graphql.ts

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  sku: string;

  @Field({ nullable: true })
  ean?: string;

  @Field()
  brand: string;

  @Field()
  name: string;

  @Field(() => ProductType)
  type: ProductType;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field(() => [ProductVariant])
  variants: ProductVariant[];

  @Field(() => SupplementAttributes, { nullable: true })
  supplementAttrs?: SupplementAttributes;

  @Field(() => AIContent, { nullable: true })
  aiContent?: AIContent;

  @Field(() => [ChannelContent])
  channels: ChannelContent[];

  @Field(() => SEO, { nullable: true })
  seo?: SEO;

  @Field(() => HealthRelations, { nullable: true })
  health?: HealthRelations;
}

@ObjectType()
export class ProductVariant {
  @Field()
  id: string;

  @Field()
  sku: string;

  @Field({ nullable: true })
  ean?: string;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  dose?: string;
}

@ObjectType()
export class SupplementAttributes {
  @Field()
  form: string;

  @Field()
  servings: number;

  @Field()
  servingSize: string;

  @Field({ nullable: true })
  flavor?: string;

  @Field(() => [String])
  dietTypes: string[];

  @Field(() => [String])
  allergens: string[];

  @Field(() => [IngredientEntry])
  ingredients: IngredientEntry[];
}

@ObjectType()
export class IngredientEntry {
  @Field()
  name: string;

  @Field()
  dosage: string;

  @Field({ nullable: true })
  dailyValuePercent?: number;

  @Field({ nullable: true })
  form?: string;

  @Field(() => [String])
  linkedBiomarkers: string[];

  @Field(() => [String])
  linkedHealthAreas: string[];
}

@ObjectType()
export class AIContent {
  @Field()
  shortDescription: string;

  @Field()
  longDescription: string;

  @Field(() => [String])
  features: string[];

  @Field(() => [String])
  benefits: string[];

  @Field(() => [String])
  aiSellingPoints: string[];
}

@ObjectType()
export class ChannelContent {
  @Field()
  id: string;

  @Field(() => ChannelType)
  channel: ChannelType;

  @Field()
  title: string;

  @Field()
  shortDescription: string;

  @Field()
  longDescription: string;

  @Field(() => [String])
  bulletPoints: string[];

  @Field(() => [String])
  keywords: string[];
}

@ObjectType()
export class SEO {
  @Field()
  focusKeyword: string;

  @Field()
  seoTitle: string;

  @Field()
  metaDescription: string;

  @Field()
  slug: string;
}

@ObjectType()
export class HealthRelations {
  @Field(() => [String])
  linkedIngredients: string[];

  @Field(() => [String])
  linkedSymptoms: string[];

  @Field(() => [String])
  linkedHealthAreas: string[];

  @Field(() => [String])
  linkedBiomarkers: string[];

  @Field(() => [String])
  contraindications: string[];
}

registerEnumType(ProductType, { name: 'ProductType' });
registerEnumType(ProductStatus, { name: 'ProductStatus' });
registerEnumType(ChannelType, { name: 'ChannelType' });
```

### 2.2 DTO – create/update (skrót)

```ts
// dto/create-product.input.ts
@InputType()
export class CreateProductInput {
  @Field()
  sku: string;

  @Field()
  brand: string;

  @Field()
  name: string;

  @Field(() => ProductType)
  type: ProductType;

  @Field(() => ProductStatus, { nullable: true })
  status?: ProductStatus;

  @Field(() => CreateSupplementAttributesInput, { nullable: true })
  supplementAttrs?: CreateSupplementAttributesInput;

  @Field(() => [CreateChannelContentInput], { nullable: true })
  channels?: CreateChannelContentInput[];

  @Field(() => CreateSEOInput, { nullable: true })
  seo?: CreateSEOInput;

  @Field(() => CreateHealthRelationsInput, { nullable: true })
  health?: CreateHealthRelationsInput;
}

@InputType()
export class CreateSupplementAttributesInput {
  @Field()
  form: string;

  @Field()
  servings: number;

  @Field()
  servingSize: string;

  @Field({ nullable: true })
  flavor?: string;

  @Field(() => [String], { nullable: true })
  dietTypes?: string[];

  @Field(() => [String], { nullable: true })
  allergens?: string[];

  @Field(() => [CreateIngredientEntryInput], { nullable: true })
  ingredients?: CreateIngredientEntryInput[];
}

@InputType()
export class CreateIngredientEntryInput {
  @Field()
  name: string;

  @Field()
  dosage: string;

  @Field({ nullable: true })
  dailyValuePercent?: number;

  @Field({ nullable: true })
  form?: string;

  @Field(() => [String], { nullable: true })
  linkedBiomarkers?: string[];

  @Field(() => [String], { nullable: true })
  linkedHealthAreas?: string[];
}

@InputType()
export class CreateChannelContentInput {
  @Field(() => ChannelType)
  channel: ChannelType;

  @Field()
  title: string;

  @Field()
  shortDescription: string;

  @Field()
  longDescription: string;
}

@InputType()
export class CreateSEOInput {
  @Field()
  focusKeyword: string;

  @Field()
  seoTitle: string;

  @Field()
  metaDescription: string;

  @Field()
  slug: string;
}

@InputType()
export class CreateHealthRelationsInput {
  @Field(() => [String], { nullable: true })
  linkedIngredients?: string[];

  @Field(() => [String], { nullable: true })
  linkedSymptoms?: string[];

  @Field(() => [String], { nullable: true })
  linkedHealthAreas?: string[];

  @Field(() => [String], { nullable: true })
  linkedBiomarkers?: string[];

  @Field(() => [String], { nullable: true })
  contraindications?: string[];
}
```

---

## 3️⃣ OpenAPI dla PIM Service (skrót, najważniejsze)

Plik: `openapi/pim.yaml`

```yaml
openapi: 3.1.0
info:
  title: PIM Service API
  version: 1.0.0

paths:
  /products:
    get:
      summary: Lista produktów PIM
      parameters:
        - in: query
          name: status
          schema: { type: string, enum: [ACTIVE, DRAFT, ARCHIVED] }
      responses:
        '200':
          description: Lista produktów
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/Product' }
    post:
      summary: Utwórz produkt w PIM
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/ProductCreate' }
      responses:
        '201':
          description: Utworzony produkt
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Product' }

  /products/{id}:
    get:
      summary: Pobierz produkt
      parameters:
        - $ref: '#/components/parameters/ProductId'
      responses:
        '200':
          description: Produkt
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Product' }
        '404':
          description: Not found
    put:
      summary: Zaktualizuj produkt
      parameters:
        - $ref: '#/components/parameters/ProductId'
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/ProductUpdate' }
      responses:
        '200':
          description: Zaktualizowany produkt
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Product' }
    delete:
      summary: Archiwizuj produkt
      parameters:
        - $ref: '#/components/parameters/ProductId'
      responses:
        '204':
          description: Zarchiwizowano

  /products/{id}/channels:
    get:
      summary: Lista treści kanałowych
      parameters:
        - $ref: '#/components/parameters/ProductId'
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/ChannelContent' }

    post:
      summary: Dodaj/aktualizuj content dla kanału
      parameters:
        - $ref: '#/components/parameters/ProductId'
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/ChannelContentUpsert' }
      responses:
        '200':
          description: Zaktualizowany content
          content:
            application/json:
              schema: { $ref: '#/components/schemas/ChannelContent' }

components:
  parameters:
    ProductId:
      in: path
      name: id
      required: true
      schema: { type: string }

  schemas:
    Product:
      type: object
      properties:
        id: { type: string }
        sku: { type: string }
        brand: { type: string }
        name: { type: string }
        type: { type: string }
        status: { type: string }
        supplementAttrs:
          $ref: '#/components/schemas/SupplementAttributes'
        seo:
          $ref: '#/components/schemas/SEO'
        health:
          $ref: '#/components/schemas/HealthRelations'
    ProductCreate:
      type: object
      required: [sku, brand, name, type]
      properties:
        sku: { type: string }
        brand: { type: string }
        name: { type: string }
        type: { type: string }
        supplementAttrs:
          $ref: '#/components/schemas/SupplementAttributes'
        seo:
          $ref: '#/components/schemas/SEO'
    ProductUpdate:
      allOf:
        - $ref: '#/components/schemas/ProductCreate'
    SupplementAttributes:
      type: object
      properties:
        form: { type: string }
        servings: { type: integer }
        servingSize: { type: string }
        flavor: { type: string }
    ChannelContent:
      type: object
      properties:
        id: { type: string }
        channel: { type: string }
        title: { type: string }
        shortDescription: { type: string }
    ChannelContentUpsert:
      type: object
      required: [channel, title, shortDescription]
      properties:
        channel: { type: string, enum: [SHOP, ALLEGRO, ERLI, AMAZON, GMC] }
        title: { type: string }
        shortDescription: { type: string }
        longDescription: { type: string }
    SEO:
      type: object
      properties:
        focusKeyword: { type: string }
        seoTitle: { type: string }
        metaDescription: { type: string }
        slug: { type: string }
    HealthRelations:
      type: object
      properties:
        linkedIngredients:
          type: array
          items: { type: string }
        linkedBiomarkers:
          type: array
          items: { type: string }
```

---

## 4️⃣ n8n – workflow publikacji na Allegro / Erli / Amazon

Idea: **jeden master workflow** + sub-workflowy per kanał.

### 4.1 Trigger

* **Webhook / Cron / Manual**:
  `PIM_UPDATED_PRODUCT` → payload: `{ productId, changedFields }`

### 4.2 Main workflow (pseudo-JSON)

1. **Node: Webhook / PIM Event**
2. **Node: HTTP Request → PIM Service /products/{id}?include=channels,attributes,seo,health**
3. **Node: Switch kanałowy** (FOR EACH channel in `channels`):

   * Branch `ALLEGRO` → call subworkflow `PublishToAllegro`
   * Branch `ERLI` → `PublishToErli`
   * Branch `AMAZON` → `PublishToAmazon`
   * Branch `GMC` → `UpdateGMCFeed`

### 4.3 Subworkflow: `PublishToAllegro`

Wejście: produkt PIM + ChannelContent dla ALLEGRO.

Kroki:

1. **Map Allegro Category**

   * Node `Function`: mapowanie `channel.categoryMapping` → `allegro.categoryId`
2. **Prepare Offer Object**

   * Node `Function`: buduje JSON:

     * `name` = channel.title
     * `description` = channel.longDescription (HTML)
     * `parameters` = `attributesMapping` + suplement attributes (dawka, forma)
3. **HTTP Request → Allegro /sale/offers**
4. **Handle Response**

   * Node `If` (error) → log + retry queue
   * Node `Set` – zapisz `allegroOfferId` w PIM (ChannelContent.ext → attributesMapping.offerId)

Analogiczne subworkflowy dla Erli / Amazon (mapping paramów).

---

## 5️⃣ AI Content Engine – Prompt Chain (3–5 etapów)

Stawiamy na **pipeline**:

1. **Skeleton / Brief**
2. **Long Description**
3. **Short Description + Bullet Points**
4. **SEO Meta**
5. **Channel Adaptation**

### 5.1 Prompt 1 – Product Brief & Structure

**Input:** strukturalny JSON produktu (skład, forma, wskazania).

> **System:**
> Jesteś ekspertem od copywritingu w branży zdrowia i suplementów. Piszesz zgodnie z polskim prawem, nie obiecujesz efektów leczniczych, używasz języka korzyści i stylu Ray Edwards (P.A.S.T.O.R.), ale w wersji etycznej i merytorycznej.
>
> **User:**
> Oto dane produktu w JSON:
>
> ```json
> {PRODUCT_JSON}
> ```
>
> 1. Wypisz krótki BRIEF produktu (1 akapit).
> 2. Wypisz listę kluczowych BENEFITÓW (maks. 6).
> 3. Wypisz listę kluczowych CECH (maks. 6).
> 4. Zidentyfikuj 3 główne PROBLEMY klienta, które produkt pomaga adresować (bez obietnic leczenia).

Output → zapis do `aiContent.features`, `aiContent.benefits`.

---

### 5.2 Prompt 2 – Long Description (Sklep)

> **System:**
> Jesteś copywriterem tworzącym opisy produktów dla sklepu 3FilaryZdrowia. Pisz po polsku, prostym językiem, w 2–4 zdaniach na akapit, z zachowaniem zasad SEO (fraza główna: {FOCUS_KEYWORD}).
>
> **User:**
> Oto dane produktu i brief:
>
> ```json
> {PRODUCT_JSON}
> ```
>
> Stwórz opis produktu (LONG DESCRIPTION) o długości 500–900 słów, w strukturze:
>
> * Krótki wstęp (2–3 zdania)
> * Sekcja „Dlaczego warto?” (nagłówek + 3–6 bulletów)
> * Sekcja „Jak działa?” (opis składników bez obietnic leczenia)
> * Sekcja „Dla kogo?” (kto skorzysta najbardziej)
> * Sekcja „Sposób użycia” (na podstawie danych)
> * Sekcja „Bezpieczeństwo i przeciwwskazania”
>
> Unikaj słów: leczy, terapia, gwarantuje, na pewno.

Output → `aiContent.longDescription`.

---

### 5.3 Prompt 3 – Short + Bullets (Shop / GMC)

> **User:**
> Na podstawie poniższego opisu LONG i BRIEF:
>
> ```text
> {LONG_DESCRIPTION}
> {BRIEF}
> ```
>
> Stwórz:
>
> 1. Krótki opis (SHORT DESCRIPTION), 2–3 zdania, maks. 400 znaków.
> 2. Listę 5 bullet points z najważniejszymi korzyściami (po polsku, zdania niedługie).

Output → `aiContent.shortDescription`, `aiContent.aiSellingPoints`.

---

### 5.4 Prompt 4 – SEO Meta

> **User:**
> Na podstawie danych produktu (szczególnie składników i wskazań) stwórz:
>
> * `focusKeyword` – główna fraza (po polsku, 2–4 słowa, bez marki),
> * `seoTitle` – do 60 znaków, zawierający frazę,
> * `metaDescription` – do 155 znaków, zawierający frazę i CTA.
>
> Zwróć wynik jako JSON:
>
> ```json
> { "focusKeyword": "...", "seoTitle": "...", "metaDescription": "..." }
> ```

Output → `seo`.

---

### 5.5 Prompt 5 – Channel Adaptation (Allegro / Amazon / GMC)

> **User:**
> Na podstawie opisu LONG, SHORT i bulletów:
>
> ```text
> {LONG_DESCRIPTION}
> {SHORT_DESCRIPTION}
> {BULLETS}
> ```
>
> Stwórz wersję opisu dopasowaną do kanału: {CHANNEL}
> Zwróć:
>
> * `title` – do 70 znaków, z kluczowym składnikiem,
> * `shortDescription` – 2–3 zdania, maks. 400 znaków,
> * `longDescription` – HTML (p tagi, ul/li dla list),
> * `bulletPoints` – lista 5 krótkich haseł.
>
> Output jako JSON.

Output → `ChannelContent` per kanał.

---

## 6️⃣ Algorytm mapowania składników → biomarkery (Harmonia 360°)

Cel: powiązać `IngredientEntry` z `biomarker_meta.yaml` + semantyką zdrowia.

### 6.1 Dane wejściowe

* `IngredientEntry.name` – np. „Magnez (cytrynian)”
* `IngredientEntry.linkedHealthAreas` – np. ["SLEEP","STRESS"]
* biomarker_meta list – np. `magnesium_serum`, `sleep_score`, `stress_index`

### 6.2 Kroki algorytmu

1. **Normalizacja nazw składników:**

   * Lowercase, usuwanie odmian („magnez”, „magnezu”), mapowanie do canonical_name:

     * „Magnez (cytrynian)” → `magnesium`
     * „Witamina D3” → `vitamin_d`
     * „Kwas foliowy” → `folate`
   * słownik w pliku: `ingredient_canonical_map.yaml`.

2. **Słownik twardych mapowań:**

```yaml
# ingredient_to_biomarker_map.yaml
magnesium:
  biomarkers: ["magnesium_serum"]
  healthAreas: ["MUSCLE", "SLEEP", "STRESS"]
vitamin_d:
  biomarkers: ["vit_d_25oh"]
  healthAreas: ["IMMUNITY", "BONES", "MOOD"]
omega_3:
  biomarkers: ["triglycerides", "crp"]
  healthAreas: ["CARDIO", "BRAIN", "INFLAMMATION"]
```

3. **Algorytm:**

Pseudo-kod:

```ts
function mapIngredientToBiomarkers(ingredient: IngredientEntry): {
  linkedBiomarkers: string[];
  linkedHealthAreas: string[];
} {
  const canonical = normalizeName(ingredient.name); // magnez → magnesium

  const hardMap = ingredientMap[canonical];
  const resultBiomarkers = new Set<string>();
  const resultHealthAreas = new Set<string>();

  if (hardMap) {
    hardMap.biomarkers.forEach(b => resultBiomarkers.add(b));
    hardMap.healthAreas.forEach(h => resultHealthAreas.add(h));
  }

  // Dodatkowo: heurystyki po formie
  if (canonical === "iron" && ingredient.dosage.includes("bisglycinate")) {
    resultHealthAreas.add("FATIGUE");
  }

  // Jeśli ingredient.linkedHealthAreas już coś zawiera – scal
  ingredient.linkedHealthAreas?.forEach(h => resultHealthAreas.add(h));

  return {
    linkedBiomarkers: Array.from(resultBiomarkers),
    linkedHealthAreas: Array.from(resultHealthAreas),
  };
}
```

4. **Integracja z Health Twin:**

* podczas generowania Health Twin:

  * sprawdzasz, czy użytkownik ma:

    * deficyt biomarkera → dopasowujesz produkty z ingredient.linkedBiomarkers zawierając te ID
    * problem healthArea (np. niska `sleepScore`) → produkty z ingredient.linkedHealthAreas zawierające `"SLEEP"`

5. **Dalsze rozszerzenia:**

* zamiast twardego słownika → embeddings:

  * wektor dla składnika,
  * wektor dla biomarkerów,
  * similarity → dynamiczne powiązania.

