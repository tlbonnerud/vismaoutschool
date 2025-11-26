'use client';

export default function LoggedInLayout({
   children,
}: {
   children: React.ReactNode
}) {


   return (
      <div className="min-h-screen overflow-hidden">
         <main className="container ">
            {children}
         </main>
      </div>
   )
}
