// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// const menuItems = [
//   { name: "Home",         image: "/images/home.jpg",         link: "/",             label: "01" },
//   { name: "Services",     image: "/images/services.jpg",     link: "/services",     label: "03" },
//   { name: "Careers",      image: "/images/careers.jpg",      link: "/careers",      label: "05" },
//   { name: "Contact",      image: "/images/contact.jpg",      link: "/contact",      label: "06" },
//   { name: "Case Studies", image: "/images/case-studies.jpg", link: "/case-studies", label: "04" },
//   { name: "About",        image: "/images/about.jpg",        link: "/about",        label: "02" },
// ];

// /* ─── Variants ─────────────────────────────────────────────────────── */

// const overlayVariants = {
//   hidden:  { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
//   exit:    { opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
// };

// // Mobile stagger list
// const listVariants = {
//   hidden:  {},
//   visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
//   exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
// };

// const mobileItemVariants = {
//   hidden:  { opacity: 0, y: -24 },
//   visible: { opacity: 1, y: 0,   transition: { duration: 0.5,  ease: [0.22, 1, 0.36, 1] } },
//   exit:    { opacity: 0, y: -10, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
// };

// // Donut ring items (desktop)
// const ringItemVariants = {
//   hidden:  { opacity: 0, scale: 0.85 },
//   visible: (i) => ({
//     opacity: 1, scale: 1,
//     transition: { duration: 0.55, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
//   }),
//   exit: (i) => ({
//     opacity: 0, scale: 0.9,
//     transition: { duration: 0.25, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// const centerVariants = {
//   hidden:  { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1,   transition: { duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
//   exit:    { opacity: 0, scale: 0.85, transition: { duration: 0.25 } },
// };

// const footerVariants = {
//   hidden:  { opacity: 0, y: 12 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.55, ease: "easeOut" } },
//   exit:    { opacity: 0,       transition: { duration: 0.2 } },
// };

// /* ─── Component ─────────────────────────────────────────────────────── */

// export default function FullscreenNav() {
//   const [open, setOpen]           = useState(false);
//   const [activeIdx, setActiveIdx] = useState(null);
//   const router = useRouter();

//   const RADIUS    = 200;
//   const itemCount = menuItems.length;

//   // Body scroll lock
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   // Reset hover when menu closes
//   useEffect(() => { if (!open) setActiveIdx(null); }, [open]);

//   const close = () => setOpen(false);

//   // Close menu first, then navigate after exit animation
//   const navigate = (e, link) => {
//     e.preventDefault();
//     close();
//     setTimeout(() => router.push(link), 350);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500&display=swap');

//         .font-display     { font-family: 'Cormorant Garamond', serif; }
//         .font-sans-custom { font-family: 'Montserrat', sans-serif; }

//         /* Grain */
//         .menu-grain::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
//           pointer-events: none;
//           opacity: 0.35;
//           z-index: 0;
//         }

//         /* Ring item base */
//         .ring-item {
//           position: absolute;
//           left: 50%; top: 50%;
//           text-decoration: none;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           cursor: pointer;
//         }
//         .ring-item-inner {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 5px;
//           padding: 8px 16px;
//           border-radius: 4px;
//           transition: background 0.3s ease;
//         }
//         .ring-item-number {
//           font-family: 'Montserrat', sans-serif;
//           font-size: 0.6rem;
//           font-weight: 500;
//           letter-spacing: 0.2em;
//           color: rgba(255,255,255,0.25);
//           transition: color 0.3s ease;
//         }
//         .ring-item-name {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.15rem;
//           font-weight: 400;
//           letter-spacing: 0.08em;
//           color: rgba(255,255,255,0.35);
//           transition: color 0.3s ease, font-size 0.25s ease;
//           white-space: nowrap;
//         }
//         .ring-item-line {
//           width: 0; height: 1px;
//           background: rgba(255,255,255,0.5);
//           transition: width 0.3s ease;
//         }
//         .ring-item.is-active .ring-item-number { color: rgba(255,255,255,0.55); }
//         .ring-item.is-active .ring-item-name   { color: rgba(255,255,255,0.95); font-size: 1.25rem; }
//         .ring-item.is-active .ring-item-line   { width: 32px; }
//         .ring-item.is-active .ring-item-inner  { background: rgba(255,255,255,0.04); }
//         .ring-item.is-dimmed .ring-item-name   { color: rgba(255,255,255,0.12); }
//         .ring-item.is-dimmed .ring-item-number { color: rgba(255,255,255,0.1);  }

//         /* Mobile item hover underline */
//         .mobile-link-item::after {
//           content: '';
//           display: block;
//           height: 1px;
//           background: rgba(255,255,255,0.15);
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
//         }
//         .mobile-link-item:hover::after { transform: scaleX(1); }
//       `}</style>

//       {/* ══════════════════════════════════════════════════════════
//           FIXED HEADER
//       ══════════════════════════════════════════════════════════ */}
//       <header className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-8 md:px-14 h-[72px]">

//         <Link
//           href="/"
//           onClick={close}
//           className="font-display text-2xl font-semibold tracking-[0.2em] uppercase text-white select-none z-[70]"
//         >
//           tezh<span className="text-white/30">.</span>
//         </Link>

//         {/* Hamburger ↔ X */}
//         <button
//           onClick={() => setOpen((v) => !v)}
//           aria-label={open ? "Close menu" : "Open menu"}
//           className="relative z-[70] flex flex-col items-end justify-center w-10 h-10 focus:outline-none"
//         >
//           <motion.span
//             className="block h-[1.5px] bg-white rounded-full origin-center"
//             animate={
//               open
//                 ? { width: 24, rotate: 45,  translateY: "0.38rem" }
//                 : { width: 24, rotate: 0,   translateY: 0 }
//             }
//             transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//           />
//           <motion.span
//             className="block h-[1.5px] bg-white rounded-full origin-center mt-[7px]"
//             animate={
//               open
//                 ? { width: 24, rotate: -45, translateY: "-0.38rem" }
//                 : { width: 18, rotate: 0,   translateY: 0 }
//             }
//             transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//           />
//         </button>
//       </header>

