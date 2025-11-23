3FILARYZDROWIA.PL — TECHNICAL ARCHITECTURE SPEC v1.0
0. CEL DOKUMENTU

Ten dokument opisuje docelową architekturę systemu 3filaryzdrowia.pl:

Headless eCommerce + AI + Multichannel

Stack: Next.js 15 (RSC), NestJS microservices, Kubernetes, AI/Vector Search, PIM, CDP/CRM, n8n.

Docelowy odbiorca: programiści, architekci, AI-assystenci (Antigravity, Claude Code, Codex, Jules).

Dokument ma służyć jako:

Źródło prawdy dla architektury (High-Level + Services + Flows),

Bazowy kontekst dla generowania kodu, skryptów, infra, testów, dokumentacji.

1. CELE BIZNESOWE

Zbudowanie skalowalnego sklepu headless dla 3filaryzdrowia.pl z bogatą logiką zdrowotną i rekomendacyjną.

Multichannel: spójne zarządzanie produktami, stanami, cenami i zamówieniami dla:

Własny sklep (3filaryzdrowia.pl),

Allegro, Erli,

Docelowo Amazon,

Google Shopping / Merchant Center (GMC).

AI-driven Commerce:

Personalizowane rekomendacje suplementów,

AI wyszukiwarka semantyczna,

Generowanie treści produktowych i marketingowych.

Subskrypcje jako istotne źródło MRR (recurring revenue).

Silny Customer 360° / CDP – połączenie historii zakupów, zachowań, quizów zdrowotnych (Harmonia 360°).

2. WYMAGANIA NIEFUNKCJONALNE

Skalowalność: obsługa eventów typu „drop” (setki tysięcy UU w krótkim czasie).

Dostępność: ≥ 99.5% uptime na warstwie sklepu.

Latency: TTFB na stronie produktowej < 200 ms (po cache); P95 response backend < 300 ms.

Bezpieczeństwo:

JWT auth,

mTLS w K8s (Service Mesh),

OWASP Top 10 mitigations,

Szyfrowanie danych wrażliwych.

Obserwowalność: metrics, logs, traces; pełna ścieżka requestu przez mikroserwisy.

Modułowość: microservices + event-driven + n8n do orkiestracji.

3. SYSTEM CONTEXT (HIGH LEVEL)
3.1 Aktywni użytkownicy / aktorzy

Customer (B2C) – użytkownik końcowy sklepu.

Admin/Content Manager – osoba zarządzająca produktami, opisami, promocjami.

Warehouse / Fulfillment – obsługa magazynu i wysyłek.

Customer Support (CS) – pracownicy obsługi klienta.

External Marketplace – Allegro / Erli / Amazon.

CRM / CDP – np. HubSpot / przyszłe narzędzie.

3.2 Systemy zewnętrzne

Baselinker / ERP – integracja zamówień, dokumentów, statusów wysyłek.

Płatności – Przelewy24 / Stripe / Blue Media.

InPost API – wysyłki i paczkomaty.

Google Merchant Center (GMC) – feed produktów.

Social Media APIs – FB/IG/TikTok (via n8n).

CRM (np. HubSpot) – dane kontaktowe, pipeliny sprzedażowe.

LLM Provider(s) – OpenAI / Anthropic / inne.

4. ARCHITEKTURA OGÓLNA
4.1 Styl architektoniczny

Headless eCommerce:

Frontend: Next.js 15 (React Server Components, App Router),

Backend: NestJS microservices + GraphQL API Gateway (BFF).

Microservices (Domain-driven): Auth, User, PIM, Product, Inventory, Pricing, Order, Payment, Subscription, Channel Integration, AI Engine, Content Engine, Event/CDP, Notification, etc.

Event-Driven:

Komunikacja asynchroniczna przez message bus (Kafka / NATS / RabbitMQ – do ustalenia),

Kluczowe zdarzenia: OrderCreated, PaymentCaptured, InventoryReserved, ProductUpdated, SubscriptionRenewalDue, HarmoniaQuizCompleted, etc.

Service Mesh: Istio / Linkerd do:

mTLS między mikroserwisami,

Routing, canary, retries, circuit-breaking,

Telemetria (metric + tracing).

n8n jako orchestration/automation engine:

Integracje zewnętrzne,

Marketing, social, CRM, leady, logistyka.

5. TECH STACK
5.1 Frontend

Framework: Next.js 15 (App Router, RSC).

Język: TypeScript.

Styling: TailwindCSS (opcjonalnie + shadcn/ui).

Data fetching:

