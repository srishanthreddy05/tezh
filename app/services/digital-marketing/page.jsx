"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ─── Page Data ─────────────────────────────────────────────────────── */

const offerings = [
  {
    number: "01",
    icon: "⬡",
    title: "SEO",
    desc: "Boost your visibility and organic rankings with technical audits, on-page optimization, and authoritative link-building strategies built for long-term growth.",
  },
  {
    number: "02",
    icon: "◈",
    title: "PPC",
    desc: "Drive precisely targeted traffic with pay-per-click campaigns engineered for maximum ROI — every budget dollar tracked, tested, and optimized continuously.",
  },
  {
    number: "03",
    icon: "◎",
    title: "Social Media",
    desc: "Build community and drive conversions across all major platforms — with content calendars, community management, and paid social strategies that actually perform.",
  },
  {
    number: "04",
    icon: "◉",
    title: "Content Marketing",
    desc: "Attract, educate, and convert your ideal customers with high-quality content — from blog strategy and thought leadership to videos and interactive assets.",
  },
  {
    number: "05",
    icon: "⬡",
    title: "Email Automation",
    desc: "Nurture leads and delight customers with intelligent automated email flows — personalized, timely, and designed to move people through your funnel effortlessly.",
  },
  {
    number: "06",
    icon: "◈",
    title: "Analytics & Reporting",
    desc: "Track, measure, and continuously optimize your marketing ROI with unified dashboards, attribution modeling, and clear reporting that ties spend to revenue.",
  },
];

const whyChoose = [
  {
    icon: "◈",
    title: "Technology",
    desc: "Modern marketing stacks, best-in-class analytics platforms, and automation tooling — giving you an unfair advantage in every channel you compete in.",
  },
  {
    icon: "◉",
    title: "Trust",
    desc: "Transparent reporting, no vanity metrics, and a proven track record — you always know exactly what we're doing, why, and what it's delivering.",
  },
  {
    icon: "◎",
    title: "Team",
    desc: "Digital strategists, creatives, and performance marketers who combine data with storytelling to build brands that grow and campaigns that convert.",
  },
];

const stats = [
  { value: "3.5x",  label: "Avg. ROAS Delivered" },
  { value: "210%",  label: "Avg. Organic Traffic Lift" },
  { value: "80+",   label: "Brands Grown" },
  { value: "Full",  label: "Funnel Coverage" },
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

  .sp-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    background: var(--bg-raised);
    transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
    position: relative; overflow: hidden;
  }
  .sp-card:hover {
    background: var(--surface);
    border-color: rgba(255,255,255,0.13);
    transform: translateY(-4px);
  }
  .sp-card::before {
    content: ''; position: absolute; top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    transition: left 0.5s ease; pointer-events: none;
  }
  .sp-card:hover::before { left: 160%; }
  .sp-card-bar {
    position: absolute; bottom: 0; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.22), transparent);
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .sp-card:hover .sp-card-bar { width: 100%; }

  .sp-why {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 36px 32px;
    background: var(--surface);
    transition: border-color 0.3s ease, transform 0.3s ease;
    position: relative; overflow: hidden;
  }
  .sp-why:hover {
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-3px);
  }
  .sp-why-line {
    position: absolute; bottom: 0; left: 0;
    height: 1px; width: 0;
    background: rgba(255,255,255,0.1);
    transition: width 0.4s ease;
  }
  .sp-why:hover .sp-why-line { width: 100%; }

  .sp-stat {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px 28px;
    background: var(--bg-raised);
    text-align: center;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .sp-stat:hover {
    background: var(--surface);
    border-color: rgba(255,255,255,0.12);
  }

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
        {/* Breadcrumb */}
        <Reveal delay={0}>
          <div className="sp-body flex items-center justify-center gap-2 mb-8 text-[0.7rem]"
            style={{ color: "var(--faint)" }}>
            <Link href="/" className="sp-bc">Home</Link>
            <span>/</span>
            <Link href="/services" className="sp-bc">Services</Link>
            <span>/</span>
            <span style={{ color: "var(--muted)" }}>Digital Marketing</span>
          </div>
        </Reveal>

        {/* Eyebrow */}
        <Reveal delay={0.05}>
          <span className="sp-body inline-flex items-center gap-3 text-[0.62rem] tracking-[0.3em] uppercase mb-7"
            style={{ color: "var(--faint)" }}>
            <span className="inline-block w-8 h-[1px] bg-white/15" />
            SEO, Paid Media & Growth Marketing
            <span className="inline-block w-8 h-[1px] bg-white/15" />
          </span>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.12} y={60}>
          <h1
            className="sp-display font-semibold leading-[1.04] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "var(--text)" }}
          >
            Digital{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              Marketing
            </em>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.22}>
          <p
            className="sp-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ color: "var(--muted)" }}
          >
            Grow your brand and reach with data-driven digital marketing —
            strategy, creativity, and analytics working together for measurable results.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="sp-cta">Get a Free Strategy Call →</a>
            <a
              href="#overview"
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
              Learn More ↓
            </a>
          </div>
        </Reveal>
      </motion.div>

      {/* Scroll indicator */}
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

