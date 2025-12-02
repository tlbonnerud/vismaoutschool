'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Heading() {
   const pathname = usePathname();

   const linkBase =
      "px-4 py-2 rounded-xl font-semibold transition-all duration-300";

   const activeLink =
      "bg-white text-[#2A2958] shadow-md scale-105";

   const inactiveLink =
      "bg-[#B2F7FF] text-black hover:scale-105 hover:bg-white";

   return (
      <header className="sticky top-0 z-50 w-full bg-[#2A2958]/90 backdrop-blur-md shadow-lg transition-colors duration-500">
         <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

            {/* Logo / Title */}
            <Link
               href="/"
               className="text-xl font-extrabold text-[#B2F7FF] tracking-wide hover:text-white transition-colors duration-300"
            >
               Visma Outschool
            </Link>

            {/* Navigation */}
            <div className="flex gap-3 text-sm sm:text-base">

               <Link
                  href="/dashboard/matchmaking"
                  className={`${linkBase} ${pathname === "/dashboard/matchmaking" ? activeLink : inactiveLink
                     }`}
               >
                  Match
               </Link>

               <Link
                  href="/dashboard/schools"
                  className={`${linkBase} ${pathname === "/dashboard/schools" ? activeLink : inactiveLink
                     }`}
               >
                  Skoler
               </Link>

               <Link
                  href="/dashboard/profil"
                  className={`${linkBase} ${pathname === "/dashboard/profil" ? activeLink : inactiveLink
                     }`}
               >
                  Profil
               </Link>

               <Link
                  href="/dashboard/survey"
                  className={`${linkBase} ${pathname === "/dashboard/survey" ? activeLink : inactiveLink
                     }`}
               >
                  Undersøkelse
               </Link>

               {/* Logout Button */}
               <button
                  onClick={() => {
                     document.cookie =
                        "sb-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                     window.location.href = "/";
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
               >
                  Log out
               </button>
            </div>
         </nav>
      </header>
   );
}