SSR/ISR + fetch / GraphQL client (np. urql / Apollo / custom).

Client components do koszyka, checkoutu, interactive UI.

State management:

React Query / TanStack Query,

Context/Redux, gdzie potrzebne (np. koszyk).

SEO:

ISR + on-demand revalidation,

renderowanie meta-tagów po SSR.

5.2 Backend

Framework: NestJS (monorepo / multi-repo, microservices).

API Gateway / BFF: NestJS + GraphQL (Apollo Server / Mercurius).

Komunikacja między mikroserwisami:

gRPC / HTTP w sync,

Kafka / NATS / RabbitMQ dla eventów.

Bazy danych:

PostgreSQL – główne dane transakcyjne,

TimescaleDB (rozszerzenie Postgresa) – dane szeregów czasowych (Harmonia 360°),

Redis – cache, sesje, rate-limiting, punktacja lojalnościowa.

Vector DB:

Pinecone / Chroma / Qdrant – embeddings produktów i treści.

5.3 AI Layer

Język: Python (preferowane) + ewentualnie Node dla prostych funkcji.

Frameworki:

LangChain,

LangGraph (do multi-agent workflows),

FastAPI / NestJS (dla prostych usług AI z JS).

Use cases:

AI Content Engine (opisy produktowe, meta, SM),

Semantic Search (query understanding + re-ranking),

Recommendation Engine (Harmonia 360°),

AI Agents: Support, Marketing, PIM.

5.4 Infra & DevOps

Kubernetes (GKE / EKS / DO / inna chmura).

Service Mesh: Istio / Linkerd.

CI/CD:

GitHub Actions,

ArgoCD / FluxCD do deployów.

Monitoring / Observability:

Prometheus,

Grafana,

Loki (logs),

Tempo / Jaeger (traces),

OpenTelemetry SDK w usługach.

Secrets / Config:

External secrets manager (np. HashiCorp Vault / AWS Secrets Manager / GCP Secret Manager).

6. LISTA MIKROSERWISÓW (DOMAINS + RESPONSIBILITY)

Poniższa lista jest docelowa (można wdrażać iteracyjnie).

6.1 API Gateway / BFF

Odpowiedzialność:

Pojedynczy punkt wejścia dla frontendu,

GraphQL schema,

Agregacja danych z mikroserwisów,

Autoryzacja wstępna.

Technologia: NestJS + GraphQL.

Bez logiki biznesowej, tylko orchestracja.

6.2 Auth Service

Zakres:

Rejestracja, logowanie,

OAuth (Google/Facebook),

JWT issuance & validation,

Refresh tokens,

Password reset flow.

Dane:

Tabela users_auth (id, email, hashed_password, provider, created_at, updated_at).

Integracje:

User Service (profile),

Session store (Redis).

6.3 User Service (Customer 360° Core)

Zakres:

Dane użytkownika: profil, preferencje, adresy,

Loyalty points / wallets (może jako osobny moduł),

Link do CDP (eventy i segmenty).

Dane:

users_profile (user_id, name, phone, ...),

addresses,

loyalty_accounts (jeżeli w tym serwisie).

Współpraca:

Auth Service,

Order Service,

CDP/Event Service.

6.4 PIM Service (Master Product Data)

Zakres:

Master dane produktowe i warianty,

Atrybuty, kategorie, taxonomie,

Per-channel content (shop, Allegro, Amazon, GMC).

Dane:

products (global product id),

product_variants,

categories,

product_attributes,

product_channel_content (channel_id, title, description, bullet_points, etc.).

Integracje:

AI Content Engine (generacja/aktualizacja treści),

Product Service (dla sklepu),

Channel Integration Service (mapping do marketplace’ów),

GMC Feed generator.

6.5 Product Service (Store Catalog)

Zakres:

Read-only view produktów dla sklepu,

Denormalizowane dane pod front,

Filtry, listingi, sortowanie.

Dane:

store_products (flattened view PIM + pricing + availability),

Możliwy Event Sourcing / CQRS – view update z eventów z PIM.

Integracje:

PIM Service (eventy ProductUpdated),

Pricing Service,

Inventory Service,

Search/Vector Service.

6.6 Inventory Service

Zakres:

Stany magazynowe,

Rezerwacje (cart/checkout),

Integracja z ERP/Baselinker.

Dane:

inventory_items (sku, warehouse_id, quantity_available),

inventory_reservations.

Patterns:

Saga/Outbox dla spójności z Order Service,

Event Sourcing możliwy dla historyczności.

6.7 Pricing Service

Zakres:

