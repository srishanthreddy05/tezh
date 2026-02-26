"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

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

  /* Form inputs */
  .sp-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.25s ease;
  }
  .sp-input::placeholder { color: var(--faint); }
  .sp-input:focus { border-bottom-color: rgba(255,255,255,0.3); }

  .sp-textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    outline: none;
    resize: none;
    transition: border-color 0.25s ease;
    min-height: 100px;
  }
  .sp-textarea::placeholder { color: var(--faint); }
  .sp-textarea:focus { border-bottom-color: rgba(255,255,255,0.3); }

  /* Select */
  .sp-select {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    appearance: none;
    transition: border-color 0.25s ease;
  }
  .sp-select:focus { border-bottom-color: rgba(255,255,255,0.3); color: var(--text); }
  .sp-select option { background: #1c1f23; color: var(--text); }

  /* CTA button */
  .sp-cta {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px; border-radius: 999px;
    background: rgba(255,255,255,0.9);
    color: #111214;
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem; font-weight: 600;
    letter-spacing: 0.05em; text-decoration: none;
    border: none; cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  .sp-cta:hover { background: #fff; transform: translateY(-2px); }
  .sp-cta:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .sp-cta::before {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
    transition: left 0.5s ease;
  }
  .sp-cta:hover::before { left: 150%; }

  /* Info card */
  .sp-info-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    background: var(--bg-raised);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  .sp-info-card:hover {
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-3px);
  }

  /* FAQ */
  .sp-faq {
    border-bottom: 1px solid var(--border);
    transition: border-color 0.3s ease;
  }
  .sp-faq:first-child { border-top: 1px solid var(--border); }
  .sp-faq-btn {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 0;
    text-align: left;
    gap: 16px;
  }

  /* WhatsApp pill */
  .sp-wa {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    text-decoration: none;
    transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  }
  .sp-wa:hover {
    border-color: rgba(255,255,255,0.18);
    color: var(--text);
    transform: translateY(-2px);
  }

  .sp-bc { color: var(--faint); text-decoration: none; font-size: 0.75rem; transition: color 0.2s ease; }
  .sp-bc:hover { color: var(--muted); }

  /* Success */
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

/* ─── FAQ Data ──────────────────────────────────────────────────────── */

const faqs = [
  {
    q: "What services does Tezh Technologies offer?",
    a: "We provide a comprehensive range of technology services including IT infrastructure, AI & automation, app development, data analytics, digital marketing, and digital transformation — tailored to each client's unique needs.",
  },
  {
    q: "What happens after I send the contact form?",
    a: "Our team reviews every submission within 24 hours. We'll reach out to schedule a discovery call to understand your needs, define the scope, and propose a path forward — no obligation required.",
  },
  {
    q: "How do you ensure the success of my project?",
    a: "We use a structured delivery framework with clear milestones, regular check-ins, and transparent reporting. Every engagement is backed by defined SLAs and measurable outcomes from day one.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We've delivered projects across e-commerce, healthcare, financial services, manufacturing, retail, and SaaS. Our approach adapts to your industry's specific regulations, challenges, and growth dynamics.",
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sp-faq">
      <button className="sp-faq-btn" onClick={() => setOpen(!open)}>
        <span className="sp-display font-medium text-base" style={{ color: "var(--text)" }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: "var(--faint)", fontSize: "1.2rem", flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="sp-body text-sm leading-relaxed pb-6" style={{ color: "var(--muted)" }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      className="sp-grain sp-grid relative min-h-[70vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Orb style={{ left: "5%",  top: "8%",    width: 500, height: 500, animDelay: 0 }} />
      <Orb style={{ right: "4%", top: "45%",   width: 380, height: 380, animDelay: 2 }} />
      <Orb style={{ left: "42%", bottom: "3%", width: 300, height: 300, animDelay: 4 }} />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        style={{ y: yShift, opacity: fadeOut }}
      >
        <Reveal delay={0}>
          <div className="sp-body flex items-center justify-center gap-2 mb-8 text-[0.7rem]"
            style={{ color: "var(--faint)" }}>
            <Link href="/" className="sp-bc">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--muted)" }}>Contact Us</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="sp-body inline-flex items-center gap-3 text-[0.62rem] tracking-[0.3em] uppercase mb-7"
            style={{ color: "var(--faint)" }}>
            <span className="inline-block w-8 h-[1px] bg-white/15" />
            Get in Touch
            <span className="inline-block w-8 h-[1px] bg-white/15" />
          </span>
        </Reveal>

        <Reveal delay={0.12} y={60}>
          <h1
            className="sp-display font-semibold leading-[1.04] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "var(--text)" }}
          >
            We'd love to{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              hear from you
            </em>
          </h1>
        </Reveal>

        <Reveal delay={0.22}>
          <p
            className="sp-body text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Share your vision with us, and let's work together to turn ideas into
            impactful results.
          </p>
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

/* ─── Contact Section ───────────────────────────────────────────────── */

function ContactSection() {
  const [form, setForm] = useState({
    name: "", email: "", organisation: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      className="sp-grain relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg-raised)" }}
    >
      <Orb style={{ right: "0%", top: "10%",   width: 400, height: 400, animDelay: 1 }} />
      <Orb style={{ left: "0%", bottom: "0%",  width: 300, height: 300, animDelay: 3 }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* ── Left: Info ── */}
          <div>
            <Reveal>
              <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-4"
                style={{ color: "var(--faint)" }}>
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="sp-display font-semibold leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--text)" }}
              >
                Tell us{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
                  everything
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="sp-body text-base leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
                At Tezh Technologies, we value every conversation. Not a fan of forms?
                Reach us directly — we're always happy to talk.
              </p>
            </Reveal>

            {/* WhatsApp */}
            <Reveal delay={0.2}>
              <a
                href="https://wa.me/919390262628"
                target="_blank"
                rel="noopener noreferrer"
                className="sp-wa mb-10 inline-flex"
              >
                <span style={{ fontSize: "0.95rem" }}>💬</span>
                Text on WhatsApp
              </a>
            </Reveal>

            {/* Contact cards */}
            <div className="flex flex-col gap-4 mt-8">
              {[
                {
                  icon: "◎",
                  label: "Phone",
                  value: "+91 93902 62628",
                  href: "tel:+919390262628",
                },
                {
                  icon: "◈",
                  label: "Email",
                  value: "info@tezht.com",
                  href: "mailto:info@tezht.com",
                },
                {
                  icon: "◉",
                  label: "Address",
                  value: "3-33/B, Nawabpet, Mahbubnagar, Telangana — 509340",
                  href: null,
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={0.25 + i * 0.08}>
                  <div className="sp-info-card flex items-start gap-4">
                    <span style={{ color: "var(--faint)", fontSize: "1rem", marginTop: 2, flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    <div>
                      <span className="sp-body block text-[0.6rem] tracking-[0.2em] uppercase mb-1"
                        style={{ color: "var(--faint)" }}>
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="sp-display font-medium text-sm"
                          style={{ color: "var(--text)", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                          onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="sp-body text-sm" style={{ color: "var(--muted)" }}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <Reveal delay={0.15}>
            {submitted ? (
              <motion.div
                className="sp-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-3xl mb-4" style={{ color: "var(--faint)" }}>◎</div>
                <h3 className="sp-display font-semibold text-xl mb-3" style={{ color: "var(--text)" }}>
                  Message Received
                </h3>
                <p className="sp-body text-sm" style={{ color: "var(--muted)" }}>
                  Thank you for reaching out. Our team will be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: "40px",
                  background: "var(--surface)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="sp-body block mb-1 text-[0.6rem] tracking-wider uppercase"
                      style={{ color: "var(--faint)" }}>
                      Your Name *
                    </label>
                    <input
                      className="sp-input"
                      name="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="sp-body block mb-1 text-[0.6rem] tracking-wider uppercase"
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
                    <label className="sp-body block mb-1 text-[0.6rem] tracking-wider uppercase"
                      style={{ color: "var(--faint)" }}>
                      Organisation
                    </label>
                    <input
                      className="sp-input"
                      name="organisation"
                      placeholder="Your company"
                      value={form.organisation}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="sp-body block mb-1 text-[0.6rem] tracking-wider uppercase"
                      style={{ color: "var(--faint)" }}>
                      Phone
                    </label>
                    <input
                      className="sp-input"
                      name="phone"
                      type="tel"
                      placeholder="+91 000 000 0000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="sp-body block mb-1 text-[0.6rem] tracking-wider uppercase"
                    style={{ color: "var(--faint)" }}>
                    Service of Interest
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      className="sp-select"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="it">IT Services</option>
                      <option value="ai">AI Agents</option>
                      <option value="automation">Automation Solutions</option>
                      <option value="app">App & Software Development</option>
                      <option value="data">Data Analytics</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="transformation">Digital Transformation</option>
                      <option value="other">Other / Not sure</option>
                    </select>
                    <span style={{
                      position: "absolute", right: 0, top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--faint)", pointerEvents: "none", fontSize: "0.7rem",
                    }}>
                      ▾
                    </span>
                  </div>
                </div>

                <div className="mb-10">
                  <label className="sp-body block mb-1 text-[0.6rem] tracking-wider uppercase"
                    style={{ color: "var(--faint)" }}>
                    Project Summary *
                  </label>
                  <textarea
                    className="sp-textarea"
                    name="message"
                    placeholder="Tell us about your project, challenge, or goal..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    className="sp-cta"
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.email || !form.message}
                  >
                    {loading ? (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Sending…
                      </motion.span>
                    ) : (
                      <>Send Message →</>
                    )}
                  </button>
                  <p className="sp-body text-xs" style={{ color: "var(--faint)" }}>
                    By sending, you agree to our terms & conditions.
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────────── */

function FAQ() {
  return (
    <section
      className="sp-grain relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Orb style={{ left: "50%", top: "10%", width: 500, height: 500, animDelay: 0 }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left label */}
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-4"
                style={{ color: "var(--faint)" }}>
                Before you reach out
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="sp-display font-semibold leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--text)" }}
              >
                Frequent{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
                  questions
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="sp-body text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                All the answers you need before starting a conversation with us.
              </p>
            </Reveal>
          </div>

          {/* Right FAQ list */}
          <Reveal delay={0.15}>
            <div>
              {faqs.map((item) => (
                <FAQItem key={item.q} item={item} />
              ))}
            </div>
          </Reveal>
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
      style={{ background: "var(--bg-raised)" }}
    >
      <Orb style={{ left: "25%", top: "20%",    width: 550, height: 550, animDelay: 0 }} />
      <Orb style={{ right: "10%", bottom: "10%", width: 350, height: 350, animDelay: 2 }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal delay={0}>
          <span className="sp-body text-[0.62rem] tracking-[0.3em] uppercase block mb-5"
            style={{ color: "var(--faint)" }}>
            Let's get started
          </span>
        </Reveal>
        <Reveal delay={0.1} y={50}>
          <h2
            className="sp-display font-semibold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--text)" }}
          >
            Ready to build{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
              something great?
            </em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="sp-body text-base md:text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "var(--muted)" }}>
            Whether you have a clear brief or just an idea — we're here to help
            you scope it, shape it, and bring it to life.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@tezht.com" className="sp-cta">Email Us Directly →</a>
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

export default function ContactPage() {
  return (
    <>
      <style>{CSS}</style>
      <main className="sp-body w-full min-h-screen" style={{ background: "var(--bg)" }}>
        <Hero />
        <ContactSection />
        <FAQ />
        <CTABanner />
      </main>
    </>
  );
}