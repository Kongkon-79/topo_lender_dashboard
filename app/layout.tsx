import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // customize as needed
  variable: "--font-poppins",
});

const avenirBold = localFont({
  src: "./fonts/avenir/avenir-arabic-black.otf",
  variable: "--font-avenir",
  weight: "100, 200, 300, 400, 500, 600, 700, 800, 900",
  display: "swap",
});
const avenirNormal = localFont({
  src: "./fonts/avenir/Avenir Regular.ttf",
  variable: "--font-avenir",
  weight: "100, 200, 300, 400, 500, 600, 700, 800, 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dress Rental Dashboard",
  description: "A dashboard for managing dress rentals",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${avenirBold.variable} ${avenirNormal.variable}`}>
      <body>
        <Toaster position="top-center" richColors closeButton />
        {children}
      </body>
    </html>
  );
}
