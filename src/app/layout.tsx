import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jadid — Mobile & AI Developer",
  description: "Modern portfolio of Jadid, Mobile (Flutter/Firebase) and AI Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'YOUR_MEASUREMENT_ID');` }} /> */}
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
