"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─── Animated counter ─────────────────────────────────────────────── */
function useAnimatedCounter(target, duration = 1800, triggered = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = null;
    let raf;
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(ease(p) * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  }, [target, duration, triggered]);
  return count;
}

/* ─── Scroll-reveal wrapper ────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 40, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ────────────────────────────────────────────── */
function StaggerReveal({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerChild = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Horizontal ticker ────────────────────────────────────────────── */
function Ticker({ items }) {
  return (
    <div className="overflow-hidden w-full select-none">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm tracking-[0.3em] uppercase text-white/15 font-light">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Floating grid orb background ────────────────────────────────── */
function GridOrb({ x, y, size, opacity, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`, top: `${y}%`,
        width: size, height: size,
        background: "radial-gradient(circle, rgba(180,180,200,0.07) 0%, transparent 70%)",
        opacity,
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.6, opacity] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Main page ────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

        :root {
          --bg-base:    #111214;
          --bg-raised:  #16181b;
          --bg-surface: #1c1f23;
          --border:     rgba(255,255,255,0.06);
          --text-primary: rgba(255,255,255,0.92);
          --text-secondary: rgba(255,255,255,0.40);
          --text-muted: rgba(255,255,255,0.18);
          --accent: #c8cdd4;
        }

        * { box-sizing: border-box; }

        .ab-page { background: var(--bg-base); color: var(--text-primary); }
        .ab-display { font-family: 'Syne', sans-serif; }
        .ab-body    { font-family: 'DM Sans', sans-serif; }

        /* Noise grain overlay on sections */
        .ab-grain {
          position: relative;
        }
        .ab-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.6;
          z-index: 1;
        }

        /* Fine grid lines */
        .ab-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* Stat card glow on hover */
        .stat-card {
          transition: background 0.35s ease, border-color 0.35s ease;
        }
        .stat-card:hover {
          background: var(--bg-surface) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }

        /* Value card */
        .val-card {
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .val-card:hover {
          background: var(--bg-surface) !important;
          transform: translateY(-4px);
        }

        /* CTA button shimmer */
        .cta-btn {
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s ease;
        }
        .cta-btn:hover::before { left: 140%; }

        /* Founder image tilt */
        .founder-img-wrap {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .founder-img-wrap:hover {
          transform: perspective(800px) rotateY(-4deg) rotateX(2deg) scale(1.02);
        }
      `}</style>

      <main className="ab-page ab-body w-full min-h-screen overflow-x-hidden">

        {/* ══════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════ */}
        <section className="ab-grain ab-grid-bg relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          {/* Orb glows */}
          <GridOrb x={10}  y={15}  size={500} opacity={0.7} delay={0} />
          <GridOrb x={75}  y={60}  size={400} opacity={0.5} delay={2} />
          <GridOrb x={50}  y={85}  size={300} opacity={0.4} delay={4} />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Eyebrow */}
            <Reveal delay={0}>
              <span className="ab-body inline-flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase text-white/35 mb-8">
                <span className="w-8 h-[1px] bg-white/20 inline-block" />
                About Tezh Technologies
                <span className="w-8 h-[1px] bg-white/20 inline-block" />
              </span>
            </Reveal>

            {/* Main headline — word by word stagger */}
            <Reveal delay={0.1} y={60}>
              <h1 className="ab-display font-semibold leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "var(--text-primary)" }}>
                Empowering Businesses<br />
                Through{" "}
                <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 300 }}>
                  Intelligent
                </span>{" "}
                Technology
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="ab-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
                style={{ color: "var(--text-secondary)" }}>
                We help ambitious companies unlock growth and efficiency with cutting-edge
                digital solutions, crafted by experts who care deeply about outcomes.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact"
                  className="cta-btn ab-display inline-block px-8 py-4 text-sm font-medium tracking-wide text-black rounded-full transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "var(--accent)" }}>
                  Start Your Project
                </a>
                <a href="#founder"
                  className="inline-block px-8 py-4 text-sm font-medium tracking-wide rounded-full border transition-all duration-300 hover:border-white/30 hover:text-white"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                  Meet the Founder
                </a>
              </div>
            </Reveal>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
            <div className="w-[1px] h-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }} />
          </motion.div>
        </section>

        {/* ── Ticker strip ── */}
        <div className="py-5 border-y overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
          <Ticker items={[
            "Technology", "Trust", "Team", "Innovation",
            "Strategy", "Digital Transformation", "AI & ML", "Cloud Solutions",
            "Product Design", "Engineering Excellence",
          ]} />
        </div>

        {/* ══════════════════════════════════════════════════
            FOUNDER
        ══════════════════════════════════════════════════ */}
        <section id="founder" className="ab-grain relative py-28 px-6 overflow-hidden" style={{ background: "var(--bg-raised)" }}>
          <GridOrb x={85} y={20} size={350} opacity={0.5} delay={1} />

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Image */}
            <Reveal delay={0} className="shrink-0">
              <div className="founder-img-wrap relative w-72 h-80 md:w-80 md:h-96">
                {/* Decorative border offset */}
                <div className="absolute -inset-[1px] rounded-2xl pointer-events-none"
                  style={{ border: "1px solid var(--border)" }} />
                <div className="absolute top-4 left-4 w-full h-full rounded-2xl pointer-events-none"
                  style={{ border: "1px solid rgba(255,255,255,0.04)" }} />

                <div className="w-full h-full rounded-2xl overflow-hidden"
                  style={{ background: "var(--bg-surface)" }}>
                  <img
                    src="/images/founder.jpg"
                    alt="Tej Kumar Ponnala"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(20%) contrast(1.05)" }}
                  />
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: "linear-gradient(to top, rgba(17,18,20,0.5) 0%, transparent 50%)" }} />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-5 -right-5 px-4 py-2 rounded-full text-xs tracking-wide"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✦ Founder & CEO
                </motion.div>
              </div>
            </Reveal>

            {/* Text */}
            <div className="flex-1">
              <Reveal delay={0.1}>
                <span className="text-[0.65rem] tracking-[0.3em] uppercase mb-4 block"
                  style={{ color: "var(--text-muted)" }}>
                  Leadership
                </span>
              </Reveal>
              <Reveal delay={0.18}>
                <h2 className="ab-display font-semibold mb-4 leading-tight"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-primary)" }}>
                  Tej Kumar Ponnala
                </h2>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
                  style={{ color: "var(--text-secondary)" }}>
                  Passionate about building technology that transforms businesses and empowers
                  people. With over a decade of experience delivering enterprise solutions, Tej
                  leads Tezh Technologies with a vision rooted in purpose-driven engineering.
                </p>
              </Reveal>

              {/* Stats */}
              <StaggerReveal className="flex gap-6 flex-wrap">
                {[
                  { target: 10, suffix: "+", label: "Years of Service" },
                  { target: 30, suffix: "+", label: "Projects Delivered" },
                  { target: 98, suffix: "%", label: "Client Satisfaction" },
                ].map((stat, i) => (
                  <StatCard key={i} {...stat} index={i} />
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            MISSION
        ══════════════════════════════════════════════════ */}
        <MissionSection />

        {/* ══════════════════════════════════════════════════
            CORE VALUES
        ══════════════════════════════════════════════════ */}
        <CoreValuesSection />

        {/* ══════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════ */}
        <CTASection />

      </main>
    </>
  );
}

