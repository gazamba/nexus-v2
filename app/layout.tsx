import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopHeader } from "@/components/layout/top-header";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { AuthProvider } from "@/contexts/auth-provider";
import { Toaster } from "@/contexts/toaster-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus",
  description:
    "A platform that automates client workflows by generating custom code and AI agents from survey data and documentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <TopHeader />
            <div className="flex flex-1">
              <SidebarNavigation />
              <main className="flex-1 p-6 overflow-auto bg-gray-50">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
