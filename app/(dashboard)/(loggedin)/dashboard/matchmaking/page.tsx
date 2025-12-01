'use client';

import { useStudent, StudentPreferences } from '@/app/(dashboard)/(loggedin)/dashboard/schools/context/StudentContext';
import { schoolsWithAttributes, School, SchoolAttributes } from '@/app/(dashboard)/(loggedin)/dashboard/schools/data/schoolsWithAttributes';
import Link from 'next/link';

// Constants for matchmaking configuration
const DEFAULT_MATCH_SCORE = 50; // Score when no preferences are set
const MAX_DISPLAYED_MATCHES = 4; // Number of top schools to display

// Map student preferences to school attributes for matching
function calculateMatchScore(student: StudentPreferences, school: School): number {
   const attrs = school.attributes;
   let score = 0;
   let totalWeight = 0;

   // Helper function to add score based on preference match
   const addScore = (preference: boolean | null, attributeValue: number, weight: number = 1) => {
      if (preference === null) return; // Skip if no preference
      totalWeight += weight;
      if (preference) {
         score += attributeValue * weight;
      } else {
         score += (1 - attributeValue) * weight;
      }
   };

   // Sosialt - match preferences to school attributes
   addScore(student.wantBreaksOutside, attrs.useBreaksOutside, 1);
   addScore(student.wantSportsInBreaks, attrs.sportsInBreaks, 1);
   addScore(student.wantBoardGames, attrs.boardGamesInClass, 1);
   addScore(student.wantClassTimeOutside, attrs.classActivitiesOutside, 1);
   addScore(student.wantPartyEnvironment, attrs.peopleParty, 1.5);
   addScore(student.wantToParty, attrs.partyOpportunity, 1.5);
   addScore(student.wantCantinaSocial, attrs.cantinaSocializing, 1);
   addScore(student.wantTeacherActivities, attrs.teachersEncourageSocial, 1);

   // Læringsmiljø - match preferences to school attributes
   addScore(student.wantEveryoneToWantSuccess, attrs.goodLearningEnvironment, 1.5);
   addScore(student.wantPeopleRaiseHands, attrs.peopleRaiseHands, 1);
   addScore(student.wantStudentsWork, attrs.studentsWork, 1);
   addScore(student.wantEveryoneWantGoodGrades, attrs.everyoneWantsGoodGrades, 1);
   addScore(student.wantGradePressure, attrs.gradePressure, 1);
   addScore(student.wantGoodTeachers, attrs.teachersGood, 2);
   addScore(student.wantTalkToTeacherAboutGrades, attrs.canTalkToTeacherAboutGrades, 1);
   addScore(student.wantTalkToAdultsAtSchool, attrs.canTalkToAdultsAtSchool, 1.5);
   addScore(student.wantShamefulBadGrades, attrs.shamefulBadGrades, 0.5);
   addScore(student.wantStrictGymTeachers, attrs.gymTeachersStrict, 0.5);
   addScore(student.wantGymTeacherFocusPerformance, attrs.gymTeacherFocusPerformance, 0.5);

   // Fysisk - match preferences to school attributes
   addScore(student.wantCantine, attrs.hasCantine, 1);
   addScore(student.wantSportsCourt, attrs.hasSportsCourt, 1);
   addScore(student.wantSeatingArea, attrs.hasSeatingArea, 1);
   addScore(student.wantShopInBreaks, attrs.shopNearby, 1);
   addScore(student.preferCenter, attrs.schoolInCityCenter, 1);

   // Calculate percentage match
   if (totalWeight === 0) return DEFAULT_MATCH_SCORE;
   return (score / totalWeight) * 100;
}

