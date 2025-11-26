'use client'

export default function Heading() {
   return (
      <main className="flex min-h-0.1 flex-col items-center justify-between p-4">
         <h1 className="z-10 w-full max-w-5xl flex flex-row items-center justify-between font-mono text-2xl lg:flex">
            <button
               onClick={() => {
                  window.location.href = "/";
               }}
               className="">Home</button>
            <button
               onClick={() => {
                  window.location.href = "/dashboard/chats";
               }}
               className="">Chats</button>
            <button
               onClick={() => {
                  window.location.href = "/dashboard/schools";
               }}
               className="">Schools</button>
            <button
               onClick={() => {
                  window.location.href = "/dashboard/profil";
               }}

               className="">Profil</button>
            <button
               onClick={() => {
                  // remove cookie
                  document.cookie = "sb-session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
                  window.location.href = "/";
               }}
               className="">Log Out</button>
         </h1>
      </main>
   );
}
