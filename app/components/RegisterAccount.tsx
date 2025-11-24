// register account component
import React, { useState } from 'react';

interface RegisterAccountProps {
   onRegister: (username: string, password: string) => void;
}

const RegisterAccount: React.FC<RegisterAccountProps> = ({ onRegister }) => {
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onRegister(username, password);
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
               Email

            </label>
            <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
               required
            />
         </div>
         <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
               Username
            </label>
            <input
               type="text"
               id="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
               required
            />
         </div>
         <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
               Password
            </label>
            <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
               required
            />
         </div>
         <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
         >
            Register
         </button>
      </form>

   );
}

export default RegisterAccount;