Cenniki bazowe,

Cenniki per kanał (shop, Allegro, Amazon),

Promocje, kampanie, kupony,

Segment-based pricing (VIP, subskrybenci, nowi).

Dane:

price_lists,

price_list_items,

discounts, promotions, coupons.

Integracje:

Product Service (prezentacja),

Channel Integration Service (cena per marketplace),

Subscription Service (rabaty dla planów).

6.8 Cart Service

Zakres:

Koszyki (anonimowe i zalogowane),

Logika dodawania / usuwania / modyfikacji,

Walidacja koszyka (dostępność produktów, limity).

Dane:

carts, cart_items.

Integracje:

Pricing Service,

Inventory Service (soft reservation na etapie checkoutu),

User Service (dla zalogowanych).

6.9 Order Service

Zakres:

Tworzenie zamówień,

Statusy zamówień, lifecycle,

Integracja z Payment i Inventory (Sagi).

Dane:

orders, order_items, order_status_history.

Patterns:

Saga pattern: Cart → Order → Payment → Inventory → Confirmation,

Transactional Outbox dla eventów (np. OrderCreated, OrderPaid).

Integracje:

Payment Service,

Inventory Service,

Notification Service,

Baselinker / ERP (via n8n).

6.10 Payment Service

Zakres:

Integracja z bramkami płatności,

Tworzenie transakcji, webhooki,

Mapowanie statusów płatności na status zamówienia.

Dane:

payments, payment_attempts.

Patterns:

Transactional Outbox + idempotent handling webhooków.

Integracje:

Order Service,

Subscription Service (billing cykliczny).

6.11 Subscription Service

Zakres:

Zarządzanie planami subskrypcji (produkt + cykl),

Harmonogram obciążeń,

Pauzy, zmiany, anulowanie.

Dane:

subscription_plans,

subscriptions,

subscription_billing_events.

Integracje:

Payment Service (cykliczne obciążenia),

Inventory (rezerwacje),

Notification (powiadomienia),

Product Service (prezentacja na froncie).

6.12 Channel Integration Service (Marketplace)

Zakres:

Synchronizacja produktów, stanów, cen, zamówień z Allegro/Erli/Amazon.

Mapowanie kategorii i atrybutów,

Obsługa rozbieżności (retries, error queues).

Dane:

channel_accounts,

channel_listings,

channel_orders,

channel_logs.

Integracje:

PIM (treści),

Pricing/Inventory/Order,

n8n (workflows / retry / alerting).

6.13 Search & Recommendation Service

Zakres:

Indeksowanie produktów do MeiliSearch/Elastic,

Obsługa zapytań search (full-text + filters),

Integracja z Vector DB (embeddings),

Rekomendacje (similar products, cross-sell, AI).

Integracje:

Product Service,

Vector DB,

AI Engine.

6.14 AI Engine Service

Zakres:

Warstwa orkiestrowania LLM:

semantic search,

query rewriting,

rekomendacje zdrowotne (Harmonia),

generowanie planów suplementacji.

Technologia:

Python + FastAPI,

LangChain + LangGraph (multi-agent).

Integracje:

PIM/Product,

Harmonia 360° Service,

AI Content Engine.

6.15 AI Content Engine Service

Zakres:

Generowanie treści produktowych:

opis długi,

opis krótki,

meta title/description,

bullet points,

wersje per channel.

Generowanie treści marketingowych (SM, newslettery).

Input:

Dane z PIM (parametry, składniki),

Guidelines SEO, styl marki.

Output:

Zapis do product_channel_content (PIM),

Push do n8n dla SM / newsletterów.

6.16 Harmonia 360° Service

Zakres:

Quizy zdrowotne, ankiety, wyniki badań,

Model zdrowia użytkownika w czasie (time series),

Wnioski i sugestie dla AI Engine.

Dane:

harmonia_sessions,

health_metrics_timeseries,

recommendation_logs.

Technologie:

PostgreSQL + TimescaleDB extension.

6.17 Event/CDP Service

Zakres:

Zbieranie eventów (page views, clicks, purchases, quiz completions),

Budowanie profili 360°,

Segmentacja (np. RFM).

Dane:

events_*,

segments, user_segments.

Integracje:

CRM (HubSpot),

n8n (trigger kampanii),

AI Engine (segment-aware recommendations).

6.18 Notification Service

Zakres:

E-mail/SMS/push,

Szablony powiadomień,

Kolejki wysyłki.

Integracje:

Order, Subscription, CDP, Harmonia, etc.

