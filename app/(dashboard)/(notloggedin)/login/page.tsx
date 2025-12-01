'use client';

import LoginPage from '@/app/components/LoginPage';
import RegisterAccount from '@/app/components/RegisterAccount';
import { useState, useEffect } from 'react';
import { getCookie } from '@/utils/cookies';

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true);
  const cookies = getCookie('sb-session');

  // ✅ Redirect hvis allerede innlogget
  useEffect(() => {
    if (cookies) {
      window.location.href = '/dashboard';
    }
  }, [cookies]);

  const handleToggleView = () => {
    setIsLoginView(prev => !prev);
  };

  const handleRegister = (username: string, password: string) => {
    console.log('Registering user:', username, password);
    setIsLoginView(true);
  };

  return (
    <div className="flex items-center min-w-screen flex-col min-h-screen bg-[#2A2958]">

      {isLoginView ? (
        <>
          <LoginPage onToggleToRegister={handleToggleView} />
        </>
      ) : (
        <>
          {/* ✅ KUN register-kortet – ingen ekstra wrapper */}
          <RegisterAccount onRegister={handleRegister} />

          <p className="mt-6 text-center text-gray-600">
            Har du allerede en konto?{' '}
            <button
              type="button"
              onClick={handleToggleView}
              className="text-blue-600 hover:underline font-semibold"
            >
              Logg inn her
            </button>
          </p>
        </>
      )}

    </div>
  );
}
