-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active');

-- CreateEnum
CREATE TYPE "AlcoholIntake" AS ENUM ('none', 'occasional', 'moderate', 'heavy');

-- CreateEnum
CREATE TYPE "CaffeineIntake" AS ENUM ('none', 'low', 'moderate', 'high');

-- CreateEnum
CREATE TYPE "SmokingStatus" AS ENUM ('never', 'former', 'current');

-- CreateEnum
CREATE TYPE "TrainingLoad" AS ENUM ('none', 'light', 'moderate', 'intense', 'athlete');

-- CreateEnum
CREATE TYPE "BiomarkerSource" AS ENUM ('lab_pdf', 'manual', 'device', 'wearable', 'oligoscan');

-- CreateEnum
CREATE TYPE "SurveyType" AS ENUM ('BDI', 'GAD7', 'PSQI', 'PSS10', 'MAAS', 'MBI', 'PHQ9');

-- CreateEnum
CREATE TYPE "RecommendationType" AS ENUM ('supplement', 'lifestyle', 'practice', 'environment', 'food');

-- CreateEnum
CREATE TYPE "WearableProvider" AS ENUM ('apple_health', 'garmin', 'fitbit', 'oura', 'samsung_health', 'withings');

-- CreateEnum
CREATE TYPE "WearableMetricType" AS ENUM ('steps', 'heart_rate', 'sleep_stage', 'hrv', 'spo2', 'stress', 'body_temp', 'calories', 'distance');

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthDate" TIMESTAMP(3),
    "gender" "Gender",
    "heightCm" DOUBLE PRECISION,
    "weightKg" DOUBLE PRECISION,
    "activityLevel" "ActivityLevel",
    "dietaryPreferences" TEXT[],
    "allergies" TEXT[],
    "intolerances" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bloodType" TEXT,
    "chronicConditions" JSONB[],
    "surgeries" JSONB[],
    "medications" JSONB[],
    "supplements" JSONB[],
    "familyHistory" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lifestyle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sleepHours" DOUBLE PRECISION,
    "sleepQuality" INTEGER,
    "stressLevel" INTEGER,
    "alcoholIntake" "AlcoholIntake",
    "caffeineIntake" "CaffeineIntake",
    "smokingStatus" "SmokingStatus",
    "trainingLoad" "TrainingLoad",
    "hydrationLevel" INTEGER,
    "mindfulnessMinutes" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lifestyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biomarker_meta" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "normalMale" JSONB,
    "normalFemale" JSONB,
    "fasting" BOOLEAN NOT NULL DEFAULT false,
    "testType" TEXT,
    "description" TEXT,
    "significance" TEXT,

    CONSTRAINT "biomarker_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biomarker_values" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "biomarkerId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "source" "BiomarkerSource" NOT NULL,
    "measuredAt" TIMESTAMP(3) NOT NULL,
    "sexAtTest" "Gender",
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "biomarker_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_assessments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "score" INTEGER,
    "healthGoals" TEXT[],
    "concerns" TEXT[],
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "surveyType" "SurveyType" NOT NULL,
    "score" INTEGER NOT NULL,
    "answers" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "RecommendationType" NOT NULL,
    "title" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "productIds" TEXT[],
    "actionItems" JSONB[],
    "basedOn" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendation_feedback" (
    "id" TEXT NOT NULL,
    "recommendationId" TEXT NOT NULL,
    "helpful" BOOLEAN NOT NULL,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendation_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_connections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "WearableProvider" NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "scopes" TEXT[],
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wearable_metrics" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "type" "WearableMetricType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "rawPayload" JSONB,

    CONSTRAINT "wearable_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "medical_profiles_userId_key" ON "medical_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "lifestyle_userId_key" ON "lifestyle"("userId");

-- CreateIndex
CREATE INDEX "biomarker_values_userId_biomarkerId_idx" ON "biomarker_values"("userId", "biomarkerId");

-- CreateIndex
CREATE INDEX "biomarker_values_measuredAt_idx" ON "biomarker_values"("measuredAt");

-- CreateIndex
CREATE INDEX "health_assessments_userId_idx" ON "health_assessments"("userId");

-- CreateIndex
CREATE INDEX "surveys_userId_surveyType_idx" ON "surveys"("userId", "surveyType");

-- CreateIndex
CREATE INDEX "recommendations_userId_idx" ON "recommendations"("userId");

-- CreateIndex
CREATE INDEX "recommendations_expiresAt_idx" ON "recommendations"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "recommendation_feedback_recommendationId_key" ON "recommendation_feedback"("recommendationId");

-- CreateIndex
CREATE INDEX "device_connections_userId_idx" ON "device_connections"("userId");

-- CreateIndex
CREATE INDEX "wearable_metrics_deviceId_type_timestamp_idx" ON "wearable_metrics"("deviceId", "type", "timestamp");

-- AddForeignKey
ALTER TABLE "medical_profiles" ADD CONSTRAINT "medical_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lifestyle" ADD CONSTRAINT "lifestyle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biomarker_values" ADD CONSTRAINT "biomarker_values_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biomarker_values" ADD CONSTRAINT "biomarker_values_biomarkerId_fkey" FOREIGN KEY ("biomarkerId") REFERENCES "biomarker_meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_assessments" ADD CONSTRAINT "health_assessments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendation_feedback" ADD CONSTRAINT "recommendation_feedback_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "recommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_connections" ADD CONSTRAINT "device_connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wearable_metrics" ADD CONSTRAINT "wearable_metrics_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "device_connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
