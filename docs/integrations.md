Poniżej masz **gotowy, perfekcyjny plik integracje.md** (lub `INTEGRATIONS.md`) do repozytorium — dokument opisuje wszystkie integracje Twojej aplikacji:

- **InPost**
- **PayU**
- **Paynow**
- **n8n (workflow orchestrator)**
- **Facebook Graph API**
- **Instagram Graph API**

Format jest jak z najlepszych repo GitHub / Vercel / Stripe — nadaje się od razu do commitowania.

---

# 🚀 Integrations

Dokumentacja wszystkich integracji zewnętrznych dla ekosystemu **Harmonia360° / 3FilaryZdrowia**.

Plik: `docs/INTEGRATIONS.md`

---

# 🌐 INTEGRATIONS.md

```md
# 🔌 Integracje Systemowe — Harmonia360° / 3FilaryZdrowia

Nasz ekosystem wspiera zestaw kluczowych integracji z usługami płatniczymi, kurierskimi, social mediami oraz automatyzacją.  
Wszystkie integracje są zarządzane poprzez:

- **API Gateway (GraphQL / REST)**
- **Event Bus (Kafka / Redis Streams / NATS)**
- **n8n Integration Hub**
- **Microservices (NestJS + FastAPI)**

Poniższa dokumentacja opisuje każdą integrację, punkty wejścia, protokoły, webhooki i flow w naszym systemie.

---

# 📦 InPost API

Integracja: **Nadawanie paczek, śledzenie, generowanie etykiet, Paczkomaty, kurier**  
API: https://api-docs.dhlparcel.pl (InPost)

## 🔧 Architektura

- Mikroserwis `shipping-service`
- Kolejki: `SHIPMENT_CREATED`, `SHIPMENT_LABEL_REQUESTED`
- n8n: `InPost_Create_Shipment`, `InPost_Generate_Label`

## 🔌 Endpointy

### 1. Utworzenie przesyłki
```

POST /shipping/inpost/create

````

