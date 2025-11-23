# 🌿 Harmonia 360° — AI Health Twin & Wellness Cloud

### **Next-generation health intelligence platform powering 3FilaryZdrowia & SuperApp Harmonia**

---

<p align="center">
  <img src="https://img.shields.io/badge/AI%20Health%20Twin-Live-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/NestJS-Microservices-ea2845?style=for-the-badge&logo=nestjs" />
  <img src="https://img.shields.io/badge/FastAPI-ML-orange?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/TimescaleDB-TimeSeries-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/LangChain-LangGraph-yellow?style=for-the-badge" />
</p>

---

## ✨ O projekcie

**Harmonia 360°** to kompletny ekosystem zdrowia i AI, który łączy:

* 🧠 **AI Health Twin** — twój cyfrowy model zdrowia
* 🔬 **interpretację biomarkerów** (laboratoryjnych & wearable)
* ⌚ **integracje z Apple Health / Garmin / Fitbit / Oura**
* 🔍 **AI-driven diagnostykę trendów i anomalii**
* 🧬 **profil medyczny, suplementację, historię chorób**
* 🌙 **sen, stres, regenerację, samopoczucie**
* 🛍️ **powiązanie zdrowia z zakupami (3FilaryZdrowia)**
* 🔥 **Silnik rekomendacji suplementów**
* ⚙️ **microservices, AI pipelines & predictive analytics**

To fundament przyszłego **Super App Harmonia 360°**.

---

## 🚀 Najważniejsze funkcje

### 🔥 AI Health Twin

Tworzenie dynamicznego modelu zdrowia użytkownika:

* biological age
* inflammation score
* cardiovascular risk
* hormonal balance
* metabolic health
* sleep & recovery twin
* stress variability twin

---

### 🔬 Biomarkers Engine

W pełni zgodny z:

* **parametry_badan_medycznych.md**
* **biomarker_meta.yaml**
* normy męskie/żeńskie, optimum, caution, clinical ranges

Obsługuje:

* morfologię
* lipidogram
* hormony
* markery zapalne
* glukoza/insulina
* kortyzol
* witaminy (D3, B12 itd.)
* metale ciężkie
* mikrobiom

---

### ⌚ Wearables Integrations

Oficjalnie wspierane:

* **Apple HealthKit**
* **Garmin Connect**
* **Fitbit API**
* **Oura Cloud**
* **Samsung Health**
* **Withings**

Dane trafiają do **TimescaleDB** w strukturze time series.

---

### 🧠 AI Reasoning Models

System wykorzystuje:

* **BioGPT** – interpretacje kliniczne
* **ClinicalBERT / PubMedBERT**
* **MedAlpaca / Meditron**
* **TimeGPT (Nixtla)** – forecasting
* **Merlion** – anomaly detection
* **LangGraph multi-agent**
* **LLM Safety Layer** – medyczna filtracja i bezpieczeństwo

---

### 🌐 API: Health Cloud

Pełna dokumentacja API:
**OpenAPI 3.1 – Health Profile API** → generowane automatycznie.

---

## 🧱 Architektura

```
harmonia/
├── apps/
│   ├── web/            # Next.js 15 frontend + RSC
│   ├── mobile/         # React Native (SuperApp Harmonia)
│   ├── lab/            # Streamlit labolatorium AI
│   └── admin/          # Panel administracyjny
│
├── services/
│   ├── api-gateway/    # GraphQL BFF / Router
│   ├── profile/        # Health Profile + Medical + Biomarkers
│   ├── health-twin/    # AI Twin Engine (Python)
│   ├── recommender/    # Recommendation System (LTR / LightGBM)
│   ├── wearables/      # Integracje: Apple, Garmin, Oura...
│   ├── biomarker/      # Unit conversions, norms, meta loader
│   ├── llm-assistant/  # LangChain + LangGraph Orchestrator
│   └── cdp/            # Customer Data Platform
│
├── infra/
│   ├── k8s/            # Deployment / Helm
│   ├── terraform/      # IaC
│   └── monitoring/     # Grafana, Prometheus, Loki
│
└── data/
    ├── biomarker_meta.yaml
    ├── parametry_badan_medycznych.md
    ├── models/
    └── dags/
```

