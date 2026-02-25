"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Title line: slides up from below when IT enters the viewport.
 * overflow:hidden on the wrapper clips the slide-up motion.
 */
function AnimatedLine({ children, staggerIndex = 0 }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!innerRef.current || !wrapperRef.current) return;

    // Set hidden state immediately so it's invisible on load
    gsap.set(innerRef.current, { y: "110%", opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top 88%",
      onEnter: () => {
        // Scroll down → slide up into view
        gsap.killTweensOf(innerRef.current);
        gsap.to(innerRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          delay: staggerIndex * 0.1,
        });
      },
      onLeaveBack: () => {
        // Scroll up → slide back down out of view (reverse)
        gsap.killTweensOf(innerRef.current);
        gsap.to(innerRef.current, {
          y: "110%",
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
          delay: staggerIndex * 0.06,
        });
      },
    });

    return () => st.kill();
  }, [staggerIndex]);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden", display: "block" }}>
      <span ref={innerRef} style={{ display: "block" }}>
        {children}
      </span>
    </div>
  );
}

/**
 * Paragraph line: wipes in left-to-right via clipPath when IT enters the viewport.
 */
function AnimatedParaLine({ children, staggerIndex = 0 }) {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;

    // Set hidden state immediately
    gsap.set(lineRef.current, {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
      filter: "blur(6px)",
    });

    const st = ScrollTrigger.create({
      trigger: lineRef.current,
      start: "top 90%",
      onEnter: () => {
        // Scroll down → wipe in left to right
        gsap.killTweensOf(lineRef.current);
        gsap.to(lineRef.current, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power2.out",
          delay: staggerIndex * 0.08,
        });
      },
      onLeaveBack: () => {
        // Scroll up → wipe out right to left (reverse)
        gsap.killTweensOf(lineRef.current);
        gsap.to(lineRef.current, {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.55,
          ease: "power2.in",
          delay: staggerIndex * 0.05,
        });
      },
    });

    return () => st.kill();
  }, [staggerIndex]);

  return (
    <span ref={lineRef} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

const TITLE_LINES = ["Our Story –", "The Heart of TezhT"];

const PARA_LINES = [
  "At TezhTechnologies, our journey is built on",
  "three foundational pillars: Technology, Trust,",
  "and Team — the very elements that shape our",
  "identity, guide our work, and define the value",
  "we deliver to clients worldwide.",
];

export default function LandingPage() {
  const overlayRef = useRef(null);
  const heroRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);

  // Scrollbar visibility on scroll
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setScrolling(false), 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Lenis + hero overlay scroll effect
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Connect Lenis to GSAP ScrollTrigger so positions stay in sync
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
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
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/liquid.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0 }}
        />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-white text-center">
            We Build Digital Power
          </h1>
          <p className="mt-5 text-lg text-neutral-300 text-center">
            Transform Ideas into Intelligent Solutions.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
          >
            Start Your Project
          </button>
        </div>
      </section>

      {/* ── OUR STORY SECTION ── */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 py-24">
        <div className="max-w-3xl px-4 w-full text-center">

          {/* Title: each line slides up when it scrolls into view */}
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-normal leading-tight text-white mb-10">
            {TITLE_LINES.map((line, i) => (
              <AnimatedLine key={i} staggerIndex={i}>
                {line}
              </AnimatedLine>
            ))}
          </h2>

          {/* Paragraph: each line wipes left to right when it scrolls into view */}
          <p className="text-base sm:text-lg text-neutral-400 font-bold leading-relaxed">
            {PARA_LINES.map((line, i) => (
              <React.Fragment key={i}>
                <AnimatedParaLine staggerIndex={i}>
                  {line}
                </AnimatedParaLine>
                {i < PARA_LINES.length - 1 && " "}
              </React.Fragment>
            ))}
          </p>

        </div>
      </section>

      {/* Custom scrollbar – visible only while scrolling */}
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${scrolling ? "rgba(80,80,80,0.7)" : "transparent"};
          border-radius: 8px;
          transition: background 0.3s;
        }
        body {
          scrollbar-width: thin;
          scrollbar-color: ${
            scrolling
              ? "rgba(80,80,80,0.7) transparent"
              : "transparent transparent"
          };
        }
      `}</style>
    </>
  );
}