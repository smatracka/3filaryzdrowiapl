'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';

const quizSteps = [
    {
        id: 1,
        title: 'Podstawowe informacje',
        questions: [
            {
                id: 'age',
                question: 'Ile masz lat?',
                type: 'select',
                options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
            },
            {
                id: 'gender',
                question: 'Płeć',
                type: 'select',
                options: ['Kobieta', 'Mężczyzna', 'Inna', 'Wolę nie podawać'],
            },
            {
                id: 'activity',
                question: 'Poziom aktywności fizycznej',
                type: 'select',
                options: ['Siedzący tryb życia', 'Lekka aktywność (1-2x/tydzień)', 'Umiarkowana (3-4x/tydzień)', 'Wysoka (5-7x/tydzień)', 'Bardzo wysoka (sportowiec)'],
            },
        ],
    },
    {
        id: 2,
        title: 'Dieta i nawyki',
        questions: [
            {
                id: 'diet',
                question: 'Jaki typ diety stosujesz?',
                type: 'select',
                options: ['Standardowa', 'Wegetariańska', 'Wegańska', 'Keto', 'Paleo', 'Śródziemnomorska', 'Inna'],
            },
            {
                id: 'water',
                question: 'Ile wody pijesz dziennie?',
                type: 'select',
                options: ['Mniej niż 1L', '1-1.5L', '1.5-2L', '2-3L', 'Powyżej 3L'],
            },
            {
                id: 'sleep',
                question: 'Ile godzin śpisz średnio na dobę?',
                type: 'select',
                options: ['Mniej niż 5h', '5-6h', '6-7h', '7-8h', 'Powyżej 8h'],
            },
        ],
    },
    {
        id: 3,
        title: 'Cele zdrowotne',
        questions: [
            {
                id: 'goals',
                question: 'Jakie są Twoje główne cele zdrowotne? (możesz wybrać kilka)',
                type: 'multiselect',
                options: [
                    'Wzmocnienie odporności',
                    'Poprawa jakości snu',
                    'Redukcja stresu',
                    'Zwiększenie energii',
                    'Wsparcie metabolizmu',
                    'Zdrowie serca',
                    'Zdrowie kości i stawów',
                    'Poprawa koncentracji',
                ],
            },
        ],
    },
    {
        id: 4,
        title: 'Objawy i dolegliwości',
        questions: [
            {
                id: 'symptoms',
                question: 'Czy doświadczasz któregoś z poniższych objawów? (możesz wybrać kilka)',
                type: 'multiselect',
                options: [
                    'Chroniczne zmęczenie',
                    'Problemy ze snem',
                    'Bóle głowy',
                    'Problemy trawienne',
                    'Bóle stawów',
                    'Częste infekcje',
                    'Problemy skórne',
                    'Spadki nastroju',
                    'Brak apetytu',
                    'Nie doświadczam żadnych',
                ],
            },
        ],
    },
    {
        id: 5,
        title: 'Suplementacja',
        questions: [
            {
                id: 'current_supplements',
                question: 'Czy obecnie przyjmujesz jakieś suplementy?',
                type: 'select',
                options: ['Tak', 'Nie'],
            },
            {
                id: 'supplement_experience',
                question: 'Czy masz doświadczenie z suplementacją?',
                type: 'select',
                options: ['Tak, regularnie', 'Tak, od czasu do czasu', 'Nie, dopiero zaczynam', 'Nie, nigdy nie próbowałem'],
            },
        ],
    },
];

export default function HealthQuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [selectedMulti, setSelectedMulti] = useState<string[]>([]);

    const currentStepData = quizSteps[currentStep];
    const progress = ((currentStep + 1) / quizSteps.length) * 100;

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleMultiSelect = (option: string) => {
        if (selectedMulti.includes(option)) {
            setSelectedMulti(selectedMulti.filter((item) => item !== option));
        } else {
            setSelectedMulti([...selectedMulti, option]);
        }
    };

    const handleNext = () => {
        // Save multi-select answers
        const multiQuestion = currentStepData.questions.find((q) => q.type === 'multiselect');
        if (multiQuestion) {
            setAnswers({ ...answers, [multiQuestion.id]: selectedMulti });
            setSelectedMulti([]);
        }

        if (currentStep < quizSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Quiz completed - redirect to results
            window.location.href = '/konto/harmonia';
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        const currentQuestions = currentStepData.questions;
        const multiQuestion = currentQuestions.find((q) => q.type === 'multiselect');

        if (multiQuestion) {
            return selectedMulti.length > 0;
        }

        return currentQuestions.every((q) => answers[q.id]);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Krok {currentStep + 1} z {quizSteps.length}
                            </span>
                            <span className="text-sm font-medium text-primary-600">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Quiz Card */}
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold mb-6">{currentStepData.title}</h2>

                            <div className="space-y-6">
                                {currentStepData.questions.map((question) => (
                                    <div key={question.id}>
                                        <label className="block text-lg font-medium mb-3">
                                            {question.question}
                                        </label>

                                        {question.type === 'select' && (
                                            <select
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                value={answers[question.id] || ''}
                                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                                            >
                                                <option value="">Wybierz opcję...</option>
                                                {question.options.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {question.type === 'multiselect' && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {question.options.map((option) => (
                                                    <label
                                                        key={option}
                                                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${selectedMulti.includes(option)
                                                                ? 'border-primary-600 bg-primary-50'
                                                                : 'border-gray-300 hover:border-primary-300'
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="mr-3"
                                                            checked={selectedMulti.includes(option)}
                                                            onChange={() => handleMultiSelect(option)}
                                                        />
                                                        <span className="text-sm">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between mt-8 pt-6 border-t">
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    Wstecz
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                >
                                    {currentStep === quizSteps.length - 1 ? 'Zakończ quiz' : 'Dalej'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help Text */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Twoje odpowiedzi są bezpieczne i będą użyte tylko do personalizacji rekomendacji</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