//       {/* ══════════════════════════════════════════════════════════
//           FULLSCREEN OVERLAY
//       ══════════════════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             key="overlay"
//             className="menu-grain fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {/* Ambient glow */}
//             <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-3xl translate-x-1/3 -translate-y-1/3" />

//             {/* ── DESKTOP: Donut Ring ── */}
//             <div className="hidden lg:flex flex-1 items-center justify-center relative z-10">
//               <div className="relative w-[500px] h-[500px] flex items-center justify-center">

//                 {/* Outer ring */}
//                 <motion.div
//                   className="absolute inset-0 rounded-full pointer-events-none"
//                   style={{ border: "1px solid rgba(255,255,255,0.08)" }}
//                   animate={{
//                     borderColor: activeIdx !== null
//                       ? "rgba(255,255,255,0.18)"
//                       : "rgba(255,255,255,0.08)",
//                   }}
//                   transition={{ duration: 0.4 }}
//                 />
//                 {/* Inner ring */}
//                 <div
//                   className="absolute rounded-full pointer-events-none"
//                   style={{ inset: 80, border: "1px solid rgba(255,255,255,0.04)" }}
//                 />

//                 {/* Center preview */}
//                 <motion.div
//                   className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 pointer-events-none"
//                   variants={centerVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                 >
//                   <div className="w-[130px] h-[130px] rounded-full overflow-hidden border border-white/15">
//                     <AnimatePresence mode="wait">
//                       {activeIdx !== null ? (
//                         <motion.img
//                           key={activeIdx}
//                           src={menuItems[activeIdx].image}
//                           alt={menuItems[activeIdx].name}
//                           className="w-full h-full object-cover"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           exit={{ opacity: 0 }}
//                           transition={{ duration: 0.25 }}
//                         />
//                       ) : (
//                         <motion.div
//                           key="placeholder"
//                           className="w-full h-full flex items-center justify-center"
//                           style={{
//                             background:
//                               "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.06), transparent 70%)",
//                           }}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           exit={{ opacity: 0 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <div className="w-[6px] h-[6px] rounded-full bg-white/20" />
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <motion.span
//                     className="font-display text-2xl font-light tracking-[0.06em] text-white/90 whitespace-nowrap"
//                     animate={{ opacity: activeIdx !== null ? 1 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {activeIdx !== null ? menuItems[activeIdx].name : ""}
//                   </motion.span>
//                 </motion.div>

//                 {/* Ring items */}
//                 {menuItems.map((item, i) => {
//                   const angleDeg = (i / itemCount) * 360 - 90;
//                   const angleRad = (angleDeg * Math.PI) / 180;
//                   const x        = Math.cos(angleRad) * RADIUS;
//                   const y        = Math.sin(angleRad) * RADIUS;
//                   const isActive = activeIdx === i;
//                   const isDimmed = activeIdx !== null && !isActive;

//                   return (
//                     <motion.a
//                       key={item.name}
//                       href={item.link}
//                       custom={i}
//                       variants={ringItemVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className={`ring-item ${isActive ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""}`}
//                       style={{
//                         transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
//                       }}
//                       onMouseEnter={() => setActiveIdx(i)}
//                       onMouseLeave={() => setActiveIdx(null)}
//                       onClick={(e) => navigate(e, item.link)}
//                     >
//                       <div className="ring-item-inner">
//                         <span className="ring-item-number">{item.label}</span>
//                         <span className="ring-item-name">{item.name}</span>
//                         <span className="ring-item-line" />
//                       </div>
//                     </motion.a>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* ── MOBILE: Staggered vertical list ── */}
//             <motion.nav
//               className="lg:hidden flex flex-col items-start justify-center flex-1 px-8 md:px-16 relative z-10"
//               variants={listVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {menuItems.map((item) => (
//                 <motion.div
//                   key={item.name}
//                   variants={mobileItemVariants}
//                   className="w-full overflow-hidden"
//                 >
//                   <a
//                     href={item.link}
//                     onClick={(e) => navigate(e, item.link)}
//                     className="mobile-link-item flex items-baseline gap-5 py-3 w-full text-white/20 hover:text-white transition-colors duration-300 cursor-pointer no-underline"
//                     style={{ textDecoration: "none" }}
//                   >
//                     <span className="font-sans-custom text-[0.6rem] font-medium tracking-[0.2em] text-white/20 self-center shrink-0">
//                       {item.label}
//                     </span>
//                     <span className="font-display text-5xl md:text-6xl font-light leading-[1.05] tracking-tight">
//                       {item.name}
//                     </span>
//                   </a>
//                 </motion.div>
//               ))}
//             </motion.nav>

//             {/* ── Footer ── */}
//             <motion.div
//               className="relative z-10 px-8 md:px-14 lg:px-20 pb-8 pt-5 flex items-center justify-between border-t border-white/[0.06]"
//               variants={footerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <p className="font-sans-custom text-[0.6rem] tracking-[0.2em] text-white/20 uppercase">
//                 © {new Date().getFullYear()} Tezh
//               </p>
//               <div className="flex gap-6">
//                 {["Twitter", "LinkedIn", "Instagram"].map((s) => (
//                   <a
//                     key={s}
//                     href="#"
//                     className="font-sans-custom text-[0.6rem] tracking-[0.15em] text-white/20 hover:text-white/60 transition-colors duration-300 uppercase"
//                   >
//                     {s}
//                   </a>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }