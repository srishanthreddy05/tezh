"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────────── */

const services = [
  {
    number: "01",
    title: "IT Services",
    desc: "Network architecture, cloud infrastructure, and managed support — engineered for security, reliability, and scale.",
    icon: "⬡",
    link: "/services/it-services",
    tag: "Infrastructure",
  },
  {
    number: "02",
    title: "Automation Solutions",
    desc: "Eliminate bottlenecks and unlock productivity by intelligently automating your most complex business workflows.",
    icon: "◈",
    link: "/services/automation",
    tag: "Efficiency",
  },
  {
    number: "03",
    title: "Data Analytics",
    desc: "Transform raw data into decisive insight. Advanced pipelines, dashboards, and predictive models built for clarity.",
    icon: "◎",
    link: "/services/data-analytics",
    tag: "Intelligence",
  },
  {
    number: "04",
    title: "AI Agents",
    desc: "Purpose-built conversational and process AI agents that learn, adapt, and operate autonomously across your systems.",
    icon: "◉",
    link: "/services/ai-agents",
    tag: "AI & ML",
  },
  {
    number: "05",
    title: "App & Software Development",
    desc: "Custom mobile, web, and API solutions — from zero to production, built with precision and long-term maintainability.",
    icon: "▣",
    link: "/services/app-development",
    tag: "Engineering",
  },
  {
    number: "06",
    title: "Digital Transformation",
    desc: "Modernize legacy systems, optimize operations, and future-proof your organization with a clear digital strategy.",
    icon: "◐",
    link: "/services/digital-transformation",
    tag: "Strategy",
  },
  {
    number: "07",
    title: "Digital Marketing",
    desc: "Performance-driven SEO, PPC, and multi-channel campaigns that build brand authority and compound growth.",
    icon: "◑",
    link: "/services/digital-marketing",
    tag: "Growth",
  },
];

/* ─── Design tokens ─────────────────────────────────────────────────── */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

  :root {
    --bg:        #111214;
    --bg-raised: #16181b;
    --surface:   #1c1f23;
    --border:    rgba(255,255,255,0.06);
    --text:      rgba(255,255,255,0.90);
    --muted:     rgba(255,255,255,0.38);
    --faint:     rgba(255,255,255,0.12);
    --accent:    #c8cdd4;
  }

  .sv-display { font-family: 'Syne', sans-serif; }
  .sv-body    { font-family: 'DM Sans', sans-serif; }

  /* Noise grain */
  .sv-grain::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* Fine grid */
  .sv-grid-bg {
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  /* Service card */
  .sv-card {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    background: var(--bg-raised);
    cursor: pointer;
    transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
    overflow: hidden;
  }
  .sv-card:hover {
    background: var(--surface);
    border-color: rgba(255,255,255,0.13);
    transform: translateY(-5px);
  }

  /* Card shine sweep */
  .sv-card::before {
    content: '';
    position: absolute; top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    transition: left 0.55s ease;
    pointer-events: none;
  }
  .sv-card:hover::before { left: 160%; }

  /* Bottom accent bar */
  .sv-card-line {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.25), transparent);
    border-radius: 0 0 16px 16px;
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .sv-card:hover .sv-card-line { width: 100%; }

  /* Arrow */
  .sv-arrow {
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    color: var(--muted);
    font-size: 1rem;
  }
  .sv-card:hover .sv-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Tag pill */
  .sv-tag {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--faint);
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  .sv-card:hover .sv-tag {
    border-color: rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.45);
  }

  /* CTA button */
  .sv-cta {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    border-radius: 999px;
    background: rgba(255,255,255,0.9);
    color: #111214;
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem; font-weight: 500;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  .sv-cta:hover { background: #fff; transform: translateY(-2px); }
  .sv-cta::before {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
    transition: left 0.5s ease;
  }
  .sv-cta:hover::before { left: 150%; }

  /* Divider */
  .sv-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
  }

  /* Orb */
  .sv-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(180,180,200,0.07) 0%, transparent 70%);
  }
