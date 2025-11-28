'use client'

import dynamic from 'next/dynamic'

const SchoolMap = dynamic(() => import('./components/SchoolMap'), {
   ssr: false,
   loading: () => (
      <div className="w-full h-[600px] bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
         <p className="text-gray-500 dark:text-gray-400">Laster kart...</p>
      </div>
   )
})

export default function Home() {
   return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
         <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
               Skoler i Oslo
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
               Kart over ungdomsskoler i Oslo. Klikk på en markør for å se mer informasjon.
            </p>
            <SchoolMap />
         </div>
      </main>
   );
}