// Get top attribute matches for display
function getTopMatches(student: StudentPreferences, attrs: SchoolAttributes): string[] {
   const matches: string[] = [];

   if (student.wantBreaksOutside && attrs.useBreaksOutside >= 0.7) {
      matches.push('Friminutt ute');
   }
   if (student.wantSportsInBreaks && attrs.sportsInBreaks >= 0.7) {
      matches.push('Sport i friminutt');
   }
   if (student.wantCantinaSocial && attrs.cantinaSocializing >= 0.7) {
      matches.push('Sosialt i kantina');
   }
   if (student.wantGoodTeachers && attrs.teachersGood >= 0.8) {
      matches.push('Flinke lærere');
   }
   if (student.wantEveryoneToWantSuccess && attrs.goodLearningEnvironment >= 0.8) {
      matches.push('Godt læringsmiljø');
   }
   if (student.preferCenter && attrs.schoolInCityCenter >= 0.6) {
      matches.push('Sentrumsnær');
   }
   if (student.wantShopInBreaks && attrs.shopNearby >= 0.7) {
      matches.push('Butikk i nærheten');
   }
   if (student.wantPartyEnvironment && attrs.peopleParty >= 0.5) {
      matches.push('Sosialt festmiljø');
   }
   if (student.wantCantine && attrs.hasCantine >= 0.9) {
      matches.push('God kantine');
   }
   if (student.wantSportsCourt && attrs.hasSportsCourt >= 0.8) {
      matches.push('Bane for ballspill');
   }

   return matches.slice(0, 4); // Return max 4 matches
}

interface SchoolWithScore extends School {
   matchScore: number;
   topMatches: string[];
}

export default function MatchmakingPage() {
   const { student, hasCompletedSurvey } = useStudent();

   // Calculate scores for all schools
   const schoolsWithScores: SchoolWithScore[] = schoolsWithAttributes.map(school => ({
      ...school,
      matchScore: calculateMatchScore(student, school),
      topMatches: getTopMatches(student, school.attributes)
   }));

   // Sort by match score and take top schools
   const topSchools = [...schoolsWithScores]
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, MAX_DISPLAYED_MATCHES);

   return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
         <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
               🎯 Skole-Match
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
               Basert på dine svar i undersøkelsen, har vi funnet skoler som passer best for deg!
            </p>

            {!hasCompletedSurvey && (
               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
                  <div className="flex">
                     <div className="flex-shrink-0">
                        <span className="text-yellow-400 text-2xl">⚠️</span>
                     </div>
                     <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                           Du har ikke fullført undersøkelsen ennå.
                           <Link href="/survey" className="font-medium underline hover:text-yellow-800 ml-1">
                              Gå til undersøkelsen
                           </Link> for å få bedre anbefalinger!
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {/* Top Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               {topSchools.map((school, index) => (
                  <div
                     key={school.name}
                     className={`bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] ${index === 0 ? 'ring-4 ring-green-400 ring-opacity-50' : ''
                        }`}
                  >
                     {/* Header with ranking */}
                     <div className={`px-6 py-4 ${index === 0
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : index === 1
                           ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                           : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                        <div className="flex justify-between items-center">
                           <span className="text-white text-lg font-bold">
                              #{index + 1} {index === 0 && '🏆'}
                           </span>
                           <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                              {Math.round(school.matchScore)}% match
                           </span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                           {school.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                           📍 {school.address}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                           🏛️ {school.district} • 👥 {school.students} elever
                        </p>

                        {school.continuesTo && (
                           <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 italic">
                              ➡️ Fortsetter til: {school.continuesTo}
                           </p>
                        )}

                        {/* Match highlights */}
                        {school.topMatches.length > 0 && (
                           <div className="mt-4">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                 ✨ Passer deg fordi:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                 {school.topMatches.map((match, i) => (
                                    <span
                                       key={i}
                                       className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-3 py-1 rounded-full"
                                    >
                                       {match}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Quick stats */}
                        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                           <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-2">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Sosialt</p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                 {Math.round(school.attributes.cantinaSocializing * 100)}%
                              </p>
                           </div>
                           <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-2">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Læring</p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                 {Math.round(school.attributes.goodLearningEnvironment * 100)}%
                              </p>
                           </div>
                           <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-2">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Lærere</p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                 {Math.round(school.attributes.teachersGood * 100)}%
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
               <Link
                  href="/dashboard/survey"
                  className="bg-[#2A2958] hover:bg-[#3a3978] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
               >
                  📝 Oppdater svarene mine
               </Link>
               <Link
                  href="/dashboard/profil"
                  className="bg-[#B2F7FF] hover:bg-[#9eeaee] text-[#2A2958] font-semibold py-3 px-6 rounded-lg transition-colors text-center"
               >
                  👤 Se min profil
               </Link>
               <Link
                  href="/dashboard/schools"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
               >
                  🗺️ Se alle skoler på kart
               </Link>
            </div>
         </div>
      </main>
   );
}
