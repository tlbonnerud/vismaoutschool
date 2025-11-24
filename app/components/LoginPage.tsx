'use client';

import { loginUser } from '@/lib/login';
import { useState } from 'react';

const LoginPage = () => {
   const [userEmail, setUserEmail] = useState('');
   const [userPassword, setUserPassword] = useState('');
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(''); // Clear previous errors
      setIsLoading(true);

      // Basic client-side validation
      if (!userEmail || !userPassword) {
         setError('Please enter both email and password.');
         setIsLoading(false);
         return;
      }

      const user = {
         email: userEmail,
         password: userPassword,
      };

      try {
         const response = await loginUser(user);

         if (!response.success) {
            throw new Error(response.message || 'Login failed');
         }

         // Set cookie with user session
         document.cookie = `sb-session=test-session-token; path=/; max-age=3600;`;
         // Redirect to admin page
         window.location.href = '/admin';

      } catch (err: any) {
         setError(err.message || 'An unexpected error occurred');
         setIsLoading(false);
      }
   };

   return (
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
         <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Login
         </h2>
         {error && (
            <p className="text-red-500 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded">
               {error}
            </p>
         )}
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
                  required
                  disabled={isLoading}
               />
            </div>
            <div className="mb-6">
               <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                  Password
               </label>
               <input
                  type="password"
                  id="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
                  required
                  disabled={isLoading}
               />
            </div>
            <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
               {isLoading ? 'Logging in...' : 'Login'}
            </button>
         </form>
      </div>
   );
};

export default LoginPage;
