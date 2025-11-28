'use client';
import { redirect } from 'next/navigation'

import { getCookie } from '@/utils/cookies';


export default function LoggedInLayout({
   children,
}: {
   children: React.ReactNode
}) {

   // check for sd-session cookie
   const cookies = getCookie("sb-session");

   return (
      <div className="min-h-screen max-w-screen">
         <main className="container py-8">
            {children}
         </main>
      </div>
   )
}
