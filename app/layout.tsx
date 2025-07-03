import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban: with Next.js",
  description: "A Kanban board solution built with Next.js, Zustand and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header>
          <nav className="h-12 w-full border-b-1 border-gray-200 shadow-sm shadow-gray-300/50"></nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
