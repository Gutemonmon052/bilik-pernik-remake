import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Bilik Pernik",
  description: "E-Commerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
