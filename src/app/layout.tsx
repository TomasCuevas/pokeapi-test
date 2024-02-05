import type { Metadata } from "next";

//* FONTS *//
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });

//* STYLES *//
import "./globals.css";

export const metadata: Metadata = {
  title: "PokeApi - Test",
  description: "",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es" className={inter.className}>
      <body style={{ backgroundColor: "rgb(15 23 42)" }}>
        <main className=" min-h-screen flex flex-col max-w-[1500px] mx-auto px-2 sm:px-8 2xl:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
