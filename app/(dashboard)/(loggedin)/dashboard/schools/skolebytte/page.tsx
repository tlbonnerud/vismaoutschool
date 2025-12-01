// display a simple forms with what school to send a request to swap to
import formSchools from '@/app/(dashboard)/(loggedin)/dashboard/schools/components/schools.json';

export default function Home() {

   // sort alphabetically
   formSchools.sort((a, b) => a.name.localeCompare(b.name));

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
         <main className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Spørreundersøkelse</h1>
            <p className="text-gray-700 dark:text-gray-300">Form</p>
            {// form goes here}
               <form>
                  <div className="mb-4">
                     <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="school">Velg skole å bytte til:</label>
                     <select id="school" name="school" className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option value="">Velg en skole</option>
                        {formSchools.map((school, idx) => (
                           <option key={idx} value={idx}>{school.name}</option>
                        ))}
                     </select>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Send forespørsel</button>
               </form>
            }
         </main>
      </div>
   );
}  
