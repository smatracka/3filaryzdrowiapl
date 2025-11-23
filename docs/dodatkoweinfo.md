🎯 FINAL USER MODEL (HARMONIA 360° / AI HEALTH TWIN)
🔵 1. USER CORE
User {
  id
  email
  phone
  passwordHash
  authProvider
  createdAt
  updatedAt
  status
}

🟣 2. PROFILE
UserProfile {
  userId
  firstName
  lastName
  birthDate
  gender  // male/female/intersex/other
  heightCm
  weightKg
  activityLevel
  dietaryPreferences[]
  allergies[]
  intolerances[]
}

🟠 3. MEDICAL PROFILE
MedicalProfile {
  userId
  chronicConditions[]
  surgeries[]
  medications[]
  familyHistory[]
  intolerances[]
  reproductiveHealth {}      // hormonalny kontekst
  mentalHealth {}            // stres, depresja, GAD7, PHQ9
}

🟡 4. BIOMARKER META (from biomarker_meta.yaml)

BiomarkerMeta {
  id
  name
  category
  unit
  normalMale {min,max}
  normalFemale {min,max}
  fasting
  description
  significance
}

🟢 5. BIOMARKER VALUES (from parametry_badan_medycznych.md)

BiomarkerValue {
  id
  userId
  biomarkerId
  value
  unit
  source        // lab_pdf/manual/wearable/device
  measuredAt
  sexAtTest
  context {}    // fasting, menstrual cycle phase, illness
}


Nowe biomarkery dodane na podstawie pliku:

27 markerów klinicznych

30 markerów hormonalnych

60+ markerów stresu/snu z wearables

20 markerów mikrobiomu

20 markerów toksyn/metali ciężkich

10 markerów epigenetycznych (telomery, mTOR)

🔴 6. WEARABLE DEVICES
DeviceConnection {
  userId
  provider  // apple/garmin/fitbit/oura/samsung/withings
  accessToken
  refreshToken
  scopes[]
  lastSyncedAt
}

WearableMetric {
  userId
  type // heart_rate, sleep_stage, hrv, spo2, steps, stress, body_temp
  timestamp
  value
  rawPayload
}


Dane te wchodzą później do:

Sleep Twin

Stress Twin

Recovery Twin
i generują:

readiness score

daily plan

supplementation adjustments

🔻 7. LIFESTYLE
Lifestyle {
  userId
  sleepHours
  sleepQuality
  stressLevel
  alcoholIntake
  caffeineIntake
  trainingLoad
  hydrationLevel
  mindfulnessMinutes
}

🔷 8. PSYCHOMETRIC SURVEYS

Wg pliku parametry… masz 20 testów klinicznych.

Survey {
  id
  userId
  surveyType // BDI, GAD7, PSQI, PSS10, MAAS, MBI, etc.
  score
  timestamp
}

🟤 9. HEALTH TWIN (Digital Twin Model)

Cloned from AI Engine, using biomarkers + wearables + psychometry

HealthTwin {
  userId
  generatedAt
  biologicalAge
  inflammationScore
  cardiovascularRiskScore
  metabolicScore
  hormonalBalanceScore
  stressScore
  sleepScore
  recoveryScore
  gutHealthScore
  detoxScore
  anomaliesDetected[]
  supplementsSuggested[]
}

⚫ 10. RECOMMENDATIONS (AI + rules)
Recommendation {
  id
  userId
  type  // supplement, food, practice, environment
  title
  rationale
  score
  confidence
  actionItems[]
  productId
  expiresAt
}

🟡 11. SUBSCRIPTIONS
UserSubscription {
  id
  userId
  planId
  status
  nextBillingDate
  aiOptimized
}

⭐ 4. LOGICZNE UZUPEŁNIENIA DO PROJEKTU

Na podstawie plików wykryłem 6 brakujących elementów, które powinny zostać dodane:

1. Clinical Risk Engine

Zautomatyzowane liczenie:

HOMA-IR

TG/HDL ratio

FRAX (osteoporoza)

SCORE2 (serce)

Metabolic risk score

Inflammaging score

Sleep Efficiency Score

HRV Stress Variability Score

2. AI Model Selector (Hub LLM)

Potrzebny moduł, który wybiera model dla zadania:

Modele do dodania:

BioGPT → interpretacja badań

ClinicalBERT → opis medyczny PDF

TimeGPT → forecasting biomarkerów

Merlion → anomalie w wearables

PubMedBERT → wiedza medyczna

MedAlpaca/Meditron → reasoning

LLM Safety layer → disclaimery

3. Unifikacja jednostek i SI converters

W pliku biomarkerów są różne jednostki – musimy zunifikować:

mg/dL → mmol/L

μg/L → ng/mL

pg/mL → ng/dL

4. Clinical Rules Engine

YAML rules, np.:

Ferrytyna < 30 + CRP > 3 = stan zapalny + niedobór żelaza

Wysoki kortyzol + niski progesteron = stres + dominacja estrogenowa

Niska serotonina + niskie B6 = suplementacja B-kompleks

Niska melatonina + zaburzony REM = plan snu

5. Normalization Pipeline

Każdy biomarker ma:

normy męskie

normy żeńskie

normy wiekowe

optimum (nie tylko normy)

clinical ranges

caution ranges

6. Wearable Data Intelligence Layer

Na podstawie Harmonia SuperApp:

Heart Twin

Sleep Twin

Stress Twin

Recovery Twin

Environment Twin

Muszą być generowane co 24h i on-demand.

🧩 5. OSTATECZNY WNIOSEK

Twój projekt staje się:

👉 Najbardziej kompletnym modelem zdrowotnym w Europie

Po integracji 4 dokumentów, otrzymujesz:

pełną mapę biomarkerów klinicznych

struktury meta i wartości

mini-app architecture

profile-svc i LLM engines

wearables + surveys + digital twin

clinical reasoning AI

To jest pełny fundament Health AI Cloud + eCommerce personalization.