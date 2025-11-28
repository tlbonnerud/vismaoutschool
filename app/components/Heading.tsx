'use client'

import Link from "next/link";

export default function Heading() {
  return (
    <header className="w-full bg-[#2A2958] shadow-lg">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo / Title */}
        <Link 
          href="/" 
          className="text-xl font-extrabold text-[#B2F7FF] tracking-wide"
        >
          Figma Outschool
        </Link>

        {/* Navigation */}
        <div className="flex gap-4 text-sm sm:text-base">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-[#B2F7FF] text-black font-semibold hover:scale-105 transition-transform"
          >
            Home
          </Link>

          <Link
            href="/dashboard/chats"
            className="px-4 py-2 rounded-xl bg-[#B2F7FF] text-black font-semibold hover:scale-105 transition-transform"
          >
            Chats
          </Link>

          <Link
            href="/dashboard/schools"
            className="px-4 py-2 rounded-xl bg-[#B2F7FF] text-black font-semibold hover:scale-105 transition-transform"
          >
            Schools
          </Link>

          <Link
            href="/dashboard/profil"
            className="px-4 py-2 rounded-xl bg-[#B2F7FF] text-black font-semibold hover:scale-105 transition-transform"
          >
            Profil
          </Link>

          <button
            onClick={() => {
              document.cookie = "sb-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              window.location.href = "/";
            }}
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 transition-all"
          >
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
}
