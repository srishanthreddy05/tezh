"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─── Page Data ─────────────────────────────────────────────────────── */

const caseStudies = [
  {
    id: "01",
    icon: "⬡",
    tag: "Automation · AI",
    title: "E-commerce Automation Breakthrough",
    client: "Major Online Retailer",
    challenge: "An overwhelming support load and slow order processing were straining operations and frustrating customers at scale.",
    solution: "Implemented AI chatbots to handle routine inquiries and deployed RPA bots to automate returns and order tracking end-to-end.",
    outcomes: [
      { value: "70%", label: "Drop in support tickets" },
      { value: "32%", label: "Rise in customer satisfaction" },
      { value: "~50%", label: "Faster order-to-shipment time" },
      { value: "4mo", label: "Full ROI payback period" },
    ],
  },
  {
    id: "02",
    icon: "◈",
    tag: "Data Analytics · Healthcare",
    title: "Healthcare Data Integration",
    client: "Regional Hospital Network",
    challenge: "Patient records were scattered across incompatible legacy systems, slowing diagnosis and creating compliance risk.",
    solution: "Designed a secure data warehouse, integrated disparate databases, and built real-time dashboards for physicians and administrators.",
    outcomes: [
      { value: "Instant", label: "Unified patient history access" },
      { value: "↓", label: "Treatment delays eliminated" },
      { value: "100%", label: "Regulatory compliance achieved" },
      { value: "↓", label: "Audit risk significantly reduced" },
    ],
  },
  {
    id: "03",
    icon: "◎",
    tag: "Automation · FinTech",
    title: "Financial Compliance Automation",
    client: "Mid-Size Bank",
    challenge: "Thousands of staff hours consumed by manual compliance checks, with repeated late-report penalties eating into margins.",
    solution: "Introduced RPA bots that automatically validate transactions against regulatory requirements on a real-time basis.",
    outcomes: [
      { value: "50%", label: "Reduction in manual compliance effort" },
      { value: "£0", label: "Late-report penalties since launch" },
      { value: "100%", label: "Regulatory deadlines met consistently" },
      { value: "↑", label: "Staff redeployed to strategic work" },
    ],
  },
  {
    id: "04",
    icon: "◉",
    tag: "IoT · Predictive Analytics",
    title: "Manufacturing Predictive Maintenance",
    client: "Industrial Manufacturer",
    challenge: "Unplanned equipment downtime was disrupting production schedules and costing millions in emergency maintenance and lost output.",
    solution: "Installed IoT sensors across production lines and applied machine-learning models to predict failures before they occurred.",
    outcomes: [
      { value: "40%", label: "Reduction in equipment downtime" },
      { value: "Millions", label: "Saved in maintenance costs" },
      { value: "↑", label: "Production schedule reliability" },
      { value: "↑", label: "Customer satisfaction improved" },
    ],
  },
  {
    id: "05",
    icon: "⬡",
    tag: "Data Analytics · Retail",
    title: "Retail Customer Insights Platform",
    client: "National Retail Chain",
    challenge: "No clear visibility into buying patterns across hundreds of stores — leaving inventory planning reactive and product placement guesswork.",
    solution: "Built an analytics platform consolidating sales data with predictive models to recommend optimal product placements chain-wide.",
    outcomes: [
      { value: "18%", label: "Increase in average basket size" },
      { value: "↓", label: "Excess stock and waste reduced" },
      { value: "↑", label: "Inventory planning accuracy" },
      { value: "Stores", label: "Unified data across all locations" },
    ],
  },
  {
    id: "06",
    icon: "◈",
    tag: "Cloud · Infrastructure",
    title: "SaaS Startup Cloud Scaling",
    client: "High-Growth SaaS Company",
    challenge: "Frequent outages during traffic spikes were damaging reputation, stalling product releases, and limiting growth capacity.",
    solution: "Migrated infrastructure to a hybrid cloud with auto-scaling capabilities engineered for unpredictable, high-demand workloads.",
    outcomes: [
      { value: "25%", label: "Drop in infrastructure costs" },
      { value: "3x", label: "User base supported — no new hardware" },
      { value: "↑", label: "Application response times" },
      { value: "↑", label: "Faster product release cadence" },
    ],
  },
];

