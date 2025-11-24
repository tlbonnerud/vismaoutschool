'use client'

import { useEffect } from 'react';
import checkAuth from '@/lib/checkAuth';
import HomePage from '@/app/components/front-page';

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

         <HomePage />

      </div >
   );
}
