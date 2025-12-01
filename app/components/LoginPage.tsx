'use client';

import { loginUser } from '@/lib/login';
import { useState } from 'react';

type LoginPageProps = {
  onToggleToRegister: () => void;
};

const LoginPage = ({ onToggleToRegister }: LoginPageProps) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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

      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <main className="w-screen min-h-screen bg-[#2A2958] flex items-center justify-center">

      <div className="w-[1200px] h-[700px] flex">

        {/* LEFT BRAND PANEL */}
        <div className="w-1/2 bg-[#2A2958] p-14 flex flex-col justify-center rounded-l-[35px] shadow-[0_0_60px_rgba(177,247,255,0.45)] relative z-10">

          <h1 className="text-5xl font-extrabold text-[#B2F7FF] mb-8">
            Figma Outschool
          </h1>

          <p className="text-lg text-white leading-relaxed mb-10">
            Welcome to your learning dashboard.  
            Chat with schools, manage your profile and keep full control of your projects.
          </p>

          <div className="w-24 h-[4px] bg-[#B2F7FF] rounded-full" />
        </div>

        {/* RIGHT LOGIN PANEL */}
        <div className="w-1/2 bg-white p-14 flex items-center justify-center rounded-r-[35px] shadow-[0_0_60px_rgba(0,0,0,0.1)]">
          <div className="w-full max-w-md">

            <h2 className="text-4xl font-extrabold text-[#2A2958] mb-8 text-center">
              Login
            </h2>

            {error && (
              <div className="mb-6 rounded-lg bg-red-100 text-red-700 px-4 py-3 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="block mb-2 font-semibold text-[#2A2958]">
                  Email
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A2958] transition disabled:opacity-60"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-2 font-semibold text-[#2A2958]">
                  Password
                </label>
                <input
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A2958] transition disabled:opacity-60"
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-[#2A2958] text-white font-semibold py-3 rounded-xl hover:bg-[#1f1e47] transition-all duration-300 disabled:opacity-60"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* ✅ TOGGLE TO REGISTER */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">
                Har du ikke bruker?
              </p>
              <button
                type="button"
                onClick={onToggleToRegister}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Registrer deg her
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
};

export default LoginPage;
