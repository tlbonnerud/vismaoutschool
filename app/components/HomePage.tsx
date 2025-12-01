import Link from 'next/link';

export default function HomePage() {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
         <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Velkommen til Visma Outschool</h1>
         <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center px-4 max-w-2xl">
            Finn den perfekte videregående skolen for deg! Svar på vår spørreundersøkelse og få personlige anbefalinger basert på dine preferanser.
         </p>
         
         <div className="flex flex-col sm:flex-row gap-4">
            <Link
               href="/survey"
               className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors text-center font-semibold"
            >
               Ta spørreundersøkelsen
            </Link>
            <Link
               href="/user"
               className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors text-center font-semibold"
            >
               Min profil
            </Link>
            <Link
               href="/recommendations"
               className="bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors text-center font-semibold"
            >
               Se anbefalinger
            </Link>
         </div>

         <div className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
            <Link href="/login" className="hover:underline">
               Admin login
            </Link>
         </div>
      </div>
   );
}
