'use client'

import { useEffect } from 'react';
import checkAuth from '@/lib/checkAuth';
import LoginPage from '@/app/components/LoginPage';

export default function Home() {

   useEffect(() => {
      const cookies = document.cookie.split('; ').reduce((acc, curr) => {
         const [key, ...v] = curr.split('=');
         acc[key] = v.join('=');
         return acc;
      }, {} as { [key: string]: string });

      if (checkAuth(cookies)) {
         window.location.href = '/admin';
      }

   }, []);

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">

         <main className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
               Welcome to Visma Outschool
            </h1>
         </main>

         <LoginPage />

      </div>
   );
}
