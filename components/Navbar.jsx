import Link from "next/link";

const menuItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="text-base font-semibold tracking-[0.2em] text-white">
          TEZH
        </Link>

        <ul className="flex items-center gap-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-neutral-300 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