Payload:
```json
{
  "orderId": "123",
  "customer": {...},
  "locker": "OPO15A",
  "cod": false
}
````

### 2. Pobranie etykiety

```
GET /shipping/inpost/:shipmentId/label
```

### 3. Śledzenie

```
GET /shipping/inpost/:trackingNumber
```

## 🔔 Webhooki

- `parcel_status_change`
- `parcel_ready_for_pickup`
- `parcel_delivered`

Przekazywane do Kafka→Notification Service→Email/SMS.

---

# 💳 PayU Integracja

API: [https://developers.payu.com](https://developers.payu.com)

Obsługuje:

- płatności jednorazowe,
- karty,
- blik,
- płatności cykliczne,
- zwroty.

## 🔧 Architektura

- Mikroserwis: `payments-service`
- Eventy: `PAYMENT_INITIATED`, `PAYMENT_CONFIRMED`, `PAYMENT_FAILED`
- Webhook: `/payments/payu/notify`

## 🔌 Flow

1. Frontend → `/payments/payu/init`
2. PayU → redirect → 3FilaryZdrowia → `/checkout/success`
3. Webhook → potwierdzenie → OrderService

## 🔔 Webhook struktura

```json
{
  "order": {
    "orderId": "XYZ123",
    "status": "COMPLETED"
  }
}
```

---

# 💸 Paynow Integracja

API: [https://docs.paynow.pl](https://docs.paynow.pl)
Obsługa:

- BLIK
- Pay-by-Link
- szybkie płatności bankowe

## 🔧 Architektura

- Service: `payments-service`
- Callback: `/payments/paynow/callback`
- Event: `PAYNOW_CONFIRMED`

### 🔌 Tworzenie płatności

```
POST /payments/paynow/create
```

### 🔔 Paynow Callback

```
POST /payments/paynow/callback
```

Payload:

```json
{
  "paymentId": "...",
  "status": "CONFIRMED"
}
```

---

# 🤖 n8n Integration Hub

n8n jest centralnym **orchestrator workflowów**, który obsługuje:

- logistyka
- marketing automation
- synchronizacja marketplace
- social media posting
- automaty generowania feedów
- AI-content pipelines
- rewalidacja cache (Next.js ISR)
- synchronizacje CDP / CRM

## 🔧 Najważniejsze workflowy

### 🔸 1. Marketplace Sync

- PIM → n8n
- n8n → Allegro / Erli / Amazon
- Backflow → ProductService (status publikacji)

### 🔸 2. Social Media Posting

- AI Content Engine → n8n → Facebook / Instagram
- Zaplanowane posty
- Uploader zdjęć i reelsów
- Auto-formatowanie captionów

### 🔸 3. Order Pipeline

- OrderService → n8n → InPost / PayU / Paynow
- PDFy, etykiety, tracking

### 🔸 4. Health Cloud Sync

- AI Health Twin updates → n8n → CDP → CRM (HubSpot)

## 📡 n8n Webhook pattern

```
POST /n8n/webhook/{flowName}
```

Payload:

```json
{
  "event": "PRODUCT_UPDATED",
  "productId": "12345"
}
```

---

# 📱 Facebook Graph API

Integracja obsługująca:

- publikowanie postów
- publikowanie grafik
- odczyt komentarzy
- statystyki (insights)
- audyt treści AI
- connected page dla sklepu

## 🔗 API

[https://developers.facebook.com/docs/graph-api](https://developers.facebook.com/docs/graph-api)

## 🔌 Endpoints obsługiwane

### 1. Publikacja posta

```
POST https://graph.facebook.com/{pageId}/feed
```

### 2. Publikacja zdjęcia

```
POST https://graph.facebook.com/{pageId}/photos
```

### 3. Insights

```
GET https://graph.facebook.com/{pageId}/insights
```

## 🔧 Token refresh

Obsługiwane via n8n (cron co 50 dni).

---

# 📸 Instagram Graph API

Integracja obsługuje:

- publikowanie zdjęć
- publikowanie reels
- publikowanie karuzel
- pobieranie komentarzy
- statystyki postów
- łączenie z kontem firmowym IG

## 🔗 API:

[https://developers.facebook.com/docs/instagram-api](https://developers.facebook.com/docs/instagram-api)

## 🔌 Endpoints

### 1. Upload media

```
POST https://graph.facebook.com/{igUserId}/media
```

### 2. Publish media

```
POST https://graph.facebook.com/{igUserId}/media_publish
```

### 3. Insights

```
GET https://graph.facebook.com/{igUserId}/insights
```

---

# 📡 Webhooki globalne

System przyjmuje webhooki:

- `POST /webhooks/payu`
- `POST /webhooks/paynow`
- `POST /webhooks/inpost`
- `POST /webhooks/facebook`
- `POST /webhooks/instagram`
- `POST /webhooks/n8n`

Każdy webhook ma:

- walidację HMAC,
- kolejkę retry (Kafka),
- standardowy event envelope:

```json
{
  "source": "inpost",
  "event": "parcel_ready",
  "data": {...},
  "timestamp": 123123123
}
```

---

# 🧱 Struktura microservices

```
services/
  payments-service/
  shipping-service/
  social-service/
  pim-service/
  orders-service/
  notification-service/
  integration-n8n-adapter/
```

---

# 🧭 Eventy platformy (CDP)

Wszystkie integracje emitują:

- `ORDER_CREATED`
- `ORDER_PAID`
- `PARCEL_SHIPPED`
- `PARCEL_DELIVERED`
- `PAYMENT_CONFIRMED`
- `PRODUCT_UPDATED`
- `MARKETING_POST_PUBLISHED`

---

# 🛡️ Bezpieczeństwo

- OAuth dla Facebook & Instagram
- HMAC dla PayU / Paynow / InPost
- mTLS dla internal services
- Token rotation via n8n
- Rate limiting (Cloudflare + API Gateway)

---

# 📅 Plany rozbudowy

- Allegro Ads API
- TikTok Shop API
- Amazon SP-API
- WhatsApp Business API
- Apple Business Messages
- n8n → AI Auto-Agent Orchestration

---

# 🎉 Kontakt

Jeśli pracujesz nad integracjami:
**[kontakt@3filaryzdrowia.pl](mailto:kontakt@3filaryzdrowia.pl)**

```

---

Jeśli chcesz — mogę teraz stworzyć:

### 🔥 `INTEGRATIONS-DEV.md` – instrukcja wdrożenia lokalnie
### 🔥 `SOCIAL_MEDIA.md` – architektura publikacji postów
### 🔥 `PAYMENTS.md` – płatności, refundy, webhooki
### 🔥 `SHIPPING.md` – logistyka & workflow zamówień

Napisz tylko: **„zrób kolejny plik”** i który.
```
