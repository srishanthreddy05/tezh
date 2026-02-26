"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, useInView, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════ */

const services = [
  {
    num: "01", icon: "⬡",
    title: "IT Services",
    line: "Your Business Backbone — Secure, Scalable, Future-Ready.",
    href: "/services/it-services",
  },
  {
    num: "02", icon: "◈",
    title: "Automation Solutions",
    line: "Work Smarter. Let intelligent bots handle the rest.",
    href: "/services/automation",
  },
  {
    num: "03", icon: "◎",
    title: "Data Analytics",
    line: "Turn your data into your most powerful competitive edge.",
    href: "/services/data-analytics",
  },
  {
    num: "04", icon: "◉",
    title: "AI Agents",
    line: "Agents that learn, understand, and act — 24/7.",
    href: "/services/ai-agents",
  },
  {
    num: "05", icon: "⬡",
    title: "App Development",
    line: "Secure, scalable applications built around your users.",
    href: "/services/app-development",
  },
  {
    num: "06", icon: "◈",
    title: "Digital Transformation",
    line: "Reshape the way your business operates and grows.",
    href: "/services/digital-transformation",
  },
  {
    num: "07", icon: "◎",
    title: "Digital Marketing",
    line: "Data-driven growth across every channel that matters.",
    href: "/services/digital-marketing",
  },
];

const pillars = [
  {
    icon: "◈",
    title: "Technology",
    desc: "We harness AI, advanced analytics, and scalable infrastructure to craft solutions that are cutting-edge yet practical.",
  },
  {
    icon: "◉",
    title: "Trust",
    desc: "Complete transparency, highest integrity, every promise kept. The confidence of clients across industries and geographies.",
  },
  {
    icon: "◎",
    title: "Team",
    desc: "Collective expertise, creativity, and collaborative spirit. Every success we deliver is the result of a team that works with heart.",
  },
];

const process = [
  { num: "01", label: "Diagnose" },
  { num: "02", label: "Design" },
  { num: "03", label: "Deploy" },
  { num: "04", label: "Optimize" },
];

const stats = [
  { value: "10+", label: "Years of Service" },
  { value: "50+", label: "Projects Delivered" },
  { value: "6+",  label: "Industries Served" },
  { value: "100%", label: "Client Retention" },
];

