'use client';

import { registerUser } from '@/lib/register';
import { useState } from 'react';

interface RegisterAccountProps {
  onRegister: (username: string, password: string) => void;
}

const RegisterAccount: React.FC<RegisterAccountProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(username, email, password);
    onRegister(username, password);

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="flex flex-col bg-[#B2F7FF] rounded-[32px] shadow-2xl p-12">

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-[#2A2958] mb-3">
          Opprett konto
        </h2>
        <p className="text-gray-800">
          Lag en bruker for å kunne delta i skolebytte og kommunikasjon.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* EMAIL */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#2A2958]">
            E-post
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@epost.no"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A2958]"
            required
          />
        </div>

        {/* USERNAME */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#2A2958]">
            Brukernavn
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Velg et brukernavn"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A2958]"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#2A2958]">
            Passord
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 tegn"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A2958]"
            required
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-4 bg-[#2A2958] text-white font-semibold py-3 rounded-xl hover:bg-[#1f1e47] transition-all duration-300"
        >
          Opprett konto
        </button>
      </form>

      {/* FOOTER */}
      <div className="mt-8 text-center text-sm text-gray-800">
        Ved å opprette konto godtar du vilkårene for bruk.
      </div>

    </div>
  );
};

export default RegisterAccount;
