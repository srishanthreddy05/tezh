"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    num: "01",
    icon: "⬡",
    title: "IT Services",
    line: "Your Business Backbone - Secure, Scalable, Future-Ready.",
    href: "/services/it-services",
  },
  {
    num: "02",
    icon: "◈",
    title: "Automation Solutions",
    line: "Work Smarter. Let intelligent bots handle the rest.",
    href: "/services/automation",
  },
  {
    num: "03",
    icon: "◎",
    title: "Data Analytics",
    line: "Turn your data into your most powerful competitive edge.",
    href: "/services/data-analytics",
  },
  {
    num: "04",
    icon: "◉",
    title: "AI Agents",
    line: "Agents that learn, understand, and act - 24/7.",
    href: "/services/ai-agents",
  },
  {
    num: "05",
    icon: "⬡",
    title: "App Development",
    line: "Secure, scalable applications built around your users.",
    href: "/services/app-development",
  },
  {
    num: "06",
    icon: "◈",
    title: "Digital Transformation",
    line: "Reshape the way your business operates and grows.",
    href: "/services/digital-transformation",
  },
  {
    num: "07",
    icon: "◎",
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
  { value: 10, suffix: "+", label: "Years of Service" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 6, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Client Retention" },
];

const CSS = `
  .hp-page {
    background: var(--bg);
    color: var(--text);
    overflow-x: clip;
  }

  .hp-section {
    position: relative;
    padding: clamp(68px, 10vw, 120px) clamp(20px, 4.5vw, 56px);
  }

  .hp-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .hp-rule {
    height: 1px;
    border: 0;
    background: linear-gradient(90deg, transparent, var(--accent) 24%, var(--accent) 76%, transparent);
  }

  .hp-eyebrow {
    font-family: var(--font-dm-mono), "DM Mono", monospace;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.68rem;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
  }

  .hp-eyebrow::before,
  .hp-eyebrow::after {
    content: "";
    width: 28px;
    height: 1px;
    background: var(--accent);
    opacity: 0.75;
  }

  .hp-hero {
    min-height: 100svh;
    display: grid;
    place-items: center;
    padding: clamp(96px, 12vw, 140px) clamp(20px, 4.5vw, 56px) clamp(74px, 8vw, 92px);
    text-align: center;
    background: var(--bg);
    position: relative;
    isolation: isolate;
  }

  .hp-hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    opacity: 1;
  }

  .hp-hero::before {
    content: none;
  }

  .hp-hero .hp-container {
    position: relative;
    z-index: 1;
  }

  .hp-hero-title {
    margin: 1.2rem auto 0;
    max-width: 960px;
    font-family: var(--font-cormorant), "Cormorant Garamond", serif;
    font-size: clamp(2.5rem, 7.5vw, 6.4rem);
    line-height: 0.96;
    color: #ffffff;
    letter-spacing: 0.02em;
    animation: hpFadeUp 0.6s ease both;
  }

  .hp-hero-title em {
    font-style: italic;
    color: var(--accent);
    font-weight: 500;
  }

  .hp-title-underline {
    width: min(360px, 52vw);
    height: 2px;
    margin: 1.1rem auto 0;
    background: var(--accent);
    transform-origin: left;
    animation: hpDrawLine 0.8s ease 0.25s both;
  }

  .hp-sub {
    margin: 1.3rem auto 0;
    max-width: 620px;
    font-size: clamp(1rem, 1.7vw, 1.18rem);
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.75;
  }

  .hp-hero .hp-btn {
    color: #ffffff;
  }

  .hp-hero .hp-btn-secondary {
    border-color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.06);
  }

  .hp-actions {
    margin-top: 2.2rem;
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hp-btn {
    min-height: 44px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.45rem;
    border-radius: 4px;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    font-size: 0.72rem;
    font-weight: 700;
    transition: transform 0.25s ease, box-shadow 0.25s ease, color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
  }

  .hp-btn:hover {
    transform: translateY(-2px);
  }

  .hp-btn-primary {
    background: var(--accent);
    color: var(--primary);
    border: 1px solid var(--accent);
  }

  .hp-btn-secondary {
    color: var(--primary);
    border: 1px solid var(--primary);
    background: transparent;
  }

  .hp-ticker-wrap {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
    background: #fbf9f5;
  }

  .hp-ticker {
    display: flex;
    width: max-content;
    animation: hpMarquee 24s linear infinite;
  }

  .hp-ticker span {
    padding: 0.88rem 1.5rem;
    font-family: var(--font-dm-mono), "DM Mono", monospace;
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--faint);
    white-space: nowrap;
  }

  .hp-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(24px, 5vw, 72px);
    align-items: center;
  }

  .hp-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .hp-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .hp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    padding: 1.5rem 1.25rem;
    position: relative;
    transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
  }

  .hp-card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: var(--accent);
    transition: width 0.24s ease;
  }

  .hp-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.09);
    border-color: #dbc98d;
  }

  .hp-card:hover::before {
    width: 3px;
  }

  .hp-service-link {
    text-decoration: none;
    color: inherit;
  }

  .hp-icon {
    color: var(--accent);
    font-size: 1.15rem;
  }

  .hp-num {
    font-family: var(--font-dm-mono), "DM Mono", monospace;
    font-size: 0.62rem;
    color: var(--accent);
    letter-spacing: 0.2em;
  }

  .hp-title {
    font-family: var(--font-cormorant), "Cormorant Garamond", serif;
    color: var(--primary);
    font-size: clamp(1.05rem, 2.4vw, 1.35rem);
    margin: 0.5rem 0;
  }

  .hp-body {
    color: var(--muted);
    line-height: 1.7;
    font-size: 0.93rem;
  }

  .hp-process {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .hp-step {
    border: 1px solid var(--border);
    background: var(--surface);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
    padding: 1.2rem;
    text-align: center;
  }

  .hp-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border: 1px solid var(--border);
    background: var(--surface);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  }

  .hp-stat {
    text-align: center;
    padding: 1.5rem 1rem;
    border-right: 1px solid var(--border);
  }

  .hp-stat:last-child {
    border-right: 0;
  }

  .hp-stat-value {
    font-family: var(--font-cormorant), "Cormorant Garamond", serif;
    color: var(--accent);
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1;
  }

  .hp-footer {
    background: #1a1a2e;
    border-top: 1px solid var(--accent);
    color: #f8f6f2;
    padding: clamp(56px, 8vw, 82px) clamp(20px, 4.5vw, 56px) 28px;
  }

  .hp-footer h4,
  .hp-footer a,
  .hp-footer p,
  .hp-footer span {
    color: #f8f6f2;
  }

  .hp-footer a {
    text-decoration: none;
  }

  .hp-footer-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.4fr;
    gap: 26px;
  }

  .hp-cta-note {
    color: #8f8a81;
    font-size: 0.72rem;
    margin-top: 1rem;
    letter-spacing: 0.05em;
  }

  @keyframes hpFadeUp {
    from {
      opacity: 0;
      transform: translateY(22px);
      letter-spacing: 0.11em;
    }
    to {
      opacity: 1;
      transform: translateY(0);
      letter-spacing: 0.02em;
    }
  }

  @keyframes hpDrawLine {
    from {
      transform: scaleX(0);
      opacity: 0;
    }
    to {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  @keyframes hpMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @media (max-width: 1024px) {
    .hp-cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .hp-footer-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 760px) {
    .hp-grid-2,
    .hp-grid-3,
    .hp-process,
    .hp-stats,
    .hp-cards,
    .hp-footer-grid {
      grid-template-columns: 1fr;
    }

    .hp-stat {
      border-right: 0;
      border-bottom: 1px solid var(--border);
    }

    .hp-stat:last-child {
      border-bottom: 0;
    }

    .hp-btn {
      width: 100%;
    }

    .hp-ticker {
      animation-duration: 34s;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hp-hero-title,
    .hp-title-underline,
    .hp-ticker {
      animation: none;
    }

    .hp-card,
    .hp-btn {
      transition: none;
    }
  }
`;

function useInViewOnce(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

function Reveal({ children, className = "" }) {
  const { ref, isVisible } = useInViewOnce();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function CountUp({ value, suffix }) {
  const { ref, isVisible } = useInViewOnce();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1200;
    const start = performance.now();
    let rafId = 0;

    const step = (time) => {
      const t = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.floor(eased * value));
      if (t < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="hp-stat-value">
      {display}
      {suffix}
    </span>
  );
}

function Hero() {
  return (
    <section className="hp-hero">
      <video
        className="hp-hero-video"
        src="/videos/liquid.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className="hp-container">
        <span className="hp-eyebrow">Tezh Technologies</span>
        <h1 className="hp-hero-title">
          The Future of Business - <em>Now.</em>
        </h1>
        <div className="hp-title-underline" />
        <p className="hp-sub">
          We build intelligent systems that transform how companies operate,
          scale, and compete in the digital era.
        </p>
        <div className="hp-actions">
          <a href="/contact" className="hp-btn hp-btn-primary shimmer-btn">Get a Free Consultation</a>
          <a href="#services" className="hp-btn hp-btn-secondary">Explore Services</a>
        </div>
      </div>
    </section>
  );
}

function Positioning() {
  const tags = useMemo(
    () => [
      "Born in Technology",
      "Forged in Strategy",
      "Wired for Innovation",
      "Built for Scale",
      "Driven by Results",
      "Born in Technology",
      "Forged in Strategy",
      "Wired for Innovation",
      "Built for Scale",
      "Driven by Results",
    ],
    []
  );

  return (
    <section>
      <div className="hp-ticker-wrap">
        <div className="hp-ticker">
          {[...tags, ...tags].map((t, i) => (
            <span key={`${t}-${i}`}>{t} ·</span>
          ))}
        </div>
      </div>
      <div className="hp-section">
        <div className="hp-container hp-grid-2">
          <Reveal>
            <div>
              <span className="hp-eyebrow">Strategic Positioning</span>
              <h2 className="hp-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: "0.9rem" }}>
                Reinventing Business Through Intelligent Systems
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <p className="hp-body">
                We go beyond delivering software. We create future-ready technologies that fuel growth,
                unlock opportunities, and transform how our clients operate - with unwavering commitment
                to quality, scalability, and measurable outcomes.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <a href="/about" className="hp-btn hp-btn-secondary">Our Story</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="hp-section">
      <div className="hp-container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="hp-eyebrow">What we stand for</span>
            <h2 className="hp-title" style={{ fontSize: "clamp(2rem, 4.8vw, 3.2rem)", marginTop: "0.9rem" }}>
              Three Pillars. One Promise.
            </h2>
          </div>
        </Reveal>
        <div className="hp-grid-3">
          {pillars.map((p) => (
            <Reveal key={p.title}>
              <article className="hp-card">
                <div className="hp-icon">{p.icon}</div>
                <h3 className="hp-title">{p.title}</h3>
                <p className="hp-body">{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="hp-section" style={{ background: "#fbf9f5" }}>
      <div className="hp-container">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "end" }}>
            <div>
              <span className="hp-eyebrow">What we build</span>
              <h2 className="hp-title" style={{ fontSize: "clamp(2rem, 4.7vw, 3.2rem)", marginTop: "0.9rem" }}>Our Solutions</h2>
            </div>
            <a href="/services" className="hp-btn hp-btn-secondary">View All Services</a>
          </div>
        </Reveal>

        <hr className="hp-rule" style={{ margin: "1.8rem 0 1.2rem" }} />

        <div className="hp-cards">
          {services.map((s) => (
            <Reveal key={s.num}>
              <Link href={s.href} className="hp-service-link">
                <article className="hp-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="hp-icon">{s.icon}</span>
                    <span className="hp-num">{s.num}</span>
                  </div>
                  <h3 className="hp-title">{s.title}</h3>
                  <p className="hp-body">{s.line}</p>
                  <p style={{ marginTop: "1rem", color: "var(--accent)", fontFamily: "var(--font-dm-mono), DM Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>Explore</p>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="hp-section">
      <div className="hp-container hp-grid-2">
        <Reveal>
          <div>
            <span className="hp-eyebrow">How we work</span>
            <h2 className="hp-title" style={{ fontSize: "clamp(2rem, 4.4vw, 3rem)", marginTop: "0.9rem" }}>
              Strategy Before Execution.
            </h2>
            <p className="hp-body" style={{ marginTop: "1rem" }}>
              We don&apos;t just build - we diagnose first. Our consultative approach ensures
              that every solution we deliver is perfectly aligned with your unique business
              needs and long-term vision. We ask the hard questions so we can give you
              the right answers.
            </p>
            <div style={{ marginTop: "1.1rem" }}>
              <a href="/contact" className="hp-btn hp-btn-primary shimmer-btn">Start a Conversation</a>
            </div>
          </div>
        </Reveal>

        <div className="hp-process">
          {process.map((step) => (
            <Reveal key={step.num}>
              <article className="hp-step">
                <div className="hp-num">{step.num}</div>
                <h3 className="hp-title" style={{ margin: "0.5rem 0 0" }}>{step.label}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="hp-section" style={{ background: "#fbf9f5" }}>
      <div className="hp-container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "1.7rem" }}>
            <span className="hp-eyebrow">By the numbers</span>
            <h2 className="hp-title" style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)", marginTop: "0.9rem" }}>Results That Speak</h2>
          </div>
        </Reveal>

        <div className="hp-stats">
          {stats.map((s) => (
            <div key={s.label} className="hp-stat reveal is-visible">
              <CountUp value={s.value} suffix={s.suffix} />
              <p className="hp-body" style={{ margin: "0.35rem 0 0", fontSize: "0.84rem" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <hr className="hp-rule" style={{ marginTop: "1.8rem" }} />
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="hp-section">
      <div className="hp-container hp-grid-2">
        <Reveal>
          <div className="hp-card" style={{ maxWidth: 390, aspectRatio: "3/4", display: "grid", placeItems: "center" }}>
            <span className="hp-icon" style={{ fontSize: "3rem" }}>◎</span>
            <p className="hp-num" style={{ position: "absolute", bottom: 16 }}>Tej Ponnala · CEO</p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <span className="hp-eyebrow">From the Founder</span>
            <h2 className="hp-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginTop: "0.9rem" }}>
              A single mission: empower businesses to thrive.
            </h2>
            <p className="hp-body" style={{ marginTop: "1rem" }}>
              We go beyond delivering software solutions. We create innovative, future-ready
              technologies that fuel growth, unlock new opportunities, and transform the way
              our clients operate. With unwavering commitment to quality, scalability, and
              client success, Tezh Technologies doesn&apos;t just build solutions - we build
              long-term success stories for every client we serve.
            </p>
            <div style={{ marginTop: "1.1rem", borderLeft: "1px solid var(--accent)", paddingLeft: "0.9rem" }}>
              <strong style={{ fontFamily: "var(--font-cormorant), Cormorant Garamond, serif", color: "var(--primary)", fontSize: "1.2rem" }}>Tej Ponnala</strong>
              <p className="hp-num" style={{ marginTop: "0.25rem" }}>CEO, Tezh Technologies</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="hp-section" style={{ textAlign: "center", background: "#fbf9f5" }}>
      <div className="hp-container" style={{ maxWidth: 900 }}>
        <Reveal>
          <span className="hp-eyebrow">Ready to begin?</span>
          <h2 className="hp-title" style={{ fontSize: "clamp(2.2rem, 6vw, 4.8rem)", marginTop: "0.95rem" }}>
            Have a project in mind?
          </h2>
        </Reveal>
        <Reveal>
          <p className="hp-body" style={{ maxWidth: 640, margin: "1rem auto 0" }}>
            At Tezh Technologies, we combine Technology, Trust, and Teamwork
            to craft solutions that drive measurable growth. Share your vision -
            together, we&apos;ll build something impactful.
          </p>
          <div className="hp-actions" style={{ marginTop: "1.7rem" }}>
            <a href="/contact" className="hp-btn hp-btn-primary shimmer-btn">Start a Conversation</a>
            <a href="/case-studies" className="hp-btn hp-btn-secondary">View Case Studies</a>
          </div>
          <p className="hp-cta-note">Average response time: &lt; 24 hours · No commitment required</p>
        </Reveal>
      </div>
    </section>
  );
}

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
    <footer className="hp-footer">
      <div className="hp-footer-grid">
        <div>
          <h4 style={{ fontFamily: "var(--font-cormorant), Cormorant Garamond, serif", fontSize: "1.6rem", margin: "0 0 0.7rem" }}>Tezh Technologies</h4>
          <p style={{ color: "#d2cdc3", lineHeight: 1.7, fontSize: "0.92rem", margin: 0 }}>
            Your trusted partner in digital transformation - delivering innovative technology solutions tailored to your business needs.
          </p>
        </div>

        {Object.entries(links).map(([group, items]) => (
          <div key={group}>
            <p style={{ fontFamily: "var(--font-dm-mono), DM Mono, monospace", color: "#c9a84c", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              {group}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.35rem" }}>
              {items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} style={{ color: "#f8f6f2", opacity: 0.85, fontSize: "0.88rem" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p style={{ fontFamily: "var(--font-dm-mono), DM Mono, monospace", color: "#c9a84c", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            Reach Us
          </p>
          <p style={{ margin: "0 0 0.45rem", color: "#f8f6f2" }}>info@tezht.com</p>
          <p style={{ margin: "0 0 0.45rem", color: "#f8f6f2" }}>+91 93902 62628</p>
          <p style={{ margin: 0, color: "#d2cdc3", lineHeight: 1.6 }}>Nawabpet, Mahbubnagar, Telangana - 509340</p>
        </div>
      </div>

      <hr style={{ border: 0, height: 1, margin: "2rem auto 1.2rem", maxWidth: 1200, background: "linear-gradient(90deg, transparent, #c9a84c 22%, #c9a84c 78%, transparent)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <span style={{ color: "#d2cdc3", fontSize: "0.78rem" }}>© 2026 · Tezh Technologies · All rights reserved.</span>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="#" style={{ color: "#f8f6f2", fontSize: "0.78rem" }}>Privacy Policy</a>
          <a href="#" style={{ color: "#f8f6f2", fontSize: "0.78rem" }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <style>{CSS}</style>
      <main className="hp-page">
        <Hero />
        <Positioning />
        <Pillars />
        <Services />
        <Process />
        <SocialProof />
        <Founder />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
