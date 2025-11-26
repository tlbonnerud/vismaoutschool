'use client';
import Header from '@/app/components/Heading';

export default function Home() {
   return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
         <Header />
         <div className="flex items-center justify-center min-h-screen">
            <p>Welcome to the Logged In Home Page!</p>
         </div>
      </main>
   );
}
