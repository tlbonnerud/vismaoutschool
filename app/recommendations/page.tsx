'use client';

import React from 'react';
import { defaultUser, mockSchools } from '@/lib/mockData';
import { rankSchools, SchoolScore } from '@/lib/matchmaking';
import Link from 'next/link';

export default function RecommendationsPage() {
  const user = defaultUser;
  const rankedSchools = rankSchools(user, mockSchools);

  const getMatchColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMatchLabel = (percentage: number): string => {
    if (percentage >= 80) return 'Utmerket match!';
    if (percentage >= 60) return 'God match';
    if (percentage >= 40) return 'Middels match';
    return 'Lav match';
  };

  const getMatchEmoji = (percentage: number): string => {
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '🤔';
    return '⚠️';
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <main className="max-w-4xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8 flex gap-4">
          <Link href="/" className="text-blue-500 hover:text-blue-700 hover:underline">
            ← Hjem
          </Link>
          <Link href="/user" className="text-blue-500 hover:text-blue-700 hover:underline">
            Min profil
          </Link>
        </nav>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Anbefalte skoler for deg
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Basert på svarene dine fra spørreundersøkelsen har vi rangert disse skolene etter hvor godt de passer for deg.
          </p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Hei, {user.name}!</strong> Vi har analysert dine preferanser og sammenlignet dem med {mockSchools.length} skoler.
            </p>
          </div>
        </div>

        {/* School Rankings */}
        <div className="space-y-6">
          {rankedSchools.map((schoolScore: SchoolScore, index: number) => (
            <div 
              key={schoolScore.school.name} 
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 ${
                index === 0 ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {/* Rank badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {schoolScore.school.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getMatchEmoji(schoolScore.percentage)} {getMatchLabel(schoolScore.percentage)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {schoolScore.percentage}%
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    match score
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                <div 
                  className={`${getMatchColor(schoolScore.percentage)} h-4 rounded-full transition-all duration-500`}
                  style={{ width: `${schoolScore.percentage}%` }}
                ></div>
              </div>

              {/* Score details */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Råscore: {schoolScore.score} av {schoolScore.maxScore} mulige poeng</p>
              </div>

              {/* Top recommendation badge */}
              {index === 0 && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 font-semibold">
                    ⭐ Vår beste anbefaling for deg!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Hvordan fungerer matchmaking?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Vi sammenligner dine preferanser fra spørreundersøkelsen med data fra hver skole. 
            Jo høyere match-prosent, jo bedre passer skolens miljø og fasiliteter med det du ønsker.
            Husk at dette er en veiledning - besøk gjerne skolene selv for å få et personlig inntrykk!
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/survey"
            className="inline-block bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
          >
            Oppdater svarene dine
          </Link>
        </div>
      </main>
    </div>
  );
}
