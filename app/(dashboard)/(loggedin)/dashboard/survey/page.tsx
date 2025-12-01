'use client';

//display a simple page with text "Spørreundersøkelse Page"
import React from 'react';
import Undersøkelse from '@/app/components/Undersøkelse';
import { StudentProvider } from '@/app/(dashboard)/(loggedin)/dashboard/schools/context/StudentContext';

export default function SpørreundersøkelsePage() {
   return (
      <StudentProvider>
         <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
            <main className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
               <Undersøkelse />
            </main>
         </div>
      </StudentProvider>
   );
}
