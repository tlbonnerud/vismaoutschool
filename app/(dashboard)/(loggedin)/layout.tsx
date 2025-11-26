import { redirect } from 'next/navigation'
import Header from '@/app/components/Heading'

// Import your auth check function
// import { getCurrentUser } from '@/lib/auth'

export default function LoggedInLayout({
   children,
}: {
   children: React.ReactNode
}) {
   // check for sd-session cookie
   const cookies = document.cookie.split('; ').reduce((acc, curr) => {
      const [key, ...v] = curr.split('=');
      acc[key] = v.join('=');
      return acc;
   }, {} as { [key: string]: string });
   if (!cookies['sd-session']) {
      redirect('/login')
   }

   return (
      <div className="min-h-screen">
         <nav className="border-b">
            {/* Your navigation */}
            <div className="container mx-auto px-4 py-4">
               <Header />
               <h1>Dashboard Navigation</h1>
               {/* Add links, user menu, etc */}
            </div>
         </nav>
         <main className="container mx-auto px-4 py-8">
            {children}
         </main>
      </div>
   )
}