`;

/* ─── Helpers ───────────────────────────────────────────────────────── */

function Reveal({ children, delay = 0, y = 36, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Orb({ style }) {
  return (
    <motion.div
      className="sv-orb"
      style={style}
      animate={{ scale: [1, 1.18, 1], opacity: [1, 1.5, 1] }}
      transition={{ duration: 8 + (style.animDelay || 0), repeat: Infinity, ease: "easeInOut", delay: style.animDelay || 0 }}
    />
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */

function ServiceHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y     = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="sv-grain sv-grid-bg relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Orbs */}
      <Orb style={{ left: "8%",  top: "10%", width: 480, height: 480, animDelay: 0 }} />
      <Orb style={{ right: "5%", top: "50%", width: 380, height: 380, animDelay: 2 }} />
      <Orb style={{ left: "40%", bottom: "5%", width: 300, height: 300, animDelay: 4 }} />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Eyebrow */}
        <Reveal delay={0}>
          <span className="sv-body inline-flex items-center gap-3 text-[0.62rem] tracking-[0.3em] uppercase mb-8 block"
            style={{ color: "var(--faint)" }}>
            <span className="inline-block w-8 h-[1px] bg-white/15" />
            Our Capabilities
            <span className="inline-block w-8 h-[1px] bg-white/15" />
          </span>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1} y={60}>
          <h1
            className="sv-display font-semibold leading-[1.04] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)", color: "var(--text)" }}
          >
            Engineering Digital{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              Excellence
            </em>
            <br />
            Across Strategy, Systems{" "}
            <span style={{ color: "var(--faint)" }}>&amp;</span> Scale
          </h1>
        </Reveal>

        <Reveal delay={0.22}>
          <p
            className="sv-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ color: "var(--muted)" }}
          >
            We build secure, scalable, and intelligent systems that power business
            growth — from first concept to full-scale deployment.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="sv-cta">
              Start a Project <span>→</span>
            </a>
            <a
              href="#services"
              className="sv-body inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm transition-all duration-300 hover:text-white"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            >
              Explore Services ↓
            </a>
          </div>
        </Reveal>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="sv-body text-[0.5rem] tracking-[0.3em] uppercase" style={{ color: "var(--faint)" }}>
          Scroll
        </span>
        <div className="w-[1px] h-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)" }} />
      </motion.div>
    </section>
  );
}

/* ─── Service Card ──────────────────────────────────────────────────── */

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={service.link} className="sv-card block" style={{ textDecoration: "none" }}>
        <div className="sv-card-line" />

        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-2xl" style={{ color: "var(--faint)" }}>{service.icon}</span>
          <span className="sv-body text-[0.58rem] tracking-[0.25em]" style={{ color: "var(--faint)" }}>
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3
          className="sv-display font-medium mb-3 leading-tight"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "var(--text)" }}
        >
          {service.title}
        </h3>

        {/* Desc */}
        <p className="sv-body text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          {service.desc}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto">
          <span className="sv-tag">{service.tag}</span>
          <span className="sv-arrow">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Grid section ──────────────────────────────────────────────────── */

function ServiceGrid() {
  return (
    <section
      id="services"
      className="sv-grain relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--bg-raised)" }}
    >
      <Orb style={{ right: "0%", top: "0%",    width: 350, height: 350, animDelay: 1 }} />
      <Orb style={{ left:  "0%", bottom: "10%", width: 280, height: 280, animDelay: 3 }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="sv-body text-[0.62rem] tracking-[0.3em] uppercase block mb-3"
              style={{ color: "var(--faint)" }}>
              What we offer
            </span>
            <h2
              className="sv-display font-semibold leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text)" }}
            >
              {services.length} Service Areas
            </h2>
          </div>
          <p className="sv-body text-sm max-w-xs text-right hidden sm:block"
            style={{ color: "var(--muted)" }}>
            Each service is built to integrate seamlessly with the others — compounding value across your organization.
          </p>
        </Reveal>

        <div className="sv-divider mb-14" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.2} className="mt-16 text-center">
          <p className="sv-body text-sm mb-5" style={{ color: "var(--muted)" }}>
            Not sure which service fits your needs?
          </p>
          <a href="/contact" className="sv-cta">
            Talk to Our Team →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <>
      <style>{CSS}</style>
      <main className="sv-body w-full min-h-screen" style={{ background: "var(--bg)" }}>
        <ServiceHero />
        <ServiceGrid />
      </main>
    </>
  );
}