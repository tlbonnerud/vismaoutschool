'use client';

import { useEffect } from "react";
import UserManagement from "@/app/components/UserManagement";
import { getCookie } from "@/utils/cookies";
import checkAuth from "@/lib/checkAuth";

export default function Home() {

   useEffect(() => {
      const checkAuthentication = async () => {
         const sessionCookie = getCookie("sb-session");
         // const isAuthenticated = await checkAuth(sessionCookie || "");

         if (!sessionCookie) {
            window.location.href = "/login";
         }
      };

      checkAuthentication();
   }, []);


   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
         <main className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
               Visma Outschool - User Management
            </h1>
            <UserManagement />
            {// temporary button to simulate logout by setting cookie
            }
            <button
               onClick={() => {
                  document.cookie = `sb-session=; path=/; max-age=0;`;
                  window.location.reload();
               }}
               className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
               Logout
            </button>
         </main>
      </div>
   );
}
