import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Main from "@/components/layout/Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Byte-Cart",
  description: "Byte Cart is an E-Commerce website to show my full stack skill",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Main>
          {children}
        </Main>
      </body>
    </html>
  );
}
