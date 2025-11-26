'use client'
import LoginPage from '@/app/components/LoginPage';
import RegisterAccount from '@/app/components/RegisterAccount';
import { useState } from 'react';
import { getCookie } from '@/utils/cookies';

export default function Home() {

   const cookies = getCookie("sb-session");

   if (cookies) {
      // If the user is already logged in, redirect to the logged-in home page
      if (typeof window !== 'undefined') {
         window.location.href = '/dashboard';
      }
      return null; // Return null while redirecting
   }
   // use usestate to toggle between login and register views
   const [isLoginView, setIsLoginView] = useState(true);

   const handleToggleView = () => {
      setIsLoginView(!isLoginView);
   };

   const handleRegister = (username: string, password: string) => {
      // Handle registration logic here
      console.log('Registering user:', username, password);
      // After registration, switch to login view
      setIsLoginView(true);
   };

   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
         {isLoginView ? (
            <>
               <LoginPage />
               <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                  {"Don't have an account?"}{' '}
                  <button
                     onClick={handleToggleView}
                     className="text-blue-500 hover:underline"
                  >
                     Register here
                  </button>
               </p>
            </>
         ) : (
            <>
               <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Register</h2>
                  <RegisterAccount onRegister={handleRegister} />
               </div>
               <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button
                     onClick={handleToggleView}
                     className="text-blue-500 hover:underline"
                  >
                     Login here
                  </button>
               </p>
            </>
         )}
      </div>
   );
}


