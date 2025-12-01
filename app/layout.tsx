import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "Visma Outschool",
   description: "Finn den perfekte skolen for deg",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className="antialiased font-sans">
            {children}
         </body>
      </html>
   );
}
