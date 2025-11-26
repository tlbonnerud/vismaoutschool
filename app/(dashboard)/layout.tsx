// This is the layout for the /dashboard route and its sub-routes

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   // Shared logic for all dashboard routes (both logged in and not)
   return <>{children}</>
}
