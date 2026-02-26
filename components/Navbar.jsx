"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Home",         link: "/",             label: "01" },
  { name: "Services",     link: "/services",     label: "02" },
  { name: "About",        link: "/about",        label: "03" },
  { name: "Careers",      link: "/careers",      label: "04" },
  { name: "Case Studies", link: "/case-studies", label: "05" },
  { name: "Contact",      link: "/contact",      label: "06" },
];

/* ─── Variants ─────────────────────────────────────────────────────── */

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.5,  ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const footerVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.5, ease: "easeOut" } },
  exit:    { opacity: 0,       transition: { duration: 0.2 } },
};

/* ─── Component ─────────────────────────────────────────────────────── */

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { if (!open) setHoveredIdx(null); }, [open]);

  const close    = () => setOpen(false);
  const navigate = (e, link) => {
    e.preventDefault();
    close();
    setTimeout(() => router.push(link), 350);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500&display=swap');
        .nb-display { font-family: 'Cormorant Garamond', serif; }
        .nb-sans    { font-family: 'Montserrat', sans-serif; }

        /* Grain */
        .nb-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.3;
          z-index: 0;
        }

        /* Desktop item underline grow */
        .nb-desk-item::after {
          content: '';
          display: block;
          height: 1px;
          background: rgba(255,255,255,0.4);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          margin-top: 6px;
        }
        .nb-desk-item:hover::after,
        .nb-desk-item.is-active::after { transform: scaleX(1); }

        /* Mobile item underline grow */
        .nb-mob-item::after {
          content: '';
          display: block;
          height: 1px;
          background: rgba(255,255,255,0.15);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nb-mob-item:hover::after { transform: scaleX(1); }
      `}</style>

      {/* ── FIXED HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-8 md:px-14 h-[72px]">
        <Link
          href="/"
          onClick={close}
          className="nb-display text-xl font-semibold tracking-[0.22em] uppercase text-white select-none"
        >
          TEZH<span className="text-white/30">.</span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex items-center gap-3 bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
        >
          <motion.span
            className="nb-sans text-sm text-neutral-300 tracking-wide select-none"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Menu
          </motion.span>
          <div className="flex flex-col items-end justify-center w-6 h-5 gap-0">
            <motion.span
              className="block h-[1.5px] bg-white rounded-full origin-center"
              animate={open ? { width: 24, rotate: 45,  translateY: "0.38rem" }
                            : { width: 24, rotate: 0,   translateY: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block h-[1.5px] bg-white rounded-full origin-center mt-[7px]"
              animate={open ? { width: 24, rotate: -45, translateY: "-0.38rem" }
                            : { width: 16, rotate: 0,   translateY: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </button>
      </header>

      {/* ── FULLSCREEN OVERLAY ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nb-overlay"
            className="nb-grain fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl translate-x-1/3 -translate-y-1/3" />

            {/* ── DESKTOP: Horizontal layout (lg+) ── */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 px-20">
              <motion.div
                className="w-full flex items-center justify-center gap-0"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {menuItems.map((item, i) => {
                  const isHovered = hoveredIdx === i;
                  const isDimmed  = hoveredIdx !== null && !isHovered;

                  return (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="flex-1 flex flex-col items-center"
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Vertical divider — hidden on first item */}
                      {i !== 0 && (
                        <div className="absolute h-16 w-[1px] bg-white/[0.06] -translate-x-full" />
                      )}

                      <a
                        href={item.link}
                        onClick={(e) => navigate(e, item.link)}
                        className={`nb-desk-item flex flex-col items-center gap-2 px-4 py-6 cursor-pointer no-underline transition-all duration-300
                          ${isHovered ? "is-active" : ""}
                        `}
                        style={{ textDecoration: "none" }}
                      >
                        {/* Index number */}
                        <span
                          className="nb-sans text-[0.55rem] font-medium tracking-[0.25em] transition-colors duration-300"
                          style={{ color: isDimmed ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.25)" }}
                        >
                          {item.label}
                        </span>

                        {/* Name */}
                        <span
                          className="nb-display font-light leading-none tracking-wide whitespace-nowrap transition-all duration-300"
                          style={{
                            fontSize: isHovered ? "2.2rem" : "1.9rem",
                            color: isDimmed
                              ? "rgba(255,255,255,0.10)"
                              : isHovered
                                ? "rgba(255,255,255,1)"
                                : "rgba(255,255,255,0.45)",
                          }}
                        >
                          {item.name}
                        </span>
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* ── MOBILE: Staggered vertical list (< lg) ── */}
            <motion.nav
              className="lg:hidden flex flex-col items-start justify-center flex-1 px-8 md:px-16 relative z-10"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="w-full overflow-hidden"
                >
                  <a
                    href={item.link}
                    onClick={(e) => navigate(e, item.link)}
                    className="nb-mob-item flex items-baseline gap-5 py-3 w-full text-white/25 hover:text-white transition-colors duration-300 cursor-pointer"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="nb-sans text-[0.6rem] font-medium tracking-[0.2em] text-white/20 self-center shrink-0">
                      {item.label}
                    </span>
                    <span className="nb-display text-5xl md:text-6xl font-light leading-[1.05] tracking-tight">
                      {item.name}
                    </span>
                  </a>
                </motion.div>
              ))}
            </motion.nav>

            {/* ── Footer ── */}
            <motion.div
              className="relative z-10 px-8 md:px-14 pb-8 pt-5 flex items-center justify-between border-t border-white/[0.06]"
              variants={footerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="nb-sans text-[0.6rem] tracking-[0.2em] text-white/20 uppercase">
                © {new Date().getFullYear()} Tezh
              </p>
              <div className="flex gap-6">
                {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="nb-sans text-[0.6rem] tracking-[0.15em] text-white/20 hover:text-white/60 transition-colors duration-300 uppercase"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}