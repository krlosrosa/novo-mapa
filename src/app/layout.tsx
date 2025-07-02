import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/next-auth";
import AppHeader, { AppHeaderProps } from "@/components/AppHeader";
import React, { createContext, useContext } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Contexto para customização do header

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // O valor padrão pode ser sobrescrito por cada página
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
            <AppHeader />
            {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