/* ─── Stat card with animated counter ─────────────────────────────── */
function StatCard({ target, suffix, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count  = useAnimatedCounter(target, 1600, inView);

  return (
    <motion.div
      ref={ref}
      variants={staggerChild}
      className="stat-card flex flex-col px-6 py-5 rounded-xl min-w-[140px]"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
    >
      <span className="ab-display font-semibold leading-none mb-1"
        style={{ fontSize: "2.4rem", color: "var(--text-primary)" }}>
        {count}{suffix}
      </span>
      <span className="text-xs tracking-wide" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Mission ──────────────────────────────────────────────────────── */
function MissionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={ref} className="ab-grain relative overflow-hidden py-32 px-6"
      style={{ background: "var(--bg-base)" }}>
      <GridOrb x={50} y={50} size={700} opacity={0.4} delay={0} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <Reveal delay={0}>
          <span className="text-[0.65rem] tracking-[0.3em] uppercase mb-6 block"
            style={{ color: "var(--text-muted)" }}>
            Our Purpose
          </span>
        </Reveal>

        {/* Parallax headline */}
        <div className="overflow-hidden mb-6">
          <motion.h3
            className="ab-display font-light leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: "var(--text-primary)", x }}
          >
            Our mission is to{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 300 }}>
              elevate businesses
            </em>{" "}
            by blending innovation, strategy, and technology into every solution we deliver.
          </motion.h3>
        </div>

        {/* Animated divider line */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-8 mb-10 h-[1px] max-w-xs"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="ab-body text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            Every line of code, every design decision, and every strategy we devise is
            anchored in one thing: making our clients undeniably better at what they do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Core Values ──────────────────────────────────────────────────── */
function CoreValuesSection() {
  const values = [
    {
      number: "01",
      name: "Innovation",
      desc: "We embrace creativity and forward-thinking to deliver breakthrough solutions that outpace the status quo.",
      icon: "◈",
    },
    {
      number: "02",
      name: "Integrity",
      desc: "We act with radical honesty, transparency, and respect in every relationship — internal and external.",
      icon: "◉",
    },
    {
      number: "03",
      name: "Customer Success",
      desc: "We are obsessively dedicated to helping our clients achieve their goals, exceed expectations, and thrive.",
      icon: "◎",
    },
  ];

  return (
    <section className="ab-grain relative py-28 px-6 overflow-hidden"
      style={{ background: "var(--bg-raised)" }}>
      <GridOrb x={0}  y={0}  size={300} opacity={0.5} delay={0} />
      <GridOrb x={90} y={80} size={250} opacity={0.4} delay={3} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[0.65rem] tracking-[0.3em] uppercase"
              style={{ color: "var(--text-muted)" }}>
              What drives us
            </span>
            <div className="h-[1px] flex-1 max-w-[80px]"
              style={{ background: "var(--border)" }} />
            <span className="ab-display font-semibold text-3xl md:text-4xl"
              style={{ color: "var(--text-primary)" }}>
              Core Values
            </span>
          </div>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <motion.div
              key={v.number}
              variants={staggerChild}
              className="val-card group rounded-2xl p-8 cursor-default"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-2xl" style={{ color: "var(--text-muted)" }}>{v.icon}</span>
                <span className="ab-body text-[0.6rem] tracking-[0.25em]"
                  style={{ color: "var(--text-muted)" }}>
                  {v.number}
                </span>
              </div>
              <h4 className="ab-display font-semibold mb-4 text-2xl group-hover:text-white transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}>
                {v.name}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {v.desc}
              </p>

              {/* Bottom accent line */}
              <div className="mt-8 h-[1px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.12)" }} />
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ─── CTA ──────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="contact" className="ab-grain relative overflow-hidden py-32 px-6"
      style={{ background: "var(--bg-base)" }}>
      <GridOrb x={30} y={40} size={600} opacity={0.5} delay={0} />
      <GridOrb x={70} y={60} size={400} opacity={0.35} delay={2} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Reveal delay={0}>
          <span className="text-[0.65rem] tracking-[0.3em] uppercase mb-6 block"
            style={{ color: "var(--text-muted)" }}>
            Ready to begin?
          </span>
        </Reveal>
        <Reveal delay={0.1} y={50}>
          <h2 className="ab-display font-semibold leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", color: "var(--text-primary)" }}>
            Ready to transform<br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              your business?
            </em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-base md:text-lg mb-12 max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}>
            Let's talk about what we can build together. No templates — just purpose-built
            solutions for your unique challenges.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href="/contact"
            className="cta-btn ab-display inline-block px-10 py-5 rounded-full font-medium tracking-wide text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            style={{ background: "var(--accent)", fontSize: "0.95rem" }}
          >
            Get in Touch →
          </a>
        </Reveal>

        {/* Fine print */}
        <Reveal delay={0.45}>
          <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
            Average response time: &lt; 24 hours
          </p>
        </Reveal>
      </div>
    </section>
  );
}