const stats = [
  { value: "6+",   label: "Industries Served" },
  { value: "50+",  label: "Projects Delivered" },
  { value: "100%", label: "Client Retention Rate" },
  { value: "4mo",  label: "Avg. Time to ROI" },
];

/* ─── Styles ────────────────────────────────────────────────────────── */

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
  .sp-display { font-family: 'Syne', sans-serif; }
  .sp-body    { font-family: 'DM Sans', sans-serif; }

  .sp-grain::before {
    content: ''; position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  .sp-grid {
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  .sp-hr {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
  }

  /* Case study card */
  .sp-case {
    border: 1px solid var(--border);
    border-radius: 20px;
    background: var(--bg-raised);
    overflow: hidden;
    transition: border-color 0.35s ease, transform 0.35s ease;
    cursor: pointer;
    position: relative;
  }
  .sp-case:hover {
    border-color: rgba(255,255,255,0.13);
    transform: translateY(-4px);
  }
  .sp-case-bar {
    position: absolute; bottom: 0; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.22), transparent);
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .sp-case:hover .sp-case-bar { width: 100%; }

  /* Outcome stat */
  .sp-outcome {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px;
    background: var(--bg);
    text-align: center;
  }

  /* Modal */
  .sp-overlay {
    position: fixed; inset: 0;
    background: rgba(10,11,13,0.85);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }
  .sp-modal {
    background: var(--bg-raised);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    max-width: 680px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 40px;
    position: relative;
  }
  .sp-modal::-webkit-scrollbar { width: 4px; }
  .sp-modal::-webkit-scrollbar-track { background: transparent; }
  .sp-modal::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  /* CTA */
  .sp-cta {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 999px;
    background: rgba(255,255,255,0.9);
    color: #111214;
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem; font-weight: 500;
    letter-spacing: 0.04em; text-decoration: none;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  .sp-cta:hover { background: #fff; transform: translateY(-2px); }
  .sp-cta::before {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
    transition: left 0.5s ease;
  }
  .sp-cta:hover::before { left: 150%; }

  .sp-bc { color: var(--faint); text-decoration: none; font-size: 0.75rem; transition: color 0.2s ease; }
  .sp-bc:hover { color: var(--muted); }
`;

/* ─── Helpers ───────────────────────────────────────────────────────── */

function Reveal({ children, delay = 0, y = 32, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
      className="absolute rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(180,180,200,0.07) 0%, transparent 70%)",
        ...style,
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [1, 1.5, 1] }}
      transition={{
        duration: 7 + (style.animDelay || 0),
        repeat: Infinity, ease: "easeInOut",
        delay: style.animDelay || 0,
      }}
    />
  );
}

/* ─── Case Study Modal ──────────────────────────────────────────────── */

function CaseModal({ study, onClose }) {
  return (
    <AnimatePresence>
      {study && (
        <motion.div
          className="sp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="sp-modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="sp-body"
              style={{
                position: "absolute", top: 20, right: 20,
                background: "none", border: "none",
                color: "var(--muted)", fontSize: "1.2rem",
                cursor: "pointer", lineHeight: 1,
                padding: "4px 8px",
                borderRadius: 6,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <span style={{ fontSize: "1.6rem", color: "var(--faint)", lineHeight: 1, marginTop: 4 }}>
                {study.icon}
              </span>
              <div>
                <span className="sp-body block mb-1 text-[0.58rem] tracking-[0.25em] uppercase"
                  style={{ color: "var(--faint)" }}>
                  {study.tag}
                </span>
                <h3 className="sp-display font-semibold text-xl" style={{ color: "var(--text)" }}>
                  {study.title}
                </h3>
                <p className="sp-body text-xs mt-1" style={{ color: "var(--muted)" }}>
                  Client: {study.client}
                </p>
              </div>
            </div>

            <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

            {/* Challenge */}
            <div className="mb-6">
              <span className="sp-body block mb-2 text-[0.6rem] tracking-[0.25em] uppercase"
                style={{ color: "var(--faint)" }}>
                The Challenge
              </span>
              <p className="sp-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {study.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-8">
              <span className="sp-body block mb-2 text-[0.6rem] tracking-[0.25em] uppercase"
                style={{ color: "var(--faint)" }}>
                Our Solution
              </span>
              <p className="sp-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {study.solution}
              </p>
            </div>

            {/* Outcomes */}
            <div>
              <span className="sp-body block mb-3 text-[0.6rem] tracking-[0.25em] uppercase"
                style={{ color: "var(--faint)" }}>
                Key Outcomes
              </span>
              <div className="grid grid-cols-2 gap-3">
                {study.outcomes.map((o) => (
                  <div key={o.label} className="sp-outcome">
                    <span className="sp-display font-semibold block mb-1"
                      style={{ fontSize: "1.5rem", color: "var(--text)" }}>
                      {o.value}
                    </span>
                    <span className="sp-body text-xs" style={{ color: "var(--muted)" }}>
                      {o.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "var(--border)", margin: "28px 0" }} />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <a href="/contact" className="sp-cta">Work With Us →</a>
              <button
                onClick={onClose}
                className="sp-body text-sm"
                style={{
                  background: "none", border: "none",
                  color: "var(--muted)", cursor: "pointer",
                  padding: "8px 16px",
                }}
              >
                ← Back to Case Studies
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yShift  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="sp-grain sp-grid relative min-h-[82vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Orb style={{ left: "5%",  top: "8%",    width: 500, height: 500, animDelay: 0 }} />
      <Orb style={{ right: "4%", top: "45%",   width: 380, height: 380, animDelay: 2 }} />
      <Orb style={{ left: "42%", bottom: "3%", width: 300, height: 300, animDelay: 4 }} />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        style={{ y: yShift, opacity: fadeOut }}
      >
        <Reveal delay={0}>
          <div className="sp-body flex items-center justify-center gap-2 mb-8 text-[0.7rem]"
            style={{ color: "var(--faint)" }}>
            <Link href="/" className="sp-bc">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--muted)" }}>Case Studies</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="sp-body inline-flex items-center gap-3 text-[0.62rem] tracking-[0.3em] uppercase mb-7"
            style={{ color: "var(--faint)" }}>
            <span className="inline-block w-8 h-[1px] bg-white/15" />
            Proven Results in Action
            <span className="inline-block w-8 h-[1px] bg-white/15" />
          </span>
        </Reveal>

        <Reveal delay={0.12} y={60}>
          <h1
            className="sp-display font-semibold leading-[1.04] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "var(--text)" }}
          >
            Real Results,{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              Proven Impact
            </em>
          </h1>
        </Reveal>

        <Reveal delay={0.22}>
          <p
            className="sp-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ color: "var(--muted)" }}
          >
            Discover how we've helped businesses overcome challenges, unlock growth,
            and achieve measurable success — with real strategies, real clients, and
            outcomes you can benchmark against.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#studies" className="sp-cta">Explore Case Studies →</a>
            <a
              href="/contact"
              className="sp-body inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm transition-all duration-300"
              style={{ border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted)";
              }}
            >
              Work With Us ↗
            </a>
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="sp-body text-[0.5rem] tracking-[0.3em] uppercase" style={{ color: "var(--faint)" }}>Scroll</span>
        <div className="w-[1px] h-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }} />
      </motion.div>
    </section>
  );
}

/* ─── Overview Stats ────────────────────────────────────────────────── */

function Overview() {
  return (
    <section
      className="sp-grain relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg-raised)" }}
    >
      <Orb style={{ right: "0%", top: "0%",   width: 320, height: 320, animDelay: 1 }} />
      <Orb style={{ left: "0%", bottom: "0%", width: 260, height: 260, animDelay: 3 }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-4"
                style={{ color: "var(--faint)" }}>
                About our work
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="sp-display font-semibold leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text)" }}
              >
                Every project{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
                  tells a story
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="sp-body text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                At Tezh Technologies, every engagement is built on a deep understanding
                of the problem, a precise solution, and a commitment to measurable outcomes.
                See how our clients turned obstacles into opportunities — and what's possible
                for your business too.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "24px 28px",
                    background: "var(--bg-raised)",
                    textAlign: "center",
                  }}>
                  <span
                    className="sp-display font-semibold block mb-1"
                    style={{ fontSize: "2rem", color: "var(--text)" }}
                  >
                    {s.value}
                  </span>
                  <span className="sp-body text-xs" style={{ color: "var(--muted)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Case Studies Grid ─────────────────────────────────────────────── */

function CaseStudiesGrid({ onSelect }) {
  return (
    <section
      id="studies"
      className="sp-grain relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Orb style={{ left: "50%", top: "10%", width: 500, height: 500, animDelay: 0 }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-3"
                style={{ color: "var(--faint)" }}>
                Client Stories
              </span>
              <h2
                className="sp-display font-semibold"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--text)" }}
              >
                Case Studies
              </h2>
            </div>
            <p className="sp-body text-sm hidden sm:block text-right max-w-xs"
              style={{ color: "var(--muted)" }}>
              Click any case study to explore the full challenge, solution, and outcomes.
            </p>
          </div>
        </Reveal>

        <div className="sp-hr mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ study, index, onSelect }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(study)}
    >
      <div className="sp-case h-full" style={{ display: "flex", flexDirection: "column" }}>
        <div className="sp-case-bar" />

        <div style={{ padding: "28px 28px 0" }}>
          <div className="flex items-start justify-between mb-5">
            <span style={{ fontSize: "1.3rem", color: "var(--faint)" }}>{study.icon}</span>
            <span className="sp-body text-[0.55rem] tracking-[0.25em]"
              style={{ color: "var(--faint)" }}>
              {study.id}
            </span>
          </div>

          <span className="sp-body block mb-3 text-[0.58rem] tracking-[0.2em] uppercase"
            style={{ color: "var(--faint)" }}>
            {study.tag}
          </span>

          <h3 className="sp-display font-medium mb-2 text-base leading-snug"
            style={{ color: "var(--text)" }}>
            {study.title}
          </h3>

          <p className="sp-body text-xs mb-1" style={{ color: "var(--faint)" }}>
            {study.client}
          </p>
        </div>

        <div style={{ padding: "16px 28px 0", flex: 1 }}>
          <p className="sp-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {study.challenge}
          </p>
        </div>

        {/* Key metric preview */}
        <div style={{
          margin: "20px 28px 28px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}>
          {study.outcomes.slice(0, 2).map((o) => (
            <div key={o.label} className="sp-outcome">
              <span className="sp-display font-semibold block"
                style={{ fontSize: "1.1rem", color: "var(--text)" }}>
                {o.value}
              </span>
              <span className="sp-body" style={{ fontSize: "0.6rem", color: "var(--muted)" }}>
                {o.label}
              </span>
            </div>
          ))}
        </div>

        {/* Read more */}
        <div style={{
          borderTop: "1px solid var(--border)",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span className="sp-body text-xs" style={{ color: "var(--faint)" }}>
            View full case study
          </span>
          <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>→</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── CTA Banner ────────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section
      className="sp-grain relative py-28 px-6 text-center overflow-hidden"
      style={{ background: "var(--bg-raised)" }}
    >
      <Orb style={{ left: "25%", top: "20%",    width: 550, height: 550, animDelay: 0 }} />
      <Orb style={{ right: "10%", bottom: "10%", width: 350, height: 350, animDelay: 2 }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal delay={0}>
          <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-5"
            style={{ color: "var(--faint)" }}>
            Ready to write your story?
          </span>
        </Reveal>
        <Reveal delay={0.1} y={50}>
          <h2
            className="sp-display font-semibold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--text)" }}
          >
            Let's create your{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              success story
            </em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="sp-body text-base md:text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "var(--muted)" }}>
            Whether you're looking to automate, scale, or transform — we'll work with
            you to deliver outcomes as measurable as the ones you've just read about.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="sp-cta">Start a Conversation →</a>
            <Link
              href="/services"
              className="sp-body inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm transition-all duration-300"
              style={{ border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted)";
              }}
            >
              Explore Services ↗
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="sp-body text-xs mt-6" style={{ color: "var(--faint)" }}>
            Average response time: &lt; 24 hours · No commitment required
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function CaseStudiesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{CSS}</style>
      <main className="sp-body w-full min-h-screen" style={{ background: "var(--bg)" }}>
        <Hero />
        <Overview />
        <CaseStudiesGrid onSelect={setSelected} />
        <CTABanner />
      </main>
      <CaseModal study={selected} onClose={() => setSelected(null)} />
    </>
  );
}