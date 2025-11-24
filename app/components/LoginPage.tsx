'use client';
import { loginUser } from '@/lib/login';
import { useState } from 'react';

const LoginPage = () => {
   const [userEmail, setUserEmail] = useState('');
   const [userPassword, setUserPassword] = useState('');
   const [error, setError] = useState('');

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      setError(''); // Clear previous errors

      // Basic client-side validation
      if (!userEmail || !userPassword) {
         setError('Please enter both email and password.');
         return;
      }

      try {

         const userRequest = {
            json: async () => ({
               email: userEmail,
               password: userPassword,
            }),
         };

         const response = await loginUser(userRequest as any);

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
         }

         const data = await response.json();
         document.cookie = `sb-session=${data.user.id}; path=/;`;

         window.location.href = '/admin';

      } catch (err: any) {
         setError(err.message);
      }
   };

   return (
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
         <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Login</h2>
         {error && <p className="text-red-500 mb-4">{error}</p>}
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
               />
            </div>
            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
               Login
            </button>
         </form>
      </div>
   );
};

export default LoginPage;
