"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home",         link: "/",             label: "01" },
  { name: "Services",     link: "/services",     label: "02" },
  { name: "About",        link: "/about",        label: "03" },
  { name: "Careers",      link: "/careers",      label: "04" },
  { name: "Case Studies", link: "/case-studies", label: "05" },
  { name: "Contact",      link: "/contact",      label: "06" },
];

/* ─── Component ─────────────────────────────────────────────────────── */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  const navigate = (e, link) => {
    e.preventDefault();
    close();
    setTimeout(() => router.push(link), 250);
  };

  return (
    <>
      <style>{`
        .nb-display { font-family: var(--font-cormorant), 'Cormorant Garamond', serif; }
        .nb-sans    { font-family: var(--font-dm-sans), 'DM Sans', sans-serif; }

        .nb-header {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          transition: background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease;
        }

        .nb-header.is-scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 1px 24px rgba(0,0,0,0.06);
        }

        .nb-link {
          color: #1a1a2e;
          text-decoration: none;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          position: relative;
        }

        .nb-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -7px;
          width: 100%;
          height: 1px;
          background: #7c5cbf;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .nb-link:hover::after {
          transform: scaleX(1);
        }

        .nb-header:not(.is-scrolled) .nb-link,
        .nb-header:not(.is-scrolled) .nb-brand,
        .nb-header:not(.is-scrolled) .nb-mobile-label {
          color: #0d0d0d;
        }

        .nb-cta {
          min-height: 44px;
          padding: 0.65rem 1.1rem;
          border-radius: 4px;
          border: none;
          background: #0d0d0d;
          color: #ffffff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: none;
        }

        .nb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 110;
        }

        .nb-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .nb-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(82vw, 380px);
          height: 100vh;
          background: #ffffff;
          border-left: 1px solid #ebebeb;
          transform: translateX(100%);
          transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 120;
          display: flex;
          flex-direction: column;
          padding: 1.2rem 1.2rem 1.8rem;
        }

        .nb-drawer.open {
          transform: translateX(0);
        }

        .nb-drawer-link {
          text-decoration: none;
          color: #0d0d0d;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 52px;
          border-bottom: 1px solid #f0f0f0;
          letter-spacing: 0.06em;
          font-size: 0.95rem;
          padding: 0.6rem 0;
        }

        .nb-drawer-link span:first-child {
          font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
          font-size: 1.6rem;
        }

        .nb-drawer-link span:last-child {
          color: #7c5cbf;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
        }

        @media (prefers-reduced-motion: reduce) {
          .nb-header,
          .nb-overlay,
          .nb-drawer,
          .nb-link::after {
            transition: none;
          }
        }
      `}</style>

      <header className={`nb-header fixed top-0 left-0 right-0 z-[100] w-full box-border h-[72px] flex items-center justify-center ${scrolled || open ? "is-scrolled" : ""}`}>
        <div className="w-full max-w-[1240px] flex items-center justify-between px-6 md:px-10 lg:px-14 mx-auto box-border">
          {!open && (
            <Link
              href="/"
              onClick={close}
              className="nb-brand nb-display text-xl md:text-2xl font-semibold tracking-[0.18em] uppercase text-[#0d0d0d] select-none"
            >
                TEZH<span className="text-[#7c5cbf]">.</span>
            </Link>
          )}

          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link key={item.link} href={item.link} className="nb-link nb-sans">
                {item.name}
              </Link>
            ))}
            <Link href="/contact" className="nb-cta nb-sans shimmer-btn">
              Let&apos;s Talk
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden flex items-center justify-center bg-transparent border border-[#ebebeb] rounded-sm min-h-[44px] min-w-[44px] p-2 cursor-pointer text-[#0d0d0d]"
          >
            <span className="nb-mobile-label nb-sans text-xs tracking-[0.12em] uppercase">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>

      <div className={`nb-overlay ${open ? "open" : ""}`} onClick={close} />
      <aside className={`nb-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="flex items-center justify-between pb-4 border-b border-[#ebebeb]">
          <span className="nb-display text-2xl tracking-[0.1em] text-[#0d0d0d]">TEZH<span className="text-[#7c5cbf]">.</span></span>
          <button
            onClick={close}
            className="nb-sans min-h-[44px] min-w-[44px] border border-[#ebebeb] text-[#0d0d0d] text-xs tracking-[0.14em] uppercase"
          >
            Close
          </button>
        </div>
        <nav className="pt-5 flex flex-col gap-1">
          {menuItems.map((item) => (
            <a key={item.link} href={item.link} onClick={(e) => navigate(e, item.link)} className="nb-drawer-link">
              <span>{item.name}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-[#ebebeb]">
          <p className="nb-sans text-[#666666] text-xs leading-relaxed">hello@tezh.com</p>
          <p className="nb-sans text-[#7c5cbf] text-[0.62rem] tracking-[0.2em] uppercase mt-2">Tezh Technologies</p>
        </div>
      </aside>
    </>
  );
}