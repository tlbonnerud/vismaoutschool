'use client'

export default function Heading() {
   return (
      <main className="flex bg-[#2A2958] min-h-0.1 flex-col items-center justify-between p-4">
         <h1 className="z-10 w-full max-w-5xl flex flex-row items-center justify-between font-mono text-2xl lg:flex">
            <button
               onClick={() => {
                  window.location.href = "/";
               }}
               className="px-3 rounded-xl bg-[#B2F7FF]">Home</button>
            <button
               onClick={() => {
                  window.location.href = "/dashboard/chats";
               }}
               className="px-3 rounded-xl bg-[#B2F7FF]">Chats</button>
            <button
               onClick={() => {
                  window.location.href = "/dashboard/schools";
               }}
               className="px-3 rounded-xl bg-[#B2F7FF]">Schools</button>
            <button
               onClick={() => {
                  window.location.href = "/dashboard/profil";
               }}

               className="px-3 rounded-xl bg-[#B2F7FF]">Profil</button>
            <button
               onClick={() => {
                  // remove cookie
                  document.cookie = "sb-session=;";
                  window.location.href = "/";
               }}
               className="px-3 rounded-xl bg-red-500">Log Out</button>
         </h1>
      </main>
   );
}
