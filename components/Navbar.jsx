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
      <header className="fixed top-0 left-0 right-0 z-[100] w-full box-border h-[72px] flex items-center justify-center">
        <div className="w-full max-w-[1440px] flex items-center justify-between px-6 md:px-12 lg:px-16 mx-auto box-border">
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
            className="flex items-center bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
          >
            <motion.span
              className="nb-sans text-sm text-neutral-300 tracking-wide select-none"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              Menu
            </motion.span>
          </button>
        </div>
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
            <div className="pointer-events-none absolute top-0 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-white/[0.02] blur-3xl translate-x-1/3 -translate-y-1/3" />

            {/* ── DESKTOP: Split Layout (lg+) ── */}
            <div className="hidden lg:flex flex-1 relative z-10 w-full max-w-[1440px] mx-auto px-16 xl:px-32 items-center">
              
              {/* Left Column: Info/Contact */}
              <motion.div
                className="w-[45%] flex flex-col justify-center pr-20 xl:pr-32 border-r border-white/[0.08] h-[60%]"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, transition: { duration: 0.2 } }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-14">
                  <h4 className="nb-sans text-[0.65rem] tracking-[0.25em] text-white/30 uppercase mb-5">Let's Talk</h4>
                  <a href="mailto:hello@tezh.com" className="nb-display text-4xl text-white/80 hover:text-white transition-colors duration-300">
                    hello@tezh.com
                  </a>
                </div>
                
                <div>
                  <h4 className="nb-sans text-[0.65rem] tracking-[0.25em] text-white/30 uppercase mb-5">Our Headquarters</h4>
                  <p className="nb-sans text-sm text-white/60 leading-loose font-light">
                    Tezh Technologies<br />
                    123 Innovation Drive<br />
                    Tech District, NY 10001
                  </p>
                </div>
              </motion.div>

              {/* Right Column: Navigation Links */}
              <motion.div
                className="w-[55%] flex flex-col gap-8 justify-center items-start pl-16 xl:pl-24"
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
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className="w-fit"
                    >
                      <a
                        href={item.link}
                        onClick={(e) => navigate(e, item.link)}
                        className="group flex items-center gap-8 cursor-pointer no-underline"
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          className="nb-sans text-sm font-medium tracking-[0.2em] transition-colors duration-500 text-left w-6"
                          style={{ color: isDimmed ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.4)" }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="nb-display text-6xl xl:text-7xl font-light leading-none tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-left"
                          style={{
                            color: isDimmed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.95)",
                            transform: isHovered ? "translateX(24px)" : "translateX(0)",
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
                  className="w-full"
                >
                  <a
                    href={item.link}
                    onClick={(e) => navigate(e, item.link)}
                    className="group flex flex-col gap-1 py-4 w-full cursor-pointer no-underline border-b border-white/[0.06]"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="nb-sans text-[0.55rem] font-medium tracking-[0.25em] text-white/30 uppercase">
                      {item.label}
                    </span>
                    <span className="nb-display text-5xl md:text-6xl font-light leading-none tracking-tight text-white/60 group-hover:text-white transition-all duration-300 pt-1 group-hover:translate-x-2">
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