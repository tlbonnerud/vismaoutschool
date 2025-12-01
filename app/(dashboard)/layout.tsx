// This is the layout for the /dashboard route and its sub-routes
import { StudentProvider } from '@/app/(dashboard)/(loggedin)/dashboard/schools/context/StudentContext';

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   // Shared logic for all dashboard routes (both logged in and not)
   return <StudentProvider>{children}</StudentProvider>
}
