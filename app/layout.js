import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "TEZH",
  description: "Modern digital experiences by TEZH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}