/* ─── Overview + Stats ──────────────────────────────────────────────── */

function Overview() {
  return (
    <section
      id="overview"
      className="sp-grain relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg-raised)" }}
    >
      <Orb style={{ right: "0%", top: "0%",   width: 320, height: 320, animDelay: 1 }} />
      <Orb style={{ left: "0%", bottom: "0%", width: 260, height: 260, animDelay: 3 }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <Reveal>
              <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-4"
                style={{ color: "var(--faint)" }}>
                Overview
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="sp-display font-semibold leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text)" }}
              >
                Marketing built for{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
                  measurable growth
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="sp-body text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Our digital marketing services help you attract, engage, and convert your
                ideal customers. We combine strategy, creativity, and analytics for
                measurable growth — covering every channel from organic search and paid
                media to content, email, and social, all tied together with clear reporting
                that shows exactly what's driving results.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="sp-stat">
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

/* ─── Offerings ─────────────────────────────────────────────────────── */

function Offerings() {
  return (
    <section
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
                What's included
              </span>
              <h2
                className="sp-display font-semibold"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--text)" }}
              >
                Core Offerings
              </h2>
            </div>
            <p className="sp-body text-sm hidden sm:block text-right max-w-xs"
              style={{ color: "var(--muted)" }}>
              Every channel is strategized, executed, and optimized end-to-end by our team.
            </p>
          </div>
        </Reveal>

        <div className="sp-hr mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {offerings.map((item, i) => (
            <OfferingCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferingCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sp-card h-full">
        <div className="sp-card-bar" />
        <div className="flex items-start justify-between mb-6">
          <span className="text-xl" style={{ color: "var(--faint)" }}>{item.icon}</span>
          <span className="sp-body text-[0.58rem] tracking-[0.25em]" style={{ color: "var(--faint)" }}>
            {item.number}
          </span>
        </div>
        <h3 className="sp-display font-medium mb-3 text-lg" style={{ color: "var(--text)" }}>
          {item.title}
        </h3>
        <p className="sp-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Why Choose ────────────────────────────────────────────────────── */

function WhyChoose() {
  return (
    <section
      className="sp-grain relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg-raised)" }}
    >
      <Orb style={{ right: "5%",  bottom: "10%", width: 350, height: 350, animDelay: 2 }} />
      <Orb style={{ left: "10%", top: "20%",    width: 280, height: 280, animDelay: 0 }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-3"
            style={{ color: "var(--faint)" }}>
            Why Tezh
          </span>
          <h2
            className="sp-display font-semibold"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text)" }}
          >
            Built on three pillars
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChoose.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="sp-why">
                <div className="sp-why-line" />
                <span className="text-2xl block mb-6" style={{ color: "var(--faint)" }}>
                  {item.icon}
                </span>
                <h3 className="sp-display font-semibold text-xl mb-3" style={{ color: "var(--text)" }}>
                  {item.title}
                </h3>
                <p className="sp-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ────────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section
      className="sp-grain relative py-28 px-6 text-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Orb style={{ left: "25%", top: "20%",    width: 550, height: 550, animDelay: 0 }} />
      <Orb style={{ right: "10%", bottom: "10%", width: 350, height: 350, animDelay: 2 }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal delay={0}>
          <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-5"
            style={{ color: "var(--faint)" }}>
            Ready to grow?
          </span>
        </Reveal>
        <Reveal delay={0.1} y={50}>
          <h2
            className="sp-display font-semibold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--text)" }}
          >
            Let's grow your{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              brand online
            </em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="sp-body text-base md:text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "var(--muted)" }}>
            Get a complimentary marketing audit and discover exactly where better
            strategy can accelerate your traffic, leads, and revenue.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="sp-cta">Get a Free Strategy Call →</a>
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
              ← All Services
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

export default function DigitalMarketingPage() {
  return (
    <>
      <style>{CSS}</style>
      <main className="sp-body w-full min-h-screen" style={{ background: "var(--bg)" }}>
        <Hero />
        <Overview />
        <Offerings />
        <WhyChoose />
        <CTABanner />
      </main>
    </>
  );
}