import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visma Outschool",
  description: "Matchmaking system for school recommendations",
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