/* ═══════════════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════════════ */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --bg:        #0e0f11;
    --bg-raised: #13151a;
    --surface:   #1a1d23;
    --border:    rgba(255,255,255,0.06);
    --text:      rgba(255,255,255,0.92);
    --muted:     rgba(255,255,255,0.38);
    --faint:     rgba(255,255,255,0.10);
    --accent:    #c6cad1;
    --gold:      rgba(220,195,145,0.9);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .sp-display { font-family: 'Syne', sans-serif; }
  .sp-body    { font-family: 'DM Sans', sans-serif; }

  /* Grain overlay */
  .sp-grain::before {
    content: ''; position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* Subtle grid */
  .sp-grid {
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  /* Divider */
  .sp-hr {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
    border: none;
  }

  /* Service card */
  .svc-card {
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 32px 28px;
    background: var(--bg-raised);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column; gap: 16px;
    transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
    cursor: default;
    text-decoration: none;
  }
  .svc-card:hover {
    background: var(--surface);
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-5px);
  }
  .svc-card::before {
    content: ''; position: absolute; top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.035), transparent);
    transition: left 0.55s ease; pointer-events: none;
  }
  .svc-card:hover::before { left: 160%; }
  .svc-bar {
    position: absolute; bottom: 0; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.2), transparent);
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .svc-card:hover .svc-bar { width: 100%; }
  .svc-arrow {
    opacity: 0; transform: translateX(-6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .svc-card:hover .svc-arrow { opacity: 1; transform: translateX(0); }

  /* Pillar card */
  .pillar-card {
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px 32px;
    background: var(--surface);
    position: relative; overflow: hidden;
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  .pillar-card:hover {
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-4px);
  }
  .pillar-line {
    position: absolute; bottom: 0; left: 0;
    height: 1px; width: 0;
    background: rgba(255,255,255,0.1);
    transition: width 0.4s ease;
  }
  .pillar-card:hover .pillar-line { width: 100%; }

  /* Process step */
  .process-step {
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px 24px;
    background: var(--bg-raised);
    text-align: center;
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
    position: relative; overflow: hidden;
  }
  .process-step:hover {
    background: var(--surface);
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-3px);
  }
  .process-step::after {
    content: attr(data-label);
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 4rem; font-weight: 800;
    color: rgba(255,255,255,0.02);
    pointer-events: none;
    letter-spacing: -0.05em;
  }

  /* Stat */
  .stat-box {
    text-align: center;
    padding: 32px 24px;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--bg-raised);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  .stat-box:hover {
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-3px);
  }

  /* CTA primary */
  .btn-primary {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 34px; border-radius: 999px;
    background: rgba(255,255,255,0.92);
    color: #0e0f11;
    font-family: 'Syne', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  .btn-primary:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(255,255,255,0.12);
  }
  .btn-primary::before {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
    transition: left 0.5s ease;
  }
  .btn-primary:hover::before { left: 150%; }

  /* CTA ghost */
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 34px; border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    text-decoration: none;
    transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  }
  .btn-ghost:hover {
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.8);
    transform: translateY(-2px);
  }

  /* Eyebrow label */
  .eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem; letter-spacing: 0.32em;
    text-transform: uppercase; color: rgba(255,255,255,0.28);
  }
  .eyebrow-line { display: inline-block; width: 32px; height: 1px; background: rgba(255,255,255,0.15); }

  /* Orb */
  .orb {
    position: absolute; border-radius: 50%;
    background: radial-gradient(circle, rgba(175,180,200,0.065) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Marquee */
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(80,80,80,0.5); border-radius: 6px; }
`;

/* ═══════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════ */

function Reveal({ children, delay = 0, y = 30, className = "", as = "div" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

function Orb({ style = {} }) {
  return (
    <motion.div
      className="orb"
      style={style}
      animate={{ scale: [1, 1.14, 1], opacity: [0.8, 1.3, 0.8] }}
      transition={{ duration: 8 + (style.animDelay || 0), repeat: Infinity, ease: "easeInOut", delay: style.animDelay || 0 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   GSAP ANIMATED LINES (kept from original)
═══════════════════════════════════════════════════════════════════════ */

function AnimatedLine({ children, staggerIndex = 0 }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!innerRef.current || !wrapRef.current) return;
    gsap.set(innerRef.current, { y: "110%", opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: wrapRef.current, start: "top 88%",
      onEnter: () => gsap.to(innerRef.current, { y: "0%", opacity: 1, duration: 0.85, ease: "power3.out", delay: staggerIndex * 0.1 }),
      onLeaveBack: () => gsap.to(innerRef.current, { y: "110%", opacity: 0, duration: 0.6, ease: "power3.in", delay: staggerIndex * 0.05 }),
    });
    return () => st.kill();
  }, [staggerIndex]);

  return (
    <div ref={wrapRef} style={{ overflow: "hidden", display: "block" }}>
      <span ref={innerRef} style={{ display: "block" }}>{children}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════════════════════════════ */

function Hero({ overlayRef, heroRef }) {
  return (
    <section
      ref={heroRef}
      className="sp-grain sp-grid relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/liquid.mp4"
        autoPlay loop muted playsInline
        style={{ opacity: 0.55 }}
      />

      {/* Scroll-driven overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(14,15,17,0.35) 0%, rgba(14,15,17,0.7) 100%)", opacity: 0 }}
      />

      {/* Decorative orbs */}
      <Orb style={{ left: "8%", top: "15%", width: 480, height: 480, animDelay: 0 }} />
      <Orb style={{ right: "6%", top: "40%", width: 360, height: 360, animDelay: 3 }} />

      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-6 text-center">
        {/* Eyebrow */}
        <motion.span
          className="eyebrow mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-line" />
          Tezh Technologies
          <span className="eyebrow-line" />
        </motion.span>

        {/* Headline */}
        <motion.h1
          className="sp-display"
          style={{
            fontSize: "clamp(3rem, 8.5vw, 7.5rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            maxWidth: "900px",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          The Future of Business —{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>Now.</em>
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="sp-body"
          style={{
            marginTop: "24px",
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            color: "rgba(255,255,255,0.48)",
            maxWidth: "560px",
            lineHeight: 1.65,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We build intelligent systems that transform how companies operate,
          scale, and compete in the digital era.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ marginTop: "48px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <a href="/contact" className="btn-primary">Get a Free Consultation →</a>
          <a href="#services" className="btn-ghost">Explore Services ↓</a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 30,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="sp-body" style={{ fontSize: "0.48rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }} />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 2 — POSITIONING (Marquee + Statement)
═══════════════════════════════════════════════════════════════════════ */

function Positioning() {
  const tags = ["Born in Technology", "Forged in Strategy", "Wired for Innovation", "Built for Scale", "Driven by Results", "Born in Technology", "Forged in Strategy", "Wired for Innovation", "Built for Scale", "Driven by Results"];

  return (
    <section style={{ background: "var(--bg-raised)", overflow: "hidden" }}>
      {/* Marquee strip */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "14px 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...tags, ...tags].map((t, i) => (
            <span key={i} className="sp-display" style={{
              fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--faint)",
              whiteSpace: "nowrap", padding: "0 40px",
            }}>
              {t} <span style={{ color: "rgba(255,255,255,0.08)", margin: "0 8px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Statement */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <Reveal>
              <span className="eyebrow" style={{ marginBottom: 20, display: "block" }}>
                <span className="eyebrow-line" />
                Strategic Positioning
              </span>
            </Reveal>
            <h2 className="sp-display" style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 600, lineHeight: 1.08, color: "var(--text)", letterSpacing: "-0.02em",
            }}>
              {["Reinventing Business", "Through Intelligent", "Systems"].map((line, i) => (
                <AnimatedLine key={i} staggerIndex={i}>{line}</AnimatedLine>
              ))}
            </h2>
          </div>
          <div>
            <Reveal delay={0.15}>
              <p className="sp-body" style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--muted)", marginBottom: 28 }}>
                We go beyond delivering software. We create future-ready technologies that fuel growth,
                unlock opportunities, and transform how our clients operate — with unwavering commitment
                to quality, scalability, and measurable outcomes.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <a href="/about" className="btn-ghost" style={{ fontSize: "0.82rem" }}>
                Our Story →
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 3 — THREE PILLARS
═══════════════════════════════════════════════════════════════════════ */

function Pillars() {
  return (
    <section className="sp-grain" style={{ background: "var(--bg)", position: "relative", padding: "100px 0" }}>
      <Orb style={{ left: "10%", top: "20%", width: 400, height: 400, animDelay: 1 }} />
      <Orb style={{ right: "5%", bottom: "10%", width: 320, height: 320, animDelay: 3 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <Reveal style={{ marginBottom: 64, textAlign: "center" }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "block", justifyContent: "center" }}>
            <span className="eyebrow-line" />
            What we stand for
            <span className="eyebrow-line" />
          </span>
          <h2 className="sp-display" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em" }}>
            Three Pillars. One Promise.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="pillar-card">
                <div className="pillar-line" />
                <span style={{ fontSize: "1.4rem", color: "var(--faint)", display: "block", marginBottom: 20 }}>{p.icon}</span>
                <h3 className="sp-display" style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>{p.title}</h3>
                <p className="sp-body" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--muted)" }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 4 — SERVICES GRID
═══════════════════════════════════════════════════════════════════════ */

function Services() {
  return (
    <section id="services" className="sp-grain" style={{ background: "var(--bg-raised)", padding: "100px 0", position: "relative" }}>
      <Orb style={{ left: "50%", top: "5%", width: 600, height: 600, animDelay: 0 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div>
            <Reveal>
              <span className="eyebrow" style={{ marginBottom: 12, display: "block" }}>
                <span className="eyebrow-line" />
                What we build
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="sp-display" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em" }}>
                Our Solutions
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href="/services" className="btn-ghost" style={{ fontSize: "0.82rem" }}>View All Services →</a>
          </Reveal>
        </div>

        <hr className="sp-hr" style={{ marginBottom: 48 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={service.href} className="svc-card" style={{ display: "flex", flexDirection: "column", gap: 16, textDecoration: "none" }}>
        <div className="svc-bar" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.2rem", color: "var(--faint)" }}>{service.icon}</span>
          <span className="sp-body" style={{ fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--faint)" }}>{service.num}</span>
        </div>
        <h3 className="sp-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text)" }}>{service.title}</h3>
        <p className="sp-body" style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, flex: 1 }}>{service.line}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <span className="sp-body" style={{ fontSize: "0.72rem", color: "var(--faint)", letterSpacing: "0.08em" }}>Explore</span>
          <span className="svc-arrow" style={{ color: "var(--muted)", fontSize: "0.8rem" }}>→</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 5 — CONSULTATIVE PROCESS
═══════════════════════════════════════════════════════════════════════ */

function Process() {
  return (
    <section style={{ background: "var(--bg)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div>
            <Reveal>
              <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>
                <span className="eyebrow-line" />
                How we work
              </span>
            </Reveal>
            <h2 className="sp-display" style={{ fontSize: "clamp(2rem, 3.2vw, 2.8rem)", fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {["Strategy Before", "Execution."].map((l, i) => (
                <AnimatedLine key={i} staggerIndex={i}>{l}</AnimatedLine>
              ))}
            </h2>
            <Reveal delay={0.2}>
              <p className="sp-body" style={{ marginTop: 24, fontSize: "0.95rem", lineHeight: 1.75, color: "var(--muted)", maxWidth: 420 }}>
                We don't just build — we diagnose first. Our consultative approach ensures
                that every solution we deliver is perfectly aligned with your unique business
                needs and long-term vision. We ask the hard questions so we can give you
                the right answers.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a href="/contact" className="btn-primary" style={{ marginTop: 36, display: "inline-flex" }}>
                Start a Conversation →
              </a>
            </Reveal>
          </div>

          {/* Right: Process grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {process.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="process-step" data-label={step.label}>
                  <span className="sp-body" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: 10 }}>
                    {step.num}
                  </span>
                  <span className="sp-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text)" }}>
                    {step.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 6 — SOCIAL PROOF / STATS
═══════════════════════════════════════════════════════════════════════ */

function SocialProof() {
  return (
    <section className="sp-grain" style={{ background: "var(--bg-raised)", padding: "100px 0", position: "relative" }}>
      <Orb style={{ left: "20%", top: "20%", width: 500, height: 500, animDelay: 2 }} />
      <Orb style={{ right: "10%", bottom: "10%", width: 350, height: 350, animDelay: 0 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "block", justifyContent: "center" }}>
            <span className="eyebrow-line" />
            By the numbers
            <span className="eyebrow-line" />
          </span>
          <h2 className="sp-display" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em" }}>
            Results That Speak
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 60 }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="stat-box">
                <span className="sp-display" style={{ fontSize: "2.6rem", fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 6, letterSpacing: "-0.04em" }}>
                  {s.value}
                </span>
                <span className="sp-body" style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.02em" }}>
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <hr className="sp-hr" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 7 — FOUNDER MESSAGE
═══════════════════════════════════════════════════════════════════════ */

function Founder() {
  return (
    <section style={{ background: "var(--bg)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "center" }}>
          {/* Portrait placeholder */}
          <Reveal>
            <div style={{
              aspectRatio: "3/4", borderRadius: 20,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              maxWidth: 380,
            }}>
              {/* Decorative geometric overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 30% 40%, rgba(175,180,200,0.06) 0%, transparent 60%)",
              }} />
              <span className="sp-display" style={{ fontSize: "5rem", color: "var(--faint)" }}>◎</span>
              <span className="sp-body" style={{
                position: "absolute", bottom: 24, left: 24, right: 24,
                fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--faint)", textAlign: "center",
              }}>
                Tej Ponnala · CEO
              </span>
            </div>
          </Reveal>

          {/* Message */}
          <div>
            <Reveal>
              <span className="eyebrow" style={{ marginBottom: 20, display: "block" }}>
                <span className="eyebrow-line" />
                From the Founder
              </span>
            </Reveal>

            <h2 className="sp-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {["A single mission:", "empower businesses to thrive."].map((l, i) => (
                <AnimatedLine key={i} staggerIndex={i}>{l}</AnimatedLine>
              ))}
            </h2>

            <Reveal delay={0.2}>
              <p className="sp-body" style={{ marginTop: 28, fontSize: "1rem", lineHeight: 1.8, color: "var(--muted)" }}>
                We go beyond delivering software solutions. We create innovative, future-ready
                technologies that fuel growth, unlock new opportunities, and transform the way
                our clients operate. With unwavering commitment to quality, scalability, and
                client success, Tezh Technologies doesn't just build solutions — we build
                long-term success stories for every client we serve.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 1, height: 48, background: "var(--border)" }} />
                <div>
                  <span className="sp-display" style={{ display: "block", fontWeight: 600, color: "var(--text)", fontSize: "1rem" }}>Tej Ponnala</span>
                  <span className="sp-body" style={{ fontSize: "0.78rem", color: "var(--faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>CEO, Tezh Technologies</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 8 — BLOG PREVIEW
═══════════════════════════════════════════════════════════════════════ */

function BlogPreview() {
  const posts = [
    { label: "Aug 30, 2025", tag: "Inside Tezh", title: "Hello World — Welcome to the Tezh Blog", min: "1 min read" },
    { label: "Sep 13, 2022", tag: "Growth", title: "10 Simple Practices to Get 1% Better Every Day", min: "2 min read" },
  ];

  return (
    <section style={{ background: "var(--bg-raised)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <Reveal>
              <span className="eyebrow" style={{ marginBottom: 12, display: "block" }}>
                <span className="eyebrow-line" />
                Knowledge base
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="sp-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em" }}>
                Insights & News
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href="/blog" className="btn-ghost" style={{ fontSize: "0.82rem" }}>View All →</a>
          </Reveal>
        </div>

        <hr className="sp-hr" style={{ marginBottom: 48 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.1}>
              <a href="/blog" style={{ textDecoration: "none" }}>
                <div style={{
                  border: "1px solid var(--border)", borderRadius: 18,
                  padding: "36px 32px", background: "var(--surface)",
                  transition: "border-color 0.3s, transform 0.3s",
                  cursor: "pointer", position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <span className="sp-body" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--faint)" }}>{post.tag}</span>
                    <span className="sp-body" style={{ fontSize: "0.65rem", color: "var(--faint)" }}>{post.label}</span>
                  </div>
                  <h3 className="sp-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text)", marginBottom: 20, lineHeight: 1.35 }}>{post.title}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="sp-body" style={{ fontSize: "0.72rem", color: "var(--faint)" }}>{post.min}</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>→</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 9 — FINAL CTA
═══════════════════════════════════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="sp-grain" style={{ background: "var(--bg)", padding: "140px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <Orb style={{ left: "20%", top: "15%", width: 600, height: 600, animDelay: 0 }} />
      <Orb style={{ right: "10%", bottom: "10%", width: 400, height: 400, animDelay: 2 }} />

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ marginBottom: 24, display: "block", justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Ready to begin?
            <span className="eyebrow-line" />
          </span>
        </Reveal>

        <h2 className="sp-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.04 }}>
          {["Have a project", "in mind?"].map((l, i) => (
            <AnimatedLine key={i} staggerIndex={i}>{l}</AnimatedLine>
          ))}
        </h2>

        <Reveal delay={0.2}>
          <p className="sp-body" style={{ marginTop: 24, fontSize: "1.05rem", color: "var(--muted)", maxWidth: 520, margin: "24px auto 0", lineHeight: 1.7 }}>
            At Tezh Technologies, we combine Technology, Trust, and Teamwork
            to craft solutions that drive measurable growth. Share your vision —
            together, we'll build something impactful.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ marginTop: 48, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "18px 40px" }}>
              Start a Conversation →
            </a>
            <a href="/case-studies" className="btn-ghost" style={{ fontSize: "0.9rem", padding: "18px 40px" }}>
              View Case Studies
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="sp-body" style={{ marginTop: 28, fontSize: "0.72rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.05em" }}>
            Average response time: &lt; 24 hours · No commitment required
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════ */

function Footer() {
  const links = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact Us", href: "/contact" },
    ],
    Services: [
      { label: "IT Services", href: "/services/it-services" },
      { label: "Automation Solutions", href: "/services/automation" },
      { label: "Data Analytics", href: "/services/data-analytics" },
      { label: "AI Agents", href: "/services/ai-agents" },
      { label: "App Development", href: "/services/app-development" },
      { label: "Digital Transformation", href: "/services/digital-transformation" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
    ],
  };

  return (
    <footer style={{ background: "var(--bg-raised)", borderTop: "1px solid var(--border)", padding: "80px 48px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <span className="sp-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 16 }}>
              Tezh Technologies
            </span>
            <p className="sp-body" style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: 280 }}>
              Your trusted partner in digital transformation — delivering innovative technology solutions tailored to your business needs.
            </p>
          </div>

          {/* Nav groups */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <span className="sp-body" style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: 20 }}>
                {group}
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{
                      color: "var(--muted)", textDecoration: "none",
                      fontSize: "0.85rem", transition: "color 0.2s ease",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Reach */}
          <div>
            <span className="sp-body" style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: 20 }}>
              Reach Us
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "◈", text: "info@tezht.com", href: "mailto:info@tezht.com" },
                { icon: "◎", text: "+91 93902 62628", href: "tel:+919390262628" },
                { icon: "◉", text: "Nawabpet, Mahbubnagar, Telangana — 509340", href: null },
              ].map((c) => (
                <div key={c.text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--faint)", fontSize: "0.75rem", marginTop: 2, flexShrink: 0 }}>{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} className="sp-body" style={{ fontSize: "0.82rem", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s", lineHeight: 1.5 }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                    >{c.text}</a>
                  ) : (
                    <span className="sp-body" style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>{c.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="sp-hr" style={{ marginBottom: 32 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span className="sp-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.15)" }}>
            © 2026 · Tezh Technologies · All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a key={t} href="#" className="sp-body" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.18)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--muted)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.18)"}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  const overlayRef = useRef(null);
  const heroRef    = useRef(null);

  // Lenis + GSAP parallax hero overlay
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      if (overlayRef.current && heroRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => { ctx.revert(); lenis.destroy(); };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <main>
        <Hero overlayRef={overlayRef} heroRef={heroRef} />
        <Positioning />
        <Pillars />
        <Services />
        <Process />
        <SocialProof />
        <Founder />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}