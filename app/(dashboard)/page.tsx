'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookies';

export default function Home() {
   const router = useRouter();

   useEffect(() => {
      const sessionCookie = getCookie('sb-session');

      if (!sessionCookie) {
         console.log('No sd-session cookie found, redirecting to notloggedin');
         router.push('/login');
      } else {
         console.log('sd-session cookie found, redirecting to loggedin');
         router.push('/');
      }
   }, [router]);

   return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
         <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
         </div>
      </main>
   );
}
