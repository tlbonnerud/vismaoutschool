'use client'

import { useStudent, StudentPreferences } from '@/app/(dashboard)/(loggedin)/dashboard/schools/context/StudentContext';
import Link from 'next/link';

// Helper to display attribute names in Norwegian
const attributeLabels: Record<string, string> = {
   wantBreaksOutside: 'Bruke friminutter ute',
   wantSportsInBreaks: 'Spille sport i friminutt',
   wantBoardGames: 'Brettspill i klasserom',
   wantClassTimeOutside: 'Tid med klassen utenfor skolen',
   wantPartyEnvironment: 'Festmiljø på skolen',
   wantToParty: 'Være på fester',
   wantCantinaSocial: 'Sosialisere i kantina',
   wantTeacherActivities: 'Lærere som aktiverer klassen',
   wantShopInBreaks: 'Gå på butikken i friminutt',
   preferCenter: 'Skole i sentrum',
   wantEveryoneToWantSuccess: 'Alle ønsker å være flinke',
   wantPeopleRaiseHands: 'Folk rekker opp hånda',
   wantStudentsWork: 'Elever jobber når lærere ber om det',
   wantEveryoneWantGoodGrades: 'Alle ønsker gode karakterer',
   wantGradePressure: 'Karakterpress',
   wantGoodTeachers: 'Flinke lærere',
   wantTalkToTeacherAboutGrades: 'Snakke med lærer om karakterer',
   wantTalkToAdultsAtSchool: 'Snakke med voksne på skolen',
   wantShamefulBadGrades: 'Press om gode karakterer',
   wantStrictGymTeachers: 'Strenge gymlærere',
   wantGymTeacherFocusPerformance: 'Gymlærer fokuserer på prestasjon',
   wantCantine: 'Kantine på skolen',
   wantSportsCourt: 'Ballbane på skolen',
   wantSeatingArea: 'Sitteplasser i skolegård',
};

// Type-safe helper to get preference value
function getPreferenceValue(student: StudentPreferences, key: keyof StudentPreferences): boolean | string | null {
   return student[key];
}

export default function ProfilePage() {
   const { student, hasCompletedSurvey } = useStudent();

   // Group preferences
   const socialPrefs: (keyof StudentPreferences)[] = [
      'wantBreaksOutside',
      'wantSportsInBreaks',
      'wantBoardGames',
      'wantClassTimeOutside',
      'wantPartyEnvironment',
      'wantToParty',
      'wantCantinaSocial',
      'wantTeacherActivities',
      'wantShopInBreaks',
      'preferCenter',
   ];

   const learningPrefs: (keyof StudentPreferences)[] = [
      'wantEveryoneToWantSuccess',
      'wantPeopleRaiseHands',
      'wantStudentsWork',
      'wantEveryoneWantGoodGrades',
      'wantGradePressure',
      'wantGoodTeachers',
      'wantTalkToTeacherAboutGrades',
      'wantTalkToAdultsAtSchool',
      'wantShamefulBadGrades',
      'wantStrictGymTeachers',
      'wantGymTeacherFocusPerformance',
   ];

   const physicalPrefs: (keyof StudentPreferences)[] = [
      'wantCantine',
      'wantSportsCourt',
      'wantSeatingArea',
   ];

   const renderPreferences = (keys: (keyof StudentPreferences)[], title: string, emoji: string) => {
      const filteredKeys = keys.filter(key => getPreferenceValue(student, key) !== null);

      if (filteredKeys.length === 0) return null;

      return (
         <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
               {emoji} {title}
            </h3>
            <div className="flex flex-wrap gap-2">
               {filteredKeys.map(key => {
                  const value = getPreferenceValue(student, key);
                  const isPositive = value === true;
                  return (
                     <span
                        key={key}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${isPositive
                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                           : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                           }`}
                     >
                        {isPositive ? '✓' : '✗'} {attributeLabels[key] || key}
                     </span>
                  );
               })}
            </div>
         </div>
      );
   };

   // Count yes/no preferences
   const allPrefs = [...socialPrefs, ...learningPrefs, ...physicalPrefs];
   const yesCount = allPrefs.filter(key => getPreferenceValue(student, key) === true).length;
   const noCount = allPrefs.filter(key => getPreferenceValue(student, key) === false).length;
   const totalAnswered = yesCount + noCount;

   return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
               👤 Min Profil
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
               Her ser du informasjonen din og hva du ønsker i en skole
            </p>

            {/* Profile Card */}
            <div className="bg-gradient-to-r from-[#2A2958] to-[#3a3978] rounded-xl shadow-lg p-8 mb-8 text-white">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-[#B2F7FF] rounded-full flex items-center justify-center text-4xl">
                     👩‍🎓
                  </div>
                  <div className="flex-1">
                     <h2 className="text-2xl font-bold">{student.name || 'Elev'}</h2>
                     <p className="text-[#B2F7FF] opacity-80">
                        {student.currentSchool ? `📚 ${student.currentSchool}` : 'Ingen skole valgt ennå'}
                     </p>
                  </div>
                  <div className="text-right">
                     <p className="text-sm text-[#B2F7FF] opacity-80">Undersøkelse status</p>
                     <p className="text-lg font-semibold">
                        {hasCompletedSurvey ? '✅ Fullført' : '⏳ Ikke fullført'}
                     </p>
                  </div>
               </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 text-center">
                  <p className="text-3xl font-bold text-green-600">{yesCount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ønsker</p>
               </div>
               <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 text-center">
                  <p className="text-3xl font-bold text-red-600">{noCount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ønsker ikke</p>
               </div>
               <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 text-center">
                  <p className="text-3xl font-bold text-blue-600">{totalAnswered}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Besvarte</p>
               </div>
            </div>

            {/* Preferences */}
            {hasCompletedSurvey ? (
               <>
                  {renderPreferences(socialPrefs, 'Sosiale preferanser', '🎉')}
                  {renderPreferences(learningPrefs, 'Læringsmiljø preferanser', '📚')}
                  {renderPreferences(physicalPrefs, 'Fasiliteter', '🏫')}
               </>
            ) : (
               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
                  <div className="flex items-center">
                     <span className="text-yellow-400 text-3xl mr-4">📝</span>
                     <div>
                        <p className="font-semibold text-yellow-800">Du har ikke fullført undersøkelsen</p>
                        <p className="text-yellow-700 text-sm mt-1">
                           Fullfør undersøkelsen for å se dine preferanser og få bedre skoleanbefalinger!
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
               <Link
                  href="/dashboard/survey"
                  className="bg-[#2A2958] hover:bg-[#3a3978] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
               >
                  📝 {hasCompletedSurvey ? 'Oppdater svarene' : 'Ta undersøkelsen'}
               </Link>
               <Link
                  href="/dashboard/matchmaking"
                  className="bg-[#B2F7FF] hover:bg-[#9eeaee] text-[#2A2958] font-semibold py-3 px-6 rounded-lg transition-colors text-center"
               >
                  🎯 Se skoleanbefalinger
               </Link>
               <button
                  onClick={() => {
                     if (confirm('Er du sikker på at du vil nullstille profilen din?')) {
                        localStorage.removeItem('studentProfile');
                        window.location.reload();
                     }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
               >
                  🗑️ Nullstill profil
               </button>
            </div>
         </div>
      </main>
   );
}
