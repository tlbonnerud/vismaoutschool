'use client';

import React from 'react';
import { defaultUser, questionLabels } from '@/lib/mockData';
import Link from 'next/link';

export default function UserPage() {
  const user = defaultUser;

  const renderValue = (value: boolean | null): string => {
    if (value === true) return 'Ja';
    if (value === false) return 'Nei';
    return 'Ikke besvart';
  };

  const renderValueColor = (value: boolean | null): string => {
    if (value === true) return 'text-green-600 dark:text-green-400';
    if (value === false) return 'text-red-600 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  // Group questions by category
  const sosialQuestions = ['pauseUteW', 'sportIPauseW', 'brettspillIKlasseW', 'klasseAktiviteterUtenforW', 
    'festMiljoW', 'festDeltakelseW', 'kantinaSosialW', 'laererAktiviteterW', 'butikkIPauseW', 'sentrumW'];
  
  const laeringsmiljoQuestions = ['bralæringsmiljø', 'handOppW', 'elevJobberW', 'alleOnskerBraKarakterW',
    'karakterpressW', 'laererFlinkeW', 'snakkeOmKarakterW', 'snakkeVoksneW', 'skamDaarligKarakterW',
    'gymlaererStrengeW', 'gymlaererInnsatsW'];
  
  const fysiskQuestions = ['kantineW', 'sportbaneW', 'sitteplasserW', 'butikkNaerW', 'sentrumSkolenW'];

  const renderQuestionList = (questions: string[]) => {
    return questions.map((key) => {
      const value = user[key as keyof typeof user];
      const displayValue = typeof value === 'object' && value !== null && 'value' in value 
        ? (value as { value: boolean | null }).value 
        : null;
      
      return (
        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300">{questionLabels[key] || key}</span>
          <span className={`font-semibold ${renderValueColor(displayValue)}`}>
            {renderValue(displayValue)}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <main className="max-w-4xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8 flex gap-4">
          <Link href="/" className="text-blue-500 hover:text-blue-700 hover:underline">
            ← Hjem
          </Link>
          <Link href="/recommendations" className="text-blue-500 hover:text-blue-700 hover:underline">
            Se anbefalte skoler →
          </Link>
        </nav>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Min Profil
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Navn</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Nåværende skole</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{user.school}</p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Liker du skolen din?</p>
            <p className={`text-xl font-semibold ${renderValueColor(user.likeSchool)}`}>
              {renderValue(user.likeSchool)}
            </p>
          </div>
        </div>

        {/* Survey Responses */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Mine svar fra spørreundersøkelsen
          </h2>

          {/* Sosialt */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2">
              Sosialt
            </h3>
            <div className="space-y-1">
              {renderQuestionList(sosialQuestions)}
            </div>
          </div>

          {/* Læringsmiljø */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-green-500 pb-2">
              Læringsmiljø
            </h3>
            <div className="space-y-1">
              {renderQuestionList(laeringsmiljoQuestions)}
            </div>
          </div>

          {/* Fysiske forhold */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-purple-500 pb-2">
              Fysiske forhold
            </h3>
            <div className="space-y-1">
              {renderQuestionList(fysiskQuestions)}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/recommendations"
            className="inline-block bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
          >
            Se anbefalte skoler for deg
          </Link>
        </div>
      </main>
    </div>
  );
}
