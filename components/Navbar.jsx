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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .nb-display { font-family: var(--font-cormorant), 'Cormorant Garamond', serif; }
        .nb-sans    { font-family: var(--font-dm-sans), 'DM Sans', sans-serif; }

        .nb-header {
          transition: transform 0.3s ease;
        }

        .nb-header.is-scrolled {
          transform: translateY(0);
        }

        .nb-brand {
          text-decoration: none;
          color: #ffffff;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .nb-brand:hover {
          color: #d7d7d7;
        }

        .nb-menu-btn {
          min-width: 92px;
          height: 44px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 999px;
          background: rgba(10,10,10,0.45);
          backdrop-filter: blur(10px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 14px;
          cursor: pointer;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.62rem;
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .nb-menu-btn:hover {
          border-color: rgba(255,255,255,0.5);
          background: rgba(10,10,10,0.62);
        }

        .nb-burger {
          width: 14px;
          height: 11px;
          position: relative;
        }

        .nb-burger-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: #ffffff;
          transform-origin: center;
          transition: transform 0.28s ease, opacity 0.2s ease, top 0.28s ease;
        }

        .nb-burger-line.top { top: 1px; }
        .nb-burger-line.mid { top: 5px; }
        .nb-burger-line.bot { top: 9px; }

        .nb-menu-btn.open .nb-burger-line.top {
          top: 5px;
          transform: rotate(45deg);
        }

        .nb-menu-btn.open .nb-burger-line.mid {
          opacity: 0;
        }

        .nb-menu-btn.open .nb-burger-line.bot {
          top: 5px;
          transform: rotate(-45deg);
        }

        .nb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.32s ease;
          z-index: 110;
        }

        .nb-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .nb-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #0d0d0d;
          color: #ffffff;
          transform: translateY(-2%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.34s ease, transform 0.34s ease;
          z-index: 120;
          display: grid;
          grid-template-columns: 1fr;
        }

        .nb-panel.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .nb-panel-col-left {
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 92px 28px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background:
            radial-gradient(circle at 25% 20%, rgba(124,92,191,0.2), transparent 52%),
            linear-gradient(160deg, rgba(255,255,255,0.03), transparent 46%);
        }

        .nb-panel-col-right {
          padding: 36px 28px 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .nb-panel-title {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: clamp(1.8rem, 5vw, 3.2rem);
          line-height: 1.05;
          letter-spacing: 0.01em;
          margin: 0;
        }

        .nb-panel-copy {
          margin-top: 18px;
          max-width: 420px;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .nb-panel-kicker {
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          font-size: 0.62rem;
        }

        .nb-panel-meta {
          margin-top: 18px;
          display: grid;
          gap: 6px;
          color: rgba(255,255,255,0.62);
          font-size: 0.8rem;
        }

        .nb-menu-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nb-menu-link {
          text-decoration: none;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          padding: 18px 0;
          transition: border-color 0.25s ease;
        }

        .nb-menu-link:hover {
          border-color: rgba(255,255,255,0.45);
        }

        .nb-menu-name {
          font-size: clamp(1.6rem, 5.2vw, 3rem);
          font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
          letter-spacing: 0.03em;
          line-height: 1;
        }

        .nb-menu-idx {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.55);
        }

        @media (min-width: 1024px) {
          .nb-panel {
            grid-template-columns: minmax(360px, 46%) minmax(420px, 54%);
          }

          .nb-panel-col-left {
            border-bottom: 0;
            border-right: 1px solid rgba(255,255,255,0.1);
            padding: 120px 58px 54px;
          }

          .nb-panel-col-right {
            padding: 120px 58px 54px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nb-header,
          .nb-overlay,
          .nb-panel {
            transition: none;
          }
        }
      `}</style>

      <header className={`nb-header fixed top-5 left-0 right-0 z-[130] px-5 sm:px-8 ${scrolled || open ? "is-scrolled" : ""}`}>
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            onClick={close}
            className="nb-brand nb-display font-semibold"
          >
            TEZHT
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`nb-menu-btn ${open ? "open" : ""}`}
          >
            <span className="nb-sans">{open ? "Close" : "Menu"}</span>
            <span className="nb-burger" aria-hidden="true">
              <span className="nb-burger-line top" />
              <span className="nb-burger-line mid" />
              <span className="nb-burger-line bot" />
            </span>
          </button>
        </div>
      </header>

      <div className={`nb-overlay ${open ? "open" : ""}`} onClick={close} />
      <section className={`nb-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="nb-panel-col-left">
          <div>
            <p className="nb-sans nb-panel-kicker">Tezht Technologies</p>
            <h2 className="nb-panel-title">The Future of Business - Now.</h2>
            <p className="nb-sans nb-panel-copy">
              We build digital systems, automation workflows, and data-first products that help teams
              scale with confidence. Partner with us to design, ship, and optimize what matters.
            </p>
          </div>
          <div className="nb-sans nb-panel-meta">
            <span>hello@tezht.com</span>
            <span>+91 00000 00000</span>
            <span>Mon - Fri, 9:00 AM - 6:00 PM</span>
          </div>
        </div>

        <div className="nb-panel-col-right">
          <nav>
            <ul className="nb-menu-list">
              {menuItems.map((item) => (
                <li key={item.link}>
                  <a href={item.link} onClick={(e) => navigate(e, item.link)} className="nb-menu-link">
                    <span className="nb-menu-name">{item.name}</span>
                    <span className="nb-menu-idx">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}