7. KLUCZOWE FLOWS (SEQUENCE LEVEL)
7.1 Flow: Zakup (Checkout Saga – high level)

User → Frontend → API Gateway:

Pobranie koszyka,

Podsumowanie zamówienia (ceny, rabaty, dostawa).

API Gateway → Cart Service → Pricing Service → Inventory Service:

Walidacja koszyka,

Tymczasowa rezerwacja stanów.

User potwierdza → CreateOrder (Order Service).

Order Service tworzy OrderCreated + Outbox event.

Payment Service:

Tworzy PaymentIntent w bramce,

Zwraca URL/iframe do płatności.

Webhook z bramki → Payment Service:

Success: PaymentCaptured event,

Error: PaymentFailed.

PaymentCaptured:

Order Service → zmiana statusu na Paid,

Inventory Service → finalizacja rezerwacji,

Notification → e-mail potwierdzający,

n8n → sync do Baselinker/ERP.

7.2 Flow: Sync produktu do Allegro

Admin aktualizuje produkt w PIM albo AI Content Engine generuje nowe treści.

PIM emituje event ProductUpdated.

Channel Integration Service odbiera event:

Mapuje dane na strukturę Allegro API,

Wysyła PUT offer / POST offer.

W razie błędu:

Log do channel_logs,

Retry logic (n8n / dead-letter queue),

Alert dla admina.

7.3 Flow: Harmonia 360° → Rekomendacje AI

User wypełnia quiz Harmonia 360° (frontend → Harmonia Service).

Harmonia zapisuje odpowiedzi + generuje HealthProfileUpdated.

AI Engine:

Pobiera profil zdrowia,

Wywołuje funkcje w Product/PIM/Recommendation Service,

Buduje propozycję planu suplementacji.

Wynik:

Prezentacja na froncie (rekomendowany zestaw),

Możliwość dodania zestawu do koszyka jednym kliknięciem.

8. BEZPIECZEŃSTWO

Auth: JWT (access + refresh), rotating secrets.

Transport:

HTTPS na krawędzi,

mTLS wewnątrz klastra (Service Mesh).

Dostęp do danych:

RBAC na poziomie mikroserwisów,

Least privilege dla baz danych.

Dane wrażliwe:

Szyfrowane w bazie (np. numery tel, e-maile – w zależności od sentywności),

Hashing haseł: Argon2 / bcrypt.

Hardening:

Rate limiting (API Gateway, per IP + per user),

WAF na edge (np. Cloudflare).

9. OBSERWOWALNOŚĆ

Logging:

Strukturalne logi (JSON),

Centralizacja przez Loki / ELK,

Korelacja requestów (trace id).

Metrics:

Prometheus exporters w mikroserwisach,

Dashboards w Grafanie (latency, error rates, throughput).

Tracing:

OpenTelemetry w backendzie i froncie,

Tempo / Jaeger do przeglądania trace’ów SAGA flow.

10. DEV PROCESS & ENVIRONMENTS

Repo:

Monorepo (Turborepo / Nx) lub multi-repo + wspólne guidelines.

Branching:

main – produkcja,

develop – testy integracyjne,

feature branches.

Environments:

dev – lokalne + wspólny klaster deweloperski,

staging – przedprodukcyjny,

prod – produkcja.

Testing:

Unit tests (Jest / Vitest),

Integration tests (Playwright / Cypress + supertest),

Contract tests (Pact),

Load tests (k6).

11. WYTYCZNE DO UŻYCIA Z AI (ANTIGRAVITY / CLAUDE / CODEX / JULES)

Jeśli używasz tego dokumentu jako kontekstu dla AI, załóż, że:

Stack jest docelowy – generuj kod/konfiguracje zgodne z:

Frontend: Next.js 15 + TypeScript + GraphQL client,

Backend: NestJS microservices + GraphQL Gateway,

Infra: K8s, Istio, ArgoCD, Redis, PostgreSQL, TimescaleDB, Vector DB.

Nazwy serwisów są kanoniczne:

auth-service, user-service, pim-service, product-service, order-service, itd.

Preferowane wzorce:

Clean Architecture / Hexagonal w serwisach,

CQRS tam, gdzie ma sens (catalog, inventory),

Saga pattern dla transakcji rozproszonych.

Generując kod:

Zawsze używaj TypeScript w Node/Nest/Next,

W Pythonie używaj typów (pydantic), FastAPI dla REST.

Priorytety biznesowe:

Najpierw stabilny checkout, PIM, integracje z marketplace’ami,

Potem AI i automatyzacja,

Potem marketplace + advanced AI agents.