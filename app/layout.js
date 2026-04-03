import "./globals.css";
import Navbar from "@/components/Navbar";
import { Cormorant_Garamond, DM_Mono, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata = {
  title: "TEZH",
  description: "Modern digital experiences by TEZH",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
  <html lang="en" className="max-w-[100vw] overflow-x-hidden">
    <body className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} max-w-[100vw] overflow-x-hidden w-full antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}