---

## 🧬 Model użytkownika (skrót)

* **User Core**
* **User Profile**
* **Medical Profile**
* **Biomarkers (meta + values)**
* **Wearables Metrics**
* **Lifestyle**
* **Psychometric surveys**
* **Health Twin**
* **Recommendations**
* **Subscriptions**
* **CDP & Segmentation**

---

## ⚙️ Technologie

### Backend

* **NestJS microservices**
* **FastAPI AI services**
* **GraphQL Gateway**
* **Redis / Kafka / NATS**
* **PostgreSQL + TimescaleDB**
* **Meilisearch**
* **Redis Vectorstore**

### AI/ML

* **LangChain + LangGraph**
* **PyTorch / LightGBM / XGBoost**
* **TimeGPT**
* **FAISS / Pinecone**

### Frontend

* **Next.js 15 (RSC)**
* **React Native**

### Infra

* **Kubernetes + Istio**
* **ArgoCD + GitHub Actions**
* **Prometheus + Grafana + Loki**
* **MinIO**

---

## 📡 API Endpoints

Najważniejsze endpoints (pełne w `/openapi/health-profile.yaml`):

* `GET /users/{id}/profile`
* `PUT /users/{id}/medical-profile`
* `GET /users/{id}/biomarkers`
* `POST /users/{id}/biomarkers`
* `GET /users/{id}/biomarkers/interpretation`
* `GET /users/{id}/devices`
* `POST /users/{id}/devices/sync`
* `GET /users/{id}/health-twin`
* `POST /users/{id}/health-twin`
* `GET /users/{id}/recommendations`

---

## 🧪 Development

### Start lokalny

```bash
make up
make open
```

### Testy

```bash
make test
```

### Formatowanie

```bash
make fmt
```

### Deploy do K8s

```bash
make helm-deploy
```

---

## 🔒 Security

* Keycloak SSO
* JWT + RPT
* mTLS (Istio)
* GDPR compliant
* Data encryption at rest & in transit
* Zero-trust microservices

---

## 📈 Roadmap

### Phase 1 — Health Cloud MVP (DONE)

✔ Health Profile
✔ Biomarkers Engine
✔ Wearables Sync
✔ Health Twin v1
✔ Supplements Recommender v1

### Phase 2 — Predictive Intelligence (Active)

⬜ Time-series forecasting (TimeGPT)
⬜ Multi-agent LangGraph
⬜ Full anomaly detection pipeline
⬜ Mental state model

### Phase 3 — SuperApp Harmonia (Q3–Q4)

⬜ Genetic module
⬜ Biofeedback streaming
⬜ Smart environment twin
⬜ Global wellness community features

---

## 🤝 Contributing

Pull Requests mile widziane!
Zasady: czysty kod, testy, czytelne commit messages.

---

## 📄 Licencja

Copyright © 2025
**Harmonia 360° / 3 Filary Zdrowia**

---

## 💌 Kontakt

* **Founder & CTO:** Zbyszek Matracki & Sara Matracka
* **E-mail:** [kontakt@3filaryzdrowia.pl](mailto:kontakt@3filaryzdrowia.pl)
* **Strona:** [https://3filaryzdrowia.pl](https://3filaryzdrowia.pl)

---

Jeśli chcesz, mogę od razu:

🔥 wygenerować **README.dev.md (instrukcje dla programistów)**
🔥 dodać **diagramy ASCII / C4 / GraphViz**
🔥 dodać **logo i bannery** do README
🔥 stworzyć pełny **CONTRIBUTING.md**