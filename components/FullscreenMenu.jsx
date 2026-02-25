"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", image: "/images/home.jpg" },
  { label: "Services", href: "#services", image: "/images/services.jpg" },
  { label: "About Us", href: "#about", image: "/images/about.jpg" },
  { label: "Careers", href: "#careers", image: "/images/careers.jpg" },
  { label: "Case Studies", href: "#case-studies", image: "/images/case-studies.jpg" },
  { label: "Contact Us", href: "#contact", image: "/images/contact.jpg" },
];

export default function FullscreenMenu({ isOpen, onClose }) {
  const [activeLink, setActiveLink] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 });
  const [textCenter, setTextCenter] = useState({ x: 0, y: 0 });
  // const [rotation, setRotation] = useState(0);

  const activeItem = navItems.find((item) => item.label === activeLink) ?? null;

  // Responsive: only show image preview on lg and up
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 h-screen overflow-y-auto bg-neutral-950"
        >
          {/* Back button: absolute top-6 right-6 on mobile, right-16 top-10 on lg+ */}
          <div className="absolute top-6 right-6 z-50 lg:top-10 lg:right-16">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-base text-neutral-400 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Back →
            </button>
          </div>

          {/* Responsive nav layout */}
          <ul
            className="flex flex-col items-start px-8 py-24 gap-y-6 w-full
                       lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-20 lg:gap-y-4 lg:px-24 lg:py-0"
          >
            {navItems.map((item) => {
              const isActive = activeLink === item.label;
              return (
                <li key={item.label} className="shrink-0">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={isDesktop ? (event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      const centerX = rect.left + rect.width / 2;
                      const centerY = rect.top + rect.height / 2;
                      setOriginPosition({ x: centerX, y: centerY });
                      setTextCenter({ x: centerX, y: centerY });
                      setCursorPosition({ x: centerX, y: centerY });
                      setActiveLink(item.label);
                    } : undefined}
                    onMouseLeave={isDesktop ? () => setActiveLink(null) : undefined}
                    onMouseMove={isDesktop ? (event) => {
                      const cursorX = event.clientX;
                      const cursorY = event.clientY;
                      // Midpoint between text center and cursor
                      const midX = (textCenter.x + cursorX) / 2;
                      const midY = (textCenter.y + cursorY) / 2;
                      setCursorPosition({ x: midX, y: midY });
                    } : undefined}
                    className={
                      `inline-block cursor-pointer font-light tracking-tight transition duration-300
                      text-4xl text-neutral-400 hover:text-white
                      lg:text-[120px] lg:text-neutral-600
                      ${isActive ? "text-white lg:text-white" : ""}`
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Floating image preview: only on desktop */}
          <AnimatePresence>
            {isDesktop && activeItem ? (
              <motion.img
                key={activeItem.label}
                src={activeItem.image}
                alt={activeItem.label}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  x: originPosition.x,
                  y: originPosition.y,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: cursorPosition.x,
                  y: cursorPosition.y,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="pointer-events-none fixed left-0 top-0 z-50 w-[350px] rounded-lg object-cover hidden lg:block"
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
