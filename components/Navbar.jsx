"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FullscreenMenu from "./FullscreenMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
        <nav className="flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-wide text-white">
            TEZH
          </Link>

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="text-sm text-neutral-300 hover:text-white transition-colors duration-200">
              Menu
            </span>
            <div className="flex flex-col gap-1 w-6 h-6 justify-center">
              <span
                className={
                  `h-[2px] w-6 bg-white transition-all duration-300 ease-in-out ` +
                  (menuOpen ? "rotate-45 translate-y-[7px]" : "rotate-0")
                }
              />
              <span
                className={
                  `h-[2px] w-6 bg-white transition-all duration-300 ease-in-out ` +
                  (menuOpen ? "-rotate-45 -translate-y-[7px]" : "rotate-0")
                }
              />
            </div>
          </div>
        </nav>
      </header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
