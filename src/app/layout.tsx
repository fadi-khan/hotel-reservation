"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainHeader } from "@/components/headers/MainHeader";
import { MobileSideBar } from "@/components/sidebars/MobileSidebar";
import { useState } from "react";
import { ToastProvider } from "@/components/toasts/ToastProvider";
import { LayoutWrapper } from "./LayoutWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
   
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
