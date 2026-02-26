"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ─── Page Data ─────────────────────────────────────────────────────── */

const values = [
  {
    icon: "◈",
    title: "Innovation",
    desc: "We push boundaries, challenge assumptions, and embrace new ideas — because better solutions start with curious minds.",
  },
  {
    icon: "◎",
    title: "Collaboration",
    desc: "Great work happens together. We build teams that trust each other, communicate openly, and celebrate shared success.",
  },
  {
    icon: "◉",
    title: "Growth",
    desc: "We invest in your development — through mentorship, learning opportunities, and the space to take on challenges that stretch you.",
  },
  {
    icon: "⬡",
    title: "Ambition",
    desc: "We set high standards and back them with real support — empowering you to achieve more than you thought possible.",
  },
];

const perks = [
  { label: "Flexible Working", desc: "Remote-first culture with flexible hours that respect your life." },
  { label: "Learning Budget", desc: "Annual learning & development allowance for courses, conferences, and certifications." },
  { label: "Health & Wellbeing", desc: "Comprehensive health coverage and wellness programs." },
  { label: "Career Progression", desc: "Clear growth tracks and regular performance reviews with real feedback." },
  { label: "Inclusive Culture", desc: "A workplace where every voice matters and every background is valued." },
  { label: "Exciting Projects", desc: "Work on meaningful technology that shapes industries and businesses." },
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

  /* Value card */
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

  /* Perk item */
  .sp-perk {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    background: var(--surface);
    transition: border-color 0.3s ease, transform 0.3s ease;
    position: relative; overflow: hidden;
  }
  .sp-perk:hover {
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-3px);
  }
  .sp-perk-line {
    position: absolute; bottom: 0; left: 0;
    height: 1px; width: 0;
    background: rgba(255,255,255,0.1);
    transition: width 0.4s ease;
  }
  .sp-perk:hover .sp-perk-line { width: 100%; }

  /* Form inputs */
  .sp-input {
    width: 100%;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 18px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .sp-input::placeholder { color: var(--muted); }
  .sp-input:focus {
    border-color: rgba(255,255,255,0.2);
    background: var(--surface);
  }

  /* File input */
  .sp-file-label {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    background: var(--bg-raised);
    border: 1px dashed rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 18px;
    cursor: pointer;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .sp-file-label:hover {
    border-color: rgba(255,255,255,0.22);
    background: var(--surface);
  }

  /* CTA button */
  .sp-cta {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 999px;
    background: rgba(255,255,255,0.9);
    color: #111214;
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem; font-weight: 500;
    letter-spacing: 0.04em; text-decoration: none;
    border: none; cursor: pointer;
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
  .sp-cta:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .sp-bc { color: var(--faint); text-decoration: none; font-size: 0.75rem; transition: color 0.2s ease; }
  .sp-bc:hover { color: var(--muted); }

  /* Success state */
  .sp-success {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 48px 32px;
    background: var(--surface);
    text-align: center;
  }
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
            <span style={{ color: "var(--muted)" }}>Careers</span>
          </div>
        </Reveal>

        {/* Eyebrow */}
        <Reveal delay={0.05}>
          <span className="sp-body inline-flex items-center gap-3 text-[0.62rem] tracking-[0.3em] uppercase mb-7"
            style={{ color: "var(--faint)" }}>
            <span className="inline-block w-8 h-[1px] bg-white/15" />
            Join the Team
            <span className="inline-block w-8 h-[1px] bg-white/15" />
          </span>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.12} y={60}>
          <h1
            className="sp-display font-semibold leading-[1.04] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "var(--text)" }}
          >
            Build Your{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              Future
            </em>{" "}
            With Us
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.22}>
          <p
            className="sp-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ color: "var(--muted)" }}
          >
            Join a team where innovation, collaboration, and growth come together.
            We empower people to do their best work, make a real impact, and thrive
            in a culture that values curiosity, creativity, and ambition.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply" className="sp-cta">Apply Now →</a>
            <a
              href="#values"
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
              Our Culture ↓
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

/* ─── Commitment ────────────────────────────────────────────────────── */

function Commitment() {
  return (
    <section
      id="values"
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
                Your Career, Our Commitment
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="sp-display font-semibold leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text)" }}
              >
                A place where every{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
                  voice matters
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="sp-body text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                At Tezh Technologies, people are at the heart of everything we do. We're
                dedicated to fostering an inclusive workplace where every voice matters and
                every idea sparks change.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="sp-body text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Explore opportunities to grow, learn, and achieve more than you ever
                imagined — backed by a team that genuinely invests in your success.
              </p>
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50+",    label: "Team Members" },
                { value: "12+",    label: "Nationalities" },
                { value: "4.8★",   label: "Avg. Employee Rating" },
                { value: "100%",   label: "Remote-Friendly Roles" },
              ].map((s) => (
                <div key={s.label}
                  className="text-center"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "24px 28px",
                    background: "var(--bg-raised)",
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

/* ─── Values ────────────────────────────────────────────────────────── */

function Values() {
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
                What drives us
              </span>
              <h2
                className="sp-display font-semibold"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--text)" }}
              >
                Our Values
              </h2>
            </div>
            <p className="sp-body text-sm hidden sm:block text-right max-w-xs"
              style={{ color: "var(--muted)" }}>
              The principles that shape how we work, hire, and grow together.
            </p>
          </div>
        </Reveal>

        <div className="sp-hr mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.1}>
              <div className="sp-card">
                <div className="sp-card-bar" />
                <span className="text-xl block mb-5" style={{ color: "var(--faint)" }}>{item.icon}</span>
                <h3 className="sp-display font-medium mb-3 text-lg" style={{ color: "var(--text)" }}>
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

/* ─── Perks ─────────────────────────────────────────────────────────── */

function Perks() {
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
            Why join us
          </span>
          <h2
            className="sp-display font-semibold"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text)" }}
          >
            Life at Tezh
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map((item, i) => (
            <Reveal key={item.label} delay={(i % 3) * 0.08}>
              <div className="sp-perk h-full">
                <div className="sp-perk-line" />
                <h3 className="sp-display font-semibold text-base mb-2" style={{ color: "var(--text)" }}>
                  {item.label}
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

/* ─── Application Form ──────────────────────────────────────────────── */

function ApplyForm() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", skills: "" });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="apply"
      className="sp-grain relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Orb style={{ left: "25%", top: "10%",    width: 500, height: 500, animDelay: 0 }} />
      <Orb style={{ right: "5%", bottom: "10%", width: 320, height: 320, animDelay: 2 }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-3"
            style={{ color: "var(--faint)" }}>
            Your journey starts here
          </span>
          <h2
            className="sp-display font-semibold mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text)" }}
          >
            Apply to{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              Tezh
            </em>
          </h2>
          <p className="sp-body text-sm" style={{ color: "var(--muted)" }}>
            Don't see a specific role? Send us your details — we're always looking for exceptional people.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <motion.div
              className="sp-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-3xl mb-4" style={{ color: "var(--faint)" }}>◎</div>
              <h3 className="sp-display font-semibold text-xl mb-3" style={{ color: "var(--text)" }}>
                Application Received
              </h3>
              <p className="sp-body text-sm" style={{ color: "var(--muted)" }}>
                Thank you for your interest in Tezh Technologies. We'll review your application
                and be in touch within 3–5 business days.
              </p>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Name */}
              <div>
                <label className="sp-body block mb-2 text-xs tracking-wider uppercase"
                  style={{ color: "var(--faint)" }}>
                  Full Name *
                </label>
                <input
                  className="sp-input"
                  name="name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email + Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="sp-body block mb-2 text-xs tracking-wider uppercase"
                    style={{ color: "var(--faint)" }}>
                    Email *
                  </label>
                  <input
                    className="sp-input"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="sp-body block mb-2 text-xs tracking-wider uppercase"
                    style={{ color: "var(--faint)" }}>
                    Mobile
                  </label>
                  <input
                    className="sp-input"
                    name="mobile"
                    type="tel"
                    placeholder="+1 000 000 0000"
                    value={form.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="sp-body block mb-2 text-xs tracking-wider uppercase"
                  style={{ color: "var(--faint)" }}>
                  Skills & Expertise
                </label>
                <textarea
                  className="sp-input"
                  name="skills"
                  rows={3}
                  placeholder="e.g. React, Node.js, Cloud Architecture, Product Management..."
                  value={form.skills}
                  onChange={handleChange}
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* Resume */}
              <div>
                <label className="sp-body block mb-2 text-xs tracking-wider uppercase"
                  style={{ color: "var(--faint)" }}>
                  Resume / CV
                </label>
                <label className="sp-file-label" htmlFor="resume-upload">
                  <span style={{ fontSize: "1.2rem", color: "var(--faint)" }}>◈</span>
                  <span className="sp-body text-sm" style={{ color: fileName ? "var(--text)" : "var(--muted)" }}>
                    {fileName || "Attach your resume (PDF, DOC)"}
                  </span>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/* Divider */}
              <div className="sp-hr my-2" />

              {/* Submit */}
              <button
                className="sp-cta w-full justify-center"
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.email}
              >
                {loading ? (
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Sending…
                  </motion.span>
                ) : (
                  "Send Application →"
                )}
              </button>

              <p className="sp-body text-center text-xs" style={{ color: "var(--faint)" }}>
                Average response time: &lt; 3–5 business days · All applications are reviewed
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function CareersPage() {
  return (
    <>
      <style>{CSS}</style>
      <main className="sp-body w-full min-h-screen" style={{ background: "var(--bg)" }}>
        <Hero />
        <Commitment />
        <Values />
        <Perks />
        <ApplyForm />
      </main>
    </>
  );
}