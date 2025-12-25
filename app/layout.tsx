import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lider Teknik Servis | Endüstriyel Mutfak Teknik Servisi",
  description: "Lider Teknik Servis - Endüstriyel mutfak ekipmanları teknik servis, bakım ve onarım hizmetleri. Profesyonel ve güvenilir teknik servis.",
  keywords: "endüstriyel mutfak, teknik servis, mutfak ekipmanları, bakım, onarım, servis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
