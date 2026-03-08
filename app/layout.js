import "./globals.css";

export const metadata = {
  title: "TEZH",
  description: "Modern digital experiences by TEZH",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
  <html lang="en" className="max-w-[100vw] overflow-x-hidden">
    <body className="bg-neutral-950 text-white antialiased max-w-[100vw] overflow-x-hidden w-full">
        {children}
      </body>
    </html>
  );
}