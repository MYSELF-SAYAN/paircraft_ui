import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthWrapper } from "@/context";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import { SocketProvider } from "@/context/SocketProvider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import Navbar from "@/components/Navbar";
import { Analytics } from '@vercel/analytics/next';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Paircraft",
  description: "Grow together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-auto`}
      >
        <SocketProvider>
          <AuthWrapper>
            <CustomCursor />
            {/* <Navbar /> */}
            {children}   <Analytics /></AuthWrapper>
        </SocketProvider>
        <Toaster />
      </body>
    </html>
  );
}
