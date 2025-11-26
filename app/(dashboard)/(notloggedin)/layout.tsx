import { redirect } from 'next/navigation'
// Import your auth check function
// import { getCurrentUser } from '@/lib/auth'

export default function NotLoggedInLayout({
   children,
}: {
   children: React.ReactNode
}) {
   // Check if already logged in
   // const user = await getCurrentUser()
   // if (user) {
   //   redirect('/')
   // }

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="w-full max-w-md">
            {children}
         </div>
      </div>
   )
}
